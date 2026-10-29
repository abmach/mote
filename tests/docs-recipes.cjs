'use strict';

// Pins the published phone-record recipe in docs/index.html.
//
// The recipe is a copy-ready CSS block, so the shipped stylesheets cannot
// assert it — the check reads the docs source, decodes the entities, and
// requires the rules the round-13 fixes depend on. It also fails if a code
// sample ever leaks a live tag into the page.

const fs = require('node:fs');
const path = require('node:path');

const docsPath = path.resolve(__dirname, '..', 'docs', 'index.html');
const html = fs.readFileSync(docsPath, 'utf8');

const LT = String.fromCharCode(38, 108, 116, 59); // <
const GT = String.fromCharCode(38, 103, 116, 59); // >
const AMP = String.fromCharCode(38, 97, 109, 112, 59); // &

const rawBlocks = html.match(/<pre><code>[\s\S]*?<\/code><\/pre>/g) || [];
const decode = (text) => text
  .split(LT).join('<')
  .split(GT).join('>')
  .split(AMP).join('&');
const blocks = rawBlocks.map(decode);

const leaked = rawBlocks.filter((block) => /<(style|div|table|script)\b/.test(block));
if (leaked.length) {
  console.error(`FAIL docs recipes: ${leaked.length} code block(s) leak live tags`);
  process.exitCode = 1;
}

const recipe = blocks.find((block) => block.includes('.records td::before'));
if (!recipe) {
  console.error('FAIL docs recipes: phone-record recipe not found');
  process.exitCode = 1;
} else {
  const checks = [
    ['the recipe is published as a style block', /<style>/],
    ['the breakpoint survives decoding', /@media \(width < 40rem\)/],
    ['one shared label column for the whole table', /--records-label:\s*7rem/],
    ['the label column uses the shared knob', /grid-template-columns:\s*var\(--records-label\)\s+minmax\(0,\s*1fr\)/],
    ['the label keeps text-align: start', /\.records td::before\s*\{[^}]*text-align:\s*start/],
    ['the caption survives the block table', /\.records caption\s*\{[^}]*display:\s*block[^}]*width:\s*100%/],
    ['row headers join the record layout', /th\[scope="row"\]/],
    ['numeric values start-align in the record layout', /\.records td\.mote-num\s*\{[^}]*text-align:\s*start/],
    ['the print guard restores the table', /@media print\s*\{[\s\S]*?display:\s*revert/],
    ['the print guard restores the hidden header', /@media print\s*\{[\s\S]*?\.records thead(?:,|\s*\{)[^}]*position:\s*static/],
    ['the print guard restores sticky header cells', /@media print\s*\{[\s\S]*?\.records thead th\s*\{[^}]*position:\s*static/],
    ['the print guard removes generated labels', /@media print\s*\{[\s\S]*?\.records td::before\s*\{[^}]*content:\s*none/],
    ['the print guard restores the caption', /@media print\s*\{[\s\S]*?\.records caption\s*\{[^}]*display:\s*table-caption/]
  ];
  const failed = checks.filter(([, pattern]) => !pattern.test(recipe));
  if (failed.length) {
    for (const [label] of failed) console.error(`FAIL docs recipes: ${label}`);
    process.exitCode = 1;
  } else {
    console.log(`PASS docs recipes: ${checks.length} recipe checks, ${rawBlocks.length} code blocks clean`);
  }
}

const panelBlock = blocks.find((block) => block.includes('records-panel'));
if (!panelBlock || !/--mote-table-max:\s*none/.test(panelBlock)) {
  console.error('FAIL docs recipes: the scroll-panel cap release is missing');
  process.exitCode = 1;
} else if (!process.exitCode) {
  console.log('PASS docs recipes: the scroll-panel cap release is documented');
}

const statusBlock = blocks.find((block) => block.includes('tr:is(.mote-success'));
if (!statusBlock) {
  console.error('FAIL docs recipes: row-status recipe not found');
  process.exitCode = 1;
} else {
  const checks = [
    ['row status includes semantic row headers', />\s*:is\(td,\s*th\[scope="row"\]\)/.test(statusBlock)],
    ['row status preserves background-image layers', /background-color:\s*var\(--mote-status-soft\)/.test(statusBlock)],
    ['row status does not use the background shorthand', !/background:\s*var\(--mote-status-soft\)/.test(statusBlock)]
  ];
  const failed = checks.filter(([, passed]) => !passed);
  if (failed.length) {
    for (const [label] of failed) console.error(`FAIL docs recipes: ${label}`);
    process.exitCode = 1;
  } else if (!process.exitCode) {
    console.log(`PASS docs recipes: ${checks.length} row-status checks`);
  }
}

const narrowHeaderBlock = blocks.find((block) => block.includes('mote-container mote-row') && block.includes('flex: 1 1 100%'));
if (!narrowHeaderBlock || !/mote-container mote-row/.test(narrowHeaderBlock)) {
  console.error('FAIL docs recipes: canonical narrow-header row owner is missing');
  process.exitCode = 1;
} else if (!process.exitCode) {
  console.log('PASS docs recipes: canonical narrow-header row owner is documented');
}
