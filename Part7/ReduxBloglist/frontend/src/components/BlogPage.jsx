import React from "react";
import Blog from "./Blog";
import ListGroup from "react-bootstrap/ListGroup";

function BlogPage({ blogs, user, setBlogs }) {
  return (
    <div>
      <ListGroup className="blog-list">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} setBlogs={setBlogs} />
        ))}
      </ListGroup>
    </div>
  );
}

export default BlogPage;
