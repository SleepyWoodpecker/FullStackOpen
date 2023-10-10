function userReducer(state, action) {
  switch (action.type) {
    case "user_login":
      return action.payload;
    case "user_logout":
      return "";
  }

  throw Error(`Unknown action ${action.type}`);
}

export default userReducer;
