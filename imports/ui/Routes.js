import Users from "./pages/Users";
import About from "./pages/About";
import CreateUsers from "./pages/CreateUsers";
import EditUsers from "./pages/EditUsers";

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
    path: "/crear",
    name: "Crear",
    component: CreateUsers,
  },
  {
    path: "/editar",
    name: "Editar",
    component: EditUsers,
  },
];
export default Routes;
