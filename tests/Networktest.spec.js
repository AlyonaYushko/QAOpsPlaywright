const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');
const { log } = require('console');

const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6a3ba8c6378febeacdc95c1d" }] };
const fakePayloadOrders = { data: [], message: "No Orders" };

let response;

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
    //

});


test.beforeEach(() => {

});

test('Place the order test', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            //intercepting response - API response ->{playwright fakeresponse } -> Browser -> render data on front end
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadOrders);
            route.fulfill(
                {
                    response,
                    body,
                });
        });
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());
});

//Verify if order created is showing in history page
// precondition - create order  - 
