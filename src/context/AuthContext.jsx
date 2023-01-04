import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(["token", "user"]);
  const [id, setId] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    (() => {
      setUser(cookies.user);
      setToken(cookies.token);
      if (token) {
        const { data } = JSON.parse(window.atob(token.split(".")[1]));
        setId(data);
      }
    })();
  });

  const logout = () => {
    setCookie("token", "", { path: "/", maxAge: 0 });
    setCookie("user", "", { path: "/", maxAge: 0 });
    setUser(null);
    setToken(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ id, user, token, setCookie, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
