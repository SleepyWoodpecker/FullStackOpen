import { createSlice } from "@reduxjs/toolkit";

const filterReducer = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    setFilter(state, action) {
      return action.payload;
    },
  },
});

// const initialState = "";

// const filterReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "SET_FILTER":
//       return action.payload;
//     default:
//       return state;
//   }
// };

// export const setFilter = (input) => {
//   return {
//     type: "SET_FILTER",
//     payload: input,
//   };
// };

export const { setFilter } = filterReducer.actions;
export default filterReducer.reducer;
