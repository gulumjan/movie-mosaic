import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getDiscoverMovie: builder.query<
      DISCOVER.GetDiscoverMovieResponse,
      { timeWindow: "/discover/movie"; genre?: string; sort_by?: string }
    >({
      query: ({ timeWindow, genre, sort_by }) => {
        // Construct the URL with optional parameters for movie discovery
        const params = new URLSearchParams();
        if (genre) {
          params.append("with_genres", genre); // Assuming the API uses this parameter for genre filtering
        }
        if (sort_by) {
          params.append("sort_by", sort_by); // Sort by the specified criteria
        }

        return {
          url: `${timeWindow}?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["discover"],
    }),

    getDiscoverTv: builder.query<
      DISCOVER.GetDiscoverMovieResponse,
      { timeWindow: "/discover/tv"; genre?: string; sort_by?: string }
    >({
      query: ({ timeWindow, genre, sort_by }) => {
        // Construct the URL with optional parameters for TV discovery
        const params = new URLSearchParams();
        if (genre) {
          params.append("with_genres", genre); // Assuming the API uses this parameter for genre filtering
        }
        if (sort_by) {
          params.append("sort_by", sort_by); // Sort by the specified criteria
        }

        return {
          url: `${timeWindow}?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["discover"],
    }),
  }),
});

export const { useGetDiscoverMovieQuery, useGetDiscoverTvQuery } = api;
