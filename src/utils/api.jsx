import axios from "axios";

const API_KEY = "7324ba13a601b4047bedb24dcc667e4c"; // Replace with your OpenWeatherMap API Key
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
};

export const fetchForecast = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    return response.data;
  } catch (error) {
    console.error("Error fetching forecast:", error);
    return null;
  }
};
