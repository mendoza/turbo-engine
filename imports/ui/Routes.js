import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import CreateUsers from "./pages/CreateUsers";
import Empresa from "./pages/Empresa";
import Login from "./pages/Login";
import ListUsers from "./pages/ListUsers";
import UpdateUsers from "./pages/UpdateUsers";
import RestorePass from "./pages/RestorePass";
import Piezas from "./pages/Piezas"
import CreatePiezas from "./pages/CreatePiezas";

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
  {
    path: "/empresa",
    name: "Empresa",
    component: Empresa,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/seccionPiezas",
    name: "Piezas",
    component: Piezas,
  },
  {
    path: "/restablecerContra",
    name: "Restablecer",
    component: RestorePass,
  },
  {
    path: "/crearPiezas",
    name: "CrearP",
    component: CreatePiezas,
  }
];

export default Routes;
