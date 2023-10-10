import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";

function Message({ color, children }) {
  let variant;
  if (color === "green") {
    variant = "success";
  } else if (color === "red") {
    variant = "danger";
  }
  return (
    <Toast bg={variant} className="w-100">
      <Toast.Header>
        <strong className="me-auto">Blog App</strong>
      </Toast.Header>
      <Toast.Body>{children}</Toast.Body>
    </Toast>
  );
}

export default Message;
