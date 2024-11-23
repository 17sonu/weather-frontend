import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const fetchWeather = async () => {
        try {
            const response = await axios.get(`https://weather-backend-psi-rust.vercel.app/api/weather/${city}`);
            setWeather(response.data);
            setError('');
        } catch (err) {
            setError('City not found. Please try again.');
            setWeather(null);
        }
    };
    return (
        <div className="App">
            <h1>Weather App</h1>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
            />
            <button onClick={fetchWeather}>Get Weather</button>

            {error && <p className="error-message">{error}</p>}

            {weather && (
    <div className="weather-container">
        <h2>
            {weather.name}, {weather.sys.country}
        </h2>
        <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            style={{ width: '80px', height: '80px' }}
        />
        <p>Temperature: {weather.main.temp}°C</p>
        <p>Weather: {weather.weather[0].description}</p>
        <p>Humidity: {weather.main.humidity}%</p>
    </div>
)}
        </div>
    );
};

export default Weather;