class LoginPage {

    constructor(page) {
        this.signInbutton = page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.page = page;
    }

    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }
    async validLogin(username, password)
    {
        await this.userName.type(username);
        await this.password.type(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports ={LoginPage};