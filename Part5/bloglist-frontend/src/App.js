import { useState, useEffect } from "react";
import { getAll } from "./services/blogs";
import LoginPage from "./components/LoginPage";
import BlogPage from "./components/BlogPage";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await getAll();
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    };
    getBlogs();
  }, []);
  return (
    <div>
      {/* since this user object is a state that you are going to store an object inside, you should use a === null comparator to make it truthy / falsy */}
      {(user === null || user === undefined) && <LoginPage setUser={setUser} />}
      {user !== null && user !== undefined && (
        <BlogPage
          blogs={blogs}
          user={user}
          setUser={setUser}
          setBlogs={setBlogs}
        />
      )}
    </div>
  );
};

export default App;
