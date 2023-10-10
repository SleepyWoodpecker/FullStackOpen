function messageReducer(state, action) {
  switch (action.type) {
    case "show_notification":
      const { color, content } = action.payload;
      return { color, content };
    case "clear_notification":
      return { color: "", content: "" };
  }
  throw Error(`Unknown action ${action.type}`);
}

export default messageReducer;
