import React, { useContext, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../hooks/authContent";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [display, setDisplay] = useState("false");
  const {dispatch} = useContext(AuthContext)
  const navigate = useNavigate()

  function displayBar() {
    setDisplay("false");
  }

  function handleClick(){
    dispatch({type:"LOGOUT"})
    navigate("/")
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Booking App</span>
        </Link>

        {user ? (
          <>
            <div onClick={displayBar}>
              {user.username}
              <button className="navButton" onClick={handleClick}>Logout</button>
            </div>
          </>
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton" onClick={()=> navigate("/login")}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
