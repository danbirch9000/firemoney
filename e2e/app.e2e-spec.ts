import { FiremoneyPage } from './app.po';

describe('firemoney App', function() {
  let page: FiremoneyPage;

  beforeEach(() => {
    page = new FiremoneyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
