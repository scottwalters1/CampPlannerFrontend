describe("Trip creation", () => {
  it("Successful trip creation", function () {
    cy.visit("http://localhost:5173/");
    cy.get('#root div.main a[href="/login"]').click();
    cy.get('#root input[placeholder="Enter your username"]').click();
    cy.get('#root input[placeholder="Enter your username"]').type("bob");
    cy.get('#root input[placeholder="Enter your password"]').type(
      "bobspassword{enter}"
    );
    cy.get("#root button.btn").click();
    cy.get('#root div:nth-child(2) a[href="/trip"]').click();
    // cy.url().should("include", "/trip");
    cy.get('#root div:nth-child(2) a[href="/trip"]').click();
    cy.get("#TripName").click();
    cy.get("#TripName").type("Example Name");
    cy.get("#TripDescription").click();
    cy.get("#TripDescription").type("Example Description");
    // REFER HERE
    cy.get('#root button[aria-label="Friday, October 24th, 2025"]').click();
    cy.get('#root button[aria-label="Tuesday, October 28th, 2025"]').click();
    cy.get("#root button.btn").click();
    cy.get("#root input.form-control").click();
    cy.get("#root input.form-control").type("shenandoah");
    cy.get("#root button.btn-secondary").click();
    cy.get("#root div.text-black button:nth-child(4)").click();
    cy.get("#root button.btn-primary").click();
    cy.get("#root div.text-dark button:nth-child(4)").click();
    cy.get('#root button[tabindex="0"]').click();
    cy.get('#root button[aria-label="Saturday, October 25th, 2025"]').click();
    cy.get("#root div.text-dark button:nth-child(1)").click();
    cy.get('#root button[aria-label="Sunday, October 26th, 2025"]').click();
    cy.get('#root button[aria-label="Monday, October 27th, 2025"]').click();
    cy.get("#root button.btn").click();
    cy.get("#root button:nth-child(8)").click();
    cy.get('#root button[tabindex="0"]').click();
    cy.get('#root button[aria-label="Saturday, October 25th, 2025"]').click();
    cy.get("#root div.text-dark button:nth-child(3)").click();
    cy.get('#root button[aria-label="Sunday, October 26th, 2025"]').click();
    cy.get('#root button[aria-label="Monday, October 27th, 2025"]').click();
    cy.get("#root button.btn").click();
    cy.get("#root h2.text-black").click();
    cy.get("#root input.form-control").click();
    cy.get("#root input.form-control").clear();
    cy.get("#root input.form-control").type("alice");
    cy.get("#root button.btn-secondary").click();
    cy.get("#root button.btn-primary").click();

    cy.get("#root div.details > h3:nth-child(1)").should(
      "have.text",
      "Select A Trip!"
    );
  });

  it("Trying to create a new trip without logging in", function () {
    cy.visit("http://localhost:5173/");
    cy.get('#root a[href="/trip"]').click();
    cy.url().should("include", "/login");
  });
});

describe("Trip viewing", () => {
  it("Trying to create a new trip without logging in", function () {
    cy.visit("http://localhost:5173/");
    cy.get('#root a[href="/trip"]').click();
    cy.url().should("include", "/login");
  });

  it("Viewing trips", function () {
    cy.visit("http://localhost:5173/");
    cy.get('#root div.main a[href="/login"]').click();
    cy.get('#root input[placeholder="Enter your username"]').click();
    cy.get('#root input[placeholder="Enter your username"]').type("bob");
    cy.get('#root input[placeholder="Enter your password"]').type(
      "bobspassword"
    );
    cy.get("#root button.btn").click();
    cy.get('#root div:nth-child(2) a[href="/trips"]').click();
    cy.url().should("include", "/trips");
  });
});

describe("Trip invitations", () => {
  it("Inviting nonexistent user", function () {
    cy.visit("http://localhost:5173/");
    cy.get('#root div.main a[href="/login"]').click();
    cy.get('#root input[placeholder="Enter your username"]').click();
    cy.get('#root input[placeholder="Enter your username"]').type("bob");
    cy.get('#root input[placeholder="Enter your password"]').type(
      "bobspassword"
    );
    cy.get("#root button.btn").click();
    cy.get('#root div:nth-child(2) a[href="/trip"]').click();
    cy.get("#TripName").click();
    cy.get("#TripName").type("Example Name");
    cy.get("#TripDescription").type("Example Description");
    cy.get('#root button[aria-label="Friday, October 24th, 2025"]').click();
    cy.get('#root button[aria-label="Monday, October 27th, 2025"]').click();
    cy.get("#root button.btn").click();
    cy.get("#root div.flex-column").click();
    cy.get("#root input.form-control").click();
    cy.get("#root input.form-control").type("shenandoah");
    cy.get("#root button.btn-secondary").click();
    cy.get("#root button:nth-child(3)").click();
    cy.get("#root div.text-black button:nth-child(4)").click();
    cy.get("#root button.btn-primary").click();
    cy.get("#root div.text-dark button:nth-child(1)").click();
    cy.get('#root button[tabindex="0"]').click();
    cy.get('#root button[aria-label="Saturday, October 25th, 2025"]').click();
    cy.get('#root button[aria-label="Sunday, October 26th, 2025"]').click();
    cy.get('#root button[aria-label="Monday, October 27th, 2025"]').click();
    cy.get("#root button.btn").click();
    cy.get("#root div.text-dark button:nth-child(3)").click();
    cy.get('#root button[tabindex="0"]').click();
    cy.get('#root button[aria-label="Saturday, October 25th, 2025"]').click();
    cy.get('#root button[aria-label="Sunday, October 26th, 2025"]').click();
    cy.get('#root button[aria-label="Monday, October 27th, 2025"]').click();
    cy.get("#root button.btn").click();
    cy.get("#root div.flex-column").click();
    cy.get("#root input.form-control").click();
    cy.get("#root input.form-control").clear();
    cy.get("#root input.form-control").type("nonexistent");
    cy.get("#root button.btn-secondary").click();
    cy.get("#root div.text-danger").should(
      "have.text",
      "Failed to find user. Please try again."
    );
  });

  it("Creating a trip with invited user, then logging in as that user and accepting trip invite", function () {
    cy.visit("http://localhost:5173/");
    cy.get('#root div.main a[href="/login"]').click();
    cy.get('#root input[placeholder="Enter your username"]').click();
    cy.get('#root input[placeholder="Enter your username"]').type("bob");
    cy.get('#root input[placeholder="Enter your password"]').type(
      "bobspassword"
    );
    cy.get("#root button.btn").click();
    cy.get('#root div:nth-child(2) a[href="/trip"]').click();
    cy.get("#TripName").click();
    cy.get("#TripName").type("Example Trip with alice");
    cy.get("#TripDescription").type("Example Trip with alice");
    cy.get('#root button[aria-label="Friday, October 24th, 2025"]').click();
    cy.get('#root button[aria-label="Monday, October 27th, 2025"]').click();
    cy.get("#root button.btn").click();
    cy.get("#root input.form-control").click();
    cy.get("#root input.form-control").type("shenandoah");
    cy.get("#root button.btn-secondary").click();
    cy.get("#root div.text-black button:nth-child(4)").click();
    cy.get("#root button.btn-primary").click();
    cy.get("#root div.text-dark button:nth-child(4)").click();
    cy.get('#root button[tabindex="0"]').click();
    cy.get('#root button[aria-label="Saturday, October 25th, 2025"]').click();
    cy.get('#root button[aria-label="Sunday, October 26th, 2025"]').click();
    cy.get('#root button[aria-label="Monday, October 27th, 2025"]').click();
    cy.get("#root button.btn").click();
    cy.get("#root div.text-dark button:nth-child(3)").click();
    cy.get('#root button[tabindex="0"]').click();
    cy.get('#root button[aria-label="Saturday, October 25th, 2025"]').click();
    cy.get('#root button[aria-label="Sunday, October 26th, 2025"]').click();
    cy.get('#root button[aria-label="Monday, October 27th, 2025"]').click();
    cy.get("#root button.btn").click();
    cy.get("#root input.form-control").click();
    cy.get("#root input.form-control").clear();
    cy.get("#root input.form-control").type("alice");
    cy.get("#root button.btn-secondary").click();
    cy.get("#root button.btn-primary").click();
    cy.get('#root a[href="/login"]').click();
    cy.get('#root input[placeholder="Enter your username"]').click();
    cy.get('#root input[placeholder="Enter your username"]').clear();
    cy.get('#root input[placeholder="Enter your username"]').type("alice");
    cy.get('#root input[placeholder="Enter your password"]').clear();
    cy.get('#root input[placeholder="Enter your password"]').type(
      "alicespassword{enter}"
    );
    cy.get("#root button.btn").click();
    cy.get("#root path").click();
    cy.get("#root li:nth-child(1) button.btn-primary").click();
    cy.get('#root div:nth-child(2) a[href="/trips"]').click();
    cy.get("#root div.details > h3:nth-child(1)").click();
    cy.get("#root div.details > h3:nth-child(1)").should(
      "have.text",
      "Select A Trip!"
    );
  });

  
});
