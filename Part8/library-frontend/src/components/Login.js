import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { LOGIN_USER } from "../queries";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginQuery, result] = useMutation(LOGIN_USER, {
    onError: (err) => {
      console.error(err);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setUser(token);
      localStorage.setItem("userToken", token);
    }
  }, [result.data, setUser]);

  const loginUser = async (e) => {
    e.preventDefault();
    loginQuery({ variables: { username, password } });
    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={loginUser}>
      <div style={{ display: "block" }}>
        login
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </div>
      <div style={{ display: "block" }}>
        password
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <button style={{ marginTop: 5 }} onClick={loginUser}>
        login
      </button>
    </form>
  );
}

export default Login;
