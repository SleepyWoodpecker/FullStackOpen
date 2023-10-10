import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const getSelectedBlog = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`);
  return request.data;
};

const createNewBlog = async (user, newBlogEntry) => {
  const response = await axios.post(baseUrl, newBlogEntry, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
  return response.data;
};

const updateBlog = async (user, blogId, newBlogEntry) => {
  const response = await axios.put(`${baseUrl}/${blogId}`, newBlogEntry, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
  return response.data;
};

const deleteBlog = async (user, blogId) => {
  const response = await axios.delete(`${baseUrl}/${blogId}`, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
  return response.data;
};

const addComment = async (blogId, additionalComment) => {
  const response = await axios.put(
    `${baseUrl}/${blogId}/comment`,
    additionalComment
  );
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export {
  getAll,
  createNewBlog,
  updateBlog,
  deleteBlog,
  getSelectedBlog,
  addComment,
};
