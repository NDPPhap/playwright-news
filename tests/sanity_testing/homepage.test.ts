import { test, expect } from "@playwright/test";
// import { test, expect } from "../../base/pom.fixture"
import { TestSuiteSetup } from "../hooks/testSuiteSetup.hooks";
import { HomePage } from "../pom/homePage.page";

test.describe('Sanity Testing - Home Page', () => {
    let testSuiteSetup: TestSuiteSetup;
    let homePage: HomePage;
    test.beforeAll(async ({ }, testInfo) => {
        testSuiteSetup = new TestSuiteSetup();
        const projectName = testInfo.project.name;
        await testSuiteSetup.beforeAll(projectName);
        homePage = new HomePage(testSuiteSetup.getPage());
    });

    test.beforeEach(async () => {
        await homePage.goto();
    });

    test.use({ viewport: { width: 1920, height: 1080 } });
    test('Verify that user can open the Home Page successfully', async () => {
        await expect(homePage.logo).toBeVisible();
    });

    test('Verify that the Home Page Menu should be focused', async () => {
        await expect(homePage.homeMenu).toHaveCSS('border-bottom', /\dpx solid rgb\(68, 199, 244\)/);
    });

    test('Verify that the banner should be displayed', async () => {
        await expect(homePage.banner).toBeInViewport();
    });

    test('Verify that the page navigates to the Highlights section when the user selects the Highlights menu', async () => {
        await homePage.clickOnHighLightsMenu();
        await expect(homePage.highlightsTitle).toBeInViewport();
    });

    test('Verify that the back to top button should be displayed when user scroll down', async () => {
        await homePage.clickOnHighLightsMenu();
        await expect(homePage.backToTopButton).toBeInViewport();
    });

    test('Verify that user can view the detail of Moderator & Speaker', async () => {
        const info = await homePage.getInformationOfModerator(0);
        await homePage.clickOnAModerator(0);
        const isPassed = await homePage.checkInformationOfModerator(0, info);
        expect(isPassed).toBeTruthy();
    });

    test('Verify that user can view the detail of partner', async () => {
        await homePage.clickOnAPartnerLogo(0);
        await expect(homePage.detailPartner.nth(0)).toBeInViewport();
    });

    test.afterAll(async () => {
        await testSuiteSetup.afterAll();
    });
});