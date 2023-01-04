import { HashRouter, Routes, Route } from "react-router-dom";
import { Home } from "./../pages/Home";
import { Login } from "./../pages/Login";
import { Register } from "./../pages/Register";
import { LandingPage } from "./../pages/LandingPage";
import { Profile } from "./../pages/Profile";
import { News } from "./../pages/News";

import App from "./../App";

export const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/news/:id" element={<News />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
