describe("Profile page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");

    cy.get("input[name=email]").type("marto1@abv.bg");

    cy.get("input[name=password]").type(`123{enter}`);

    cy.wait(5500);

    cy.getCookie("x-auth-token").should("exist");

    cy.visit('http://localhost:3000/profile-details');
    cy.wait(500);
  });

  it("Should show nav correctly!", () => {
    cy.get("nav").should("be.visible");
  });

  it("Should show all user information correctly!", () => {
    cy.get("h1").contains('Martin Taskov2');
    cy.get("h3").contains('marto1@abv.bg');
    cy.get("h3").contains('0012345');
  });

  it("Should show buttons correctly!", () => {
    cy.get("button").contains('Update info');
    cy.get("button").contains('My orders');
  });

  it("Should show user reviews correctly!", () => {
    cy.contains('I love this guitar!').should('exist');
    cy.contains('One of the greatest axes of Jackson recently.').should('exist');
    cy.contains('Wow, amazed to see this in local shop. Great deal!').should('exist');
  });

  it("Should update user information correctly!", () => {
    cy.get("button").contains('Update info').click();
    cy.wait(300);

    const name = 'Martin Taskov2';
    const phone = '0012345';

    const tempName = 'Martin Taskov155';
    const tempPhone = 'no phone';

    cy.get('input[name=fullName]').should('have.value', name);
    cy.get('input[name=phone]').should('have.value', phone);

    cy.get('input[name=fullName]').clear().type(tempName);
    cy.get('input[name=phone]').clear().type(tempPhone);
    cy.get("button").contains('Update info').click();
    cy.wait(300);

    cy.get("h1").contains(tempName);
    cy.get("h3").contains(tempPhone);
    cy.get("button").contains('Update info').click();
    cy.get("div").contains("User information updated successfully!");
    cy.wait(300);

    cy.get('input[name=fullName]').clear().type(name);
    cy.get('input[name=phone]').clear().type(phone);
    cy.get("button").contains('Update info').click();
  });

  it("Should throw error on update user information with invalid full name!", () => {
    cy.get("button").contains('Update info').click();
    cy.wait(300);

    const name = 'Martin Taskov2';
    const phone = '0012345';

    const tempName = 'Y';
    const tempPhone = 'no phone';

    cy.get('input[name=fullName]').should('have.value', name);
    cy.get('input[name=phone]').should('have.value', phone);

    cy.get('input[name=fullName]').clear().type(tempName);
    cy.get('input[name=phone]').clear().type(tempPhone);
    cy.get("button").contains('Update info').click();
    
    cy.get("div").contains("Error occured: Full name should be at least 3 characters long!");
    cy.url().should("eq", "http://localhost:3000/profile-details");
  });

  it("Should show user orders correctly!", () => {
    cy.get("button").contains('My orders').click();

    cy.get("h4").contains('Orders history');
    cy.get("div").contains('5f33025b60a2071d80188f2c');
    cy.get("div").contains('5f32e9e6ae56dc07d0773c43');
    cy.get("div").contains('5f32e5997ad2543c801cb799');
  });

  it("Should leave review successfully!", () => {
    cy.visit('http://localhost:3000');
    cy.wait(2000);
    cy.get("div").contains("Ibanez RG550").click();
    cy.wait(600);
    cy.get('button').contains('Add to cart').should('exist');
    cy.contains('Product reviews').should('not.exist');

    cy.get("button").contains('Show reviews section').click();
    cy.wait(300);

    cy.get("h4").contains('Product reviews');

    const review = reviewID_generate();

    cy.contains(review).should('not.exist');
    cy.get('textarea[name=review]').clear().type(review);

    cy.contains('Post review').click();
    cy.wait(4500);

    cy.contains('Product reviews').should('not.exist');
    cy.get("button").contains('Show reviews section').click();
    cy.wait(300);
    cy.get("h4").contains('Product reviews');

    cy.contains(review).should('exist');
  });

  it("Should show footer correctly!", () => {
    cy.get("footer").should("be.visible");
    cy.get('p').contains('React-Store © 2020');
  });

  function reviewID_generate() {
    var text = "test-";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 7; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    text += "_review";
    return text;
  }
});
