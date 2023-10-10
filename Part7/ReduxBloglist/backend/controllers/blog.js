const blogRouter = require("express").Router();
const Blog = require("../models/blogModel");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();
const middleware = require("../utils/middleware");

blogRouter.get("/", async (req, res) => {
  const blogEntries = await Blog.find({}).populate("user");
  return res.status(200).json(blogEntries);
});

blogRouter.get("/:id", async (req, res) => {
  const selectedBlog = await Blog.findById(req.params.id).populate("user");
  res.status(200).send(selectedBlog);
});

// upgrade this route to only accept post responses when an individual is logged in
blogRouter.post("/", middleware.userExtractor, async (req, res) => {
  const user = req.user;

  const blog = new Blog({ ...req.body, user: user.id });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog);
  const [populatedUser, updatedUser] = await Promise.all([
    User.findOne(savedBlog.user),
    User.findByIdAndUpdate(user.id, user, {
      new: true,
      // need to check if they run validators in teh code later
    }),
  ]);
  savedBlog.user = populatedUser;
  res.status(201).send({ savedBlog, updatedUser });
});

// should put the validation for webtoken here, since not all the routes need it
blogRouter.delete("/:id", middleware.userExtractor, async (req, res) => {
  // check that the user who wishes to delete the blog is the creator of the blog
  const user = req.user;
  const targetBlogId = req.params.id;
  const targetBlog = await Blog.findById(targetBlogId);
  // {
  //   username: 'Wisemanuel',
  //   id: '64b14cc7b701d8652d2e6212',
  //   iat: 1689383692
  // } this is what a decoded token looks like

  if (user.id === targetBlog.user.toString()) {
    // when deleting, should always use findOneAndDelete unless you have good reason not to
    const deletedEntry = await Blog.findByIdAndDelete(targetBlogId);
    user.blogs = user.blogs.filter((blog) => {
      return blog.toString() !== targetBlogId;
    });
    console.log(user.blogs);
    const updatedUser = await User.findByIdAndUpdate(user.id, user, {
      new: true,
    });
    res.status(200).send({ deletedEntry, updatedUser });
  } else {
    res
      .status(401)
      .send({ error: "Only the author of this blog can delete this blog" });
  }
});

// implement functionality for updating the blog post
blogRouter.put("/:id", middleware.userExtractor, async (req, res) => {
  const targetId = req.params.id;
  const updatedEntry = await Blog.findByIdAndUpdate(targetId, req.body, {
    new: true,
  });
  res.status(200).send(updatedEntry);
});

blogRouter.put("/:id/comment", async (req, res) => {
  const targetId = req.params.id;
  const originalBlog = await Blog.findById(targetId);
  const newCommentList = originalBlog.comments.concat(req.body.comment);
  const commentAdded = await Blog.findByIdAndUpdate(
    targetId,
    { comments: newCommentList },
    {
      new: true,
    }
  );
  res.status(200).send(commentAdded);
});

module.exports = blogRouter;
