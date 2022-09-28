import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const { user } = useContext(AuthContext);
  

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
          <span className="logo">BookingApp</span>
        </Link>
        {user ?user.username: ( <div className="navItems">
          <Link to="/login"> <button className="navButton">Login</button> </Link>
          <Link to="/register"><button className="navButton">Register</button></Link>  
          
        </div>)}
        <Link to="/logout"><button className="navButton">Logout</button></Link>  

      </div>
    </div>
  );
};

export default Navbar;
