const { test, expect } = require('@playwright/test');
const ProductListingPage = require('../pages/ProductListingPage');
const TestData = require('../data/TestData');
const TestUtils = require('../utils/TestUtils');

// Production-ready E2E scenario for add-to-cart and checkout.
test.describe('Saucedemo Product Listing and Checkout', () => {
    for(const browserType of ['chromium','firefox']){
        test(`Product add to cart & checkout in ${browserType}`, async ({ page, browserName }, testInfo) => {
            test.skip(browserName !== browserType, `Skip for all but ${browserType}`);
            const utils = new TestUtils(page, testInfo);
            await utils.logStep('Navigating to login...');
            await page.goto('https://www.saucedemo.com/', { waitUntil: 'networkidle', timeout: 50000 });
            await TestUtils.takeScreenshot(page, `${testInfo.outputDir}/before-login-${browserType}.png`);
            await page.fill('#user-name', TestData.username);
            await page.fill('#password', TestData.password);
            await page.click('#login-button');
            await page.waitForSelector('.inventory_list', { timeout: 30000 });
            await TestUtils.takeScreenshot(page, `logged-in-${browserType}.png`);
            const productPage = new ProductListingPage(page);
            await utils.logStep('Add product to cart...');
            await productPage.addFirstProductToCart();
            await productPage.goToCart();
            await utils.logStep('Proceed to checkout...');
            await productPage.proceedToCheckout(TestData.firstName, TestData.lastName, TestData.postalCode);
            await utils.logStep('Finish checkout...');
            await productPage.finishCheckout();
            await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
            await TestUtils.takeScreenshot(page, `${testInfo.outputDir}/thankyou-${browserType}.png`);
        });
    }
});
