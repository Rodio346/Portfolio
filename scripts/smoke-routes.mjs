import { chromium } from 'playwright';

const base = process.env.SMOKE_BASE_URL || 'http://127.0.0.1:4173/Porfolio/';

const requiredChecks = [
  { path: '', selector: 'h1', text: 'Choose your path.' },
  { path: 'professional/', selector: 'h1', text: 'Vishal' },
  { path: 'about-me/', selector: 'h1', text: 'Vishal Yadav.' },
];

const browser = await chromium.launch();
const page = await browser.newPage();

try {
  for (const check of requiredChecks) {
    const url = new URL(check.path, base).toString();
    const response = await page.goto(url, { waitUntil: 'domcontentloaded' });
    if (!response || !response.ok()) {
      throw new Error(`Route failed: ${url} (status ${response?.status() ?? 'no response'})`);
    }
    await page.waitForSelector(check.selector, { timeout: 5000 });
    const content = await page.textContent(check.selector);
    if (!content || !content.includes(check.text)) {
      throw new Error(`Unexpected content at ${url}. Expected "${check.text}" in ${check.selector}.`);
    }
  }
  console.log('smoke routes passed.');
} finally {
  await browser.close();
}
