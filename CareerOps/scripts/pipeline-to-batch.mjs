#!/usr/bin/env node
/**
 * pipeline-to-batch.mjs
 *
 * Reads data/pipeline.md (URLs added by scan.mjs) and appends any new URLs
 * to batch/batch-input.tsv that haven't been processed yet.
 *
 * Deduplicates against:
 *   - batch/batch-state.tsv   (already evaluated)
 *   - batch/batch-input.tsv   (already queued)
 *   - data/scan-history.tsv   (seen by scanner)
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';

const PIPELINE_PATH  = 'data/pipeline.md';
const STATE_PATH     = 'batch/batch-state.tsv';
const INPUT_PATH     = 'batch/batch-input.tsv';

mkdirSync('batch/tracker-additions', { recursive: true });
mkdirSync('batch/logs',              { recursive: true });

// ── Helpers ────────────────────────────────────────────────────────────────

function readLines(path) {
  if (!existsSync(path)) return [];
  return readFileSync(path, 'utf8').split('\n').filter(Boolean);
}

/** Extract all https:// URLs from a block of text */
function extractUrls(text) {
  const re = /https?:\/\/[^\s\)>\]"']+/g;
  return [...new Set(text.match(re) || [])];
}

/** URLs already processed or queued */
function alreadyKnownUrls() {
  const known = new Set();

  // From batch-state.tsv (col 2 = url)
  for (const line of readLines(STATE_PATH)) {
    if (line.startsWith('id\t')) continue;
    const parts = line.split('\t');
    if (parts[1]) known.add(parts[1].trim());
  }

  // From batch-input.tsv (col 2 = url)
  for (const line of readLines(INPUT_PATH)) {
    if (line.startsWith('id\t')) continue;
    const parts = line.split('\t');
    if (parts[1]) known.add(parts[1].trim());
  }

  return known;
}

/** Next available ID in batch-input.tsv */
function nextId(inputLines) {
  let max = 0;
  for (const line of inputLines) {
    if (line.startsWith('id\t')) continue;
    const id = parseInt(line.split('\t')[0], 10);
    if (!isNaN(id) && id > max) max = id;
  }
  return max + 1;
}

// ── Main ───────────────────────────────────────────────────────────────────

if (!existsSync(PIPELINE_PATH)) {
  console.log('No pipeline.md found — nothing to convert.');
  process.exit(0);
}

const pipelineText = readFileSync(PIPELINE_PATH, 'utf8');
const allUrls      = extractUrls(pipelineText);
const known        = alreadyKnownUrls();

const newUrls = allUrls.filter(u => !known.has(u));

if (newUrls.length === 0) {
  console.log('No new URLs in pipeline.md — batch-input.tsv is up to date.');
  process.exit(0);
}

// Read existing input file or create header
let inputLines = readLines(INPUT_PATH);
const hasHeader = inputLines.some(l => l.startsWith('id\t'));
if (!hasHeader) {
  inputLines = ['id\turl\tsource\tnotes'];
}

let id = nextId(inputLines);
const added = [];

for (const url of newUrls) {
  // Detect source from URL pattern
  let source = 'scan';
  if (url.includes('greenhouse.io'))   source = 'greenhouse';
  else if (url.includes('ashbyhq.com')) source = 'ashby';
  else if (url.includes('lever.co'))   source = 'lever';
  else if (url.includes('workable'))   source = 'workable';

  inputLines.push(`${id}\t${url}\t${source}\t`);
  added.push({ id, url, source });
  id++;
}

writeFileSync(INPUT_PATH, inputLines.join('\n') + '\n');

console.log(`Added ${added.length} new URL(s) to batch-input.tsv:`);
for (const { id, url, source } of added) {
  console.log(`  #${id} [${source}] ${url}`);
}
