import { useState } from "react";
import Menu from "./components/Menu";
import About from "./components/About";
import AnecdoteList from "./components/AnecdoteList";
import CreateNew from "./components/CreateNew";
import Footer from "./components/Footer";
import { Routes, Route, useMatch } from "react-router-dom";
import AnecdoteDisplay from "./components/AnecdoteDisplay";

const App = () => {
  const [message, setMessage] = useState("");
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);
  const match = useMatch("/anecdote/:id");
  // need to type cast because the param is a string
  const anecdote = match
    ? anecdotes.find((anecdote) => Number(match.params.id) === anecdote.id)
    : null;

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const showMessage = (message, time) => {
    setMessage(message);
    setTimeout(() => setMessage(""), time);
  };

  console.log(anecdotes);
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {message}
      <Routes>
        <Route
          path="/"
          element={<AnecdoteList anecdotes={anecdotes} />}
        ></Route>
        <Route
          path="/create"
          element={<CreateNew addNew={addNew} showMessage={showMessage} />}
        ></Route>
        <Route path="/about" element={<About />}></Route>
        <Route
          path="/anecdote/:id"
          element={<AnecdoteDisplay anecdote={anecdote} />}
        ></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
