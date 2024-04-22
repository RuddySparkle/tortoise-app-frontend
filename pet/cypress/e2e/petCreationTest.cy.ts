const login = (username: string, password: string) => {
    cy.session(username, () => {
        cy.visit('http://localhost:3000/petpal/user/login');
        cy.get('input[name="username"]').type('sellercypress');
        cy.get('input[name="password"]').type('sellercypress');
        cy.get('button').contains('LogIn').click();
        cy.wait(10);
        cy.url().should('include', '/marketplace');
    });
};

describe('Pet Creation Test', () => {
    // Before each test, we need to login and navigate to the pet creation form
    beforeEach(() => {
        login('sellercypress', 'sellercypress');
        cy.visit('http://localhost:3000/petpal/user/my-shop/add');
        cy.wait(10);
    });

    it('should error because of empty input [TC3-1]', () => {
        cy.get('button').contains('Add My Pet').click();
        cy.contains('Please fill all required fields.');
    });

    it('should error because of age, price, and weight contain non-numeric alphabets [TC3-2]', () => {
        cy.get('input[name="name"]').type('SiaArmDoggy');
        cy.get('input[name="age"]').type('1.2 years old');
        cy.get('input[name="price"]').type('10 baht');
        cy.get('input[name="weight"]').type('3 kilograms');
        cy.get('input[name="sex"]').type('Female', { force: true });
        cy.get('input[name="category"]').type('Dog', { force: true });
        cy.get('input[name="species"]').type('Golden Retriever', { force: true });
        cy.get('input[type="file"]').selectFile('./public/image/dogSleep.png', { force: true });
        cy.get('button').contains('Add My Pet').click();
        cy.contains('Age, Price, and Weight are should be a number.');
    });

    it('should error because of age, price, and weight contain zero or negative values [TC3-3]', () => {
        cy.get('input[name="name"]').type('SiaArmDoggy');
        cy.get('input[name="age"]').type('-1');
        cy.get('input[name="price"]').type('-1');
        cy.get('input[name="weight"]').type('-1');
        cy.get('input[name="sex"]').type('Male', { force: true });
        cy.get('input[name="category"]').type('Dog', { force: true });
        cy.get('input[name="species"]').type('Golden Retriever', { force: true });
        cy.get('input[type="file"]').selectFile('./public/image/dogSleep.png', { force: true });
        cy.get('button').contains('Add My Pet').click();
        cy.contains('Age, Price, and Weight should be greater than 0.');
    });

    it("should error because media file type isn't an image [TC3-4]", () => {
        cy.get('input[name="name"]').type('SiaArmDoggy');
        cy.get('input[name="age"]').type('1.2');
        cy.get('input[name="price"]').type('10');
        cy.get('input[name="weight"]').type('3');
        cy.get('input[name="sex"]').type('Female', { force: true });
        cy.get('input[name="category"]').type('Dog', { force: true });
        cy.get('input[name="species"]').type('Golden Retriever', { force: true });
        cy.get('input[type="file"]').selectFile('./public/dummy/base64.txt', { force: true });
        cy.get('button').contains('Add My Pet').click();
        cy.contains('Please wait for the image to upload.').click();
        cy.wait(3);
        cy.get('button').contains('Add My Pet').click();
        cy.contains('File is not an image type.');
    });

    it("should error because media file type isn't an image [TC3-5]", () => {
        cy.get('input[name="name"]').type('SiaArmDoggy');
        cy.get('input[name="age"]').type('1.2');
        cy.get('input[name="price"]').type('10');
        cy.get('input[name="weight"]').type('3');
        cy.get('input[name="sex"]').type('Female', { force: true });
        cy.get('input[name="category"]').type('Dog', { force: true });
        cy.get('input[name="species"]').type('Golden Retriever', { force: true });
        cy.get('input[type="file"]').selectFile('./public/dummy/text.txt', { force: true });
        cy.get('button').contains('Add My Pet').click();
        cy.contains('Please wait for the image to upload.').click();
        cy.wait(10);
        cy.get('button').contains('Add My Pet').click();
        cy.contains('File is not an image type.');
    });

    it("should error because media file type isn't an image [TC3-6]", () => {
        cy.get('input[name="name"]').type('SiaArmDoggy');
        cy.get('input[name="age"]').type('1.2');
        cy.get('input[name="price"]').type('10');
        cy.get('input[name="weight"]').type('3');
        cy.get('input[name="sex"]').type('Female', { force: true });
        cy.get('input[name="category"]').type('Dog', { force: true });
        cy.get('input[name="species"]').type('Golden Retriever', { force: true });
        cy.get('input[type="file"]').selectFile('./public/image/dogSleep.png', { force: true });
        cy.get('button').contains('Add My Pet').click();
        cy.contains('Please wait for the image to upload.').click();
        cy.wait(5);
        cy.get('button').contains('Add My Pet').click();
        cy.contains('Pet created successfully');
    });
});
