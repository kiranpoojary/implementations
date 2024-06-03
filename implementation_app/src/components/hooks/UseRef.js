import React, { useRef, useState, useEffect } from "react";
function UseRef() {
  const btnRef = useRef(null);
  const [elements, setElements] = useState({ btnRef: null });

  function handleButton() {
    console.log(btnRef.current);
  }

  return (
    <div className="m-4 p-2 border-1 rounded font-bold text-16 flex flex-col">
      <div>UseRef</div>
      <div className="mx-4">
        <div className="flex flex-row">
          <div className="mx-1 border-1 w-100 rounded-md p-2">
            Button Action
            <div>
              <button
                ref={btnRef}
                onClick={handleButton}
                className="border rounded-md bg-primary text-white border-1 p-1"
              >
                Click Me
              </button>
            </div>
          </div>
          <div className="mx-1 border-1 w-100 rounded-md p-2">
            Captured Details from Button Ref
            <div>{JSON.stringify(elements.btnRef) || "NA"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UseRef;
