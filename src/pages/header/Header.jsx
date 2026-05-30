import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { Button } from "bootstrap";

function Header() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="navbarheader ">
      <h1 className="logo">Blogify</h1>

      {user ? (
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      ) : (
        <div className="nav-links">
          <NavLink to="/login" className="link">
            Login
          </NavLink>
          <NavLink to="/signup" className="link">
            Signup
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Header;
