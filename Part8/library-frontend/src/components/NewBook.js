import { useApolloClient, useMutation, useSubscription } from "@apollo/client";
import { useState } from "react";
import { GET_BOOKS, NEW_BOOK, BOOK_ADDED } from "../queries";

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const client = useApolloClient();

  const updateCache = (cache, query, toAdd) => {
    cache.updateQuery(query, ({ allBooks }) => {
      const fillerSet = new Set();
      console.log([...allBooks, toAdd], allBooks.concat(toAdd));
      const filteredBooks = [...allBooks, toAdd].filter((book) => {
        return fillerSet.has(book.id) ? false : fillerSet.add(book.id);
      });
      console.log(filteredBooks);
      return {
        allBooks: filteredBooks,
      };
    });
  };

  const [addBook] = useMutation(NEW_BOOK, {
    update(cache, response) {
      updateCache(
        cache,
        { query: GET_BOOKS, variables: { genre: "", author: "" } },
        response.data.addBook
      );
    },
  });

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log(data);
      window.alert("New Book Added");
      updateCache(
        client.cache,
        { query: GET_BOOKS, variables: { genre: "", author: "" } },
        data.data.bookAdded
      );
    },
  });

  // const [addBook] = useMutation(NEW_BOOK, {
  //   update(cache, response) {
  //     cache.updateQuery(
  //       // when using updateQuery, this has to have the flag variables : {genre: "", author: ""} as this is the cached response :/
  //       { query: GET_BOOKS, variables: { genre: "", author: "" } },
  //       ({ allBooks }) => {
  //         return {
  //           allBooks: [...new Set(allBooks.concat(response.data.addBook))],
  //         };
  //       }
  //     );
  //   },
  // });

  // useSubscription(BOOK_ADDED, {
  //   onData: ({ data }) => {
  //     console.log(data);
  //     window.alert("New Book Added");
  //     client.cache.updateQuery(
  //       { query: GET_BOOKS, variables: { genre: "", author: "" } },
  //       ({ allBooks }) => {
  //         return {
  //           allBooks: [...new Set(allBooks.concat(data.data.bookAdded))],
  //         };
  //       }
  //     );
  //   },
  // });

  const submit = async (event) => {
    event.preventDefault();

    addBook({
      variables: { title, author, published: Number(published), genres },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;

//
