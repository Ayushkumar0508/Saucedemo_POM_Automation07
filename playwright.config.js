// Playwright configuration for robust Saucedemo POM tests
/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = {
    testDir: './tests',
    fullyParallel: true,
    workers: 2,
    timeout: 50000,
    expect: { timeout: 10000 },
    use: {
        headless: false,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 30000,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        video: 'retain-on-failure',
        baseURL: 'https://www.saucedemo.com',
        launchOptions: { slowMo: 500 },
    },
    projects: [
        { name: 'chromium', use: { browserName: 'chromium' } },
        { name: 'firefox', use: { browserName: 'firefox' } }
    ],
    reporter: [ [ 'html', { open: 'on-end' } ], [ 'list' ] ]
};
