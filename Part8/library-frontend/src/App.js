import { useCallback, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import Reccomendations from "./components/Reccomendations";

const navStyle = { border: "1px solid black", padding: 3 };

const App = () => {
  const [user, setUser] = useState(null);
  const client = useApolloClient();
  const memonizedSetUser = useCallback(setUser, [setUser]);
  const logoutUser = () => {
    // must remember to reset the apollo cache also
    setUser(null);
    localStorage.clear();
    client.resetStore();
  };
  return (
    <BrowserRouter>
      <div style={{ display: "flex", marginBottom: 10 }}>
        <Link to={"/"} style={navStyle}>
          authors
        </Link>
        <Link to={"/books"} style={navStyle}>
          books
        </Link>
        {user === null ? (
          <Link to={"/login"} style={navStyle}>
            login
          </Link>
        ) : (
          <>
            <Link to={"/reccomendations"} style={navStyle}>
              reccomendations
            </Link>{" "}
            <Link to={"/newBook"} style={navStyle}>
              add book
            </Link>
            <Link to={"/"} style={navStyle} onClick={logoutUser}>
              logout
            </Link>
          </>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/newBook" element={<NewBook />} />
        <Route path="/login" element={<Login setUser={memonizedSetUser} />} />
        <Route path="/reccomendations" element={<Reccomendations />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
