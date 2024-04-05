import Home from "../routes/Hone/home";
import ReadScanner from "./../componets/QR/ReadScanner";
import Contact from "./Contacts/ListContacts";
import Students from "./Estudiantes/ListStudents";
import Academys from "./Academy/ListAcademys";
import Entradas from "./Entradas/ListEntradas";
import Events from "./Eventos/ListEventos";
import Users from "./User/ListUser";
import VentaEntrada from "./Entradas/VentaEntrada";
import TicketsVendido from "./Entradas/ListVentaEntradas";
import GetionAdmin from './Administrativo/ListGestionAdmin'
import Login from "./User/Login";
import Exit from "../componets/exit/Exit";

// import Exit from "./components/Exit";

const routes = [
  { path: "/", element: <Home /> },
  {
    path: "/students",
    element: <Students title={"Gestión de Estudiantes"} />,
  },
  {
    path: "/academias",
    element: <Academys title={"Registro de Academias"} />,
  },
  {
    path: "/Events",
    element: <Events title={"Gestión de Eventos"} />,
  },
  {
    path: "/tickets",
    element: <Entradas title={"Gestión de Entradas"} />,
  },
  {
    path: "/ventaTicket",
    element: <VentaEntrada title={"Venta de Entradas"} />,
  },
  {
    path: "/ticketsVendido",
    element: <TicketsVendido title={"Gestión de Entradas Vendidas"} />,
  },
  {
    path: "/users",
    element: <Users title={"Gestión de Usuários"} />,
  },
  {
    path: "/qrTicket",
    // element: <ReadScanner title={"Escaneo de Entradas"} accion={"ver"} />,
    element: <ReadScanner title={"Escaneo de Entradas"} />,
  },
  {
    path: "/getionAdmin",
    element: <GetionAdmin title={"Escaneo de Entradas"} />,
  },
  {
    path: "/contact",
    element: <Contact title={"Contactos"} />,
  },
  {
    path: "/login",
    element: <Login title={"Loogín"} />,
  },
  { path: "/exit", element: <Exit /> },
];

export default routes;
