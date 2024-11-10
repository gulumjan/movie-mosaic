import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getPopularMovie: builder.query<
      POPULAR.GetPopularMoviesOrShowsResponse,
      { timeWindow: "movie/popular" | "tv/popular" }
    >({
      query: ({ timeWindow }) => ({
        url: `${timeWindow}`,
        method: "GET",
      }),
      providesTags: ["popular"],
    }),
  }),
});

export const { useGetPopularMovieQuery } = api;
