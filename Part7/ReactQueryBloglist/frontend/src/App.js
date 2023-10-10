import { createContext, useReducer } from "react";
import { getAll } from "./services/blogs";
import BlogHomePage from "./pages/BlogHomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import userReducer from "./reducers/userReducer";
import Message from "./components/Message";
import messageReducer from "./reducers/messageReducer";

export const BlogContext = createContext(null);

const App = () => {
  const result = useQuery({ queryKey: ["blogs"], queryFn: getAll });

  const [user, dispatchUser] = useReducer(
    userReducer,
    JSON.parse(window.localStorage.getItem("user"))
  );

  const initialMessageState = { color: "", content: "" };
  const [message, dispatchMessage] = useReducer(
    messageReducer,
    initialMessageState
  );

  if (result.isLoading) {
    return <div>LOADING...</div>;
  }

  const blogs = result.data;
  // console.log(blogs);
  return (
    <BlogContext.Provider
      value={{ blogs, user, dispatchUser, dispatchMessage }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BlogHomePage />} />
        </Routes>
      </BrowserRouter>
      {message.content && (
        <Message color={message.color}>{message.content}</Message>
      )}
    </BlogContext.Provider>
  );
};

export default App;
