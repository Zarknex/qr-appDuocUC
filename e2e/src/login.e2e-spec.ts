import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('Prueba página "Login"', () => {
  let page: AppPage;
  beforeEach(() => {
    page = new AppPage();
  });

  it('Validar error login vacio.', async () => {
    await browser.get('/login');
    await browser.driver.sleep(500);
    await element(by.id('btnSignIn')).click();
    const error = element(by.id('passErr'));

    expect(await error.getText()).toEqual('Ingresa una contraseña.');
  });
});
