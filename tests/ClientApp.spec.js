const {test, expect} = require('@playwright/test');
const { log } = require('console');


test('Browser Context Playwright test', async ({page})=>
{
    const email = "anshika@gmail.com";
    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");
    page.goto("https://rahulshettyacademy.com/client/");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await page.getByRole('button', {name: 'Login'}).click();

     await page.waitForLoadState('networkidle');
     await page.locator(".card-body b").first().waitFor();
    
    await page.locator(".card-body")
    .filter({hasText: productName})
    .getByRole('button', {name: "Add to Cart"})
    .click();
    
     
    await page.getByRole("listitem").getByRole("button", {name: 'Cart'}).click();

    // const titles = await page.locator(".card-body b").allTextContents();
    // console.log(titles);

    // const count = await products.count();
    // console.log("count= " + count);


    // for (let i = 0; i < count; i++) {
    //     console.log("i = " + i + "nth =" + await products.nth(i).locator("b").textContent() );
    //     if(await products.nth(i).locator("b").textContent()===productName){
    //         //add to cart
    //          console.log("Adding to cart...");
    //         await products.nth(i).locator("text= Add To Cart").click();
    //         break;
    //     }
    // }
   // await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();

    await expect(page.getByText(productName)).toBeVisible();
    //const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    //expect(bool).toBeTruthy();

    await page.getByRole("button", {name: "Checkout"}).click();
    //await page.locator("text='Checkout'").click();
    
    await page.getByPlaceholder("Select Country").pressSequentially("ind", { delay: 150 });
    //await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
   

    await page.getByRole("button", {name:"India"}).nth(1).click();
   
    // const dropdown = page.locator(".ta-results");
    // await dropdown.waitFor();
    // const optionsCount = await dropdown.locator("button").count();
    // for(let i=0;i<optionsCount;++i){
    //     const text= await dropdown.locator("button").nth(i).textContent();
    //     if(text.trim()==="India")
    //     {
    //         await dropdown.locator("button").nth(i).click();
    //         break;
    //     }
    // }
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   
   await page.getByText("PLACE ORDER").click();
    //await page.locator(".action__submit").click();
    
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
    //await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    // console.log(orderId);
    // await page.pause();


// copy-pased
     await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
