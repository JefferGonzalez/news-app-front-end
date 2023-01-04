import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Form, FloatingLabel } from "react-bootstrap";
import { Message } from "../components/message";

import { AuthContext } from "../context/AuthContext";

import { API_URL } from "../constants";

export const Login = () => {
  const { token, setCookie } = useContext(AuthContext);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  const handleChange = ({ name, value }) => {
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = API_URL({ controller: "Auth", action: "login" });
    const body = new FormData();
    body.append("email", user.email);
    body.append("password", user.password);
    const response = await fetch(URL, {
      method: "POST",
      body: body,
    });
    const { token, data, error } = await response.json();
    if (error) {
      setMessage({
        text: error,
        type: "danger",
      });
      return;
    }
    setCookie("token", token, { path: "/", maxAge: 7 * 24 * 60 * 60 });
    setCookie("user", data.username, { path: "/", maxAge: 7 * 24 * 60 * 60 });
    redirectHome();
  };

  const redirectHome = () => {
    navigate("/home");
  };

  useEffect(() => {
    (() => {
      if (token) {
        redirectHome();
      }
    })();
  });

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <Card>
        <Card.Header className="text-center">
          <Card.Title>News App</Card.Title>
        </Card.Header>
        <Card.Body>
          {message.type !== "" && (
            <Message variant={message.type || "danger"} setMessage={setMessage}>
              {message.text || "Un error inesperado ha ocurrido"}
            </Message>
          )}
          <Form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="email"
              label="Correo Electrónico"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="Correo Electrónico"
                name="email"
                onChange={(e) => handleChange(e.target)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="password"
              label="Contraseña"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => handleChange(e.target)}
              />
            </FloatingLabel>
            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit">
                Iniciar Sesion
              </Button>
            </div>
          </Form>
        </Card.Body>
        <Card.Footer>
          <div className="d-flex flex-column align-items-center">
            <span>¿No tienes una cuenta?</span>
            <Button variant="success" as={Link} to="/register">
              Registrarse
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};
