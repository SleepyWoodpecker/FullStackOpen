const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const { initialBlogs, user } = require("./dummyBlogData");
// the app is wrapped in the superagent object
const api = supertest(app);

// initializing the database before each test execution

beforeEach(async () => {
  // clear the DB of all entries before making any changes to it
  await Promise.all([Blog.deleteMany({}), User.deleteMany({})]);
  console.log("Cleared");
  const newUser = await api.post("/api/users").send(user);
  const newToken = await api
    .post("/api/login")
    .send({ username: "Wisemanuel", password: "Wowzers" });

  for (const blogEntry of initialBlogs) {
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${newToken.body.token}`)
      .send({ ...blogEntry, user: newUser.body.id });
  }
  // using Promise.all helps ensure that all entries are saved to the DB before any subsequent action can take place
  console.log("Initial entries all created");

  // record all the blog Ids to the user
});

describe("testing the results fetched from the server", () => {
  test("phonebook entries are returned as JSON", async () => {
    // in this case, using regex helps you check for the presence of application/json inside the list of content type
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("content-type", /application\/json/);
  });

  test("returned values contain the id property", async () => {
    const returnValue = await api.get("/api/blogs");
    // I think it makes more sense for every element in the array to be tested rather than just one right. I wonder how many tests this would amount to though
    returnValue.body.forEach((blogEntry) => expect(blogEntry.id).toBeDefined());
  });
});

describe("testing the addition of new entries into the blog", () => {
  test("making a post request to the api creates a new blog post", async () => {
    const newUser = await api
      .post("/api/users")
      .send({ name: "SHEESH", username: "Dab 123", password: "GDIMAN" });
    const newToken = await api
      .post("/api/login")
      .send({ username: "Dab 123", password: "GDIMAN" });
    const newEntry = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${newToken.body.token}`)
      .send({
        title: "supertest",
        author: "supertester",
        url: "www.testthispls.com",
        user: newUser.body.id,
        likes: 5,
      });
    const finalValue = await api.get("/api/blogs");
    finalValue.body[2].user = newUser.body.id;
    expect(finalValue.body).toHaveLength(3);
    // seems like the newEntry obj that is retured is already properly formatte

    expect(finalValue.body).toContainEqual(newEntry.body.savedBlog);
  });
});

describe("testing that proper modifications are made to the data if certain properties are missing", () => {
  test("if likes property is missing from the request, its value defaults to 0", async () => {
    const newUser = await api
      .post("/api/users")
      .send({ name: "SHEESH", username: "Dab 123", password: "GDIMAN" });
    const newToken = await api
      .post("/api/login")
      .send({ username: "Dab 123", password: "GDIMAN" });
    const newEntry = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${newToken.body.token}`)
      .send({
        title: "supertest",
        author: "supertester",
        url: "www.testthispls.com",
        user: newUser.body.id,
        // likes in this case should not be defined
      });
    // console.log(newEntry.body);
    expect(newEntry.body.savedBlog.likes).toBe(0);
  });

  test("if the title or url properties of the blog are missing, respond with 400 bad request", async () => {
    const newUser = await api
      .post("/api/users")
      .send({ name: "SHEESH", username: "Dab 123", password: "GDIMAN" });
    const newToken = await api
      .post("/api/login")
      .send({ username: "Dab 123", password: "GDIMAN" });
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${newToken.body.token}`)
      .send({
        // title: "supertest",
        author: "supertester",
        url: "www.testthispls.com",
        user: newUser.body.id,
      })
      .expect(400);

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${newToken.body.token}`)
      .send({
        title: "supertest",
        author: "supertester",
        // url: "www.testthispls.com",
        user: newUser.body.id,
      })
      .expect(400);
  });
});

describe("testing the delete api endpoint", () => {
  test("delete the first blog", async () => {
    const newToken = await api
      .post("/api/login")
      .send({ username: "Wisemanuel", password: "Wowzers" });

    const blogEntries = await api.get("/api/blogs");
    const deletedEntry = await api
      .delete(`/api/blogs/${blogEntries.body[0].id}`)
      .set("Authorization", `Bearer ${newToken.body.token}`);
    // for a single object that is not nested, using toEqual is enough
    blogEntries.body[0].user = blogEntries.body[0].user.id;
    expect(deletedEntry.body.deletedEntry).toEqual(blogEntries.body[0]);
  });
});

describe("testing updating of data", () => {
  test("update the number of likes from the first blog post", async () => {
    const newToken = await api
      .post("/api/login")
      .send({ username: "Wisemanuel", password: "Wowzers" });
    const blogEntries = await api.get("/api/blogs");
    const increaseLikes = {
      ...blogEntries.body[0],
      likes: blogEntries.body[0].likes++,
    };
    increaseLikes.user = increaseLikes.user.id;
    const updatedEntry = await api
      .put(`/api/blogs/${blogEntries.body[0].id}`)
      .set("Authorization", `Bearer ${newToken.body.token}`)
      .send(increaseLikes);

    expect(updatedEntry.body).toEqual(increaseLikes);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
