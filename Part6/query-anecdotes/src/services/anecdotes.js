import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

async function getAnecdotes() {
  const { data: anecdotes } = await axios.get(baseUrl);
  return anecdotes;
}

async function createAnecdote(content) {
  const { data: newAnecdote } = await axios.post(baseUrl, {
    content,
    votes: 0,
  });
  return newAnecdote;
}

async function updateAnecdote(anecdote) {
  const { data: updatedAnecdote } = await axios.put(
    `${baseUrl}/${anecdote.id}`,
    anecdote
  );
  console.log(updatedAnecdote);
  return updatedAnecdote;
}

export { getAnecdotes, createAnecdote, updateAnecdote };
