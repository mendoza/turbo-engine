import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import CreateUsers from "./pages/CreateUsers";
import Login from "./pages/Login";
import ListUsers from "./pages/ListUsers";
import UpdateUsers from "./pages/UpdateUsers";

const Routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
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
    permission: 'superAdmin',
  },
  {
    path: "/listarUsuarios",
    name: "Listar",
    component: ListUsers,
    permission: 'superAdmin',
  },
  {
    path: "/actualizarUsuarios",
    name: "Actualizar",
    component: UpdateUsers,
    permission: 'superAdmin',
  },
];
export default Routes;
