import { SurveysClientPage } from './app.po';

describe('surveys-client App', () => {
  let page: SurveysClientPage;

  beforeEach(() => {
    page = new SurveysClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
