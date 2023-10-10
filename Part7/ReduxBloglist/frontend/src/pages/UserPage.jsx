import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../app/selectors";

function UserPage() {
  const { id } = useParams();
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   const getUser = async () => {
  //     const selectedUser = await getUserById(id);
  //     setUser(selectedUser);
  //   };
  //   getUser();
  // }, []);
  const user = useSelector((state) => selectUser(state, id));

  if (!user) {
    console.log(`there is no such user`);
    return null;
  }
  console.log(user);
  return (
    <div>
      <h1>{user.username}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default UserPage;
