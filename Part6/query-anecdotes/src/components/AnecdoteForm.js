import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../services/anecdotes";
import { useNotificationDispatch } from "./NotificationContext";

const AnecdoteForm = () => {
  const client = useQueryClient();
  const dispatch = useNotificationDispatch();
  const displayNotification = (content, duration) => {
    dispatch({ type: "SHOW", payload: content });
    setTimeout(() => dispatch({ type: "DISMISS" }), duration);
  };
  const newAnecdote = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      displayNotification("new post created", 5000);
      // client.invalidateQueries("anecdotes")
      const anecdotes = client.getQueryData("anecdotes");
      client.setQueryData("anecdotes", anecdotes.concat(newAnecdote));
    },
    onError: (error) => {
      displayNotification(error.response.data.error, 5000);
    },
  });

  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    newAnecdote.mutate(content);

    event.target.anecdote.value = "";
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
