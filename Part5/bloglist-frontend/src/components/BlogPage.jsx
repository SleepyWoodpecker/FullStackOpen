import React from "react";
import Blog from "./Blog";
import NewBlog from "./NewBlog";
import ToggleableComponent from "./ToggleableComponent";
import { createNewBlog } from "../services/blogs";

function BlogPage({ blogs, user, setUser, setBlogs }) {
  const handleLogout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Logout</button>
      <div className="blog-list">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} setBlogs={setBlogs} />
        ))}
      </div>
      <ToggleableComponent
        showButtonLabel={"Add a new blog"}
        closeButtonLabel={"close"}
      >
        <NewBlog
          createNewBlog={createNewBlog}
          user={user}
          setBlogs={setBlogs}
        />
      </ToggleableComponent>
    </div>
  );
}

export default BlogPage;
