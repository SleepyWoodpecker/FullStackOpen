import React from "react";

function DetailedCountryItem({ country }) {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital.map((capital) => capital)}</p>
      <p>area {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  );
}

export default DetailedCountryItem;
