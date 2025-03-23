import React, { useState, useEffect, useRef } from 'react';
import './Weather.css';



import search from '../assets/search.png';
import sunny from '../assets/sun.png';
import cloudy from '../assets/cloudy.png';
import drizzle from '../assets/drizzle.png';
import rain from '../assets/heavy-rain.png';
import snow from '../assets/snow.png';
import windy from '../assets/windy.png';
import humidity from '../assets/humidity.png';

const WeatherApp = () => {
  const [city, setCity] = useState('New York');
  const [backgroundImage, setBackgroundImage] = useState('');
  const inputReference = useRef();
  const [weatherData, setWeatherData] = useState({});

}


const Weather = () => {
  const inputReference = useRef();
  const [weatherData, setWeatherData] = useState({});

  const allIcons = {
    "01d": sunny, "01n": sunny,
    "02d": cloudy, "02n": cloudy,
    "03d": drizzle, "03n": drizzle,
    "04d": rain, "04n": rain,
    "09d": drizzle, "09n": drizzle,
    "10d": rain, "10n": rain,
    "13d": snow, "13n": snow,
    "50d": windy, "50n": windy,
  };

  const searchCity = async (city) => {
    if(city === ""){
      alert("Please enter a Location Name")
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      if(!response.ok){
      alert(data.message);
      return;
      }
      console.log("API Response:", data);

      const iconCode = data.weather?.[0]?.icon || "01d"; // Ensure valid icon
      console.log("Weather Icon Code:", iconCode);
      const icon = allIcons[data.weather[0].icon] || sunny;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    searchCity("London");
  }, []);

  useEffect(() => {
    console.log("Updated Weather Data:", weatherData);
  }, [weatherData]);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputReference} type="text" placeholder="Search" />
        <img src={search} alt="Search Icon" onClick={()=>searchCity(inputReference.current.value)}/>
      </div>

      {weatherData ? (
  <>
    <img src={weatherData.icon} alt="Weather Icon" className="weather-icon" />
    <p className="temperature">{weatherData.temperature}°C</p>
    <p className="location">{weatherData.location}</p>
    <div className="data-weather">
      <div className="column">
        <img src={humidity} alt="Humidity Icon" className = "small-icon" />
        <div>
          <p>{weatherData.humidity}%</p>
          <span>Humidity</span>
        </div>
      </div>
      <div className="column">
        <img src={windy} alt="Wind Speed Icon" className="small-icon"/>
        <div>
          <p>{weatherData.windSpeed} km/h</p>
          <span>Wind Speed</span>
        </div>
      </div>
    </div>
  </>
) : null}
    </div>
  );
};

export default Weather;
