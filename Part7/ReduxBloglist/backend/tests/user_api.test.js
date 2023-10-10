const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

const api = supertest(app);

describe("Check error validation", () => {
  test("return error if length of password is less than 3 characters", async () => {
    const response = await api
      .post("/api/users")
      .send({ name: "Shawn Wei", username: "SW123", password: "Sh" });
    expect(response.status).toBe(400);
    expect(response.text).toBe("Password should at least be 3 characters long");
  });
});

describe("add new users into the system", () => {
  test("add jim beam into users", async () => {
    const response = await api
      .post("/api/users")
      .send({ name: "Jim Bean", username: "JB 200", password: "Wowzers" });
    expect(response.body).toHaveProperty("name", "Jim Bean");
    expect(response.body).toHaveProperty("username", "JB 200");
  });
});

describe("test logging the user in", () => {
  test("log in jim beam", async () => {
    const response = await api
      .post("/api/login")
      .send({ username: "JB 200", password: "Wowzers" })
      .expect(200);
  });
});
