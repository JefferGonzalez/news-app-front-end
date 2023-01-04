import { useEffect, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

export const LandingPage = () => {
  const { token } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    (() => {
      if (token) {
        return navigate("/home");
      }
    })();
  });

  return (
    <Row className="d-flex justify-content-center fw-bold">
      <Col md={6}>
        <h1 className="text-center">News App</h1>
        <p>
          ¡Bienvenido a nuestra aplicación de noticias! Con nuestra aplicación
          podrás estar al tanto de todas las últimas noticias del mundo en
          tiempo real. Nuestra aplicación cuenta con las siguientes
          características:
        </p>
        <ul>
          <li>Publica los ultimos acontecimientos de tu ciudad.</li>
          <li>Acceso a noticias de todo el mundo</li>
          <li>Personalización de tu feed de noticias</li>
        </ul>
        <p>
          Con nuestra aplicación podrás estar al tanto de todo lo que está
          sucediendo en el mundo sin tener que buscar en diferentes sitios.
        </p>
        <p>
          Si ya tienes una cuenta, inicia sesión. Si no tienes una cuenta,
          registrate.
        </p>
        <div className="text-center">
          <Link to="/login" className="btn btn-primary me-1 fw-bold">
            Iniciar sesión
          </Link>
          - o -
          <Link to="/register" className="btn btn-primary ms-1 fw-bold">
            Registrarse
          </Link>
        </div>
      </Col>
    </Row>
  );
};
