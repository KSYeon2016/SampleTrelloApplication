import { SampleTrelloApplicationPage } from './app.po';

describe('sample-trello-application App', function() {
  let page: SampleTrelloApplicationPage;

  beforeEach(() => {
    page = new SampleTrelloApplicationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
