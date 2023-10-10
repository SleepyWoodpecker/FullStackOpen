const listHelper = require("../utils/list_helper");

// to group output from one set of tests, put everything inside a describe block
describe("Calculate the total amount of likes", () => {
  test("test a list with one entry", () => {
    const listWithOneEntry = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
    ];

    const likeSum = listHelper.totalLikes(listWithOneEntry);
    expect(likeSum).toBe(5);
  });

  test("test a list with 3 entries", () => {
    const listWithThreeEntries = [
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
    ];

    const likeSum = listHelper.totalLikes(listWithThreeEntries);
    expect(likeSum).toBe(174);
  });
});
