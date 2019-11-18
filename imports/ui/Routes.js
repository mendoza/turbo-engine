import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Empresa from "./pages/Empresa";
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
];

export default Routes;
