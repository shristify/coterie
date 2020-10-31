import React from "react";
import { Link } from "react-router-dom";

function Header1() {
  return (
    <nav className="navbar justify-content-center">
      <div style={{height:"100px"}}></div>
      <li className="nav-item nav-link">
        <Link to="/trending" >Top Games</Link>
      </li>
      <li className="nav-item nav-link">
        <Link to="/trending/top-streams">Top Live Streams</Link>
      </li>
    </nav>
  );
}

export default Header1;
