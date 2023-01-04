import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button, Card, Table } from "react-bootstrap";
import { Message } from "../components/message";

import { AuthContext } from "../context/AuthContext";

import { newsFragment } from "../utils/newsFragment";

import { API_URL } from "../constants";

export const Profile = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  useEffect(() => {
    (async () => {
      if (!token) {
        navigate("/");
      } else {
        const URL = API_URL({ controller: "Users", action: "searchForId" });
        const response = await fetch(`${URL}&id=${id}`);
        const data = await response.json();
        setUser(data);
      }
    })();
  }, [isUpdated]);

  const handleDelete = async (id) => {
    const URL = API_URL({ controller: "News", action: "delete" });
    const response = await fetch(`${URL}&id=${id}`);
    const { message, error } = await response.json();
    if (error) {
      setMessage({
        text: error,
        type: "danger",
      });
      return;
    }
    setIsUpdated(!isUpdated);
    setMessage({
      text: message,
      type: "success",
    });
  };

  return (
    <>
      {user && (
        <div className="d-flex justify-content-center">
          <Card>
            <Card.Body>
              {message.type !== "" && (
                <Message
                  variant={message.type || "danger"}
                  setMessage={setMessage}
                >
                  {message.text || "Un error inesperado ha ocurrido"}
                </Message>
              )}
              <Card.Title>Hola, {user.username}</Card.Title>
              <Card.Text>
                Este es tu perfil, donde puedes ver el listado de tus noticias
                publicadas.
              </Card.Text>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Titulo</th>
                    <th>Descripcion</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {user.news.data ? (
                    user.news.data.map((news, i) => {
                      const [description] = newsFragment(news.description);
                      return (
                        <tr key={i + 1}>
                          <td>{i + 1}</td>
                          <td>{news.title}</td>
                          <td>{description}</td>
                          <td>
                            <Button
                              variant="primary"
                              as={Link}
                              to={`/news/${news.id}`}
                            >
                              Leer
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => handleDelete(news.id)}
                            >
                              Eliminar
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="4">No hay noticias publicadas</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};
