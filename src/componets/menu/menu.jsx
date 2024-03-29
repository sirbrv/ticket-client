import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../menu/menu.css"; // Archivo CSS donde definiremos los estilos

function MenuItem({ item, isVisible }) {
  const [isOpen, setIsOpen] = useState(false);
  console.log("visible....:", isVisible);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="menuItem">
      <div
        onClick={handleToggle}
        className={`${isVisible ? "menuItemTitle" : "menuItemTitle-left"}`}
      >
        <Link to={item.route}>{item.title}</Link>
      </div>
      {isOpen && (
        <ul className="submenu">
          {item.subItems.map((subItem) => (
            <li
              key={subItem.title}
              // className="submenuItem"
              className={`${isVisible ? "submenuItem" : "submenuItem-left"}`}
            >
              <Link to={subItem.route}>{subItem.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Menu({ isVisible }) {
  // const [isVisible, setIsVisible] = useState(true);
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
        { title: "Gestión de Entradas Vendidas", route: "/ticketsVendido" },
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

  // useEffect(() => {
  //   setIsVisible(isVisible);
  // }, []);

  return (
    <>
      <div>
        {menuItems.map((item) => (
          <MenuItem key={item.title} item={item} isVisible={isVisible} />
        ))}
      </div>
    </>
  );
}

export default Menu;
