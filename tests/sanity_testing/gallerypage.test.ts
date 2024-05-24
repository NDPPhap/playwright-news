 import { test, expect } from "@playwright/test";
import { TestSuiteSetup } from "../hooks/testSuiteSetup.hooks";
import { GalleryPage } from "../pom/GalleryPage.page";
import { HomePage } from "../pom/homePage.page";
import { AlbumPage } from "../pom/AlbumPage.page";

test.describe('Sanity Testing - Gallery Page', () => {
    let testSuiteSetup: TestSuiteSetup;
    let homePage: HomePage;
    let galleryPage: GalleryPage;
    test.beforeAll(async ({ }, testInfo) => {
        testSuiteSetup  = new TestSuiteSetup();
        const projectName = testInfo.project.name;
        await testSuiteSetup.beforeAll(projectName);
        homePage = new HomePage(testSuiteSetup.getPage());
        galleryPage = new GalleryPage(testSuiteSetup.getPage());
    })

    test.beforeEach(async () => {
        await homePage.goto();
        await galleryPage.gotoGalleryPage();
    }) 
    
    test.use({ viewport: { width: 1920, height: 1080 } });
    // test('Verify that user can open the Gallery Page successfully', async () => {
    //     await expect(galleryPage.galleryTitle).toBeVisible();
    // })

    // test('Verify that Gallery Menu should be focused', async () => {
    //     await expect(galleryPage.galleryMenu).toHaveCSS('border-bottom', /\dpx solid rgb\(68, 199, 244\)/);
    // })
    
    test('Verify that user can open detail of album', async () => {
        
        const title = await galleryPage.getTitleOfAlbumItem(0);
        const newTab = await galleryPage.clickOnFirstAlbumItem();
        const albumPage = new AlbumPage(newTab);
        const detailTitle = await albumPage.getDetailTitle();
        console.log(title,'  ', detailTitle)
        expect(title).toEqual(detailTitle);
    })
})