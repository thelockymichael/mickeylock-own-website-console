//HomePage
// Login
// Dashboard
// HomeEdit
// AboutEdit
import AboutEdit from "../components/AboutEdit";
import Dashboard from "../components/Dashboard";
import HomeEdit from "../components/HomeEdit";
import HomePage from "../components/HomePage";
import Login from "../components/Login";
import NotFound from "../components/NotFound";
import ProjectsEdit from "../components/ProjectsEdit";
// Paths
import paths from "./routeUrls";

// Pages

const routes = [
  {
    path: paths.homePage,
    exact: true,
    component: HomePage,
    isPrivate: false,
  },
  {
    path: paths.loginPath,
    exact: true,
    component: Login,
    isPrivate: false,
  },
  {
    path: paths.dashboardPath,
    exact: true,
    component: Dashboard,
    isPrivate: true,
  },
  {
    path: paths.homeEdit,
    exact: true,
    component: HomeEdit,
    isPrivate: true,
  },
  {
    path: paths.aboutEdit,
    exact: true,
    component: AboutEdit,
    isPrivate: true,
  },
  {
    path: paths.projectsEdit,
    exact: true,
    component: ProjectsEdit,
    isPrivate: true,
  },
  {
    path: paths.pageNotFoundPath,
    exact: true,
    component: NotFound,
    isPrivate: false,
  },
];

export default routes;
