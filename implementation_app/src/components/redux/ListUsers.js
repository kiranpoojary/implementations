import React, { useState, useEffect } from "react";

function ListUsers(props) {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    setAllUsers(props?.users || []);
  }, [props]);

  return (
    <div className="flex flex-col border-1 p-1">
      <div>
        <label className="text-pink font-bold w-24"> All Users</label>
        {allUsers.map((u, i) => (
          <div key={i}>{u.name}</div>
        ))}
      </div>
    </div>
  );
}

export default ListUsers;
