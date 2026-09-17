import {test, expect, Locator, Page} from '@playwright/test';
import {customtest} from '../utils_ts/test-base';
import { POManager } from '../pageobjects_ts/POManager';
const dataSet = JSON.parse(JSON.stringify(require("../utils_ts/placeorderTestData.json")));


for(const data of dataSet)
{
test(`@Web Client App Login for ${data.productName}`, async ({ page}) => {
    //products : Locator = page.locator(".card-body");
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage()
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();
    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    let orderId:any;
    orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});
}

customtest('Client App Login', async ({ page, testDataForOrder }) => {

    const products = page.locator(".card-body");
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage()
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();
    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();
});

