import React from "react";
import { useSelector } from "react-redux";

import BaseLayout from "./base";
import AdminLayout from "./admin";

export default function Layout() {
  let { userDetails } = useSelector((state) => state.auth);
  console.log(userDetails);
  return userDetails?.role == "end-user" ? <BaseLayout /> : <AdminLayout />;
}
