import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    closeNotification(state, action) {
      return "";
    },
  },
});

export const { showNotification, closeNotification } =
  notificationReducer.actions;
export default notificationReducer.reducer;

export const setNotification = (content, duration) => {
  return async (dispatch) => {
    dispatch(showNotification(content));
    setTimeout(() => dispatch(closeNotification()), duration);
  };
};
