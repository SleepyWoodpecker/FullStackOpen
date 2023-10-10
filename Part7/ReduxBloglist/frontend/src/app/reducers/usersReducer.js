import { createSlice } from "@reduxjs/toolkit";

const usersReducer = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers: (state, action) => action.payload,
  },
});

export const { setUsers } = usersReducer.actions;
export default usersReducer.reducer;
