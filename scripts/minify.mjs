import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import {
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sha256 = (content) => createHash('sha256').update(content).digest('hex');

const cases = [
  {
    source: 'mote.css',
    output: 'mote.min.css',
    maxBytes: 18_000,
    preserved: [],
  },
  {
    source: 'mote.components.css',
    output: 'mote.components.min.css',
    maxBytes: 13_000,
    preserved: [
      { label: '@starting-style rules', pattern: /@starting-style\s*\{/g, count: 3 },
      { label: 'allow-discrete values', pattern: /allow-discrete/g, count: 4 },
    ],
  },
];

function generate({ sourceDir, outputDir, manifestPath, packagePath }) {
  const packageMetadata = JSON.parse(readFileSync(packagePath, 'utf8'));
  const generationDir = mkdtempSync(path.join(tmpdir(), 'mote-minify-'));
  const versionCapturePath = path.join(generationDir, 'capture-versions.cjs');
  const versionOutputPath = path.join(generationDir, 'versions.json');

  writeFileSync(
    versionCapturePath,
    `const { createRequire } = require('node:module');\n` +
      `const { writeFileSync } = require('node:fs');\n` +
      `const { basename } = require('node:path');\n` +
      `const cliBasename = basename(process.argv[1] || '').replace(/\\.js$/, '');\n` +
      `if (cliBasename === 'cleancss') {\n` +
      `  try {\n` +
      `    const requireFromCli = createRequire(process.argv[1]);\n` +
      `    writeFileSync(process.env.MOTE_MINIFIER_VERSIONS, JSON.stringify({\n` +
      `      cleanCssCli: requireFromCli('clean-css-cli/package.json').version,\n` +
      `      cleanCss: requireFromCli('clean-css/package.json').version,\n` +
      `    }));\n` +
      `  } catch {}\n` +
      `}\n`,
  );

  try {
    const result = spawnSync(
      'bun',
      [
        'x',
        'clean-css-cli@latest',
        '-O2',
        '--batch',
        '--batch-suffix',
        '.min',
        '--output',
        generationDir,
        ...cases.map(({ source }) =>
          path.join(sourceDir, source).replaceAll('\\', '/'),
        ),
      ],
      {
        cwd: root,
        encoding: 'utf8',
        env: {
          ...process.env,
          NODE_OPTIONS: [
            process.env.NODE_OPTIONS,
            `--require="${versionCapturePath.replaceAll('\\', '/')}"`,
          ]
            .filter(Boolean)
            .join(' '),
          MOTE_MINIFIER_VERSIONS: versionOutputPath,
        },
      },
    );

    if (result.error) throw result.error;
    if (result.status !== 0) {
      throw new Error(
        `clean-css-cli failed with exit code ${result.status}\n${result.stderr || result.stdout}`,
      );
    }
    if (/^WARNING:/m.test(result.stderr || '')) {
      throw new Error(`clean-css-cli reported warnings\n${result.stderr}`);
    }

    let toolchain;
    try {
      toolchain = JSON.parse(readFileSync(versionOutputPath, 'utf8'));
    } catch (error) {
      throw new Error(`Could not capture resolved minifier versions: ${error.message}`);
    }
    const expectedToolchainKeys = ['cleanCss', 'cleanCssCli'];
    const actualToolchainKeys = Object.keys(toolchain).sort();
    if (
      actualToolchainKeys.length !== expectedToolchainKeys.length ||
      actualToolchainKeys.some(
        (key, index) => key !== expectedToolchainKeys[index],
      )
    ) {
      throw new Error(
        `Unexpected resolved minifier toolchain keys: ${actualToolchainKeys.join(', ')}`,
      );
    }
    for (const [name, version] of Object.entries(toolchain)) {
      if (!/^\d+\.\d+\.\d+$/.test(version)) {
        throw new Error(`Invalid resolved ${name} version: ${version}`);
      }
    }

    const entries = cases.map((testCase) => {
      const source = readFileSync(path.join(sourceDir, testCase.source));
      const output = readFileSync(path.join(generationDir, testCase.output));
      const css = output.toString('utf8');
      const bytes = output.byteLength;

      if (bytes > testCase.maxBytes) {
        throw new Error(
          `${testCase.output} exceeds byte budget: ${bytes} > ${testCase.maxBytes} bytes`,
        );
      }
      if (!css.includes(`v${packageMetadata.version} · MIT`)) {
        throw new Error(
          `${testCase.output} lost the v${packageMetadata.version} · MIT version stamp`,
        );
      }
      for (const preserved of testCase.preserved) {
        const count = (css.match(preserved.pattern) || []).length;
        if (count !== preserved.count) {
          throw new Error(
            `${testCase.output} lost ${preserved.label}: expected ${preserved.count}, got ${count}`,
          );
        }
      }

      return {
        source: testCase.source,
        output: testCase.output,
        sourceSha256: sha256(source),
        outputSha256: sha256(output),
        bytes,
        maxBytes: testCase.maxBytes,
        preserved: Object.fromEntries(
          testCase.preserved.map(({ label, count }) => [label, count]),
        ),
      };
    });

    mkdirSync(outputDir, { recursive: true });
    mkdirSync(path.dirname(manifestPath), { recursive: true });
    for (const testCase of cases) {
      copyFileSync(
        path.join(generationDir, testCase.output),
        path.join(outputDir, testCase.output),
      );
    }

    const manifest = {
      generator: 'bun x clean-css-cli@latest',
      toolchain,
      options: { level: 2 },
      packageVersion: packageMetadata.version,
      files: entries,
    };
    writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

    return entries;
  } finally {
    rmSync(generationDir, { recursive: true, force: true });
  }
}

function stageFromIndex() {
  const temp = mkdtempSync(path.join(tmpdir(), 'mote-pre-commit-'));
  const sourceDir = path.join(temp, 'source');
  const outputDir = path.join(temp, 'output');
  const manifestPath = path.join(outputDir, 'minified-manifest.json');
  mkdirSync(sourceDir, { recursive: true });

  try {
    for (const file of ['mote.css', 'mote.components.css', 'package.json']) {
      const result = spawnSync('git', ['show', `:0:${file}`], {
        cwd: root,
        encoding: 'buffer',
      });
      if (result.error) throw result.error;
      if (result.status !== 0) {
        throw new Error(`Could not read staged ${file}`);
      }
      writeFileSync(path.join(sourceDir, file), result.stdout);
    }

    const entries = generate({
      sourceDir,
      outputDir,
      manifestPath,
      packagePath: path.join(sourceDir, 'package.json'),
    });

    for (const file of [
      'mote.min.css',
      'mote.components.min.css',
      'minified-manifest.json',
    ]) {
      copyFileSync(path.join(outputDir, file), path.join(root, file));
    }

    const add = spawnSync(
      'git',
      ['add', '--', 'mote.min.css', 'mote.components.min.css', 'minified-manifest.json'],
      { cwd: root, encoding: 'utf8' },
    );
    if (add.error) throw add.error;
    if (add.status !== 0) {
      throw new Error(`Could not stage generated artifacts\n${add.stderr || add.stdout}`);
    }

    for (const entry of entries) {
      console.log(`PASS ${entry.output}: ${entry.bytes}/${entry.maxBytes} bytes`);
    }
    console.log('Staged mote.min.css, mote.components.min.css, and minified-manifest.json');
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
}

if (process.argv[2] === '--staged') {
  stageFromIndex();
} else {
  const entries = generate({
    sourceDir: root,
    outputDir: root,
    manifestPath: path.join(root, 'minified-manifest.json'),
    packagePath: path.join(root, 'package.json'),
  });
  for (const entry of entries) {
    console.log(`PASS ${entry.output}: ${entry.bytes}/${entry.maxBytes} bytes`);
  }
  console.log('Wrote mote.min.css, mote.components.min.css, and minified-manifest.json');
}
