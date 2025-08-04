import React, { useEffect, useState } from "react";
import { fetchWeather } from "../utils/api";

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      const cachedData = localStorage.getItem("weatherData");
      if (cachedData) {
        setWeather(JSON.parse(cachedData));
      }

      const data = await fetchWeather(city);
      if (data) {
        setWeather(data);
        localStorage.setItem("weatherData", JSON.stringify(data));
      }
    };
    getWeather();
  }, [city]);

  if (!weather) return <p>Loading...</p>;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
      <h2 className="text-2xl font-bold">{weather.name}</h2>
      <p className="text-lg font-semibold">{weather.main.temp}°C</p>
      <p className="text-gray-600">{weather.weather[0].description}</p>
    </div>
  );
};

export default Weather;
