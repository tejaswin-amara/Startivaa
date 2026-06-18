import { test, expect } from '@playwright/test';

/**
 * Verify Edge Middleware protection for `/admin` routes.
 * When the `sv_session` cookie is missing, the request should be redirected
 * to the home page (`/`).
 */
test('admin middleware redirects unauthenticated users to home', async ({ page }) => {
  // No authentication cookie
  await page.goto('/admin');
  // Playwright follows redirects automatically; ensure we land on home
  await expect(page).toHaveURL('/');
  // Verify the page title confirms we're on the homepage
  await expect(page).toHaveTitle(/Startivaa/i);
});
