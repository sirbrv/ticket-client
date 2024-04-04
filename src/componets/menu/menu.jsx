import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../menu/menu.css"; // Archivo CSS donde definiremos los estilos

function MenuItem({ item, isVisible }) {
  const [isOpen, setIsOpen] = useState(false);

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
  const menuItems = [
    {
      title: "Home",
      route: "/",
      subItems: [],
    },
    {
      title: "Entradas",
      subItems: [
        { title: "Ventas", route: "/ventaTicket" },
        { title: "Scaner", route: "/qrTicket" },
      ],
    },
    {
      title: "Administración",
      subItems: [
        { title: "Academias", route: "/academias" },
        { title: "Estudiante", route: "/students" },
        { title: "Eventos", route: "/events" },
        { title: "Entradas", route: "/tickets" },
        { title: "Ticket Vendídos", route: "/ticketsVendido" },
        { title: "Usuários", route: "/users" },
        { title: "Contactos", route: "/contact" },
      ],
    },
    {
      title: "Listados",
      subItems: [{ title: "Gestión Administratíva", route: "/getionAdmin" }],
    },
    {
      title: "Accesos",
      subItems: [
        { title: "Cambio de Claves", route: "/perfil" },
        { title: "Inicio Sesión", route: "/login" },
        { title: "Exit", route: "/exit" },
      ],
    },
  ];

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
