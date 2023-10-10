import React, { useState } from "react";
import DetailedCountryItem from "./DetailedCountryItem";

function ConditionalCountryShow({ country }) {
  const [showCountry, setShowCountry] = useState(false);

  const toggleShowCountry = () => setShowCountry(!showCountry);

  return (
    <div key={country.name.common}>
      <p style={{ display: "inline-block" }}>{country.name.common}</p>
      <button onClick={toggleShowCountry}>show</button>
      {showCountry ? <DetailedCountryItem country={country} /> : ""}
    </div>
  );
}

export default ConditionalCountryShow;
