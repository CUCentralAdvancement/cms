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
    cy.visit('/user');
  });

  it('Fails to login with name and password', function () {
    cy.visit('/login');
    cy.get('input[name=name]').type('foo@bar.com');
    cy.get('input[name=password]').type('foop{enter}');
    cy.contains('Sorry, unrecognized username or password. Have you forgotten your password?');
  });

  it('Fails to login without name', function () {
    cy.visit('/user');
    cy.get('input[name=pass]').type('foop{enter}');
    cy.contains('Email Address field is required.');
  });

  it('Fails to login without password', function () {
    cy.visit('/user');
    cy.get('input[name=name]').type('foo@bar.com{enter}');
    cy.contains('Password field is required.');
  });

  it('Administrator logs in, views content overview, logs out, cannot view content overview', function () {
    cy.visit('/user');
    cy.get('input[name=name]').type('administrator@nowhere.com');
    cy.get('input[name=pass]').type('administrator{enter}');

    cy.visit('/admin/content');
    cy.contains('Published status');
    cy.visit('/user/logout');

    cy.request({
      url: '/admin/content',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });

  it('Content Admin logs in, can edit content, cannot get to admin section ', function () {
    cy.visit('/user');
    cy.get('input[name=name]').type('content_admin@nowhere.com');
    cy.get('input[name=pass]').type('content_admin{enter}');

    cy.visit('/admin/content');
    cy.get('.views-field-edit-node a').first().click();
    cy.contains('Save').click();
    cy.contains('has been updated.');

    cy.request({
      url: '/admin/config/development/performance',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });

  it('Anonymous user cannot get to critical routes', function () {
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
