import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import EditBirthYear from "./EditBirthYear";

const Authors = () => {
  const authorQuery = useQuery(ALL_AUTHORS);

  if (authorQuery.loading) return <div>LOADING...</div>;
  const authors = authorQuery.data.allAuthors;
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditBirthYear authors={authors} />
    </div>
  );
};

export default Authors;
