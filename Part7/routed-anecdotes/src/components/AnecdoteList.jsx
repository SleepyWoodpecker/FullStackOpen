import { Link } from "react-router-dom";

const AnecdoteList = ({ anecdotes }) => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`/anecdote/${anecdote.id}`} style={padding}>
              {anecdote.content}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnecdoteList;
