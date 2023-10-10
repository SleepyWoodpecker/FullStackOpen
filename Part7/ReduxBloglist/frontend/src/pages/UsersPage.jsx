import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../services/users";
import { setUsers } from "../app/reducers/usersReducer";
import { Link } from "react-router-dom";

function UsersPage() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUsers = async () => {
      const usersList = await getUsers();
      dispatch(setUsers(usersList));
    };
    fetchUsers();
  }, []);

  console.log(users);

  return (
    <div>
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <th> </th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <Link
                    style={{ textDecoration: "underline" }}
                    to={`/users/${user.id}`}
                  >
                    {user.username}
                  </Link>
                </td>
                <td style={{ textAlign: "center" }}>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UsersPage;
