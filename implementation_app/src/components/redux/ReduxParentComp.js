import React, { useState, useEffect } from "react";
import { useSelector, connect } from "react-redux";
import Nav from "../common/Nav";
import AddUsers from "./AddUsers";
import ListUsers from "./ListUsers";
import UpdateUsers from "./UpdateUsers";

function ReduxParentComp() {
  const [users, setUsers] = useState();
  let reduxUsers = useSelector((state) => state.users) || [];

  useEffect(() => {
    setUsers(reduxUsers || []);
  }, []);

  useEffect(() => {
    setUsers(reduxUsers || []);
  }, [reduxUsers]);

  return (
    <div className="flex flex-col">
      <Nav />
      <div className="flex flex-row justify-around m-4">
        <AddUsers users={users} />
        <UpdateUsers users={users} />
        <ListUsers users={users} />
      </div>
    </div>
  );
}

export default ReduxParentComp;
