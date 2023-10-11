import { useQuery } from "@apollo/client";
import React from "react";
import { GET_BOOKS, GET_USER } from "../queries";
import { useNavigate } from "react-router-dom";

function Reccomendations() {
  const userQuery = useQuery(GET_USER);
  const navigate = useNavigate();
  const bookQuery = useQuery(GET_BOOKS, {
    variables: { genre: userQuery.data?.me.favouriteGenre },
  });
  // this creates an error in the browser, but the situation should not even be occurring in the first place so...
  if (userQuery.error) {
    return navigate("/login");
  }

  if (userQuery.loading) {
    return <div>Loading...</div>;
  }
  console.log(userQuery.data);
  console.log(bookQuery.data);
  return (
    <div>
      <h1>recommendations</h1>
      <p>
        books in your favourite genre{" "}
        <strong>{userQuery.data.me.favouriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookQuery.data?.allBooks.map((book) => {
            return (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Reccomendations;
