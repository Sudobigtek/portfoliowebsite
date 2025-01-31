const { test, expect } = require('@playwright/test');

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate through main pages', async ({ page }) => {
    // Check home page
    await expect(page).toHaveTitle(/Professional Model/);
    
    // Navigate to Portfolio
    await page.click('text=Portfolio');
    await expect(page).toHaveURL(/.*portfolio/);
    await expect(page.locator('h1')).toContainText(/Portfolio/i);

    // Navigate to About
    await page.click('text=About');
    await expect(page).toHaveURL(/.*about/);
    await expect(page.locator('h1')).toContainText(/About/i);

    // Navigate to Contact
    await page.click('text=Contact');
    await expect(page).toHaveURL(/.*contact/);
    await expect(page.locator('h1')).toContainText(/Contact/i);
  });

  test('should toggle dark mode', async ({ page }) => {
    // Find and click dark mode toggle
    const darkModeButton = page.locator('button[aria-label="toggle dark mode"]');
    await darkModeButton.click();
    
    // Check if dark mode is applied
    await expect(page.locator('body')).toHaveAttribute('data-theme', 'dark');
    
    // Toggle back to light mode
    await darkModeButton.click();
    await expect(page.locator('body')).toHaveAttribute('data-theme', 'light');
  });

  test('should have working social links', async ({ page }) => {
    // Check Instagram link
    const instagramLink = page.locator('a[aria-label="Instagram"]');
    await expect(instagramLink).toHaveAttribute('href', /instagram\.com/);
    await expect(instagramLink).toHaveAttribute('target', '_blank');

    // Check Facebook link
    const facebookLink = page.locator('a[aria-label="Facebook"]');
    await expect(facebookLink).toHaveAttribute('href', /facebook\.com/);
    await expect(facebookLink).toHaveAttribute('target', '_blank');

    // Check LinkedIn link
    const linkedinLink = page.locator('a[aria-label="LinkedIn"]');
    await expect(linkedinLink).toHaveAttribute('href', /linkedin\.com/);
    await expect(linkedinLink).toHaveAttribute('target', '_blank');
  });
}); 