'use strict';

const fs = require('node:fs');
const path = require('node:path');

const docsPath = path.resolve(__dirname, '..', 'docs', 'index.html');
const html = fs.readFileSync(docsPath, 'utf8');

const mainMatch = html.match(/<main\b[^>]*\bid="top"[^>]*>([\s\S]*)/i);
const tocMatch = html.match(/<aside\b[^>]*class="[^"]*mote-no-print[^"]*"[^>]*>([\s\S]*?)<\/aside>/i);
if (!mainMatch || !tocMatch) {
  console.error('FAIL docs outline: could not find main or the TOC navigation');
  process.exitCode = 1;
} else {
  const headings = [...mainMatch[1].matchAll(/<h[234]\b[^>]*\bid="([^"]+)"/gi)]
    .map(match => match[1]);
  const links = [...tocMatch[1].matchAll(/<a\b[^>]*\bhref="#([^"]+)"/gi)]
    .map(match => match[1]);
  const headingSet = new Set(headings);
  const linkSet = new Set(links);
  const missing = headings.filter(id => !linkSet.has(id));
  const broken = links.filter(id => !headingSet.has(id));
  const duplicateHeadings = headings.filter((id, index) => headings.indexOf(id) !== index);
  const duplicateLinks = links.filter((id, index) => links.indexOf(id) !== index);

  if (missing.length || broken.length || duplicateHeadings.length || duplicateLinks.length) {
    if (missing.length) console.error(`FAIL docs outline missing headings: ${missing.join(', ')}`);
    if (broken.length) console.error(`FAIL docs outline has broken links: ${broken.join(', ')}`);
    if (duplicateHeadings.length) console.error(`FAIL docs outline duplicate heading IDs: ${duplicateHeadings.join(', ')}`);
    if (duplicateLinks.length) console.error(`FAIL docs outline duplicate links: ${duplicateLinks.join(', ')}`);
    process.exitCode = 1;
  } else {
    console.log(`PASS docs outline: ${headings.length} identified headings and ${links.length} TOC links match`);
  }
}
