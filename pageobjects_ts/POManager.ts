import {LoginPage} from './LoginPage';
import {DashboardPage} from './DashboardPage';
import {CartPage} from './CartPage';
import { OrdersHistoryPage} from './OrdersHistoryPage';
import {OrdersReviewPage} from './OrdersReviewPage';
import {Page} from '@playwright/test';

export class POManager {
    loginPage: LoginPage;
    dashboardPage : DashboardPage;
    cartPage:CartPage;
    ordersHistoryPage : OrdersHistoryPage;
    ordersReviewPage : OrdersReviewPage;
    page:Page;

    constructor(page : any) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);
        this.ordersReviewPage = new OrdersReviewPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }
    getCartPage() {
        return this.cartPage;
    }
    getOrdersHistoryPage() {
        return this.ordersHistoryPage;
    }

    getOrdersReviewPage() {
        return this.ordersReviewPage;
    }
}