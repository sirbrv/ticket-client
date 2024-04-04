import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./componets/menu/menu";
import routes from "./routes/index";
import Footer from "./routes/footer/Footer";
import { UsersProvider } from "./hooks/UsersContext";

import { useEffect } from "react";

function LipsTickets() {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  useEffect(() => {
    setIsVisible(isMenuVisible);
  }, [isMenuVisible]);

  return (
    <UsersProvider>
      <Router>
        <div class="contenedor">
          <header>
            <div className="logo"></div>
            <div className="header"></div>
          </header>
          <main>
            <button className="toggleButton" onClick={toggleMenu}>
              {isMenuVisible ? "Ocultar Menú" : "Mostrar Menú"}
            </button>
            <aside className={`${isMenuVisible ? "asideRigth" : "asideLeft"}`}>
              <Menu isVisible={isVisible} />
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
        </div>

        <Footer />
      </Router>
    </UsersProvider>
  );
}

export default LipsTickets;
