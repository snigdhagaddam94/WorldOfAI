import { chromium } from 'playwright';
import { readFileSync } from 'fs';
import path from 'path';

const RESUME_PATH = '/home/user/WorldOfAI/CareerOps/output/cv-candidate-instacart-2026-05-07.pdf';
const JOB_URL    = 'https://instacart.careers/job/?gh_jid=7872360';

const COVER_LETTER = `Dear Hiring Team,

I'm writing to apply for the Senior Data Engineer II, Finance role at Instacart. Financial data pipelines — where accuracy, auditability, and reliability aren't optional — are where I've done my best work, and this role is a direct match for the kind of engineering I want to own.

Over the past three years at Total Quality Logistics, I designed and shipped a Medallion architecture (staging to silver to gold) from scratch, processing batch and streaming financial and operational data across multiple business units. Immutability and auditability weren't afterthoughts — they were built into every layer. At Prime Healthcare before that, I built HIPAA-compliant ELT systems with the same rigor you'd apply to SOX-controlled environments: immutable audit trails, row-level access controls, lineage tracking, and Python-based validation gates that caught data quality issues before they reached finance-critical reports.

On the technical side, I'm deep in Python, PySpark, Airflow, and Azure Databricks — the core of your stack. I work extensively on Delta Lake (the open table format running Databricks Medallion) and understand the immutability and ACID guarantees it provides. My cloud warehouse experience is on Azure Synapse, which shares the same columnar paradigm as Snowflake; I'd ramp on Snowflake specifics quickly. Same with dbt — I've built SQL transformation logic at scale for 12 years; dbt is a layer I can add.

What attracts me most to this role is the combination of high visibility and real consequences. Finance data is the kind of work where you know exactly when you've gotten it right — and when you haven't. I want to own pipelines where the output matters.

I'd welcome the opportunity to talk through how my background maps to your Finance data challenges.

Vinay Gundamaneni`;

async function selectOption(page, selector, valueOrLabel) {
  try {
    // Try select element first
    const sel = page.locator(selector).first();
    if (await sel.count() > 0) {
      const tag = await sel.evaluate(el => el.tagName.toLowerCase());
      if (tag === 'select') {
        // Try matching by value, then by visible text
        const options = await sel.evaluate(el =>
          Array.from(el.options).map(o => ({ value: o.value, text: o.text.trim() }))
        );
        const match = options.find(o =>
          o.value.toLowerCase().includes(valueOrLabel.toLowerCase()) ||
          o.text.toLowerCase().includes(valueOrLabel.toLowerCase())
        );
        if (match) {
          await sel.selectOption(match.value);
          return true;
        }
        // Fallback: pick first non-empty option if nothing matches
        const fallback = options.find(o => o.value && o.value !== '');
        if (fallback) {
          await sel.selectOption(fallback.value);
          return false; // partial match
        }
      }
    }
  } catch (e) {
    console.log(`  selectOption error for ${selector}: ${e.message}`);
  }
  return false;
}

async function fill(page, selector, value) {
  try {
    const el = page.locator(selector).first();
    if (await el.count() > 0) {
      await el.fill(value);
      return true;
    }
  } catch (e) {
    console.log(`  fill error for ${selector}: ${e.message}`);
  }
  return false;
}

async function run() {
  const browser = await chromium.launch({ headless: true, args: ["--ignore-certificate-errors"] });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();

  console.log('Navigating to job page...');
  await page.goto(JOB_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.screenshot({ path: '/tmp/instacart-01-loaded.png' });
  console.log('Page loaded. Screenshot: /tmp/instacart-01-loaded.png');

  // Look for an Apply button/link to open the form
  const applySelectors = [
    'a[href*="apply"]', 'button:has-text("Apply")', 'a:has-text("Apply")',
    'button:has-text("Apply Now")', 'a:has-text("Apply Now")',
    '[data-testid="apply-button"]', '.apply-button',
  ];
  let clicked = false;
  for (const sel of applySelectors) {
    try {
      const btn = page.locator(sel).first();
      if (await btn.count() > 0 && await btn.isVisible()) {
        console.log(`Clicking apply button: ${sel}`);
        await btn.click();
        await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
        clicked = true;
        break;
      }
    } catch {}
  }
  if (!clicked) console.log('No apply button found — form may already be visible');

  await page.screenshot({ path: '/tmp/instacart-02-form.png' });
  console.log('Form state screenshot: /tmp/instacart-02-form.png');

  // Dump all input/select/textarea names for debugging
  const fields = await page.evaluate(() => {
    const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
    return inputs.map(el => ({
      tag: el.tagName,
      type: el.type || '',
      id: el.id || '',
      name: el.name || '',
      placeholder: el.placeholder || '',
    }));
  });
  console.log('Form fields found:', JSON.stringify(fields, null, 2));

  // ── Standard fields ────────────────────────────────────────────
  console.log('\nFilling standard fields...');
  await fill(page, '#first_name, input[name="first_name"], input[autocomplete="given-name"]',  'Vinay');
  await fill(page, '#last_name,  input[name="last_name"],  input[autocomplete="family-name"]', 'Gundamaneni');
  await fill(page, '#email,      input[name="email"],      input[type="email"]',               'Vinay.g0228@gmail.com');
  await fill(page, '#phone,      input[name="phone"],      input[type="tel"]',                 '952-681-0361');

  // Resume upload
  console.log('Uploading resume...');
  const resumeInput = page.locator('input[type="file"][name*="resume"], input[type="file"]#resume, input[type="file"][accept*="pdf"]').first();
  if (await resumeInput.count() > 0) {
    await resumeInput.setInputFiles(RESUME_PATH);
    console.log('  Resume uploaded');
  } else {
    console.log('  Resume input not found — trying generic file input');
    const anyFile = page.locator('input[type="file"]').first();
    if (await anyFile.count() > 0) await anyFile.setInputFiles(RESUME_PATH);
  }

  // Cover letter text area
  const clTextarea = page.locator(
    'textarea[name*="cover_letter"], textarea#cover_letter_text, textarea[name="cover_letter_text"]'
  ).first();
  if (await clTextarea.count() > 0) {
    await clTextarea.fill(COVER_LETTER);
    console.log('Cover letter filled');
  }

  await page.screenshot({ path: '/tmp/instacart-03-filled-standard.png' });

  // ── Custom questions ───────────────────────────────────────────
  console.log('\nFilling custom questions...');

  // Previously worked at Instacart? → No
  await selectOption(page, 'select[name*="66272633"], #question_66272633', 'No');

  // How did you hear?
  await fill(page, 'input[name*="66272634"], #question_66272634, textarea[name*="66272634"]', 'Company career website');

  // LinkedIn
  await fill(page, 'input[name*="66272635"], #question_66272635', 'https://linkedin.com/in/vinay-gundamaneni');

  // Website(s)
  await fill(page, 'input[name*="66252213"], #question_66252213', 'N/A');

  // Authorized to work in US? → Yes
  await selectOption(page, 'select[name*="66272637"], #question_66272637', 'Yes');

  // State → Michigan
  await selectOption(page, 'select[name*="66272638"], #question_66272638', 'Michigan');

  // Require sponsorship? → Yes
  await selectOption(page, 'select[name*="66272639"], #question_66272639', 'Yes');

  await page.screenshot({ path: '/tmp/instacart-04-filled-custom.png' });

  // ── Demographic questions (decline all) ───────────────────────
  console.log('\nHandling demographic fields (decline to identify)...');
  const declineTerms = ['decline', 'prefer not', "don't wish", 'not wish'];

  const allSelects = await page.locator('select').all();
  for (const sel of allSelects) {
    try {
      const name = await sel.getAttribute('name') || '';
      const id   = await sel.getAttribute('id')   || '';
      // Only touch fields that look like demographic questions (not already handled)
      const isDemographic = /gender|race|ethnicity|veteran|disability|lgbt|sexual|orientation/i.test(name + id);
      if (!isDemographic) continue;
      const options = await sel.evaluate(el =>
        Array.from(el.options).map(o => ({ value: o.value, text: o.text.trim().toLowerCase() }))
      );
      const decline = options.find(o => declineTerms.some(t => o.text.includes(t)));
      if (decline) {
        await sel.selectOption(decline.value);
        console.log(`  ${name || id}: selected "${decline.text}"`);
      }
    } catch {}
  }

  await page.screenshot({ path: '/tmp/instacart-05-pre-submit.png' });
  console.log('Pre-submit screenshot: /tmp/instacart-05-pre-submit.png');

  // ── Submit ─────────────────────────────────────────────────────
  console.log('\nSubmitting application...');
  const submitSelectors = [
    'button[type="submit"]',
    'input[type="submit"]',
    'button:has-text("Submit Application")',
    'button:has-text("Submit")',
    'button:has-text("Apply")',
    '[data-testid="submit-application"]',
  ];
  let submitted = false;
  for (const sel of submitSelectors) {
    try {
      const btn = page.locator(sel).first();
      if (await btn.count() > 0 && await btn.isVisible()) {
        console.log(`  Clicking: ${sel}`);
        await btn.click();
        submitted = true;
        break;
      }
    } catch {}
  }

  if (!submitted) {
    console.log('ERROR: Submit button not found');
    await page.screenshot({ path: '/tmp/instacart-error-no-submit.png' });
    await browser.close();
    process.exit(1);
  }

  // Wait for confirmation
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await page.screenshot({ path: '/tmp/instacart-06-confirmation.png' });

  const url   = page.url();
  const title = await page.title();
  const body  = await page.evaluate(() => document.body.innerText.slice(0, 500));

  console.log('\n=== RESULT ===');
  console.log('URL after submit:', url);
  console.log('Page title:', title);
  console.log('Page text snippet:', body);
  console.log('Screenshot: /tmp/instacart-06-confirmation.png');

  const success = /thank|confirm|received|success|application submitted/i.test(body + title + url);
  console.log(success ? '\nSUCCESS: Application submitted' : '\nUNCERTAIN: Could not confirm submission — check screenshot');

  await browser.close();
  process.exit(success ? 0 : 2);
}

run().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
