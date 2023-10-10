import React, { useState } from "react";
import { loginUser } from "../services/login";
import Message from "./Message";

function LoginPage({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleUserLogin = async (e) => {
    e.preventDefault();
    let response;
    try {
      response = await loginUser(username, password);
    } catch (err) {
      console.log(err.response.data.error);
      setShowMessage(
        <Message color="red"> {err.response.data.error} </Message>
      );
      setTimeout(() => setShowMessage(""), 3000);
    }
    setUser(response);
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      {showMessage}
      <form onSubmit={handleUserLogin}>
        <label htmlFor="username">Username: </label>
        <input
          value={username}
          id="username"
          onChange={handleUsernameChange}
        ></input>
        <label htmlFor="password">Password: </label>
        <input
          value={password}
          id="password"
          onChange={handlePasswordChange}
        ></input>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default LoginPage;
