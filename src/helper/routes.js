// Auth
import Login from "../pages/auth/login";
import Signup from "../pages/auth/signup";
import ResetPassword from "../pages/auth/reset-password";

//Private
import Upload from "../pages/upload";

import NotFound from "../pages/not-found";

const routes = [
  {
    name: "Login",
    path: "/",
    component: <Upload />, // revert this back to <Login />
    type: "public",
  },
  {
    name: "Login",
    path: "/login",
    component: <Login />,
    type: "public",
  },
  {
    name: "Signup",
    path: "/signup",
    component: <Signup />,
    type: "public",
  },
  {
    name: "Reset Password",
    path: "/reset-password",
    component: <ResetPassword />,
    type: "public",
  },
  {
    name: "Upload",
    path: "upload",
    component: <Upload />,
    icon: "fa-home",
    type: "private",
    permissions: ["admin", "analyst", "client"],
    showInMenu: false,
  },
  {
    name: "Tasks",
    path: "tasks",
    component: <Upload />,
    icon: "ri-stack-line",
    type: "private",
    permissions: ["admin", "analyst", "client"],
    showInMenu: true,
  },
  {
    name: "AI Tasks",
    path: "ai-tasks",
    component: <Upload />,
    icon: "ri-sparkling-2-fill",
    type: "private",
    permissions: ["admin", "analyst", "client"],
    showInMenu: true,
  },
  // {
  //   name: "Error 404",
  //   path: "*",
  //   icon: "",
  //   component: <NotFound />,
  //   type: "private",
  //   permissions: [],
  //   showInMenu: false,
  // },
];

export default routes;
