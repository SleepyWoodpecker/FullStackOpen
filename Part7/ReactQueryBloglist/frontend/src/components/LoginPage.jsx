import React, { useState } from "react";
import { loginUser } from "../services/login";
import useBlogContext from "../hooks/useBlogContext";

function LoginPage() {
  const { dispatchUser, dispatchMessage } = useBlogContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleUserLogin = async (e) => {
    e.preventDefault();
    let response;
    try {
      response = await loginUser(username, password);
    } catch (err) {
      console.log(err.response.data.error);
      dispatchMessage({
        type: "show_notification",
        payload: err.response.data.error,
      });
      setTimeout(() => dispatchMessage({ type: "clear_notification" }), 3000);
    }
    dispatchUser({ type: "user_login", payload: response });
    setUsername("");
    setPassword("");
  };

  return (
    <div>
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
