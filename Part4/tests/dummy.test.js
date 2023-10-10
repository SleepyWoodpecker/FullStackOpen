// you will first start by importing the function you wish to test
const listHelper = require("../utils/list_helper");

// syntax of using jest is as follows: test(<string description of the test>, <function to conduct the test>)
test("dummy test function always returns 1", () => {
  blogs = [];

  expect(listHelper.dummy(blogs)).toBe(1);
});
