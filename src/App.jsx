import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { NavBar } from "./components/nav-bar";

import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Container
        fluid
        style={{
          marginTop: "56px",
          padding: "12px",
        }}
      >
        <Outlet />
      </Container>
    </AuthProvider>
  );
}

export default App;
