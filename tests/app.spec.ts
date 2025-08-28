// tests/app.spec.ts
import { test, expect } from '@playwright/test';

test('should navigate to Server Comp page and see mocked data', async ({ page }) => {
  // 1. Start at the home page
  await page.goto('/');

  // 2. Find the link with the name "Server Comp" and click it
  await page.getByRole('link', { name: 'Server Comp' }).click();

  // 3. Assert that the new page's URL is what we expect
  await expect(page).toHaveURL('/server-comp');

  // 4. Find the <p> element and assert it contains the correct text
  const paragraph = page.getByText('Server Components are able to fetch data independently.');

  // 5. Wait for the element to be visible and check its content
  await expect(paragraph).toBeVisible();
});