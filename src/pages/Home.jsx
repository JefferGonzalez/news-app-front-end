import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { News } from "../components/news";
import { Message } from "../components/message";

import { AuthContext } from "../context/AuthContext";

import { API_URL } from "../constants";

export const Home = () => {
  const { id, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [allNews, setAllNews] = useState([]);
  const [news, setNews] = useState({
    title: "",
    description: "",
  });
  const [isUpdated, setIsUpdated] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  useEffect(() => {
    (async () => {
      if (!token) {
        return navigate("/");
      } else {
        const URL = API_URL({ controller: "News", action: "getAll" });
        const response = await fetch(URL);
        const { data } = await response.json();
        setAllNews(data);
      }
    })();
  }, [isUpdated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = API_URL({ controller: "News", action: "create" });
    const body = new FormData();
    body.append("title", news.title);
    body.append("description", news.description);
    body.append("user_id", id);
    const response = await fetch(URL, {
      method: "POST",
      body: body,
    });

    const { message, error } = await response.json();
    if (error) {
      setMessage({
        text: error,
        type: "danger",
      });
      return;
    }
    setIsUpdated(!isUpdated);
    cleanForm();
    setMessage({
      text: message,
      type: "success",
    });
  };

  const handleChange = ({ name, value }) => {
    setNews((news) => ({ ...news, [name]: value }));
  };

  const cleanForm = () => {
    setNews({
      title: "",
      description: "",
    });
  };

  return (
    <Row className="d-flex justify-content-center">
      <Col md={10}>
        <Card className="bg-dark-subtle">
          <Card.Body>
            {message.type !== "" && (
              <Message
                variant={message.type || "danger"}
                setMessage={setMessage}
              >
                {message.text || "Un error inesperado ha ocurrido"}
              </Message>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Control
                id="title"
                name="title"
                className="mb-3"
                type="text"
                placeholder="Titulo"
                onChange={(e) => handleChange(e.target)}
                value={news.title}
                required
              />
              <Form.Control
                id="description"
                name="description"
                className="mb-3"
                as="textarea"
                placeholder="¿Qué esta sucediendo ahora?"
                onChange={(e) => handleChange(e.target)}
                value={news.description}
                required
              />
              <div className="d-flex justify-content-end">
                <Button className="mt-3" variant="primary" type="submit">
                  Publicar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col md={10}>
        <Card className="bg-dark-subtle">
          <Card.Body>
            {allNews ? (
              allNews
                .sort((a, b) => b.id - a.id)
                .map((news) => <News key={news.id} data={news} />)
            ) : (
              <div className="d-flex justify-content-center">
                <h1>No hay noticias</h1>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
