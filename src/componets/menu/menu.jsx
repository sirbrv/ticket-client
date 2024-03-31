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
      title: "Usuários",
      subItems: [{ title: "Perfíl", route: "/perfil" }],
    },
    {
      title: "Entradas",
      subItems: [
        { title: "Venta de Entradas", route: "/ventaTicket" },
        { title: "Scaner de Entradas", route: "/qrTicket" },
      ],
    },
    {
      title: "Administración",
      subItems: [
        { title: "Gestión de Academias", route: "/academias" },
        { title: "Gestión de Estudiante", route: "/students" },
        { title: "Gestión de Eventos", route: "/events" },
        { title: "Gestión de Entradas", route: "/tickets" },
        { title: "Gestión de Entradas Vendídas", route: "/ticketsVendido" },
        { title: "Gestión de Usuários", route: "/users" },
        { title: "Contactos", route: "/contact" },
      ],
    },
    {
      title: "Listados",
      subItems: [
        { title: "Gestión Administratíva", route: "/getionAdmin" },
      ],
    },
    {
      title: "Exit",
      route: "/exit",
      subItems: [],
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
