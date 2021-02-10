describe('Spaces CRUD Operation Tests', function () {
  // beforeEach(() => {
  //   // Test on the IR20 space.
  //   cy.visit('/admin/ir20/content');
  // });

  xit('should be able to edit, a space', () => {
    cy.visit('/');
    cy.contains('Login!!').click();
    cy.contains('Sign in with Auth0').click();

    // @todo This only works since the previous login test produces a
    // are you "John Doe?" second login flow.
    cy.get('a.auth0-lock-social-button').click();

    cy.get('a[href="/admin/spaces"]').contains('Spaces').click();

    cy.get('h1[data-testid="spaces-admin-heading"]').contains('Spaces Admin');

    cy.get('div[data-testid="card-space_place"]').within(() => {
      cy.contains('Space Is The Place');
      cy.contains('Edit').click();
    });

    cy.get('h1[data-testid="create-space-heading"]').contains('Create A Space');
    cy.get('input[name="spaceLabel"]').type('Space Is The Place');
    cy.get('input[name="spaceKey"]').type('space_place');

    // @todo Add color when fixed.

    // Add image via Cloudinary widget.
    // This involves an iframe and creation happens via API anyway...and will be in config later.
    // @todo This test can be used for content creation instead.
    // cy.get('button#upload_widget').click();

    cy.get('input[name="spaceActive"]').check();
    cy.get('textarea[name="spaceMembers"]').type(',john@doe.com');
    cy.get('button[data-testid="create-space-button"]').click();

    cy.url().should('eq', 'http://localhost:3000/admin/spaces');

    cy.contains('**You cannot edit the key after creating the space.');
    cy.get('button[data-testid="delete-space-button"]').click();

    cy.contains('Are you sure you want to delete the "space_place" space?');
    cy.get('button[data-testid="delete-space-button"]').click();

    cy.get('div[data-testid="card-space_place"]').should('not.exist');

    cy.get('button[data-testid="logout-button"]').click();
    cy.contains('Are you sure you want to sign out?');
    cy.get('button[type="submit"]').click();
  });
});
