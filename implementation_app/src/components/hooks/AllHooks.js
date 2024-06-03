import React, { useState } from "react";
import Nav from "../common/Nav";
import UseRef from "./UseRef";

function AllHooks() {
  const [activeHookExample, setActiveHookExample] = useState("useRef");
  return (
    <div>
      <Nav />
      <div className="text-2xl text-center m-2 font-bold">
        CSS Implementation
      </div>
      <div className="flex flex-row justify-center items-center">
        <div className="p-2">
          <input
            type="radio"
            name="features"
            onChange={(e) => {
              setActiveHookExample("useRef");
            }}
            checked={activeHookExample === "useRef"}
          />
          useRef
        </div>
        <div className="p-2">
          <input
            type="radio"
            name="features"
            onChange={(e) => {
              setActiveHookExample("other");
            }}
            checked={activeHookExample === "other"}
          />
          Other
        </div>
      </div>

      {activeHookExample === "useRef" ? (
        <UseRef />
      ) : (
        <div className="flex justify-center items-center">OTHER</div>
      )}
    </div>
  );
}

export default AllHooks;
