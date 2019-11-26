import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import CreateUsers from "./pages/CreateUsers";
import Empresa from "./pages/Empresa";
import Login from "./pages/Login";
import ListUsers from "./pages/ListUsers";
import UpdateUsers from "./pages/UpdateUsers";
import RestorePass from "./pages/RestorePass";
import PiezasPage from "./pages/PiezasPage";
import AutosPage from "./pages/AutosPage";

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
    path: "/seccionVehiculos",
    name: "Vehiculos",
    component: AutosPage,
  },
];

export const dashboardRoutes = [
  { pathName: "/", name: "Inicio", icon: "fas fa-tachometer-alt" },
  {
    pathName: "/listarUsuarios",
    name: "Listar usuarios",
    icon: "fas fa-clipboard-list",
    permission: "superAdmin",
  },
  {
    pathName: "/crearUsuarios",
    name: "Crear usuarios",
    icon: "fas fa-user-plus",
    permission: "superAdmin",
  },
];
