import React from "react";
import Form from "react-bootstrap/Form";

function TextBox({ content }) {
  return (
    <>
      <Form.Control {...content}></Form.Control>
    </>
  );
}

export default TextBox;
