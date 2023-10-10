const mongoose = require("mongoose");

const initialBlogs = [
  {
    title: "SHEESH",
    author: "Dan O hara 123",
    url: "www.cool.com",
    likes: 90,
  },
  {
    title: "Whoops",
    author: "Dan O hara 123",
    url: "www.cool.com",
    likes: 9,
  },
];

const user = {
  username: "Wisemanuel",
  name: "Emmanuel",
  password: "Wowzers",
};

module.exports = { initialBlogs, user };
