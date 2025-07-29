const fs = require('fs');

class TestUtils {
    constructor(page, testInfo) {
        this.page = page;
        this.testInfo = testInfo;
    }
    async logStep(msg) {
        // Timestamped logging with context
        let browser = (this.page.context && this.page.context().browser && typeof this.page.context().browser === 'function') ? this.page.context().browser()._name : 'unknown_browser';
        console.log(`[${new Date().toISOString()}][${browser}] ${msg}`);
    }
    static async takeScreenshot(page, filename) {
        try {
            await page.screenshot({ path: filename, fullPage: true });
            console.log(`[Screenshot captured]: ${filename}`);
        } catch (err) {
            console.error(`[Screenshot error]: ${filename} ${err.message}`);
        }
    }
    static async retry(fn, retries = 2, msg = '') {
        for(let i=0; i<=retries; i++){
            try { return await fn(); }
            catch(err) {
                if(i===retries) throw new Error(`${msg} (Retries exhausted): ${err.message}`);
                await new Promise(res=>setTimeout(res,800));
            }
        }
    }
    async waitForSelector(sel, opts={timeout:30000, state:'visible'}){
        try{
            await this.page.waitForSelector(sel, opts);
        } catch (err){
            await this.constructor.takeScreenshot(this.page, `${this.testInfo.outputDir}/error-waitForSelector.png`);
            throw err;
        }
    }
}
module.exports = TestUtils;
