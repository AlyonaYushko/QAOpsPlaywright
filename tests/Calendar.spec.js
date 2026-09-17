const {test, expect} = require('@playwright/test');

test('Calendar validations', async ({page}) => {
 
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber,date,year];
    
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
    await page.locator("//abbr[text()='"+date+"']").click();
 
  //   const inputs = await page.locator('.react-date-picker__inputGroup__input');
  //   for (let i = 0; i < await inputs.count(); ++i) {
  //     const rowOrderId = await inputs.nth(i).getAttribute("value");
  //     await expect(await inputs.nth(0).getAttribute("value") ).toEqual(monthNumber);
  //       await expect(await inputs.nth(1).getAttribute("value") ).toEqual(date);
  //       await expect(await inputs.nth(2).getAttribute("value") ).toEqual(year);
  //     console.log("i=" + i);
  //     console.log("rowOrderId=" + rowOrderId);
  //  }
  //   page.pause();


  const inputs = await page.locator('.react-date-picker__inputGroup__input');
  for(let i =0; i<expectedList.length; i++) {
      const value = await inputs.nth(i).inputValue();
      await expect(value).toEqual(expectedList[i]);
  }


});