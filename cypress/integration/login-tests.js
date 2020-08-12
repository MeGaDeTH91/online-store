describe("Home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("Should show products page title!", () => {
    cy.get("h1").contains("Login page");
  });

  it("Should show nav correctly!", () => {
    cy.get("nav").should("be.visible");
  });

  it("Should set auth cookie when logging in!", function () {
    cy.get("input[name=email]").type("marto@abv.bg");

    cy.get("input[name=password]").type(`123{enter}`);

    cy.wait(2500);

    cy.getCookie("x-auth-token").should("exist");

    cy.get("h1").contains("Products");
    cy.get("div").contains("Ibanez RG550");
    cy.get("div").contains("Jackson SL2");
  });

  it("Should throw error on attempt with wrong email!", function () {
    cy.get("input[name=email]").type("wrong");

    cy.get("input[name=password]").type(`123{enter}`);

    cy.wait(1000);

    cy.getCookies().should("have.length", 0);

    cy.get("div").contains("Invalid credentials!");
  });
});
