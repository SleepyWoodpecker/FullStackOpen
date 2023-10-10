import React from "react";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

const Blog = ({ blog }) => {
  return (
    <ListGroup.Item className="blog-item">
      <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
    </ListGroup.Item>
  );
};

export default Blog;

// <p style={{ display: "inline-block", marginRight: 10 }}
// className="blog-title"
// >
// {blog.title}
// </p>
// <p style={{ display: "inline-block" }} className="blog-author">
// {blog.author}
// </p>
// <ToggleableComponent showButtonLabel={"view"} closeButtonLabel={"hide"}>
// <p className="blog-url">
//   <a href={blog.url}>{blog.url}</a>
// </p>
// <span className={`blog-likes`}>
//   likes {blog.likes}
//   {/* making the button testable? */}
//   <Button onClick={addLikes} className="like-button">
//     like
//   </Button>
// </span>
// <p>{blog.user.username}</p>
// <button onClick={handleDeleteBlog}>Delete Blog</button>
// </ToggleableComponent>
