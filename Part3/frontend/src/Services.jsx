import axios from "axios";

const baseUrl = "/api/persons";

const getAllEntries = () => {
  const allEntries = axios.get(baseUrl);
  return allEntries.then((response) => response.data);
};

const addEntry = (entry) => {
  const addNew = axios.post(baseUrl, entry);
  return addNew.then((response) => response.data);
};

const deleteEntry = (entryId) => {
  const deletedUser = axios.delete(`${baseUrl}/${entryId}`);
  return deletedUser.then((response) => {
    return response.data;
  });
};

const updateEntry = (person) => {
  const updatedUser = axios.put(`${baseUrl}/${person.id}`, person);
  return updatedUser.then((response) => response.data);
};

export default { addEntry, getAllEntries, deleteEntry, updateEntry };
