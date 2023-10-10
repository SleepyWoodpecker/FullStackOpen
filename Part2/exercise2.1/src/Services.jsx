import axios from "axios";

const baseUrl = `https://studies.cs.helsinki.fi/restcountries/api`;
// welp does this not mean that I make another API call for each new character I input
const getAllCountries = () => {
  const countriesResponse = axios.get(`${baseUrl}/all`);
  return countriesResponse.then((response) => response.data);
};

export default { getAllCountries };
