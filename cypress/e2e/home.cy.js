describe("Home Page", () => {
  it("should render the homepage", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Welcome");
  });
});
