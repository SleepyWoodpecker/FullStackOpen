import React, { useState } from "react";
import axios from "axios";

function ShowWeather({ country }) {
  const [weatherData, setWeatherData] = useState([]);
  const APIKey = import.meta.env.VITE_WEATHER_API_KEY;

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${APIKey}&units=metric`
    )
    .then((response) => setWeatherData(response.data));

  return weatherData.length === 0 ? (
    ""
  ) : (
    <div>
      <h1>Weather in {country.capital[0]}</h1>
      <p>temperature {weatherData.main.temp} Celcius</p>
      <img
        alt="Image showing weather"
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
      />
      <p>wind {weatherData.wind.speed}</p>
    </div>
  );
}

export default ShowWeather;
