import { TextDirectPage } from './app.po';

describe('text-direct App', () => {
  let page: TextDirectPage;

  beforeEach(() => {
    page = new TextDirectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
