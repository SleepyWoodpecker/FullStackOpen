import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog } from "../services/blogs";
import { likeBlog, publishComment } from "../app/reducers/blogReducer";
import { selectBlog } from "../app/selectors";
import TextBox from "../components/TextBox";
import { addComment } from "../services/blogs";
import useForm from "../hooks/useForm";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function SingleBlogPage() {
  const { id } = useParams();
  const blog = useSelector((state) => selectBlog(state, id));
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { clearForm, ...comment } = useForm("text");

  if (!blog) {
    return null;
  }

  const handleLikeBlog = async () => {
    dispatch(likeBlog(id));
    await updateBlog(user, id, {
      ...blog,
      user: user.id,
      likes: blog.likes + 1,
    });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    dispatch(publishComment({ comment: comment.value, id }));
    const updatedBlog = await addComment(id, { comment: comment.value });
    clearForm();
  };

  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url} style={{ display: "block" }}>
        {blog.url}
      </a>
      <p style={{ display: "inline-block" }}>{blog.likes}</p>
      <Button className="m-2" variant="primary" onClick={handleLikeBlog}>
        like
      </Button>
      <p>added by {blog.user.username}</p>
      <h2>comments</h2>
      <Form onSubmit={handleCommentSubmit}>
        <Form.Group className="mb-3">
          <TextBox
            handleCommentSubmit={handleCommentSubmit}
            comment={comment}
          />
        </Form.Group>
        <Button variant="primary" size="lg" onClick={handleCommentSubmit}>
          add comment
        </Button>
      </Form>
      <ul>
        {blog.comments.map((comment) => {
          return <li key={comment}>{comment}</li>;
        })}
      </ul>
    </div>
  );
}

export default SingleBlogPage;
