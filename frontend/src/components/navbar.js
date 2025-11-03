import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check login status when page loads or when route changes
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, [location]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  // Hide Dashboard link when user is not logged in or on login/register
  const hideDashboard =
    location.pathname === "/" || location.pathname === "/register";

  return (
    <nav className="navbar">
      <h2>AWS Learning Platform</h2>

      <div>
        {!isLoggedIn ? (
          <>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            {!hideDashboard && <Link to="/dashboard">Dashboard</Link>}
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
