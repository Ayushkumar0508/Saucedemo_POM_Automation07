class BasePage {
    constructor(page) { this.page = page; }
    async waitForSelector(sel, opts={timeout:30000, state:'visible'}) {
        await this.page.waitForSelector(sel, opts);
    }
}
module.exports = BasePage;
