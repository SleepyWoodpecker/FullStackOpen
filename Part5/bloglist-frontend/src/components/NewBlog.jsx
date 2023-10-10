import React, { useState } from "react";
import Message from "./Message";

function NewBlog({ createNewBlog, user, setBlogs }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleAuthorChange = (e) => setAuthor(e.target.value);
  const handleUrlChange = (e) => setUrl(e.target.value);
  const handleCreateNewBlog = async (e) => {
    e.preventDefault();
    let newBlog;
    try {
      newBlog = await createNewBlog(user, {
        title,
        author,
        url,
        user: user.id,
      });
      setMessage(
        <Message color="green">
          A new blog! {newBlog.title} by {newBlog.author} added{" "}
        </Message>
      );
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(<Message color="red"> {err.response.data.error} </Message>);
      return setTimeout(() => setMessage(""), 3000);
    }
    console.log(newBlog.savedBlog);
    setBlogs((blogs) => blogs.concat(newBlog.savedBlog));
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <div>
      {message}
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
