import { FinanceClientSidePage } from './app.po';

describe('finance-client-side App', function() {
  let page: FinanceClientSidePage;

  beforeEach(() => {
    page = new FinanceClientSidePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
