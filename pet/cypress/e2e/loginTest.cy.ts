describe('Login Test', () => {
  it ('Username is empty string', () => {
    cy.visit('http://localhost:3000/petpal/user/login');
    cy.get('input[name="password"]').type('buyer');
    cy.get('button').contains('LogIn').click();
    cy.contains('Please enter a username.');
  });

  it ('Username does not exist', () => {
    cy.visit('http://localhost:3000/petpal/user/login');
    cy.get('input[name="username"]').type('Arm');
    cy.get('input[name="password"]').type('buyer');
    cy.get('button').contains('LogIn').click();
    cy.contains('Wrong username or password.');
  });

  it ('Password is wrong', () => {
    cy.visit('http://localhost:3000/petpal/user/login');
    cy.get('input[name="username"]').type('buyer');
    cy.get('input[name="password"]').type('ABCDEFG');
    cy.get('button').contains('LogIn').click();
    cy.contains('Wrong username or password.');
  });

  it ('Password is empty string', () => {
    cy.visit('http://localhost:3000/petpal/user/login');
    cy.get('input[name="username"]').type('buyer');
    cy.get('button').contains('LogIn').click();
    cy.contains('Please enter a password.');
  });

  it('Login Success', () => {
    cy.visit('http://localhost:3000/petpal/user/login');
    cy.get('input[name="username"]').type('buyer');
    cy.get('input[name="password"]').type('buyer');
    cy.get('button').contains('LogIn').click();
    cy.url().should('include', '/marketplace');
  });
});
