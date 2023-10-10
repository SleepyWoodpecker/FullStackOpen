import { useQuery, useQueryClient, useMutation } from "react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, updateAnecdote } from "./services/anecdotes";
import { useNotificationDispatch } from "./components/NotificationContext";

const App = () => {
  const client = useQueryClient();
  const dispatch = useNotificationDispatch();
  const displayNotification = (content, duration) => {
    dispatch({ type: "SHOW", payload: content });
    setTimeout(() => dispatch({ type: "DISMISS" }), duration);
  };
  const putAnecdote = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = client.getQueryData("anecdotes");
      console.log(anecdotes, updatedAnecdote);
      client.setQueryData(
        "anecdotes",
        anecdotes.map((anecdote) =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        )
      );
    },
  });

  const handleVote = (anecdote) => {
    putAnecdote.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    displayNotification(`Voted for '${anecdote.content}'`, 5000);
  };
  const response = useQuery("anecdotes", getAnecdotes, { retry: 1 });

  if (response.isLoading) {
    return <div>Loading...</div>;
  } else if (response.isError) {
    return (
      <div>anecdote service not available due to problems with the server</div>
    );
  }

  const anecdotes = response.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
