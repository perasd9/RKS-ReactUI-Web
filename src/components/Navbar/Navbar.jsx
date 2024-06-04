import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/rectangle.png";
import "./navbar.scss";
import { useCookies } from "react-cookie";

function Navbar() {
  const [cookie, setCookie, removeCookie] = useCookies(["login"]);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <nav className={`nav ${isOpen ? "open" : ""}`}>
      <div className="logo">
        <div className="imageWrapper">
          <img src={logo}></img>
        </div>
        <h4>PSN</h4>
      </div>
      <div className="menu">
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <div className={`bar ${isOpen ? "open" : ""}`}></div>
          <div className={`bar ${isOpen ? "open" : ""}`}></div>
          <div className={`bar ${isOpen ? "open" : ""}`}></div>
        </div>
        <ul className={`menu-list ${isOpen ? "open" : ""}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/addevent">Add Event</Link>
          </li>
        </ul>
      </div>

      <div>
        {cookie.admin !== undefined || cookie.user !== undefined ? (
          <button
            className="button"
            onClick={() => {
              removeCookie("admin");
              removeCookie("user");
              navigate("/login");
            }}
          >
            Log out
          </button>
        ) : (
          <button
            className="button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Log in
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
