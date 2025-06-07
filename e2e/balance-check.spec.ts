import { test, expect } from '@playwright/test';

test('balance text visible on wallet page', async ({ page }) => {
  await page.goto('/wallet');
  await expect(page.getByText(/balance/i)).toBeVisible();
});
