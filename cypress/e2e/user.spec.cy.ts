/// <reference types="cypress" />

const campPlannerURL =
  // "http://campplannerpipeline.s3-website-us-east-1.amazonaws.com/";
  "http://localhost:5173/";

describe("login", () => {
  it("Successful login", function () {
    cy.visit(campPlannerURL);
    cy.get('#root div.main a[href="/login"]').click();
    cy.get('#root input[placeholder="Enter your username"]').click();
    cy.get('#root input[placeholder="Enter your username"]').type("bob");
    cy.get('#root input[placeholder="Enter your password"]').type(
      "bobspassword"
    );
    cy.get("#root button.btn").click();
    cy.get('#root a[href="/login"]').should("have.text", "Logout");
  });

  it("Redirects to login if create trip clicked without logging in", function () {
    cy.visit(campPlannerURL);
    cy.get('#root a[href="/trip"]').click();
    cy.url().should("include", "/login");
  });

  it("Redirects to login if view trips clicked without logging in", function () {
    cy.visit(campPlannerURL);
    cy.get('#root a[href="/trips"]').click();
    cy.url().should("include", "/login");
  });

  it("Wrong password", function () {
    cy.visit(campPlannerURL);
    cy.get('#root div.main a[href="/login"]').click();
    cy.get('#root input[placeholder="Enter your username"]').click();
    cy.get('#root input[placeholder="Enter your username"]').type("bob");
    cy.get('#root input[placeholder="Enter your password"]').type(
      "wrongpassword"
    );
    cy.get("#root button.btn").click();
    cy.get("#root p").should("have.text", "Invalid Username or Password");
  });

  it("Missing username", function () {
    cy.visit(campPlannerURL);
    cy.get('#root div.main a[href="/login"]').click();
    cy.get('#root input[placeholder="Enter your password"]').click();
    cy.get('#root input[placeholder="Enter your password"]').type(
      "bobspassword"
    );
    cy.get("#root button.btn").click();
    cy.get("#root p").should("have.text", "Invalid Username or Password");
  });

  it("Login from register page", function () {
    cy.visit(campPlannerURL);
    cy.get('#root a[href="/register"]').click();
    cy.get("#root div.text-center a").click();
    cy.get('#root input[placeholder="Enter your username"]').click();
    cy.get('#root input[placeholder="Enter your username"]').type("bob");
    cy.get('#root input[placeholder="Enter your password"]').type(
      "bobspassword"
    );
    cy.get("#root button.btn").click();
    cy.url().should("include", "/login");
  });

  it("Login from navbar", function () {
    cy.visit(campPlannerURL);
    cy.get("#root div.navbar-right a").click();
    cy.get('#root input[placeholder="Enter your username"]').click();
    cy.get('#root input[placeholder="Enter your username"]').type("bob");
    cy.get('#root input[placeholder="Enter your password"]').type(
      "bobspassword"
    );
    cy.get("#root button.btn").click();
    cy.get('#root a[href="/login"]').should("have.text", "Logout");
  });
});

describe("register", () => {
  // it('Successful registration', function() {
  //   cy.visit(campPlannerURL)
  //   cy.get('#root a[href="/register"]').click();
  //   cy.get('#root input.mt-4').click();
  //   cy.get('#root input.mt-4').type('newUser');
  //   cy.get('#root input[placeholder="Enter your password"]').type('newUserPassword');
  //   cy.get('#root input[placeholder="Confirm Password"]').type('newUserPassword');
  //   cy.get('#root button.btn').click();
  //   cy.url().should("include", "/login");

  // });

  it("Mismatched passwords", function () {
    cy.visit(campPlannerURL);
    cy.get('#root a[href="/register"]').click();
    cy.get("#root input.mt-4").click();
    cy.get("#root input.mt-4").type("newUser");
    cy.get('#root input[placeholder="Enter your password"]').click();
    cy.get('#root input[placeholder="Enter your password"]').type(
      "newUserPassword"
    );
    cy.get('#root input[placeholder="Confirm Password"]').type("doestnmatch");
    cy.get("#root button.btn").click();
    cy.get("#root p").should("have.text", "Passwords don't match!");
  });

  it("Missing username", function () {
    cy.visit(campPlannerURL);
    cy.get('#root a[href="/register"]').click();
    cy.get("#root input.mt-4").click();
    cy.get('#root input[placeholder="Enter your password"]').click();
    cy.get('#root input[placeholder="Enter your password"]').type(
      "newUserPassword"
    );
    cy.get('#root input[placeholder="Confirm Password"]').type(
      "newUserPassword"
    );
    cy.get("#root button.btn").click();
    cy.get("#root p").should("have.text", "Username required!");
  });
});
