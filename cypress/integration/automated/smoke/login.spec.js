describe('Basic Authentication Tests', function () {
  // it('Tests custom cy.login command', function () {
  //   cy.visit('/user');
  //   cy.login('administrator');
  //   cy.contains('Account Info').click();
  //   cy.get('.page-title').contains('administrator');
  //
  //   cy.login('content_admin');
  //   cy.visit('/user');
  //   cy.contains('Account Info').click();
  //   cy.get('.page-title').contains('content_admin');
  // });

  it('Gets redirected from user to login page if unauthenticated', function () {
    cy.visit('/admin', { failOnStatusCode: false });

    cy.get('h1').contains('Hello, and welcome to the CMS!');
  });

  // xit('Fails to login with name and password', function () {
  //   cy.visit('/');
  //   cy.get('input[name=name]').type('foo@bar.com');
  //   cy.get('input[name=password]').type('foop{enter}');
  //   cy.contains('Sorry, unrecognized username or password. Have you forgotten your password?');
  // });

  // xit('Fails to login without name', function () {
  //   cy.visit('/user');
  //   cy.get('input[name=pass]').type('foop{enter}');
  //   cy.contains('Email Address field is required.');
  // });

  // xit('Fails to login without password', function () {
  //   cy.visit('/user');
  //   cy.get('input[name=name]').type('foo@bar.com{enter}');
  //   cy.contains('Password field is required.');
  // });

  it('Administrator logs in, views content overview, logs out, cannot view content overview', function () {
    cy.visit('/');
    cy.contains('Login!!').click();
    cy.contains('Sign in with Auth0').click();

    cy.get('input[name="email"]').type('john@doe.com');
    cy.get('input[name="password"]').type('JohnDoe1234!');
    cy.get('button[name="submit"]').click();

    cy.get('h1[data-testid="user-name"]').contains('Welcome john!');
    cy.get('img[data-testid="user-image"]').should(
      'have.attr',
      'src',
      'https://s.gravatar.com/avatar/6a6c19fea4a3676970167ce51f39e6ee?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjo.png'
    );

    // cy.visit('/spaces/ir20/content');
    // cy.contains('Content Overview for the ir20 space');

    cy.get('button[data-testid="logout-button"]').click();

    cy.contains('Are you sure you want to sign out?');
    cy.get('button[type="submit"]').click();

    cy.get('h1').contains('Hello, and welcome to the CMS!');

    // cy.request({
    //   url: '/admin/content',
    //   failOnStatusCode: false,
    // }).then((response) => {
    //   expect(response.status).to.eq(403);
    // });
  });

  xit('Anonymous user cannot get to critical routes', function () {
    const routes = [
      '/admin/config/development/performance',
      '/admin/people/permissions',
      '/admin/modules',
      '/admin/commerce/config',
      '/admin/structure/types',
      '/admin/structure/menu',
    ];

    routes.forEach((route) => {
      cy.request({
        url: route,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(403);
      });
    });
  });
});
