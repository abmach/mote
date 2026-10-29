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

const svgSampleBlock = blocks.find((block) => block.includes('viewBox="0 0 160 100"'));
const svgSampleArticle = svgSampleBlock
  ? svgSampleBlock.match(/<article class="mote-card">\s*<div class="mote-card-media">\s*<svg\b[\s\S]*?<\/article>/)?.[0]
  : undefined;
const liveSvgArticle = html.match(/<article class="mote-card">\s*<div class="mote-card-media">\s*<svg\b[^>]*aria-label="Abstract cover artwork"[\s\S]*?<\/article>/)?.[0];
if (!svgSampleArticle) {
  console.error('FAIL docs recipes: SVG card-cover sample is missing');
  process.exitCode = 1;
} else {
  const svgSampleChecks = [
    ['SVG sample has exactly one media wrapper', (svgSampleArticle.match(/<div class="mote-card-media">/g) || []).length === 1],
    ['SVG sample closes its svg element', /<svg\b[^>]*>[\s\S]*?<\/svg>/.test(svgSampleArticle)],
    ['SVG sample closes its rect element', /<rect\b[^>]*><\/rect>/.test(svgSampleArticle)],
    ['SVG sample keeps svg inside the media wrapper', /<div class="mote-card-media">\s*<svg\b[^>]*>[\s\S]*?<\/svg>\s*<\/div>/.test(svgSampleArticle)],
    ['live docs include a direct SVG card cover', Boolean(liveSvgArticle)],
    ['live SVG has exactly one media wrapper', liveSvgArticle ? (liveSvgArticle.match(/<div class="mote-card-media">/g) || []).length === 1 : false],
    ['live SVG has exactly one direct SVG', liveSvgArticle ? (liveSvgArticle.match(/<svg\b/g) || []).length === 1 : false],
    ['live SVG closes its rect element', liveSvgArticle ? /<rect\b[^>]*><\/rect>/.test(liveSvgArticle) : false],
    ['live SVG closes its circle element', liveSvgArticle ? /<circle\b[^>]*><\/circle>/.test(liveSvgArticle) : false],
    ['live SVG stays inside its media wrapper', liveSvgArticle ? /<div class="mote-card-media">\s*<svg\b[^>]*>[\s\S]*?<\/svg>\s*<\/div>/.test(liveSvgArticle) : false],
    ['live docs include the card-actions helper', /<div class="mote-card-actions mote-row">/.test(html)]
  ];
  const failedSvgSample = svgSampleChecks.filter(([, passed]) => !passed);
  if (failedSvgSample.length) {
    for (const [label] of failedSvgSample) console.error(`FAIL docs recipes: ${label}`);
    process.exitCode = 1;
  } else {
    console.log(`PASS docs recipes: ${svgSampleChecks.length} SVG card-cover checks`);
  }
}

const leaked = rawBlocks.filter((block) => /<(style|div|table|script|article|h[1-6]|p|a|tr|th|td)\b/.test(block));
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

const statusBlock = blocks.find((block) => block.includes('tr.mote-row-status:is(.mote-success'));
if (!statusBlock) {
  console.error('FAIL docs recipes: row-status recipe not found');
  process.exitCode = 1;
} else {
  const checks = [
    ['row status includes semantic row headers', /th\[scope="row"\]/.test(statusBlock)],
    ['row status preserves background-image layers', /background-color:\s*var\(--mote-status-soft\)/.test(statusBlock)],
    ['row status does not use the background shorthand', !/background:\s*var\(--mote-status-soft\)/.test(statusBlock)],
    ['row status paints direct cells only', /tr\.mote-row-status[^\{]*>\s*:is\(td,\s*th\[scope="row"\]\)/.test(statusBlock)]
  ];
  const failed = checks.filter(([, passed]) => !passed);
  if (failed.length) {
    for (const [label] of failed) console.error(`FAIL docs recipes: ${label}`);
    process.exitCode = 1;
  } else if (!process.exitCode) {
    console.log(`PASS docs recipes: ${checks.length} row-status checks`);
  }
}

const readmePath = path.resolve(__dirname, '..', 'README.md');
const readme = fs.readFileSync(readmePath, 'utf8');
const readmeChecks = [
  ['README documents direct SVG card covers', /direct inline SVG/.test(readme)],
  ['README documents card action alignment', /`\.mote-card-actions` — bottom-aligns an action row/.test(readme)],
  ['README documents status row painting', /`\.mote-row-status` \+ a status class/.test(readme)]
];
const failedReadme = readmeChecks.filter(([, passed]) => !passed);
if (failedReadme.length) {
  for (const [label] of failedReadme) console.error(`FAIL docs recipes: ${label}`);
  process.exitCode = 1;
} else if (!process.exitCode) {
  console.log(`PASS docs recipes: ${readmeChecks.length} README checks`);
}

const guidanceChecks = [
  ['phone records require data-label on every data cell', /Every data cell[\s\S]*?non-empty <code>data-label<\/code>/.test(html)],
  ['missing phone-record labels are warned about', /missing <code>data-label<\/code> produces a blank label/.test(html)],
  ['the phone-record numeric example includes its label and value', /class="mote-num" data-label="Score"[\s\S]{0,120}24–18/.test(html)],
  ['the table cap is documented as non-cropping', /content is not cropped/.test(html)],
  ['the table cap can be removed', /--mote-table-max: none/.test(html)],
  ['the phone breakpoint is documented as an example', /40rem<\/code> breakpoint in this recipe is an example/.test(html)],
  ['media-query breakpoints cannot use CSS variables', /cannot be parameterized[\s\S]*?CSS variable inside <code>@media<\/code>/.test(html)],
  ['transform and cap-release thresholds are kept identical', /both the transform query and the cap-release query, keeping[\s\S]*?them identical/.test(html)],
  ['the print checklist covers generated PDF inspection', /Inspect the generated PDF, not only print-media emulation/.test(html)],
  ['the print checklist covers page breaks', /break-inside/.test(html)],
  ['the print checklist covers browser-dependent headings', /browser-dependent repeated headings/.test(html)],
  ['the print checklist covers interactive forms', /prefer a paper-only summary over split controls/.test(html)],
  ['direct SVG card covers are documented', /or inline <code>svg<\/code> child/.test(html)],
  ['card action helper is documented', /<code>\.mote-card-actions<\/code> on the action row/.test(html)]
];
const failedGuidance = guidanceChecks.filter(([, passed]) => !passed);
if (failedGuidance.length) {
  for (const [label] of failedGuidance) console.error(`FAIL docs recipes: ${label}`);
  process.exitCode = 1;
} else if (!process.exitCode) {
  console.log(`PASS docs recipes: ${guidanceChecks.length} guidance checks`);
}

const narrowHeaderBlock = blocks.find((block) => block.includes('mote-container mote-row') && block.includes('flex: 1 1 100%'));
if (!narrowHeaderBlock || !/mote-container mote-row/.test(narrowHeaderBlock)) {
  console.error('FAIL docs recipes: canonical narrow-header row owner is missing');
  process.exitCode = 1;
} else if (!process.exitCode) {
  console.log('PASS docs recipes: canonical narrow-header row owner is documented');
}
