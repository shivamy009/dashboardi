import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/2.5/' }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query({
      query: (city) => `weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`,
    }),
    getForecastByCity: builder.query({
      query: (city) => `forecast/daily?q=${city}&cnt=7&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`,
    }),
  }),
});

export const { useGetWeatherByCityQuery, useGetForecastByCityQuery } = weatherApi;