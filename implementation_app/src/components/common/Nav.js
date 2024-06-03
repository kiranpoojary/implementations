import React from "react";
import { Outlet, Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <div className="flex flex-column content-center items-center">
        <div>
          <h1>React Implementation</h1>
        </div>
        <div className="flex flex-row flex-wrap">
          <div className="ch-p-1">
            <Link to="/socket">Socket</Link>
          </div>
          <div className="ch-p-1">
            <Link to="/poll">Poll</Link>
          </div>
          <div className="ch-p-1">
            <Link to="/locations">Pin Locations</Link>
          </div>
          <div className="ch-p-1">
            <Link to="/tailwind">Tailwind Implementations</Link>
          </div>
          <div className="ch-p-1">
            <Link to="/css">CSS</Link>
          </div>
          <div className="ch-p-1">
            <Link to="/redux">Redux Implementations</Link>
          </div>
          <div className="ch-p-1">
            <Link to="/hooks">React Hooks</Link>
          </div>
          <div className="ch-p-1">
            <Link to="/new">New</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
