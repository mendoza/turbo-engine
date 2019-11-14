import Users from "./pages/Users";
import About from "./pages/About";
import Empresa from "./pages/Empresa";

const Routes = [
  {
    path: "/",
    name: "Inicio",
    component: Users,
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
  },
];
export default Routes;
