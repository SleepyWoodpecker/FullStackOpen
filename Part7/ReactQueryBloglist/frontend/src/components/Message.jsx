import React from "react";

function Message({ color, children }) {
  return (
    <div
      style={{
        borderWidth: 2,
        borderColor: color,
        borderStyle: "solid",
        backgroundColor: "gray",
        color,
      }}
      className="feedback-message"
    >
      {children}
    </div>
  );
}

export default Message;
