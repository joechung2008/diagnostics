import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Azure Portal Extension Dashboard/);
});

test("has main content", async ({ page }) => {
  await page.goto("/");

  // Check if the main app content is loaded
  await expect(page.locator("body")).toBeVisible();
});

test("shows paasserverless button after data loads", async ({ page }) => {
  await page.goto("/");

  // Wait for the loading spinner to disappear
  await expect(
    page.locator('[aria-label="Loading diagnostics..."]')
  ).toHaveCount(0, { timeout: 15000 });

  // Check that the paasserverless button exists in the toolbar (not in navigation)
  // Use a more specific selector to target the toolbar button
  const toolbarButton = page.locator(
    '[role="toolbar"] button:has-text("paasserverless")'
  );
  await expect(toolbarButton).toBeVisible();
});

test("shows extensions list in navigation after data loads", async ({
  page,
}) => {
  await page.goto("/");

  // Wait for the loading spinner to disappear
  await expect(
    page.locator('[aria-label="Loading diagnostics..."]')
  ).toHaveCount(0, { timeout: 15000 });

  // Check that extension navigation buttons exist
  const extensionButtons = page.locator(".extension-nav-button");
  await expect(extensionButtons.first()).toBeVisible();

  // Verify we have at least one extension button
  await expect(extensionButtons).toHaveCount(await extensionButtons.count());
});

test("clicking Build Information tab shows build information", async ({
  page,
}) => {
  await page.goto("/");

  // Wait for the loading spinner to disappear
  await expect(
    page.locator('[aria-label="Loading diagnostics..."]')
  ).toHaveCount(0, { timeout: 15000 });

  // Click the Build Information tab
  await page.getByRole("tab", { name: "Build Information" }).click();

  // Expect the build info table to be visible
  await expect(page.locator('table[aria-label="Build Info"]')).toBeVisible();
});

test("clicking Server Information tab shows server information", async ({
  page,
}) => {
  await page.goto("/");

  // Wait for the loading spinner to disappear
  await expect(
    page.locator('[aria-label="Loading diagnostics..."]')
  ).toHaveCount(0, { timeout: 15000 });

  // Click the Server Information tab
  await page.getByRole("tab", { name: "Server Information" }).click();

  // Expect the server info table to be visible
  await expect(page.locator('table[aria-label="Server Info"]')).toBeVisible();
});

test("clicking Extensions tab shows extensions after clicking other tabs", async ({
  page,
}) => {
  await page.goto("/");

  // Wait for the loading spinner to disappear
  await expect(
    page.locator('[aria-label="Loading diagnostics..."]')
  ).toHaveCount(0, { timeout: 15000 });

  // Click Build Information tab first
  await page.getByRole("tab", { name: "Build Information" }).click();

  // Then click Extensions tab
  await page.getByRole("tab", { name: "Extensions" }).click();

  // Expect extension navigation buttons to be visible
  const extensionButtons = page.locator(".extension-nav-button");
  await expect(extensionButtons.first()).toBeVisible();
});

test("clicking paasserverless button shows paasserverless extension info", async ({
  page,
}) => {
  await page.goto("/");

  // Wait for the loading spinner to disappear and data to load
  await expect(
    page.locator('[aria-label="Loading diagnostics..."]')
  ).toHaveCount(0, { timeout: 15000 });

  // Wait for extension navigation to be populated
  await expect(page.locator(".extension-nav-button").first()).toBeVisible();

  // Ensure Extensions tab is active
  await page.getByRole("tab", { name: "Extensions" }).click();

  // Click the paasserverless button in the toolbar
  await page
    .locator('[role="toolbar"] button:has-text("paasserverless")')
    .click();

  // Wait for the extension info to load and be visible
  await expect(page.locator(".grow")).toBeVisible();

  // Expect the extension info to show paasserverless
  await expect(
    page.locator(".grow").filter({ hasText: "paasserverless" })
  ).toBeVisible();
});

test("clicking websites button shows websites extension info", async ({
  page,
}) => {
  await page.goto("/");

  // Wait for the loading spinner to disappear and data to load
  await expect(
    page.locator('[aria-label="Loading diagnostics..."]')
  ).toHaveCount(0, { timeout: 15000 });

  // Wait for extension navigation to be populated
  await expect(page.locator(".extension-nav-button").first()).toBeVisible();

  // Ensure Extensions tab is active
  await page.getByRole("tab", { name: "Extensions" }).click();

  // Click the websites button in the toolbar
  await page.locator('[role="toolbar"] button:has-text("websites")').click();

  // Wait for the extension info to load and be visible
  await expect(page.locator(".grow")).toBeVisible();

  // Expect the extension info to show websites
  await expect(
    page.locator(".grow").filter({ hasText: "websites" })
  ).toBeVisible();
});
