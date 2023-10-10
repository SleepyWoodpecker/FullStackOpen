import React from "react";

function messageBox({ messageBoxContent: { color, message } }) {
  const messageStyle = {
    backgroundColor: "lightgray",
    borderStyle: "solid",
    borderRadius: 1,
    borderColor: color,
    color: color,
    fontSize: 20,
    marginBottom: 5,
  };

  return message ? <div style={messageStyle}>{message}</div> : "";
}

export default messageBox;
