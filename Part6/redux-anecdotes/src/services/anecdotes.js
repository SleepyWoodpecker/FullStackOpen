import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const fetchAnecdotes = async () => {
  const { data: anecdotes } = await axios.get(baseUrl);
  return anecdotes;
};

const createAnecdote = async (newContent) => {
  const { data: newAnecdote } = await axios.post(baseUrl, {
    content: newContent,
    votes: 0,
  });
  return newAnecdote;
};

const modifyPost = async (id, anecdote) => {
  const { data: modifiedAnecdote } = await axios.put(
    `${baseUrl}/${id}`,
    anecdote
  );
  return modifiedAnecdote;
};

export { fetchAnecdotes, createAnecdote, modifyPost };
