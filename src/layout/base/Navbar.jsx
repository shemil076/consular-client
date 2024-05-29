import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import ClientLogoDark from "../../assets/img/client-logo-dark.png";
import ClientLogoLight from "../../assets/img/client-logo-light.png";

import { checkLogged } from "../../store/auth/authSlice";
import { sendNotify } from "../../helper";

export default function Navbar() {
  const dispatch = useDispatch();

  const { themeMode } = useSelector((state) => state.theme);

  const logout = () => {
    sendNotify("success", "Logout successfully!");
    localStorage.clear(process.env.REACT_APP_JWT_TOKEN);
    axios.defaults.headers.common["Authorization"] = null;
    dispatch(checkLogged());
  };

  return (
    <nav className="navbar">
      <img
        className="logo"
        src={themeMode == "dark" ? ClientLogoDark : ClientLogoLight}
        alt=""
      />
      <button className="primary-btn" onClick={logout}>
        <i className="ri-shut-down-line"></i> Logout
      </button>
    </nav>
  );
}
