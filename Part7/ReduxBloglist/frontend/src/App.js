import React, { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";
import { Routes, Route, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./app/reducers/userReducer";
import { setBlogs } from "./app/reducers/blogReducer";
import UserPage from "./pages/UserPage";
import SingleBlogPage from "./pages/SingleBlogPage";
import { getAll } from "./services/blogs";
import NavigationBar from "./components/NavigationBar";
import { getUsers } from "./services/users";
import { setUsers } from "./app/reducers/usersReducer";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(setUser(JSON.parse(window.localStorage.getItem("user"))));
    const getAllData = async () => {
      const [blogs, users] = await Promise.all([getAll(), getUsers()]);
      dispatch(setBlogs(blogs));
      dispatch(setUsers(users));
    };

    getAllData();
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="p-3">
      <NavigationBar />
      <h1>blog app</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserPage />} />
        <Route path="/blogs/:id" element={<SingleBlogPage />} />
      </Routes>
    </div>
  );
}

export default App;
