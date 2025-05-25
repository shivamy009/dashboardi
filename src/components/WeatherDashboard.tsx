import React, { useState } from 'react';
import { useGetWeatherByCityQuery, useGetForecastByCityQuery } from '../services/weatherApi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import styles from './WeatherDashboard.module.scss';

interface WeatherData {
  temp: number;
  humidity: number;
  wind_speed: number;
  description: string;
}

interface ForecastData {
  date: string;
  temp: number;
}

export const WeatherDashboard: React.FC = () => {
  const [city, setCity] = useState<string>('London');
  const { data: weather, error, isLoading } = useGetWeatherByCityQuery(city);
  const { data: forecast } = useGetForecastByCityQuery(city);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const formatForecastData = (forecastData: any): ForecastData[] => {
    return forecastData?.daily?.map((day: any) => ({
      date: new Date(day.dt * 1000).toLocaleDateString(),
      temp: day.temp.day,
    })) || [];
  };

  return (
    <section className={styles.weatherDashboard} aria-label="Weather Dashboard">
      <div className={styles.searchContainer}>
        <label htmlFor="city-search" className="sr-only">Search for a city</label>
        <input
          id="city-search"
          type="text"
          value={city}
          onChange={handleSearch}
          placeholder="Enter city name"
          className={styles.searchInput}
          aria-describedby="search-error"
        />
      </div>
      {isLoading && <div className={styles.loader} aria-live="polite">Loading...</div>}
      {error && (
        <div className={styles.error} role="alert" id="search-error">
          Error fetching weather data. Please try again.
        </div>
      )}
      {weather && (
        <div className={styles.weatherInfo}>
          <h2>{city} Weather</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
      {forecast && (
        <div className={styles.forecastChart}>
          <h3>7-Day Forecast</h3>
          <LineChart width={600} height={300} data={formatForecastData(forecast)} aria-label="7-day weather forecast">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temp" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
      )}
    </section>
  );
};