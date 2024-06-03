import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewImp from "./components/NewImp";
import Socket from "./components/chatapp/Socket";
import Locations from "./components/pinlocations/Locations";
import TailwindExamples from "./components/tailwind/TailwindExamples";
import SelectCssExample from "./components/css/SelectCssExample";
import Poll from "./components/poll/Poll";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { deleteUser } from "./state/action/useraction";
import { reducer } from "./state/reducer/userreducer";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxParentComp from "./components/redux/ReduxParentComp";
import AllHooks from "./components/hooks/AllHooks";

let middleware = [thunk];
let initialState = {
  users: [],
};
let store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="socket" element={<Socket />} />
        <Route path="poll" element={<Poll />} />
        <Route path="locations" element={<Locations />} />
        <Route path="tailwind" element={<TailwindExamples />} />
        <Route path="css" element={<SelectCssExample />} />
        <Route path="redux" element={<ReduxParentComp />} />
        <Route path="hooks" element={<AllHooks />} />
        <Route path="new" element={<NewImp />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
