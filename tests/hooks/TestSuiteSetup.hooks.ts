import { chromium, Browser, BrowserContext, Page } from 'playwright'

export class TestSuiteSetup {
    private browser: Browser;
    private context: BrowserContext;
    private page: Page;

    async beforeAll() {
        this.browser = await chromium.launch();
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();

        // this.page.goto('/');
    }

    async afterAll(){
        this.browser.close();
    }

    getBrowser(): Browser {
        return this.browser;
    }

    getContext(): BrowserContext {
        return this.context;
    }

    getPage(): Page {
        return this.page;
    }
}