import React, { useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { SignOutAPI } from "../../../action";
import "./Header.css";
import Dropdown from "./Dropdown";

function Header(props) {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/home">
          <a href="/home">
            <img src="/images/black-logo.svg" alt="" />
          </a>
        </Link>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/home" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/myprofile"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              My Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/todolist"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              To-Do List
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/mycalendar"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Calendar
            </Link>
          </li>
          <li
            className="nav-item"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to="/findstudybuddy"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Study Buddies <i className="fas fa-caret-down" />
            </Link>
            {dropdown && <Dropdown />}
          </li>

          <li className="nav-item">
            <Link to="/aboutus" className="nav-links" onClick={closeMobileMenu}>
              About Us
            </Link>
          </li>
        </ul>
        <Button />
      </nav>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(SignOutAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
