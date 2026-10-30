'use strict';

const fs = require('node:fs');
const path = require('node:path');

const docsDir = path.resolve(__dirname, '..', 'docs');
const pageFiles = fs.readdirSync(docsDir)
  .filter(file => file.endsWith('.html'))
  .sort();
const pages = pageFiles.map(file => ({
  file,
  html: fs.readFileSync(path.join(docsDir, file), 'utf8')
}));

const idsByFile = new Map();
const headingsByFile = new Map();
for (const page of pages) {
  const mainStart = page.html.indexOf('<main');
  const mainEnd = page.html.lastIndexOf('</main>');
  const tocMatch = page.html.match(/<aside\b[^>]*class="[^"]*mote-no-print[^"]*"[^>]*>([\s\S]*?)<\/aside>/i);
  if (mainStart < 0 || mainEnd < 0 || !tocMatch) {
    console.error(`FAIL docs outline: ${page.file} is missing main or the TOC navigation`);
    process.exitCode = 1;
    continue;
  }

  const main = page.html.slice(mainStart, mainEnd);
  const headings = [...main.matchAll(/<h[234]\b[^>]*\bid="([^"]+)"/gi)]
    .map(match => match[1]);
  const links = [...tocMatch[1].matchAll(/<a\b[^>]*\bhref="#([^"]+)"/gi)]
    .map(match => match[1]);
  headingsByFile.set(page.file, headings);
  idsByFile.set(page.file, new Set([
    ...headings,
    ...[...main.matchAll(/\bid="([^"]+)"/gi)].map(match => match[1])
  ]));

  const headingSet = new Set(headings);
  const linkSet = new Set(links);
  const missing = headings.filter(id => !linkSet.has(id));
  const broken = links.filter(id => !headingSet.has(id));
  const duplicateHeadings = headings.filter((id, index) => headings.indexOf(id) !== index);
  const duplicateLinks = links.filter((id, index) => links.indexOf(id) !== index);
  const firstSection = main.search(/<h2\b/gi);
  const pageTitleArea = firstSection < 0 ? main : main.slice(0, firstSection);
  const h1Count = (pageTitleArea.match(/<h1\b/gi) || []).length;
  const title = page.html.match(/<title>([^<]+)<\/title>/i)?.[1];
  const description = page.html.match(/<meta\b[^>]*\bname="description"[^>]*\bcontent="([^"]+)"/i)?.[1];
  const pageNav = page.html.match(/<nav\b[^>]*\baria-label="Documentation pages"[^>]*>([\s\S]*?)<\/nav>/i)?.[1] || '';
  const pageNavAnchors = [...pageNav.matchAll(/<a\b([^>]*)>/gi)].map(match => ({
    href: match[1].match(/\bhref="([^"]+)"/)?.[1],
    current: /\baria-current="page"/.test(match[1])
  }));
  const activePages = pageNavAnchors.filter(anchor => anchor.current);

  const failures = [];
  if (missing.length) failures.push(`missing headings: ${missing.join(', ')}`);
  if (broken.length) failures.push(`broken links: ${broken.join(', ')}`);
  if (duplicateHeadings.length) failures.push(`duplicate heading IDs: ${duplicateHeadings.join(', ')}`);
  if (duplicateLinks.length) failures.push(`duplicate TOC links: ${duplicateLinks.join(', ')}`);
  if (h1Count !== 1) failures.push(`expected one h1, found ${h1Count}`);
  if (!title) failures.push('missing title');
  if (!description) failures.push('missing meta description');
  if (activePages.length !== 1 || activePages[0]?.href !== page.file) {
    failures.push(`expected one active page link for ${page.file}`);
  }
  for (const file of pageFiles) {
    if (!pageNavAnchors.some(anchor => anchor.href === file)) {
      failures.push(`page navigation is missing ${file}`);
    }
  }
  if (failures.length) {
    for (const failure of failures) console.error(`FAIL docs outline ${page.file}: ${failure}`);
    process.exitCode = 1;
  }
}

const globalIds = new Map();
for (const page of pages) {
  for (const id of headingsByFile.get(page.file) || []) {
    const owners = globalIds.get(id) || [];
    owners.push(page.file);
    globalIds.set(id, owners);
  }
}
for (const [id, owners] of globalIds) {
  if (owners.length > 1) {
    console.error(`FAIL docs outline: heading ID ${id} appears in ${owners.join(', ')}`);
    process.exitCode = 1;
  }
}

const stripCode = html => html.replace(/<pre><code>[\s\S]*?<\/code><\/pre>/g, '');
const specificTargets = new Map([
  ['badges', { file: 'layout-components.html', id: 'badges' }],
  ['badges as links', { file: 'layout-components.html', id: 'badges' }],
  ['buttons', { file: 'elements.html', id: 'buttons-and-statuses' }],
  ['buttons and statuses', { file: 'elements.html', id: 'buttons-and-statuses' }],
  ['card grids', { file: 'layout-components.html', id: 'card-grids' }],
  ['cards', { file: 'layout-components.html', id: 'cards' }],
  ['details and accordions', { file: 'elements.html', id: 'details' }],
  ['display text', { file: 'elements.html', id: 'display-text' }],
  ['document layout', { file: 'layout-components.html', id: 'document-layout' }],
  ['elements', { file: 'elements.html', id: 'elements' }],
  ['fonts', { file: 'reference.html', id: 'fonts' }],
  ['forms', { file: 'elements.html', id: 'forms' }],
  ['gallery', { file: 'layout-components.html', id: 'gallery' }],
  ['get started', { file: 'getting-started.html', id: 'get-started' }],
  ['hero and bands', { file: 'layout-components.html', id: 'hero-and-bands' }],
  ['lists and block content', { file: 'elements.html', id: 'lists-and-block-content' }],
  ['media objects', { file: 'layout-components.html', id: 'media-objects' }],
  ['narrow screens: scroll or transform', { file: 'elements.html', id: 'narrow-tables' }],
  ['notes and callouts', { file: 'helpers-print.html', id: 'notes' }],
  ['progress and meter', { file: 'elements.html', id: 'progress-and-meter' }],
  ['semantic feedback', { file: 'elements.html', id: 'semantic-feedback' }],
  ['simple page', { file: 'layout-components.html', id: 'simple-page' }],
  ['skeletons and spinners', { file: 'layout-components.html', id: 'skeletons-and-spinners' }],
  ['status classes', { file: 'helpers-print.html', id: 'status-classes' }],
  ['tables', { file: 'elements.html', id: 'tables' }],
  ['theming', { file: 'getting-started.html', id: 'theming' }],
  ['toasts', { file: 'layout-components.html', id: 'toasts' }]
]);
for (const [label, target] of specificTargets) {
  if (!idsByFile.get(target.file)?.has(target.id)) {
    console.error(`FAIL docs outline: specific target "${label}" does not exist: ${target.file}#${target.id}`);
    process.exitCode = 1;
  }
}
for (const page of pages) {
  const withoutCode = stripCode(page.html);
  const links = [...withoutCode.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)].map(match => match[1]);
  for (const href of links) {
    if (!href || href === '#' || /^(?:[a-z]+:|\/\/)/i.test(href)) continue;
    const [targetFile, fragment] = href.split('#');
    const resolvedFile = targetFile ? path.resolve(docsDir, targetFile) : path.join(docsDir, page.file);
    if (!fs.existsSync(resolvedFile)) {
      console.error(`FAIL docs outline ${page.file}: link target does not exist: ${href}`);
      process.exitCode = 1;
      continue;
    }
    if (fragment) {
      const relativeFile = path.relative(docsDir, resolvedFile).replace(/\\/g, '/');
      if (!idsByFile.get(relativeFile)?.has(fragment)) {
        console.error(`FAIL docs outline ${page.file}: link fragment does not exist: ${href}`);
        process.exitCode = 1;
      }
    }
  }

  const crossPageAnchors = [...withoutCode.matchAll(/<a\b[^>]*\bhref="([^"]+\.html#[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
  for (const [, href, labelHtml] of crossPageAnchors) {
    const label = labelHtml.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    const normalized = label.replace(/^(?:Elements|Layout|Components|Helpers)\s+—\s+/i, '').trim();
    const expected = specificTargets.get(normalized.toLowerCase());
    if (!expected) continue;
    const expectedHref = `${expected.file}#${expected.id}`;
    if (href !== expectedHref) {
      console.error(`FAIL docs outline ${page.file}: "${label}" should link to ${expectedHref}, not ${href}`);
      process.exitCode = 1;
    }
  }

  const assets = [
    ...[...withoutCode.matchAll(/<link\b[^>]*\bhref="([^"]+)"/gi)].map(match => match[1]),
    ...[...withoutCode.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/gi)].map(match => match[1]),
    ...[...withoutCode.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/gi)].map(match => match[1])
  ];
  for (const asset of assets) {
    if (/^(?:[a-z]+:|\/\/)/i.test(asset)) continue;
    if (!fs.existsSync(path.resolve(docsDir, asset))) {
      console.error(`FAIL docs outline ${page.file}: asset does not exist: ${asset}`);
      process.exitCode = 1;
    }
  }
}

const llmsPath = path.join(docsDir, 'llms.txt');
const llms = fs.readFileSync(llmsPath, 'utf8');
const llmsLinks = [...llms.matchAll(/https:\/\/gitlab\.com\/abmach\/mote\/-\/raw\/main\/docs\/([^\s#)]+)(?:#([^\s)]+))?/g)];
if (!llmsLinks.length) {
  console.error('FAIL docs outline: llms.txt contains no documentation links');
  process.exitCode = 1;
}
const linkedPages = new Set();
for (const [, file, fragment] of llmsLinks) {
  linkedPages.add(file);
  if (!fs.existsSync(path.join(docsDir, file))) {
    console.error(`FAIL docs outline: llms.txt page does not exist: ${file}`);
    process.exitCode = 1;
    continue;
  }
  if (fragment && !idsByFile.get(file)?.has(fragment)) {
    console.error(`FAIL docs outline: llms.txt fragment does not exist: ${file}#${fragment}`);
    process.exitCode = 1;
  }
}
for (const file of pageFiles) {
  if (!linkedPages.has(file)) {
    console.error(`FAIL docs outline: llms.txt does not list ${file}`);
    process.exitCode = 1;
  }
}

if (!process.exitCode) {
  const headingCount = [...headingsByFile.values()].reduce((sum, headings) => sum + headings.length, 0);
  console.log(`PASS docs outline: ${pageFiles.length} pages, ${headingCount} linked headings, and ${llmsLinks.length} discovery links match`);
}
