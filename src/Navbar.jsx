import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Styles/Navbar.module.css"; // Import module CSS

function Navbar() {
  const location = useLocation(); // Get current route path

  return (
    <nav className={styles.navbar}>
      {/* Left Side Links */}
      <ul className={styles.navLinks}>
        <li><Link to="/">Home</Link></li>
        
        {/* Show additional links ONLY on the Home page */}
        {location.pathname === "/" && (
          <>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="#">Services</Link></li>
            <li><Link to="#">Blog</Link></li>
            <li><Link to="#">Contact</Link></li>
          </>
        )}
      </ul>

      {/* Right Side Links (Login & Register) */}
      <ul className={styles.authLinks}>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
