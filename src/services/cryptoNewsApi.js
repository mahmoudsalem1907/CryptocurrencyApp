import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHearder = {
  "X-BingApis-SDK": "true",
  "X-RapidAPI-Key": "d2e1650968msh551d50f16866cffp1c3970jsn1d027882294c",
  "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com";

const createRequest = (url) => ({
  url,
  headers: cryptoNewsHearder,
});

export const NewsApi = createApi({
  reducerPath: "Newsapi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetNewsQuery } = NewsApi;
