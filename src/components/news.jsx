import { Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { newsFragment } from "../utils/newsFragment";

export const News = ({ data }) => {
  const [parragraphs, readTime] = newsFragment(data.description);
  return (
    <Alert variant="secondary">
      <Alert.Heading>
        <h5>{data.title}</h5>
      </Alert.Heading>
      <p>{parragraphs}</p>
      <hr />
      <p className="mb-0 d-flex justify-content-between">
        <Button as={Link} to={`/news/${data.id}`}>
          Leer más
        </Button>
        Tiempo estimado de lectura:{" "}
        {readTime == 0 || readTime == 1 ? "menos de un minuto" : readTime + " minutos"}
      </p>
    </Alert>
  );
};
