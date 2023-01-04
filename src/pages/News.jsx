import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

import { AuthContext } from "../context/AuthContext";

import { API_URL } from "../constants";

export const News = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    (async () => {
      if (!token) {
        navigate("/");
      } else {
        const URL = API_URL({ controller: "News", action: "searchForId" });
        const response = await fetch(`${URL}&id=${id}`);
        const data = await response.json();
        setNews(data);
      }
    })();
  }, []);

  return (
    <div className="d-flex justify-content-center">
      {news && (
        <Card>
          <Card.Header>{news.title}</Card.Header>
          <Card.Body>
            <Card.Text>{news.description}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              Publicado por {news.author} el {news.date}
            </small>
          </Card.Footer>
        </Card>
      )}
    </div>
  );
};
