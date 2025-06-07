import { test, expect } from '@playwright/test';

test('network dropdown changes value', async ({ page }) => {
  await page.goto('/wallet');
  const select = page.getByRole('combobox');
  await expect(select).toBeVisible();
  const options = await select.locator('option').all();
  if (options.length > 1) {
    await select.selectOption(options[1]);
    await expect(select).toHaveValue(await options[1].getAttribute('value'));
  }
});
