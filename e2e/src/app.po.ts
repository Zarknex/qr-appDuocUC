import { browser, by, element } from 'protractor';

export class AppPage {

  navigateTo(s: string) {
    return browser.get(browser.baseUrl + s);
  }
}
