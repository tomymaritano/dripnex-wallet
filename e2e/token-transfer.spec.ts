import { test, expect } from '@playwright/test';

test('transfer form validates input', async ({ page }) => {
  await page.goto('/wallet');
  await expect(page.getByText('Wallet Center')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Send' })).toBeDisabled();
});
