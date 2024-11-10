import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getTopRatedMoviesOrShows: builder.query<
      TOPRATED.GetTopRatedResponse,
      { type: "movie/top_rated" | "tv/top_rated" }
    >({
      query: ({ type }) => ({
        url: `${type}`,
        method: "GET",
      }),
      providesTags: ["top_rated"],
    }),
  }),
});

export const { useGetTopRatedMoviesOrShowsQuery } = api;
