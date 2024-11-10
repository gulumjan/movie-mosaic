import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getTrendingMovie: builder.query<
      TRENDING.GetTrendingMoviesResponse,
      { timeWindow: "day" | "week" }
    >({
      query: ({ timeWindow }) => ({
        url: `/trending/movie/${timeWindow}`,
        method: "GET",
      }),
      providesTags: ["trending"],
    }),
  }),
});

export const { useGetTrendingMovieQuery } = api;
