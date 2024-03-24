// App.js
import React from "react";
import { Link } from "react-router-dom";
// import MainSection from "./MainSection";
// import CardCourse from "./CardCourse";
import Contact from "../Contacts/Contact";

const Home = () => {
  return (
    <>
      <div className="container">
        {/* <MainSection />
        <CardCourse /> */}
        <h2 className="mt-5">Sistema de Venta de Entrrada </h2>
        <hr />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet vero
          commodi recusandae repellendus dolore, adipisci iusto amet labore,
          animi laborum nesciunt nobis asperiores! Quae, ipsam laborum ipsum at
          repellendus quis.
        </p>
        <Contact />
      </div>
    </>
  );
};

export default Home;
