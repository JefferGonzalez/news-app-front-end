import { useState, useContext } from "react";
import { Button, Container, Dropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import logo from "./../assets/react.svg";

export const NavBar = () => {
  const { id, user, token, logout } = useContext(AuthContext);

  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
      className="bg-dark-subtle"
      variant="dark"
      expand="sm"
      fixed="top"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container fluid>
        <Navbar.Brand>
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React logo"
          />{" "}
          News App
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {token && (
            <>
              <Dropdown>
                <Dropdown.Toggle variant="dark" className="bg-dark-subtle">
                  {user + " "}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    as={Link}
                    to={`/home`}
                    onClick={() => setExpanded(false)}
                  >
                    Inicio
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to={`/profile/${id}`}
                    onClick={() => setExpanded(false)}
                  >
                    Perfil
                  </Dropdown.Item>
                  <Dropdown.Item as={Button} onClick={logout}>
                    Cerrar sesión
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
