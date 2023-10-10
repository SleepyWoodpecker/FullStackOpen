import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    content: "",
    color: "",
  },
  reducers: {
    showNotification: (state, action) => {
      state.content = action.payload.content;
      state.color = action.payload.color;
    },
    clearNotification: (state) => {
      state.content = "";
      state.color = "";
    },
  },
});

export const { showNotification, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
