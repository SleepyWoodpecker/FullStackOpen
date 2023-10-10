import axios from "axios";

const loginUser = async (username, password) => {
  const decoded = await axios.post("/api/login", { username, password });
  window.localStorage.setItem("user", JSON.stringify(decoded.data));
  return decoded.data;
};

export { loginUser };
