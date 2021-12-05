import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('Prueba página "Home"', () => {
    let page: AppPage;
    beforeEach(() => {
        page = new AppPage();
    });

    it('Prueba de persistencia en Home.', async () => {
    await browser.get('/login');
        await element(by.id('inputuser')).sendKeys('ma.donosoo');
        await element(by.id('inputpass')).sendKeys('donoso123');
        await browser.driver.sleep(500);
        await element(by.id('btnSignIn')).click();
        const x = element(by.id('Bienvenida'));

        expect(await x.getText()).toEqual('Bienvenid@ ma.donosoo');
    });
});
