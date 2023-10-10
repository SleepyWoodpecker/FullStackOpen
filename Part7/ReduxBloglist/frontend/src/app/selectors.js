import { createSelector } from "@reduxjs/toolkit";

const selectBlogs = (state) => state.blogs;
export const selectSortedBlogs = createSelector([selectBlogs], (blogs) => {
  return [...blogs].sort((a, b) => b.likes - a.likes);
});

const selectUsers = (state) => state.users;
const getUserId = (state, userId) => userId;
export const selectUser = createSelector(
  [selectUsers, getUserId],
  (users, selectedUserId) => {
    return [...users].find((user) => user.id === selectedUserId);
  }
);

const getBlogId = (state, blogId) => blogId;
export const selectBlog = createSelector(
  [selectBlogs, getBlogId],
  (users, selectedBlogId) => {
    return [...users].find((user) => user.id === selectedBlogId);
  }
);
