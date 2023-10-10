import { createSlice } from "@reduxjs/toolkit";

// export const fetchBlogs = createAsyncThunk("blogs/getAll", async () => {
//   const response = await axios.get("http://localhost:3003/api/blogs");
//   return response.data;
// });

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload;
    },
    createBlog: (state, action) => {
      state.push(action.payload);
    },
    likeBlog: (state, action) => {
      const id = action.payload;
      const desiredBlog = state.find((blog) => blog.id === id);
      desiredBlog.likes += 1;
    },
    deleteSingleBlog: (state, action) => {
      const id = action.payload;
      return state.filter((blog) => id !== blog.id);
    },
    publishComment: (state, action) => {
      const { id, comment } = action.payload;
      const desiredBlog = state.find((blog) => blog.id === id);
      desiredBlog.comments.push(comment);
    },
  },
  // extraReducers(builder) {
  //   builder.addCase(fetchBlogs.fulfilled, (state, action) => {
  //     console.log(state, action);
  //     state.data = action.payload;
  //   });
  // },
});

export const {
  setBlogs,
  createBlog,
  likeBlog,
  deleteSingleBlog,
  publishComment,
} = blogSlice.actions;
export default blogSlice.reducer;
