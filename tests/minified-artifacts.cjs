'use strict';

const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const packageMetadata = JSON.parse(
  fs.readFileSync(path.join(root, 'package.json'), 'utf8'),
);
const manifest = JSON.parse(
  fs.readFileSync(path.join(root, 'minified-manifest.json'), 'utf8'),
);

const sha256 = (content) => createHash('sha256').update(content).digest('hex');
const expectedFiles = [
  {
    source: 'mote.css',
    output: 'mote.min.css',
    maxBytes: 18000,
    preserved: [],
  },
  {
    source: 'mote.components.css',
    output: 'mote.components.min.css',
    maxBytes: 13000,
    preserved: [
      { label: '@starting-style rules', pattern: /@starting-style\s*\{/g, count: 3 },
      { label: 'allow-discrete values', pattern: /allow-discrete/g, count: 4 },
    ],
  },
];

assert.equal(manifest.packageVersion, packageMetadata.version);
assert.equal(manifest.generator, 'bun x clean-css-cli@latest');
assert.deepEqual(Object.keys(manifest.toolchain).sort(), [
  'cleanCss',
  'cleanCssCli',
]);
assert.match(manifest.toolchain.cleanCssCli, /^\d+\.\d+\.\d+$/);
assert.match(manifest.toolchain.cleanCss, /^\d+\.\d+\.\d+$/);
assert.equal(manifest.files.length, expectedFiles.length);

for (const testCase of expectedFiles) {
  const entry = manifest.files.find((item) => item.source === testCase.source);
  assert.ok(entry, `manifest entry missing for ${testCase.source}`);
  assert.equal(entry.output, testCase.output);
  assert.equal(entry.maxBytes, testCase.maxBytes);

  const source = fs.readFileSync(path.join(root, testCase.source));
  const output = fs.readFileSync(path.join(root, testCase.output));
  const css = output.toString('utf8');

  assert.equal(entry.sourceSha256, sha256(source), `${testCase.source} hash drifted`);
  assert.equal(entry.outputSha256, sha256(output), `${testCase.output} hash drifted`);
  assert.equal(entry.bytes, output.byteLength);
  assert.ok(output.byteLength <= testCase.maxBytes);
  assert.ok(css.includes(`v${packageMetadata.version} · MIT`));

  for (const preserved of testCase.preserved) {
    const count = (css.match(preserved.pattern) || []).length;
    assert.equal(count, preserved.count, `${testCase.output} lost ${preserved.label}`);
  }

  console.log(`PASS ${testCase.output}: ${output.byteLength}/${testCase.maxBytes} bytes`);
}
