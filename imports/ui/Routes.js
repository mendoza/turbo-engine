import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
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
    path: "/login",
    name: "Login",
    component: Login,
  },
];
export default Routes;
