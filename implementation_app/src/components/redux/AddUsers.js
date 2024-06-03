import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreator } from "../../state";
// import { addUser, deleteUser } from "../../state/action/useraction";

function AddUsers(props) {
  const [allUsers, setAllUsers] = useState(props.users);
  const [user, setUser] = useState({ name: "", age: "" });
  const dispatch = useDispatch();
  const { addUser, deleteUser } = bindActionCreators(actionCreator, dispatch);

  useEffect(() => {
    setUser({ name: "", age: "" });
    setAllUsers(props.users);
  }, [props.users]);

  return (
    <div className="flex flex-col border-1 p-1">
      <label className="text-pink font-bold w-24 underline">Add Users</label>
      <input
        type="text"
        placeholder="Name"
        className="border-1 m-1 rounded-md"
        value={user?.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <input
        onChange={(e) => setUser({ ...user, age: e.target.value })}
        type="number"
        placeholder="Age"
        className="border-1  m-1 rounded-md"
        value={user?.age}
      />
      <button
        className="border-1  m-1 rounded-md  text-white  bg-blvlt hover:bg-primary"
        onClick={(e) => {
          if (user.name && user.age) {
            dispatch(addUser(user));
          } else {
            alert("Invalid Name/Age");
          }
        }}
      >
        Submit
      </button>
      <div>
        <label className="text-tahiti font-bold underline">
          Recently Added Users
        </label>
        {allUsers?.map((u, i) => (
          <div key={i}>{u.name}</div>
        ))}
      </div>
    </div>
  );
}

export default AddUsers;
