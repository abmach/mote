'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const minifyScript = path.resolve(__dirname, 'minify.cjs');
// Force the real gate to an impossible limit to prove its failure path.
const result = spawnSync(process.execPath, [minifyScript, '--max-bytes', '1'], {
  encoding: 'utf8',
});

assert.notEqual(
  result.status,
  0,
  `over-budget minification unexpectedly passed\n${result.stdout}${result.stderr}`
);
assert.match(
  result.stderr,
  /FAIL mote\.css exceeds byte budget: \d+ > 1 bytes/
);

console.log('PASS minify budget gate rejects over-budget output');
