import React from "react";
import ChatApp from "./ChatApp";
import Nav from "../common/Nav";

function Socket() {
  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Nav />

        <div className="h3"> Socket Implementation In Chat App</div>
        <ChatApp />
      </div>
    </div>
  );
}

export default Socket;
