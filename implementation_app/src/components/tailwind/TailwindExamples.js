import React, { useState } from "react";
import Nav from "../common/Nav";
import Theme from "./Theme";

function TailwindExamples() {
  const [activeTailwindExample, setActiveTailwindExample] = useState("theme");
  return (
    <>
      <Nav />
      <div className="text-2xl text-center m-2 font-bold">
        Tailwind CSS Implementation
      </div>
      <div className="flex flex-row justify-center items-center">
        <div className="p-2">
          <input
            type="radio"
            name="features"
            onChange={(e) => {
              setActiveTailwindExample("theme");
            }}
            checked={activeTailwindExample === "theme"}
          />{" "}
          Theme
        </div>
        <div className="p-2">
          <input
            type="radio"
            name="features"
            onChange={(e) => {
              setActiveTailwindExample("other");
            }}
            checked={activeTailwindExample === "other"}
          />{" "}
          Other
        </div>
      </div>
      {activeTailwindExample === "theme" ? (
        <Theme />
      ) : (
        <div className="text-center">OTHER</div>
      )}
    </>
  );
}

export default TailwindExamples;
