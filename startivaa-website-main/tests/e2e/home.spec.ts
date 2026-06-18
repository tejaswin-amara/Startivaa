import { test, expect } from '@playwright/test';

/**
 * Core home page sanity checks.
 * - Page loads and returns a 200 status.
 * - Title contains "Startivaa".
 * - Hero section mounts with the real tagline from Hero.tsx.
 */
test.describe('Home Page Smoke Tests', () => {
  test('page loads with correct title', async ({ page }) => {
    const response = await page.goto('/');
    // Verify HTTP 200
    expect(response?.status()).toBe(200);

    // Verify page title contains "Startivaa"
    await expect(page).toHaveTitle(/Startivaa/i);
  });

  test('hero section renders tagline', async ({ page }) => {
    await page.goto('/');

    // Wait for the main content to be present
    await page.waitForSelector('main', { timeout: 15_000 });

    // The actual Hero h1 text: "We Build Startups. We Build Futures."
    const tagline = page.getByText('We Build Futures.');
    await expect(tagline).toBeVisible({ timeout: 15_000 });
  });
});
