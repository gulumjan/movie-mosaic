import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getTrailers: builder.query<
      TRAILERS.GetTrailersResponse,
      TRAILERS.GetTrailersRequest
    >({
      query: (movieId) => ({
        url: `/movie/${movieId}/videos`,
        method: "GET",
      }),
      providesTags: ["trailers"],
    }),
    getTrailersTv: builder.query<
      TRAILERS.GetTrailersResponse,
      TRAILERS.GetTrailersRequest
    >({
      query: (tvId) => ({
        url: `/tv/${tvId}/videos`,
        method: "GET",
      }),
      providesTags: ["trailers"],
    }),
  }),
});

export const { useGetTrailersQuery, useGetTrailersTvQuery } = api;
