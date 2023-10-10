const listHelper = require("../utils/list_helper");

describe("Find the author with the most posts", () => {
  test("Find the author with the most posts, out of 4 posts", () => {
    const listWithFourEntries = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        title: "SHEESH",
        author: "Troller101",
        url: "www.sheesh.com",
        likes: 100,
        _id: "64a8bcaff9e367e1419c1364",
        __v: 0,
      },
      {
        title: "Testing 2",
        author: "Troller101",
        url: "www.test2.com",
        likes: 69,
        _id: "64a8c83480060e99557b9e24",
        __v: 0,
      },
      {
        title: "Testing90",
        author: "Troller101",
        url: "www.test3.com",
        likes: 109,
        id: "64a9041ed589385c7802134d",
        __v: 0,
      },
    ];

    const authorWithMostPosts = listHelper.mostBlogs(listWithFourEntries);
    expect(authorWithMostPosts).toEqual({ author: "Troller101", posts: 3 });
  });
});
