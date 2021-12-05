//toast-message
import { AppPage } from './app.po';
import { browser, by, element, ExpectedConditions } from 'protractor';

describe('Prueba página "password-reset"', () => {
    let page: AppPage;
    beforeEach(() => {
        page = new AppPage();
    });

    it('Prueba de Toast al ingresar usuario para recuperar contraseña.', async () => {
    await browser.get('/login');
        await browser.driver.sleep(500);
        await element(by.id('btnReset')).click();
        await element(by.id('userR')).sendKeys('ma.donosoo');
        await browser.driver.sleep(500);
        await element(by.id('btnResetP')).click();
        const x = element(by.css('.mytoast'));
        expect(await x.getText()).toEqual('Se han enviado las instrucciones a su correo electronico.');
    });
});
