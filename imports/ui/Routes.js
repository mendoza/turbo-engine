import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import CreateUsers from "./pages/CreateUsers";
import Login from "./pages/Login";
import ListUsers from "./pages/ListUsers";
import DeleteUsers from "./pages/DeleteUsers";
import UpdateUsers from "./pages/UpdateUsers";

const Routes = [
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
    path: "/crear",
    name: "Crear",
    component: CreateUsers,
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/list",
    name: "Listar",
    component: ListUsers,
  },
  {
    path: "/delete",
    name: "Eliminar",
    component: DeleteUsers,
  },
  {
    path: "/update",
    name: "Actualizar",
    component: UpdateUsers,
  },
];
export default Routes;
