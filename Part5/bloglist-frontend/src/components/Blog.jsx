import React, { useState } from "react";
import ToggleableComponent from "./ToggleableComponent";
import { updateBlog, deleteBlog } from "../services/blogs";
import Button from "./Button";

const Blog = ({ blog, user, setBlogs }) => {
  const [likes, setLikes] = useState(blog.likes);
  const addLikes = async () => {
    setLikes((likes) => likes + 1);
    await updateBlog(user, blog.id, {
      ...blog,
      user: user.id,
      likes: likes + 1,
    });
  };
  const handleDeleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const response = await deleteBlog(user, blog.id);
      setBlogs((blogs) =>
        blogs.filter((blog) => blog.id !== response.deletedEntry.id)
      );
    }
  };
  return (
    <div
      style={{
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
      }}
      className="blog-item"
    >
      <p
        style={{ display: "inline-block", marginRight: 10 }}
        className="blog-title"
      >
        {blog.title}
      </p>
      <p style={{ display: "inline-block" }} className="blog-author">
        {blog.author}
      </p>
      <ToggleableComponent showButtonLabel={"view"} closeButtonLabel={"hide"}>
        <p className="blog-url">
          <a href={blog.url}>{blog.url}</a>
        </p>
        <span className={`blog-likes`}>
          likes {likes}
          {/* making the button testable? */}
          <Button onClick={addLikes} className="like-button">
            like
          </Button>
        </span>
        <p>{blog.user.username}</p>
        <button onClick={handleDeleteBlog}>Delete Blog</button>
      </ToggleableComponent>
    </div>
  );
};

export default Blog;
