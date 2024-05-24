import { BrowserContext, Locator, Page } from "@playwright/test";

export class GalleryPage {
    readonly page: Page;
    readonly galleryMenu: Locator;
    readonly galleryTitle: Locator;
    readonly albumItems: Locator;
    readonly albumTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.galleryMenu = page.locator('xpath=//a[text()="Gallery"]/..');
        this.galleryTitle = page.locator('css=h2.ts-accordion__title');
        this.albumItems = page.locator('css=.ts-album__item a');
        this.albumTitle = page.locator('css=.ts-album__item span');
    }
    async gotoGalleryPage() {
        await this.galleryMenu.click();
    }
    
    async getTitleOfAlbumItem(index: number): Promise<string> {
        return this.albumTitle.nth(index).innerText();
    }
    async clickOnFirstAlbumItem() : Promise<Page> {
        const [newTab] = await Promise.all(
            [
                this.page.waitForEvent('popup'),
                await this.albumItems.first().click()
            ]
        )
        return newTab;
    }
}