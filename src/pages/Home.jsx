import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import RecentSearches from "../components/RecentSearches";
import TemperatureChart from "../components/TemperatureChart";

const API_KEY = "3cc11305078541f07bb3629d0ccb734a";

const Home = ({ darkMode }) => {
  const [city, setCity] = useState("Mumbai");
  const [weather, setWeather] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [recentCities, setRecentCities] = useState([]);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      setError(null);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error("City not found or API issue");

      const data = await res.json();
      setWeather(data);
      fetchForecast(city);
      setRecentCities((prev) => [...new Set([city, ...prev])].slice(0, 5));
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchForecast = async (city) => {
    try {
      setError(null);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error("Failed to fetch forecast");

      const data = await res.json();

      const dailyForecast = [];
      const dateTracker = new Set();

      data.list.forEach((entry) => {
        const date = entry.dt_txt.split(" ")[0];
        if (!dateTracker.has(date) && dailyForecast.length < 7) {
          dateTracker.add(date);
          dailyForecast.push(entry);
        }
      });

      setWeeklyForecast(dailyForecast);
      setHourlyData(data.list.slice(0, 7));
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  return (
    <div className={`min-h-screen flex flex-col items-center p-6 ${darkMode ? "bg-black text-white" : "bg-orange-100 text-black"}`}>
      <SearchBar city={city} setCity={setCity} handleSearch={fetchWeather} darkMode={darkMode} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
      
      {weather && (
        <div className={`p-6 mt-4 shadow-md rounded-md text-center ${darkMode ? "bg-gray-900 text-orange-300" : "bg-white text-black"}`}>
          <h2 className="text-3xl font-bold">{weather.main.temp}°C</h2>
          <p>{weather.weather[0].description}</p>
          <p>{weather.name}, {weather.sys.country}</p>
        </div>
      )}

      <RecentSearches recentCities={recentCities} setCity={setCity} darkMode={darkMode} />
      <TemperatureChart hourlyData={hourlyData} darkMode={darkMode} />
    </div>
  );
};

export default Home;
