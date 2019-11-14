import Users from "./pages/Users";
import About from "./pages/About";
import CreateUsers from "./pages/CreateUsers";
import ListUsers from "./pages/ListUsers";
import DeleteUsers from "./pages/DeleteUsers";
import UpdateUsers from "./pages/UpdateUsers";
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
