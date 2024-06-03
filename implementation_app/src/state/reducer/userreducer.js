export const reducer = (state = {}, action) => {
  if (action.type === "adduser") {
    return { users: [...state.users, action.payload] };
  } else if (action.type === "deleteuser") {
    return { users: [] };
  } else {
    return { users: [...state.users] };
  }
};
