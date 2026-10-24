'use strict';

const fs = require('node:fs');
const path = require('node:path');
const CleanCSS = require('clean-css');
const cleanCssPackage = require('clean-css/package.json');

const root = path.resolve(__dirname, '..');
const cases = [
  { file: 'mote.css' },
  {
    file: 'mote.components.css',
    preserved: [
      { label: '@starting-style rules', pattern: /@starting-style\s*\{/g, count: 3 },
      { label: 'allow-discrete values', pattern: /allow-discrete/g, count: 4 },
    ],
  },
];

let failed = false;

if (cleanCssPackage.version !== '5.3.3') {
  console.error(`FAIL expected clean-css 5.3.3, got ${cleanCssPackage.version}`);
  failed = true;
}

for (const testCase of cases) {
  const source = fs.readFileSync(path.join(root, testCase.file), 'utf8');
  const result = new CleanCSS({ level: 2 }).minify(source);
  const css = result.styles || '';
  let caseFailed = false;

  if (result.errors.length || result.warnings.length) {
    failed = true;
    caseFailed = true;
    console.error(`FAIL ${testCase.file} did not minify cleanly`);
    for (const error of result.errors) console.error(`  error: ${error}`);
    for (const warning of result.warnings) console.error(`  warning: ${warning}`);
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
    console.log(`PASS ${testCase.file}: clean-css 5.3.3 level 2 (${css.length} bytes)`);
  }
}

if (failed) process.exitCode = 1;
