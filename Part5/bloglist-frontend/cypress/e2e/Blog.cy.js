describe("Blog App tests", () => {
  // before each test starts, clear the DB and add a new user
  beforeEach(() => {
    cy.request("GET", "/api/testing");
    cy.request("POST", "/api/users", {
      username: "Sheesher",
      name: "Test",
      password: "A test",
    });
    cy.visit("");
  });

  xit("app displays the login form by default", function () {
    cy.contains("Username");
    cy.contains("Password");
    cy.contains("Log in");
  });

  describe("login testing", () => {
    xit("works with correct password and username", function () {
      cy.contains("Username").type("Sheesher");
      cy.contains("Password").type("A test");
      cy.contains("Log in").click();

      cy.contains("Test logged in");
      cy.contains("Logout");
    });

    xit("shows error message when username or password is wrong", function () {
      cy.contains("Username").type("Sheesher");
      cy.contains("Password").type("Wrong man");
      cy.contains("Log in").click();

      // get is the equivalent of the querySelector
      cy.get(".feedback-message")
        .should("contain", "Invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)");
      cy.get("html").should("not.contain", `Test logged in`);
    });
  });

  describe("when user is logged in", () => {
    // before each log in the user
    // let user;
    beforeEach(function () {
      cy.login({ username: "Sheesher", password: "A test" });
      // user = JSON.parse(localStorage.getItem("userCredentials"))
    });

    xit("logged-in user can create a blog", function () {
      cy.get(".show-button").click();
      cy.get("#title").type("I can make a blog!");
      cy.get("#author").type("The forsaken");
      cy.get("#url").type("sadge.com");

      cy.get(".submit-new-blog").click();

      // the new blog is added to the screen, and user is already accessed by the app?
      cy.contains("I can make a blog!");
    });

    xit("logged-in user can like a blog", function () {
      cy.newBlog({ title: "This is a blog", url: "blog.com", author: "MEE" });
      cy.contains("This is a blog");
      cy.contains("view").click();
      cy.get(".like-button").click();
      cy.contains("likes 1");
    });
  });

  describe("testing the deleting of blog posts", function () {
    beforeEach(function () {
      cy.login({ username: "Sheesher", password: "A test" });
      cy.newBlog({ title: "To be deleted", url: "blog.com", author: "reaper" });
      cy.contains("To be deleted");
    });

    xit("creator of the blog can delete the blog", function () {
      cy.contains("view").click();
      cy.contains("Delete Blog").click();
      cy.get("html").should("not.contain", "To be deleted");
    });

    xit("other users who are not the creator of the blog cannot delete it", function () {
      cy.contains("Logout").click();
      cy.request("POST", "/api/users", {
        username: "SW123",
        name: "SW",
        password: "Dabber",
      });
      cy.login({ username: "SW123", password: "Dabber" });
      cy.contains("To be deleted");
      cy.contains("view").click();
      cy.contains("Delete Blog").click();
      cy.contains("To be deleted");
    });
  });

  it("after adding likes, blogs are arranged in order of their likes", function () {
    cy.login({ username: "Sheesher", password: "A test" });
    cy.newBlog({
      title: "2nd best liked",
      url: "sheesh.com",
      author: "nlog.com",
    });
    cy.newBlog({
      title: "3rd best liked",
      url: "sheesh.com",
      author: "nlog.com",
    });
    cy.newBlog({ title: "Best liked", url: "blog.com", author: "sheesher" });
    cy.reload();
    cy.like(2, 5);
    cy.like(0, 3);
    cy.reload();
    cy.get(".blog-item").eq(0).contains("Best liked");
    cy.get(".blog-item").eq(1).contains("2nd best liked");
    cy.get(".blog-item").eq(2).contains("3rd best liked");
  });
});
