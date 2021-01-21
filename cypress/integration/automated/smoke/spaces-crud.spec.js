describe('Spaces CRUD Operation Tests', function () {
  // beforeEach(() => {
  //   // Test on the IR20 space.
  //   cy.visit('/admin/ir20/content');
  // });

  xit('should be able to create, edit, and delete a space', () => {
    cy.visit('/');
    cy.contains('Login!!').click();
    cy.contains('Sign in with Auth0').click();

    cy.get('input[name="email"]').type('john@doe.com');
    cy.get('input[name="password"]').type('JohnDoe1234!');
    cy.get('button[name="submit"]').click();

    cy.get('a[href="/admin/spaces"]').contains('Spaces').click();

    // @todo This gets stuck on a previous h1 due to page transition
    // but no h1 swap. I think just .innerHTML.
    // So, the page loading/animations and all should be looked at.
    // Otherwise, there has to be cy.wait() commands or other workarounds.
    cy.get('h1').contains('Spaces Admin');
  });
});
