import { test, expect } from '@playwright/test';

test('wallet connect modal opens', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /connect wallet/i }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
});
