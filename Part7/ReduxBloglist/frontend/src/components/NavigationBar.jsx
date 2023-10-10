import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

function NavigationBar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    window.localStorage.removeItem("user");
    dispatch(setUser(null));
  };
  return (
    <NavBar bg="secondary" fixed="sticky">
      <Nav className="me-auto">
        <Nav.Link className="text-white" as={Link} to="/">
          Blogs
        </Nav.Link>
        <Nav.Link className="text-white" as={Link} to="/users">
          Users
        </Nav.Link>
        <Nav.Link disabled className="text-white">
          {user.name} logged in
        </Nav.Link>
        <Button onClick={handleLogout} variant="warning">
          Logout
        </Button>
      </Nav>
    </NavBar>
  );
}

export default NavigationBar;
