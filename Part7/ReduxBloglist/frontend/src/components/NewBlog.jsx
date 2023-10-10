import React, { useState } from "react";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import {
  clearNotification,
  showNotification,
} from "../app/reducers/notificationReducer";
import { createBlog } from "../app/reducers/blogReducer";
import { createNewBlog } from "../services/blogs";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextBox from "./TextBox";
import useForm from "../hooks/useForm";

function NewBlog({ user }) {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const { clearForm: clearTitle, ...title } = useForm("text");
  const { clearForm: clearAuthor, ...author } = useForm("text");
  const { clearForm: clearUrl, ...url } = useForm("text");
  const handleCreateNewBlog = async (e) => {
    e.preventDefault();
    let newBlog;
    try {
      newBlog = await createNewBlog(user, {
        title: title.value,
        author: author.value,
        url: url.value,
        user: user.id,
        comments: [],
      });
      // setMessage(
      //   <Message color="green">
      //     A new blog! {newBlog.title} by {newBlog.author} added{" "}
      //   </Message>
      // );
      dispatch(
        showNotification({
          content: `A new blog! ${newBlog.savedBlog.title} by ${newBlog.savedBlog.author} added`,
          color: "green",
        })
      );

      // setTimeout(() => setMessage(""), 3000);
      setTimeout(() => dispatch(clearNotification()), 3000);
    } catch (err) {
      // setMessage(<Message color="red"> {err.response.data.error} </Message>);
      // return setTimeout(() => setMessage(""), 3000);
      dispatch({ content: err.response.data.error, color: "red" });
      return setTimeout(() => clearNotification(), 3000);
    }
    // setBlogs((blogs) => blogs.concat(newBlog.savedBlog));
    dispatch(createBlog(newBlog.savedBlog));
    clearUrl();
    clearTitle();
    clearAuthor();
  };
  return (
    <div>
      {notification.content && (
        <Message color={notification.color}>{notification.content}</Message>
      )}
      <Form className="mb-4" onSubmit={handleCreateNewBlog}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <TextBox content={title}></TextBox>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Author</Form.Label>
              <TextBox content={author}></TextBox>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Url</Form.Label>
              <TextBox content={url}></TextBox>
            </Form.Group>
          </Col>
        </Row>
        <Button
          variant="primary"
          onClick={handleCreateNewBlog}
          className="mt-2"
        >
          submit
        </Button>
      </Form>
    </div>
  );
}

export default NewBlog;
