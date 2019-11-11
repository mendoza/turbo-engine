import Users from "./pages/Users";
import About from "./pages/About";
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
];
export default Routes;
