import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/signup">SignUp</Link> |{" "}
      <Link to="/login">Login</Link> |{" "}
      <Link to="/private">Private</Link> |{" "}
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};
