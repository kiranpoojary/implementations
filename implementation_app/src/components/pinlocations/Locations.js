import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../common/Nav";
import { act } from "react-dom/test-utils";

function Locations() {
  const [savedLoc, setSavedLoc] = useState([]);
  const [activeSearch, setActiveSearch] = useState({
    name: "",
    pin: "",
    locations: [],
  });
  const [viewLocation, setViewLocation] = useState(null);

  function submitPin() {
    if (activeSearch?.pin) {
      axios
        .get(`https://api.postalpincode.in/pincode/${activeSearch?.pin}`)
        .then((res) => {
          let suuccess = res?.data[0]?.Status;
          if (suuccess == "Success") {
            setActiveSearch({
              ...activeSearch,
              locations: res.data[0].PostOffice.map((p) => ({
                ...p,
                selected: false,
              })),
            });
          } else {
            setActiveSearch({
              ...activeSearch,
              locations: [],
            });
          }
        });
    } else {
      alert("Invalid Pin");
    }
  }

  function save() {
    setSavedLoc([
      ...savedLoc,
      {
        name: activeSearch?.name || activeSearch?.pin,
        locations: activeSearch?.locations?.filter((l) => l?.selected),
      },
    ]);
    setActiveSearch({
      ...activeSearch,
      name: "",
      locations: activeSearch?.locations.map((p) => ({
        ...p,
        selected: false,
      })),
    });
  }
  return (
    <div>
      <Nav />
      <div className="my-4 container  mx-auto bg-gray-200 rounded-xl shadow border">
        <div className="px-4 pt-4 text-3xl text-gray-700 font-bold mb-5 text-center">
          Location Implementation
        </div>
        <div className="border-1 rounded-2xl m-4 flex flex-column content-center items-center p-2">
          <div className="text-lg h2 text-left">PIN based search </div>
          <div className="flex flex-column content-center items-center">
            <div className="p-2">
              <input
                className="border-0 rounded-md outline-offset-2 outline-2 outline-primary-100 px-1 ring-2 "
                type="text"
                maxLength={6}
                minLength={6}
                value={activeSearch.pin}
                onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    setActiveSearch({ ...activeSearch, pin: e.target.value });
                  }
                }}
                placeholder="Enter Pin Code"
              />
            </div>
            <div className="px-2">
              <button
                className="border-1 rounded-md bg-primary text-white px-2 cursor-pointer"
                onClick={submitPin}
                disabled={activeSearch.pin.length < 6}
              >
                Submit
              </button>
              <button
                className="border-1 rounded-md bg-red text-white px-2 cursor-pointer"
                onClick={() => {
                  setActiveSearch({
                    name: "",
                    pin: "",
                    locations: [],
                  });
                  setSavedLoc([]);
                  setViewLocation(null);
                }}
                disabled={activeSearch.pin.length < 6}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
        <div className="border-1 rounded-2xl m-4 flex flex-column content-center items-center">
          <div className="h2 pt-2">Available Post Offices</div>
          {activeSearch?.locations?.length === 0 ? (
            <div className="text-red p-2">No Post-Offices found</div>
          ) : (
            ""
          )}
          <div className="flex flex-column content-center">
            {activeSearch?.locations?.map((po, i) => (
              <div key={i} className="flex flex-row content-start">
                <input
                  type={"checkbox"}
                  name={po.Name}
                  onClick={(e) => {
                    let loc = activeSearch.locations;
                    loc[i].selected = e.target.checked;
                    setActiveSearch({ ...activeSearch, locations: loc });
                  }}
                  checked={po.selected}
                />
                <div>{po.Name}</div>
              </div>
            ))}
            {activeSearch?.locations?.length > 0 ? (
              <div className="p-2 flex flex-column items-center content-center">
                <div>
                  <input
                    value={activeSearch.name}
                    onChange={(e) =>
                      setActiveSearch({ ...activeSearch, name: e.target.value })
                    }
                    disabled={
                      activeSearch.locations.filter((l) => l.selected).length ==
                      0
                    }
                    placeholder="Name the selection"
                    type={"text"}
                    className="border-0 rounded-md outline-offset-2 outline-2 outline-primary-100 px-1 ring-2"
                  />
                </div>
                <div>
                  <button
                    className="px-4 border-1 rounded-md bg-primary cursor-pointer text-white mt-2"
                    onClick={save}
                    disabled={
                      activeSearch.locations.filter((p) => p.selected).length ==
                      0
                    }
                  >
                    SAVE
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        {savedLoc.length > 0 ? (
          <div className="border-1 rounded-2xl m-4 flex flex-column content-center items-center">
            <div className="text-lg h2">Saved Locations</div>
            <div className="flex flex-row">
              {savedLoc?.map((loc) => (
                <div className="px-2 flex flex-row">
                  <div>
                    <input
                      type="radio"
                      checked={viewLocation?.name === loc.name}
                      value={loc}
                      onChange={(e) => setViewLocation(loc)}
                    />
                  </div>
                  <div className="px-1"> {loc.name}</div>
                </div>
              ))}
            </div>
            {viewLocation ? (
              <div className="flex flex-column">
                <div className="p-4 font-bold text-2xl">Location Details</div>
                <div className="font-bold">{viewLocation.name}</div>
                {viewLocation.locations.map((vl) => (
                  <div>{vl.Name}</div>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Locations;
