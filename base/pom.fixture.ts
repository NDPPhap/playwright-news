import { test as baseTest} from '@playwright/test';
import { HomePage } from '../tests/pom/HomePage.page';

type pages = {
    homePage : HomePage;
}

const testPages = baseTest.extend<pages>({
    homePage: async({page}, use) =>{

    }
})

export const test = testPages;