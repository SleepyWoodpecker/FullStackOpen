import React from "react";
import LoginPage from "../components/LoginPage";
import BlogPage from "../components/BlogPage";
import useBlogContext from "../hooks/useBlogContext";

function BlogHomePage() {
  const { user } = useBlogContext();
  return (
    <div>
      {/* since this user object is a state that you are going to store an object inside, you should use a === null comparator to make it truthy / falsy */}
      {!user && <LoginPage />}
      {user && <BlogPage />}
    </div>
  );
}

export default BlogHomePage;
