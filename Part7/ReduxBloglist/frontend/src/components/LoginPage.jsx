import React, { useState } from "react";
import { loginUser } from "../services/login";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import {
  clearNotification,
  showNotification,
} from "../app/reducers/notificationReducer";
import { setUser } from "../app/reducers/userReducer";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const message = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleUserLogin = async (e) => {
    e.preventDefault();
    let response;
    try {
      response = await loginUser(username, password);
    } catch (err) {
      console.log(err.response.data.error);
      dispatch(showNotification(err.response.data.error));
      setTimeout(() => dispatch(clearNotification()), 3000);
    }
    dispatch(setUser(response));
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <Message color={message.color}>{message.content}</Message>
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
