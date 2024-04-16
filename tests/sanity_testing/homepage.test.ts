import test, { expect } from "@playwright/test";
import { TestSuiteSetup } from "../hooks/testSuiteSetup.hooks";
import { HomePage } from "../pom/homePage.page";

const testSuiteSetup = new TestSuiteSetup();

test.describe('Sanity Testing - Home Page', () => {
    test.beforeAll(async () => {
        await testSuiteSetup.beforeAll();
    });

    test('Verify that user can open the Home Page successfully', async () => {
        const homePage = new HomePage(testSuiteSetup.getPage());
        await homePage.goto();
        await expect(homePage.logo).toBeVisible();
    })
    
    test.afterAll(async () => {
        await testSuiteSetup.afterAll();
    });
});

