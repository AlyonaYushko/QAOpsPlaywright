const { test, expect } = require('@playwright/test');
const ExcelJS = require('exceljs');

async function writeExcelTest(searchText, replaceText, change, filePath) {

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);

    if ((output.row != -1) && (output.column != -1)) {
        const cell = worksheet.getCell(output.row, output.column+change.columnChange);
        cell.value = replaceText;
        await workbook.xlsx.writeFile(filePath);
    }

}

async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
                console.log(searchText);
            }
        })
    })
    return output;
}

test("Upload download excel validation", async ({ page }) => {
    const searchText = "Mango";
    const updateValue = "450";
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    await downloadPromise;
    writeExcelTest(searchText, updateValue, { rowChange: 0, columnChange: 2 }, "C:/Users/Alyona/Downloads/download.xlsx");

    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:/Users/Alyona/Downloads/download.xlsx");
    const textLocator = page.getByText(searchText);
    const desiredRow = await page.getByRole('row').filter({has :textLocator});
    await expect (desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
});