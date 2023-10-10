const listHelper = require("../utils/list_helper");

describe("Determine the most well-liked blog", () => {
  test("Return the most popular blog out of the three", () => {
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

    const favourite = listHelper.favouriteBlog(listWithThreeEntries);
    // when performing a test for Objects, the toEqual method is what you should use over toBe. The latter ensures that the two values are the same, while the former only compares object properties
    expect(favourite).toEqual({
      title: "SHEESH",
      author: "Troller101",
      url: "www.sheesh.com",
      likes: 100,
      _id: "64a8bcaff9e367e1419c1364",
      __v: 0,
    });
  });
});
