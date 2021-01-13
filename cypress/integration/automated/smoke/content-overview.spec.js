const { idText, createYield } = require('typescript');

describe('Content Overview Tests', function () {
  beforeEach(() => {
    // Test on the IR20 space.
    cy.visit('/admin/ir20/content');
  });

  context('Can access IR20 content overview', () => {
    it('should include the space in the page title', () => {
      cy.get('h1').contains('Content Overview for the ir20 space');
    });
  });
});
