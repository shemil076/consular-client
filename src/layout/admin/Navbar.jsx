import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ClientAvatar from "../../assets/img/client-avatar.png";

import { toggleThemeMode } from "../../store/theme/themeSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const { themeMode } = useSelector((state) => state.theme);

  return (
    <nav className="admin-navbar">
      <button className="notification-btn">
        <i className="ri-notification-2-line"></i>
      </button>
      <div className="profile-wrap">
        <div className="profile-toggle">
          <i className="ri-arrow-down-s-line"></i>
          <img src={ClientAvatar} alt="" />
        </div>
        <ul className="profile-dropdown">
          <li onClick={() => dispatch(toggleThemeMode())}>
            {themeMode} Mode
            <div className="theme-switch-wrapper">
              <div className={`theme-switch theme-${themeMode}`}>
                <i
                  className={
                    themeMode == "light" ? "ri-sun-line" : "ri-moon-line"
                  }
                ></i>
              </div>
            </div>
          </li>
          <li>Settings</li>
          <li>Log Out</li>
        </ul>
      </div>
    </nav>
  );
}
