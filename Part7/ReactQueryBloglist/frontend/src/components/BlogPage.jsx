import React from "react";
import Blog from "./Blog";
import NewBlog from "./NewBlog";
import ToggleableComponent from "./ToggleableComponent";
import { createNewBlog } from "../services/blogs";
import useBlogContext from "../hooks/useBlogContext";

function BlogPage() {
  const { blogs, user, dispatchUser } = useBlogContext();

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    dispatchUser({ type: "user_logout" });
  };

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Logout</button>
      <div className="blog-list">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
      </div>
      <ToggleableComponent
        showButtonLabel={"Add a new blog"}
        closeButtonLabel={"close"}
      >
        <NewBlog createNewBlog={createNewBlog} user={user} />
      </ToggleableComponent>
    </div>
  );
}

export default BlogPage;
