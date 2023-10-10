import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

const navStyle = { border: "1px solid black", padding: 3 };

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", marginBottom: 5 }}>
        <Link to={"/"} style={navStyle}>
          authors
        </Link>
        <Link to={"/books"} style={navStyle}>
          books
        </Link>
        <Link to={"/newBook"} style={navStyle}>
          add book
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/newBook" element={<NewBook />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
