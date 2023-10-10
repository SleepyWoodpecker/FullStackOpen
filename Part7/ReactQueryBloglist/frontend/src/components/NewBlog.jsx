import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewBlog } from "../services/blogs";
import useBlogContext from "../hooks/useBlogContext";

function NewBlog({ user }) {
  const { dispatchMessage } = useBlogContext();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleAuthorChange = (e) => setAuthor(e.target.value);
  const handleUrlChange = (e) => setUrl(e.target.value);

  const queryClient = useQueryClient();
  const newBlogQuery = useMutation({
    mutationFn: ({ user, blogEntry }) => createNewBlog(user, blogEntry),
    onSuccess: (newBlog) => {
      // why does the notification show before the new entry is added? WTS bro
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      dispatchMessage({
        type: "show_notification",
        payload: {
          color: "green",
          content: `${newBlog.savedBlog.author} has just saved ${newBlog.savedBlog.title}`,
        },
      });
      setTimeout(() => dispatchMessage({ type: "clear_notification" }), 3000);
    },
    onError: (err) => {
      dispatchMessage({
        type: "show_notification",
        payload: {
          color: "red",
          content: `${err.response.data} has just saved ${err.response.data}`,
        },
      });
      setTimeout(() => dispatchMessage({ type: "clear_notification" }), 3000);
    },
  });

  const handleCreateNewBlog = async (e) => {
    e.preventDefault();
    newBlogQuery.mutate({
      user,
      blogEntry: {
        title,
        author,
        url,
        user: user.id,
      },
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <div>
      <form onSubmit={handleCreateNewBlog}>
        <label htmlFor="title">Title</label>
        <input id="title" value={title} onChange={handleTitleChange} />
        <label htmlFor="author">Author</label>
        <input id="author" value={author} onChange={handleAuthorChange} />
        <label htmlFor="url">Url</label>
        <input id="url" value={url} onChange={handleUrlChange} />
        <button
          type="submit"
          onClick={handleCreateNewBlog}
          className="submit-new-blog"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewBlog;
