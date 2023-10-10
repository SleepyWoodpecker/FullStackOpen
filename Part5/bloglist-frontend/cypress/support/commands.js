// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", ({ username, password }) => {
  // name that you set the item to in localStorage must be same as that you are retrievinfg inside your app
  cy.request("POST", `${Cypress.env("BACKEND")}/api/login`, {
    username,
    password,
  }).then((response) =>
    localStorage.setItem("user", JSON.stringify(response.body))
  );
  cy.visit("");
});

Cypress.Commands.add("newBlog", (newBlogEntry) => {
  const user = JSON.parse(localStorage.getItem("user"));
  cy.request({
    method: "POST",
    url: `${Cypress.env("BACKEND")}/api/blogs`,
    body: { ...newBlogEntry, user: user.id },
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
});

Cypress.Commands.add("like", (blogId, likes) => {
  cy.get(".blog-item").eq(blogId).contains("view").click();
  for (let i = 0; i < likes; i++) {
    cy.get(".like-button").eq(blogId).click();
    cy.wait(100);
  }
  cy.get(".blog-item").eq(blogId).contains("hide").click();
});
