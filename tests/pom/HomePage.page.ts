import { type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly homeMenu: Locator;
    readonly highlightsMenu: Locator;
    readonly moderatorsSpeakers: Locator;
    readonly partnerLogo: Locator;

    // Expecting element
    readonly logo: Locator;
    readonly banner: Locator;
    readonly highlightsTitle: Locator;
    readonly moderatorsTitle: Locator;
    readonly backToTopButton: Locator;

    readonly moderatorName: Locator;
    readonly moderatorRole: Locator;
    readonly detailModeratorName: Locator;
    readonly detailModeratorRole: Locator;

    readonly detailPartner: Locator

    constructor(page: Page) {
        this.page = page;
        this.homeMenu = page.locator('xpath=//a[text()="Home"]/..');
        this.highlightsMenu = page.locator('xpath=//a[text()="Highlights"]/..');
        this.moderatorsSpeakers = page.locator('xpath=//a[text()="Moderators & Speakers"]/..');
        this.partnerLogo = page.locator('css=.ts-partner__eo-logos img');

        this.logo = page.locator('css=div.header img');
        this.banner = page.locator('css=div.ts-banner-wrapper');
        this.highlightsTitle = page.locator('css=#highlights h2');
        this.moderatorsTitle = page.locator('css=#moderator h2');
        this.backToTopButton = page.locator('css=a.btn-top');

        this.moderatorName = page.locator('css=#moderator span.ts-moderator__album-photo--name');
        this.moderatorRole = page.locator('css=#moderator span.ts-moderator__album-photo--title');
        this.detailModeratorName = page.locator('css=div.modal-body h3.modal__title--description-name');
        this.detailModeratorRole = page.locator('css=div.modal-body span.modal__title--description-title');

        this.detailPartner = page.locator('css=.modal-content.modal-lg ')
    }

    async goto() {
        await this.page.goto('/');
    }

    async clickOnHighLightsMenu() {
        await this.highlightsMenu.click();
    }

    async clickOnModeratorsAndSpeakersMenu() {
        await this.moderatorsSpeakers.click();
    }

    async getInformationOfModerator(index: number): Promise<string[]> {
        const name = await this.moderatorName.nth(index).innerText();
        let role = await this.moderatorRole.nth(index).innerText();
        role = role.replace(/\n/g, ' ');
        return [name, role];
    }

    async clickOnAModerator(index: number) {
        await this.moderatorName.nth(index).click();
    }

    async checkInformationOfModerator(index: number, info: string[]): Promise<boolean> {
        const detailName = (await this.detailModeratorName.nth(index).innerText()).trim();
        const detailRole = (await this.detailModeratorRole.nth(index).innerText()).trim();
        let flag = false;
        if (info[0] == detailName && info[1] == detailRole) {
            flag = true;
        }
        return flag;
    }

    async clickOnAPartnerLogo(index: number) {
        await this.partnerLogo.nth(index).click();
    }
}