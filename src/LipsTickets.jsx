import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./componets/menu/menu";
import routes from "./routes/index";
// import "./home.css";

function LipsTickets() {
  return (
    <Router>
      <header>
        <h2>Conviértete en la próxima estella FULL STACK</h2>
        <h2>
          estudianto en <b> IT ACADEMY</b>
        </h2>
      </header>
      <div className="main">
        <div className="aside">
          <Menu />
        </div>
        <div className="section">
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default LipsTickets;
