import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import CreateUsers from "./pages/CreateUsers";
import EditUsers from "./pages/EditUsers";
import Login from "./pages/Login";

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
    path: "/editar",
    name: "Editar",
    component: EditUsers
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];
export default Routes;
