const BasePage = require('../utils/BasePage');

class ProductListingPage extends BasePage {
    constructor(page) {
        super(page);
        this.locators = {
            inventoryItem: '.inventory_item',
            addToCartBtn: '.inventory_item button',
            cartIcon: 'a.shopping_cart_link',
            checkoutBtn: '#checkout',
            firstName: '#first-name',
            lastName: '#last-name',
            postalCode: '#postal-code',
            continueBtn: '#continue',
            finishBtn: '#finish',
        };
    }

    async addFirstProductToCart() {
        await this.waitForSelector(this.locators.addToCartBtn);
        await this.page.click(this.locators.addToCartBtn);
    }

    async goToCart() {
        await this.waitForSelector(this.locators.cartIcon);
        await this.page.click(this.locators.cartIcon);
    }

    async proceedToCheckout(firstName, lastName, postalCode) {
        await this.waitForSelector(this.locators.checkoutBtn);
        await this.page.click(this.locators.checkoutBtn);
        await this.waitForSelector(this.locators.firstName);
        await this.page.fill(this.locators.firstName, firstName);
        await this.page.fill(this.locators.lastName, lastName);
        await this.page.fill(this.locators.postalCode, postalCode);
        await this.page.click(this.locators.continueBtn);
    }

    async finishCheckout() {
        await this.waitForSelector(this.locators.finishBtn);
        await this.page.click(this.locators.finishBtn);
    }
}

module.exports = ProductListingPage;
