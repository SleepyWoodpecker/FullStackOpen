import React, { useState, useEffect } from "react";
import countryService from "./Services.jsx";
import CountryList from "./components/CountryList.jsx";

function App() {
  const [countryInput, setCountryInput] = useState("");
  const [displayedCountryList, setDisplayedCountryList] = useState([]);
  const [originalCountryList, setOriginalCountryList] = useState([]);

  useEffect(() => {
    countryService.getAllCountries().then((response) => {
      setDisplayedCountryList(response);
      setOriginalCountryList(response);
    });
  }, []);

  const handleCountrySearch = (e) => {
    const input = e.target.value;
    setCountryInput(input);
    setDisplayedCountryList(
      originalCountryList.filter((country) =>
        country.name.common.includes(input)
      )
    );
  };

  return (
    <div>
      <form>
        <label htmlFor="countryInput">find countries: </label>
        <input
          onChange={handleCountrySearch}
          value={countryInput}
          id="countryInput"
        />
      </form>
      <CountryList
        countryList={
          countryInput.length === 0 ? originalCountryList : displayedCountryList
        }
      />
    </div>
  );
}

export default App;
