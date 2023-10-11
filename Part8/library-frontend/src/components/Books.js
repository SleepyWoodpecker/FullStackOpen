import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries";
import { useState } from "react";

// need to see how this sorting is done

const Books = () => {
  const [filter, setFilter] = useState("all genres");
  const [originalBooks, setOriginalBooks] = useState([]);
  const bookQuery = useQuery(GET_BOOKS, {
    variables: { genre: filter === "all genres" ? "" : filter, author: "" },
    // kind of scuffed, I guess I could have made use of two fetches to the server as well?
    onCompleted: (data) => {
      if (filter === "all genres") {
        setOriginalBooks(data.allBooks);
      }
    },
  });

  if (bookQuery.loading) return <div>LOADING...</div>;
  const { allBooks } = bookQuery.data;
  const bookGenres = [
    ...new Set(originalBooks.map((book) => book.genres).flat()),
    "all genres",
  ];

  return (
    <div>
      <h2>books</h2>
      <p>in genre {filter}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: "flex", gap: 2, marginTop: 10 }}>
        {bookGenres.map((bookGenre) => (
          <button key={bookGenre} onClick={() => setFilter(bookGenre)}>
            {bookGenre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
