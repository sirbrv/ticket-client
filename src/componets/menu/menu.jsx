import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../menu/menu.css"; // Archivo CSS donde definiremos los estilos

function MenuItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="menuItem">
      <div onClick={handleToggle} className="menuItemTitle">
        <Link to={item.route}>{item.title}</Link>
      </div>
      {isOpen && (
        <ul className="submenu">
          {item.subItems.map((subItem) => (
            <li key={subItem.title} className="submenuItem">
              <Link to={subItem.route}>{subItem.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Menu() {
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  const menuItems = [
    {
      title: "Home",
      route: "/",
      subItems: [],
    },
    {
      title: "Entradas",
      subItems: [
        { title: "Venta de Entradas", route: "/ventaTicket" },
        { title: "Scaner de Entradas", route: "/qrTicket" },
        // { title: "Perfíl", route: "/perfil" },
      ],
    },
    {
      title: "Administración",
      subItems: [
        { title: "Gestión de Academias", route: "/academias" },
        { title: "Gestión de Estudiante", route: "/students" },
        { title: "Gestión de Enentos", route: "/events" },
        { title: "Gestión de Entradas", route: "/tickets" },
        { title: "Contactos", route: "/contact" },
      ],
    },
    // {
    //   title: "Listados",
    //   subItems: [
    //     { title: "Cursos", route: "/vecurso" },
    //     { title: "Listado", route: "/matricula" },
    //   ],
    // },
    {
      title: "Exit",
      route: "/exit",
      subItems: [],
    },
  ];

  return (
    <>
      {/* <button className="toggleButton" onClick={toggleMenu}>
        {isMenuVisible ? "Ocultar Menú" : "Mostrar Menú"}
      </button> */}
      {/* <div className={`menu ${isMenuVisible ? "" : "menuHidden"}`}> */}
      <div>
        {menuItems.map((item) => (
          <MenuItem key={item.title} item={item} />
        ))}
      </div>
    </>
  );
}

export default Menu;
