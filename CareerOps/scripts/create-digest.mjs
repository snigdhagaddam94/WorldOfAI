#!/usr/bin/env node
/**
 * create-digest.mjs
 *
 * Reads batch-state.tsv + reports/ from the latest run and posts a GitHub
 * Issue titled "Job Digest — YYYY-MM-DD" with scored matches for Vinay to review.
 *
 * Only includes offers scored >= MIN_SCORE (default 4.0) from today's run.
 * Flags sponsorship concerns and remote status.
 *
 * Environment:
 *   GITHUB_TOKEN       — required for issue creation
 *   GITHUB_REPOSITORY  — e.g. snigdhagaddam94/WorldOfAI
 *   MIN_SCORE          — minimum score to include (default 4.0)
 */

import { readFileSync, existsSync, readdirSync } from 'fs';

const GITHUB_TOKEN  = process.env.GITHUB_TOKEN;
const REPO          = process.env.GITHUB_REPOSITORY || 'snigdhagaddam94/WorldOfAI';
const MIN_SCORE     = parseFloat(process.env.MIN_SCORE || '4.0');
const STATE_PATH    = 'batch/batch-state.tsv';
const REPORTS_DIR   = 'reports';
const TODAY         = new Date().toISOString().slice(0, 10);

// ── Helpers ────────────────────────────────────────────────────────────────

function readLines(path) {
  if (!existsSync(path)) return [];
  return readFileSync(path, 'utf8').split('\n').filter(Boolean);
}

function parseState() {
  const lines = readLines(STATE_PATH);
  const entries = [];
  for (const line of lines) {
    if (line.startsWith('id\t')) continue;
    const [id, url, status, startedAt, , reportNum, score] = line.split('\t');
    if (!id || !url) continue;
    entries.push({
      id,
      url,
      status,
      startedAt,
      reportNum,
      score: parseFloat(score) || 0,
    });
  }
  return entries;
}

function readReport(reportNum) {
  if (!reportNum || reportNum === '-') return null;
  if (!existsSync(REPORTS_DIR)) return null;
  const files = readdirSync(REPORTS_DIR);
  const match = files.find(f => f.startsWith(reportNum.padStart(3, '0') + '-'));
  if (!match) return null;
  try {
    return readFileSync(`${REPORTS_DIR}/${match}`, 'utf8');
  } catch {
    return null;
  }
}

/** Extract key fields from a report markdown */
function parseReport(md) {
  if (!md) return {};
  const get = (label) => {
    const re = new RegExp(`\\*\\*${label}:\\*\\*\\s*(.+)`, 'i');
    const m = md.match(re);
    return m ? m[1].trim() : null;
  };
  return {
    company:      get('Company') || get('Empresa'),
    role:         get('Role') || get('Puesto'),
    score:        get('Score') || get('Puntuación'),
    url:          get('URL'),
    legitimacy:   get('Legitimacy') || get('Legitimidad'),
    remote:       get('Remote') || get('Remoto'),
    sponsorship:  md.toLowerCase().includes('no sponsorship') ||
                  md.toLowerCase().includes('no visa') ||
                  md.toLowerCase().includes('authorized to work without'),
  };
}

function scoreEmoji(score) {
  if (score >= 4.5) return '🟢';
  if (score >= 4.0) return '🟡';
  return '🔴';
}

// ── Build issue body ───────────────────────────────────────────────────────

function buildIssueBody(matches, skipped, failed) {
  const lines = [];

  lines.push(`## Career-Ops Job Digest — ${TODAY}`);
  lines.push('');
  lines.push(`**${matches.length}** matches above ${MIN_SCORE}/5 from today's scan.`);
  lines.push('');
  lines.push('> To apply to a role: comment **"apply #ID"** on this issue (e.g. `apply #3`).');
  lines.push('> Career-Ops will fill the application form and generate your tailored CV — you review before submit.');
  lines.push('');

  if (matches.length === 0) {
    lines.push('_No matches above the score threshold today._');
  } else {
    lines.push('---');
    lines.push('');

    for (const { entry, report } of matches) {
      const emoji  = scoreEmoji(entry.score);
      const company = report.company || 'Unknown Company';
      const role    = report.role    || 'Unknown Role';
      const url     = report.url     || entry.url;

      lines.push(`### ${emoji} #${entry.id} — ${company} · ${role}`);
      lines.push('');
      lines.push(`**Score:** ${entry.score}/5 &nbsp;|&nbsp; **URL:** [View Job](${url})`);

      if (report.remote)      lines.push(`**Remote:** ${report.remote}`);
      if (report.legitimacy)  lines.push(`**Legitimacy:** ${report.legitimacy}`);
      if (report.sponsorship) lines.push('> ⚠️ **Sponsorship note detected — verify before applying**');

      lines.push('');
      lines.push(`<details><summary>Full report #${entry.reportNum}</summary>`);
      lines.push('');

      // Include first 60 lines of report for context
      const reportLines = (readReport(entry.reportNum) || '').split('\n').slice(0, 60);
      lines.push('```');
      lines.push(reportLines.join('\n'));
      lines.push('```');
      lines.push('</details>');
      lines.push('');
      lines.push('---');
      lines.push('');
    }
  }

  if (skipped.length > 0) {
    lines.push(`<details><summary>⏭️ ${skipped.length} offers below threshold (< ${MIN_SCORE}/5)</summary>`);
    lines.push('');
    for (const e of skipped) {
      lines.push(`- Score ${e.score}/5 — ${e.url}`);
    }
    lines.push('</details>');
    lines.push('');
  }

  if (failed.length > 0) {
    lines.push(`<details><summary>❌ ${failed.length} evaluation errors</summary>`);
    lines.push('');
    for (const e of failed) {
      lines.push(`- #${e.id} — ${e.url}`);
    }
    lines.push('</details>');
    lines.push('');
  }

  lines.push('---');
  lines.push('_Generated by Career-Ops · [WorldOfAI repo](https://github.com/snigdhagaddam94/WorldOfAI)_');

  return lines.join('\n');
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const entries = parseState();

  // Only entries from today's run
  const todayEntries = entries.filter(e =>
    e.startedAt && e.startedAt.startsWith(TODAY)
  );

  if (todayEntries.length === 0) {
    console.log('No entries from today in batch-state.tsv — no issue to create.');
    return;
  }

  const matches = [];
  const skipped = [];
  const failed  = [];

  for (const entry of todayEntries) {
    if (entry.status === 'failed') {
      failed.push(entry);
      continue;
    }
    if (entry.score >= MIN_SCORE) {
      const reportMd = readReport(entry.reportNum);
      const report   = parseReport(reportMd);
      matches.push({ entry, report });
    } else {
      skipped.push(entry);
    }
  }

  // Sort matches by score descending
  matches.sort((a, b) => b.entry.score - a.entry.score);

  const title = `Job Digest — ${TODAY} (${matches.length} matches)`;
  const body  = buildIssueBody(matches, skipped, failed);

  if (!GITHUB_TOKEN) {
    console.log('No GITHUB_TOKEN — printing digest to stdout instead:\n');
    console.log(`# ${title}\n`);
    console.log(body);
    return;
  }

  const [owner, repo] = REPO.split('/');
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/issues`;

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Content-Type':  'application/json',
      'Accept':        'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({
      title,
      body,
      labels: ['career-ops', 'job-digest'],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`Failed to create issue: ${res.status} ${text}`);
    // Don't fail the workflow — digest is still committed to data/
    return;
  }

  const issue = await res.json();
  console.log(`Created issue #${issue.number}: ${issue.html_url}`);
}

main().catch(err => {
  console.error('create-digest.mjs error:', err.message);
  process.exit(0); // Non-fatal — don't block the workflow
});
