import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import CreateUsers from "./pages/CreateUsers";
import Empresa from "./pages/Empresa";
import Login from "./pages/Login";
import ListUsers from "./pages/ListUsers";
import UpdateUsers from "./pages/UpdateUsers";
import RestorePass from "./pages/RestorePass";
import CreateAutos from "./pages/CreateAutos";
import CreatePiezas from "./pages/CreatePiezas";
import PiezasPage from "./pages/PiezasPage";
import AutosPage from "./pages/AutosPage";
import EstadoAutos from "./pages/EstadoAutos";
import Clientes from "./pages/Clientes";
import Empleados from "./pages/Empleados";
import UpdateTypes from "./pages/UpdateTypes";
import Maquinaria from "./pages/Maquinaria";
import Checkout from "./pages/Checkout";

export const Routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Inicio",
    component: Dashboard,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/crearUsuarios",
    name: "Crear",
    component: CreateUsers,
    permission: "superAdmin",
  },
  {
    path: "/listarUsuarios",
    name: "Listar",
    component: ListUsers,
    permission: "superAdmin",
  },
  {
    path: "/actualizarUsuarios",
    name: "Actualizar",
    component: UpdateUsers,
    permission: "superAdmin",
  },
  {
    path: "/empresa",
    name: "Empresa",
    component: Empresa,
    permission: "superAdmin",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/seccionPiezas",
    name: "Piezas",
    component: PiezasPage,
  },
  {
    path: "/restablecerContra",
    name: "Restablecer",
    component: RestorePass,
  },
  {
    path: "/agregarPiezas",
    name: "CrearP",
    component: CreatePiezas,
  },
  {
    path: "/seccionAutos",
    name: "Autos",
    component: AutosPage,
  },
  {
    path: "/estadoAutos",
    name: "Estado",
    component: EstadoAutos,
  },
  {
    path: "/agregarAutos",
    name: "Agregar Autos",
    component: CreateAutos,
  },
  {
    path: "/clientes",
    name: "Clientes",
    component: Clientes,
  },
  {
    path: "/empleados",
    name: "Empleados",
    component: Empleados,
    permission: "superAdmin",
  },
  {
    path: "/actualizarTipos",
    name: "ActualizarT ",
    component: UpdateTypes,
  },
  {
    pathName: "/maquinaria",
    name: "Maquinaria ",
    component: Maquinaria,
  },
  {
    path: "/factura",
    name: "Checkout",
    component: Checkout,
  },
];

export const dashboardRoutes = [
  {
    pathName: "/",
    name: "Inicio",
    icon: "fas fa-tachometer-alt",
  },
  {
    pathName: "/listarUsuarios",
    name: "Usuarios",
    icon: "fas fa-users",
    permission: "superAdmin",
  },
  {
    pathName: "/seccionAutos",
    name: "Vehiculos",
    icon: "fas fa-car",
    permission: "superAdmin",
  },
  {
    pathName: "/seccionPiezas",
    name: "Piezas",
    icon: "fas fa-puzzle-piece",
    permission: "superAdmin",
  },
  {
    pathName: "/actualizarTipos",
    name: "Tipos",
    icon: "fas fa-wrench",
    permission: "superAdmin",
  },
  {
    pathName: "/clientes",
    name: "Clientes",
    icon: "fas fa-user-tie",
    component: Clientes,
  },
  {
    pathName: "/empleados",
    name: "Empleados",
    icon: "fas fa-people-carry",
    permission: "superAdmin",
    component: Clientes,
  },
  {
    pathName: "/restablecerContra",
    name: "Modificar contraseña",
    icon: "fas fa-edit",
    permission: "superAdmin",
  },
  {
    pathName: "/maquinaria",
    name: "Maquinaria",
    icon: "fas fa-cogs",
    permission: "superAdmin",
  },
];
