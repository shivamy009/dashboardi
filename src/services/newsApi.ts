import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2/' }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: ({ category, page }) =>
        `top-headlines?category=${category}&page=${page}&pageSize=9&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`,
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;