import {expect, Locator, Page} from '@playwright/test';

export class DashboardPage {

    page:Page;
    products: Locator;
    productsText: Locator;
    cart: Locator;
    orders: Locator;

    constructor(page: Page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
    }

    async navigateToCart() {
        await this.cart.click()
    }

    async navigateToOrders() {
        await this.orders.click();
    }

    async searchProductAddCart(productName: string) {
        await this.productsText.nth(0).waitFor({ state: 'visible' });
        const titles = await this.productsText.allTextContents();
        console.log(titles);
        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                //add to cart
                await expect(this.products.nth(i).locator("text= Add To Cart")).toBeEnabled();
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

}
