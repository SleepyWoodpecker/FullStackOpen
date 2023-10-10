import React from "react";

function AnecdoteDisplay({ anecdote }) {
  return (
    <div>
      <h1>{anecdote.content}</h1>
      <p>has {anecdote.votes} votes</p>
      <p>
        For more information, visit <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
}

export default AnecdoteDisplay;
