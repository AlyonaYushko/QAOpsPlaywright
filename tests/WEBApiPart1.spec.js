const { test, expect, request } = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const { log } = require('console');

const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6a3ba8c6378febeacdc95c1d" }] };
let response;

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
    //
   
});


test.beforeEach(() => {

});

test('@API Place the order test', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");


    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});

//Verify if order created is showing in history page
// precondition - create order  - 
