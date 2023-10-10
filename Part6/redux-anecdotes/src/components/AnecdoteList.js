import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeStore, changeAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

function AnecdoteList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeStore());
    // eslint-disable-next-line
  }, []);

  const anecdotes = useSelector((state) =>
    state.anecdotes
      .filter((anecdote) => anecdote.content.includes(state.filter))
      .sort((a, b) => b.votes - a.votes)
  );

  const actionFeedback = (feedback, duration) => {
    dispatch(setNotification(feedback, duration));
  };

  const upVote = (anecdote, id) => {
    dispatch(changeAnecdote(id, { ...anecdote, votes: anecdote.votes + 1 }));
    actionFeedback(`Voted for '${anecdote.content.slice(0, 100)}'`, 5000);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => upVote(anecdote, anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnecdoteList;
