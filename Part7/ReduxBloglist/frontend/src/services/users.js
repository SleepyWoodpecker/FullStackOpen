import axios from "axios";
const baseUrl = "/api/users";

const getUsers = async () => {
  const { data: usersList } = await axios.get(baseUrl);
  return usersList;
};

const getUserById = async (id) => {
  const { data: user } = await axios.get(`${baseUrl}/${id}`);
  return user;
};

export { getUsers, getUserById };
