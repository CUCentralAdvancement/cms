const { idText, createYield } = require('typescript');

describe('Content Overview Tests', function () {
  it('Can access IR20 content overview', () => {
    cy.visit('/admin/ir20/content');
    cy.get('h1').contains('Content Overview for the ir20 space');
  });
});
