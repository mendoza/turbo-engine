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
];

export const dashboardRoutes = [
  { pathName: "/", name: "Inicio", icon: "fas fa-tachometer-alt" },
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
  },
  {
    pathName: "/seccionPiezas",
    name: "Piezas",
    icon: "fas fa-puzzle-piece",
  },
  {
    pathName: "/restablecerContra",
    name: "Modificar contraseña",
    icon: "fas fa-edit",
    permission: "superAdmin",
  },
];
