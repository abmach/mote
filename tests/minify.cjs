'use strict';

const fs = require('node:fs');
const path = require('node:path');
const CleanCSS = require('clean-css');
const cleanCssPackage = require('clean-css/package.json');

const root = path.resolve(__dirname, '..');
const cases = [
  { file: 'mote.css', maxBytes: 18000 },
  {
    file: 'mote.components.css',
    maxBytes: 13000,
    preserved: [
      { label: '@starting-style rules', pattern: /@starting-style\s*\{/g, count: 3 },
      { label: 'allow-discrete values', pattern: /allow-discrete/g, count: 4 },
    ],
  },
];

const maxBytesIndex = process.argv.indexOf('--max-bytes');
if (maxBytesIndex !== -1) {
  const maxBytes = Number(process.argv[maxBytesIndex + 1]);
  if (!Number.isInteger(maxBytes) || maxBytes < 1) {
    console.error('FAIL --max-bytes requires a positive integer');
    process.exit(1);
  }
  for (const testCase of cases) testCase.maxBytes = maxBytes;
}

let failed = false;

if (cleanCssPackage.version !== '5.3.3') {
  console.error(`FAIL expected clean-css 5.3.3, got ${cleanCssPackage.version}`);
  failed = true;
}

for (const testCase of cases) {
  const source = fs.readFileSync(path.join(root, testCase.file), 'utf8');
  const result = new CleanCSS({ level: 2 }).minify(source);
  const css = result.styles || '';
  const bytes = Buffer.byteLength(css);
  let caseFailed = false;

  if (result.errors.length || result.warnings.length) {
    failed = true;
    caseFailed = true;
    console.error(`FAIL ${testCase.file} did not minify cleanly`);
    for (const error of result.errors) console.error(`  error: ${error}`);
    for (const warning of result.warnings) console.error(`  warning: ${warning}`);
  }

  if (bytes > testCase.maxBytes) {
    failed = true;
    caseFailed = true;
    console.error(
      `FAIL ${testCase.file} exceeds byte budget: ${bytes} > ${testCase.maxBytes} bytes`
    );
  }

  for (const preserved of testCase.preserved || []) {
    const count = (css.match(preserved.pattern) || []).length;
    if (count !== preserved.count) {
      failed = true;
      caseFailed = true;
      console.error(
        `FAIL ${testCase.file} lost ${preserved.label}: expected ${preserved.count}, got ${count}`
      );
    }
  }

  if (!caseFailed) {
    console.log(
      `PASS ${testCase.file}: clean-css 5.3.3 level 2 (${bytes}/${testCase.maxBytes} bytes)`
    );
  }
}

if (failed) process.exitCode = 1;
