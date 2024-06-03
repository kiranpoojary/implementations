import React from "react";
import { Outlet, Link } from "react-router-dom";
import Nav from "../common/Nav";
import Polling from "./Polling";

function Poll() {
  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Nav />
        <div className="h3"> Polling Implementation</div>
        <Polling />
      </div>
    </div>
  );
}

export default Poll;
