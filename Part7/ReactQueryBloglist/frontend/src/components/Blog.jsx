import React from "react";
import ToggleableComponent from "./ToggleableComponent";
import { updateBlog, deleteBlog } from "../services/blogs";
import Button from "./Button";
import useBlogContext from "../hooks/useBlogContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Blog = ({ blog }) => {
  const { user } = useBlogContext();
  const queryClient = useQueryClient();
  const addLikeQuery = useMutation({
    mutationFn: ({ user, blogId, newBlog }) =>
      updateBlog(user, blogId, newBlog),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });
  const deleteBlogQuery = useMutation({
    mutationFn: ({ user, blogId }) => deleteBlog(user, blogId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });

  const addLikes = () => {
    addLikeQuery.mutate({
      user,
      blogId: blog.id,
      newBlog: {
        ...blog,
        user: user.id,
        likes: blog.likes + 1,
      },
    });
  };
  const handleDeleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogQuery.mutate({ user, blogId: blog.id });
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
          likes {blog.likes}
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
