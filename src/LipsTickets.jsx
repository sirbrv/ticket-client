import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./componets/menu/menu";
import routes from "./routes/index";
import imagen from "../src/assets/Banner-Reserva tu Visita.webp";
import Footer from "./routes/footer/Footer";

function LipsTickets() {
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <Router>
      <header>
        <div className="logo"></div>
        <div className="header"></div>
      </header>
      <main>
        <button className="toggleButton" onClick={toggleMenu}>
          {isMenuVisible ? "Ocultar Menú" : "Mostrar Menú"}
        </button>
        <aside className={`${isMenuVisible ? "asideRigth" : "asideLeft"}`}>
          <Menu />
        </aside>
        <section
          className={`${
            isMenuVisible ? "sectionContentRigth" : "sectionContentLeft"
          }`}
        >
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </section>
      </main>
      <Footer />
    </Router>
  );
}

export default LipsTickets;
