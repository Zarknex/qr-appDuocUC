import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('Prueba página "notfound"', () => {
    let page: AppPage;
    beforeEach(() => {
        page = new AppPage();
    });

    it('Prueba de Error 404 intentando entrar a "/admin"', async () => {
        await browser.get('/admin');
        await browser.driver.sleep(1000);
        const error = element(by.id('title404'));

        expect(await error.getText()).toEqual('ERROR 404');
    });
});
