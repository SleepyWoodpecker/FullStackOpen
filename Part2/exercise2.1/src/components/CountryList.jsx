import React from "react";
import DetailedCountryItem from "./DetailedCountryItem";
import ConditionalCountryShow from "./ConditionalCountryShow";
import ShowWeather from "./ShowWeather";

function CountryList({ countryList }) {
  const length = countryList.length;

  let returnList;
  if (length > 10) {
    returnList = `Too many matches, specify another filter`;
  } else if (length > 1) {
    returnList = countryList.map((country) => (
      <ConditionalCountryShow country={country} key={country.name.common} />
    ));
  } else if (length > 0) {
    const country = countryList[0];
    returnList = (
      <div>
        <DetailedCountryItem country={country} />
        <ShowWeather country={country} />
      </div>
    );
  } else {
    returnList = `Country list. If you are seeing this, it means that your country does not exist`;
  }

  return <div>{returnList}</div>;
}

export default CountryList;
