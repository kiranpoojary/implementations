import React, { useState } from "react";
import Nav from "../common/Nav";
import Positions from "./Positions";

function SelectCssExample() {
  const [activeCSSExample, setActiveCSSExample] = useState("positions");
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
              setActiveCSSExample("positions");
            }}
            checked={activeCSSExample === "positions"}
          />{" "}
          Positions
        </div>
        <div className="p-2">
          <input
            type="radio"
            name="features"
            onChange={(e) => {
              setActiveCSSExample("other");
            }}
            checked={activeCSSExample === "other"}
          />{" "}
          Other
        </div>
      </div>

      {activeCSSExample === "positions" ? (
        <Positions />
      ) : (
        <div className="flex justify-center items-center">OTHER</div>
      )}
    </div>
  );
}

export default SelectCssExample;
