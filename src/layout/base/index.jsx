import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { FloatButton, Popover, Switch } from "antd";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Index() {
  let token = localStorage.getItem(process.env.REACT_APP_JWT_TOKEN);

  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  return (
    <div>
      <div className="base-layout">
        <div className="main">
          <Navbar />
          <div className="page-content">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
      <FloatButton.BackTop />
    </div>
  );
}
