import React from "react";

function Polling() {
  return (
    <div className="flex flex-col w-100 ">
      <div className="border rounded m-4 font-bold text-darktheme-primary text-xl p-2">
        What is polling
        <div className="ml-2 text-sm font-normal p-2">
          periodically keep checking if the data is updated or not. If updated
          do the required action on it.
          <ul>
            <li className="font-bold underline">Types</li>
            <li>1) Short Polling</li>
            <li>2) Long Polling</li>
          </ul>
          <div className="text-lg font-bold">
            Short Polling
            <div className="ml-2 text-sm font-normal p-2">
              <ul>
                <li>
                  1) There is a fixed time interval to hit the api to get the
                  data even if the data is updated or not.
                </li>
                <li>
                  2) always return response for the request not bother about the
                  latest data or not
                </li>
              </ul>
            </div>
          </div>
          <div className="text-lg font-bold">
            Short Polling
            <div className="ml-2 text-sm font-normal p-2">
              <ul>
                <li>
                  1) There is a fixed time interval to hit the api to get the
                  data even if the data is updated or not.
                </li>
                <li>
                  2) Here response is not returned unless the data is
                  changed(updated) in the server end., but there will be a time
                  stamp to wait for the updated data if updated data is not
                  recieved then server will cancel the request and inform the
                  client, then client will request freshly.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Polling;
