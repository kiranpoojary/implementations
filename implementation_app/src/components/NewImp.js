import React from "react";
import { Outlet, Link } from "react-router-dom";
import Nav from "./common/Nav";
function NewImp() {
  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Nav />
      </div>
      New Implementation
      <a
        href="#"
        className="group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500"
      >
        <div className="flex items-center space-x-3">
          <svg
            className="h-6 w-6 stroke-sky-500 group-hover:stroke-white"
            fill="none"
            viewBox="0 0 24 24"
          ></svg>
          <h3 className="text-slate-900 group-hover:text-black text-sm font-semibold">
            New project
          </h3>
          <h3 className="ch-m-3 text-slate-900 text-sm font-semibold">
            New project
          </h3>
        </div>
        <p className="text-slate-500 group-hover:text-white text-sm">
          Create a new project from a variety of starting templates.
        </p>
      </a>
    </div>
  );
}

export default NewImp;
