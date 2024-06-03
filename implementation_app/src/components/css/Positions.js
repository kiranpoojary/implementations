import React, { useState } from "react";
let style = {
  body: {
    width: "100%",
    margin: 0,
    border: "2px solid black",
  },
  containerStyle: {
    position: "relative",
    border: " 2px solid rgb(46, 7, 237)",
    margin: "6rem",
    padding: "6rem",
    height: "50rem",
  },
  box1Style: {
    border: "2px solid red",
    margin: "5px",
    width: "140px",
    height: "140px",
    display: "inline-block",
    paddingLeft: "2px",
  },
  box2Style: {
    border: "2px solid red",
    margin: "5px",
    width: "140px",
    height: "140px",
    display: "inline-block",
    paddingLeft: "2px",
  },
  box3Style: {
    border: "2px solid red",
    margin: "5px",
    width: "140px",
    height: "140px",
    display: "inline-block",
    paddingLeft: "2px",
    position: "static",
    top: "0px",
    left: "0px",
  },
  box4Style: {
    border: "2px solid red",
    margin: "5px",
    width: "140px",
    height: "140px",
    display: "inline-block",
    paddingLeft: "2px",
  },
};

function Positions() {
  const [classes, setClasses] = useState(style);
  return (
    <div style={style.body}>
      <div className="p-1 flex flex-row ">
        <div className="p-2">
          <input
            type="radio"
            name="pos"
            onChange={(e) => {
              setClasses({
                ...classes,
                box3Style: { ...classes.box3Style, position: "static" },
              });
            }}
            checked={classes.box3Style.position === "static"}
          />{" "}
          Static
        </div>
        <div className="p-2">
          <input
            type="radio"
            name="pos"
            onChange={(e) => {
              setClasses({
                ...classes,
                box3Style: { ...classes.box3Style, position: "relative" },
              });
            }}
            checked={classes.box3Style.position === "relative"}
          />{" "}
          Relative
        </div>
        <div className="p-2">
          <input
            type="radio"
            name="pos"
            onChange={(e) => {
              setClasses({
                ...classes,
                box3Style: { ...classes.box3Style, position: "absolute" },
              });
            }}
            checked={classes.box3Style.position === "absolute"}
          />{" "}
          Absolute
        </div>
        <div className="p-2">
          <input
            type="radio"
            name="pos"
            onChange={(e) => {
              setClasses({
                ...classes,
                box3Style: {
                  ...classes.box3Style,
                  position: "fixed",
                  top: "0px",
                  left: "0px",
                },
              });
            }}
            checked={classes.box3Style.position === "fixed"}
          />{" "}
          Fixed
        </div>
        <div className="p-2">
          <input
            type="radio"
            name="pos"
            onChange={(e) => {
              setClasses({
                ...classes,
                box3Style: { ...classes.box3Style, position: "sticky" },
              });
            }}
            checked={classes.box3Style.position === "sticky"}
          />{" "}
          Sticky
        </div>
        <div className="p-2">
          Set Top and Left
          <input
            type="range"
            defaultValue={0}
            min={0}
            max={100}
            onChange={(e) =>
              setClasses({
                ...classes,
                box3Style: {
                  ...classes.box3Style,
                  top: `${e.target.value}px`,
                  left: `${e.target.value}px`,
                },
              })
            }
          />
        </div>

        <div className="p-2">
          <input
            type="Checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                setClasses({
                  ...classes,
                  containerStyle: {
                    ...classes.containerStyle,
                    transform: "translate(10px, 10px)",
                  },
                });
              } else {
                setClasses({
                  ...classes,
                  containerStyle: {
                    ...classes.containerStyle,
                    transform: null,
                  },
                });
              }
            }}
            checked={classes?.containerStyle?.transform ? true : false}
          />
          Make container Transform
        </div>
        <div className="p-2">
          <input
            type="Checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                setClasses({
                  ...classes,
                  containerStyle: {
                    ...classes.containerStyle,
                    position: "relative",
                  },
                });
              } else {
                setClasses({
                  ...classes,
                  containerStyle: {
                    ...classes.containerStyle,
                    position: "static",
                  },
                });
              }
            }}
            checked={classes?.containerStyle?.position == "relative"}
          />
          Make Container non-static(absolute)
        </div>
      </div>
      <div style={classes.containerStyle}>
        <div style={classes.box1Style}>1</div>
        <div style={classes.box2Style}>2</div>
        <div style={classes.box3Style}>3</div>
        <div style={classes.box4Style}>4</div>
      </div>
      <div className="m-4 flex flex-col items-center">
        <div className="p-1 flex w-100 flex-col border-1 m-2">
          <div className=" font-bold text-md">Static</div>
          <p>&nbsp;&nbsp;&nbsp;- Normal flow</p>
        </div>
        <div className="p-1 w-100 flex flex-col border-1 m-2">
          <div className=" font-bold text-md">Relative</div>
          <p>
            &nbsp;&nbsp;&nbsp;- The element is positioned according to the
            normal flow of the document, and then offset relative to itself
            based on the values of top, right, bottom, and left.
            <br /> &nbsp;&nbsp;&nbsp;- position changes on its current position
            in t-r-b-l direction(relative to actual postition)
          </p>
        </div>
        <div className="p-1 w-100 flex flex-col border-1 m-2">
          <div className=" font-bold text-md">Absolute</div>
          <p>
            &nbsp;&nbsp;&nbsp;- The element is removed from the normal document
            flow, and no space is created for the element in the page layout. It
            is positioned relative to its closest positioned ancestor.
            <br /> &nbsp;&nbsp;&nbsp;- position changes based on its immediate
            non-static parent in t-r-b-l direction(relative to immediate
            non-static parent postition)
          </p>
        </div>
        <div className="p-1 w-100 flex flex-col border-1 m-2">
          <div className=" font-bold text-md">Fixed</div>
          <p>
            &nbsp;&nbsp;&nbsp;- The element is removed from the normal document
            flow, and no space is created for the element in the page layout.
            <br /> &nbsp;&nbsp;&nbsp;- It is positioned relative to the initial
            containing block established by the viewport(mostly body), except
            when one of its ancestors has a transform, perspective, or filter
            property set to something other than none
          </p>
        </div>
        <div className="p-1 w-100 flex flex-col border-1 m-2">
          <div className=" font-bold text-md">Sticky</div>
          <p>
            &nbsp;&nbsp;&nbsp;- The element is positioned according to the
            normal flow of the document, and then offset relative to its nearest
            scrolling ancestor
            <br /> &nbsp;&nbsp;&nbsp;- Note that a sticky element "sticks" to
            its nearest ancestor that has a "scrolling mechanism" (created when
            overflow is hidden, scroll, auto, or overlay), even if that ancestor
            isn't the nearest actually scrolling ancestor.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Positions;
