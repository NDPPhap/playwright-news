import { BrowserContext, Locator, Page } from "@playwright/test";

export class AlbumPage {
    readonly albumTitle: Locator;

    constructor(page: Page) {
        this.albumTitle = page.locator('css=.ts-album-list__title span');
    }

    async getDetailTitle(): Promise<string> {
        const title = await this.albumTitle.innerText();
        return title;
    }
}