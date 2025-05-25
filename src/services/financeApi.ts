import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AlphaVantageResponse } from '../types/finance';

export const financeApi = createApi({
  reducerPath: 'financeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.alphavantage.co/' }),
  endpoints: (builder) => ({
    getStockData: builder.query<AlphaVantageResponse, { symbol: string; timeRange: string }>({
      query: ({ symbol, timeRange }) =>
        `query?function=${timeRange}&symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY}`,
    }),
  }),
});

export const { useGetStockDataQuery } = financeApi;