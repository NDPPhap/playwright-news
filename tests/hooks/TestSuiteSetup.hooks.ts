import { chromium, webkit, firefox, Browser, BrowserContext, Page } from 'playwright'

export class TestSuiteSetup {
    private browser: Browser;
    private context: BrowserContext;
    private page: Page;

    async beforeAll(projectName: string) {
        switch (projectName) {
            case 'chromium':
                this.browser = await chromium.launch();
                break;
            case 'firefox':
                this.browser = await firefox.launch();
                break;
            case 'webkit':
                this.browser = await webkit.launch();
                break;
            default:
                console.log('Fucking error')
                break;
        }

        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
    }

    async afterAll() {
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