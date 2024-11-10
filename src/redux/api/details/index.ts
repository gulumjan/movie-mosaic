import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getDetails: builder.query<DETAILS.GetDetailsResponse, { movieId: number }>({
      query: ({ movieId }) => ({
        url: `/movie/${movieId}`,
        method: "GET",
      }),
      providesTags: ["details"],
    }),

    getCredits: builder.query<DETAILS.GetCreditsResponse, { movieId: number }>({
      query: ({ movieId }) => ({
        url: `/movie/${movieId}/credits`,
        method: "GET",
      }),
      providesTags: ["details"],
    }),
    getOfficilaVideo: builder.query<
      DETAILS.GetOfficialVideosResponse,
      { movieId: number }
    >({
      query: ({ movieId }) => ({
        url: `/movie/${movieId}/videos`,
        method: "GET",
      }),
      providesTags: ["details"],
    }),
    getSimilarMovies: builder.query<
      DETAILS.GetSimilarMoviesResponse,
      { movieId: number }
    >({
      query: ({ movieId }) => ({
        url: `/movie/${movieId}/similar`,
        method: "GET",
      }),
      providesTags: ["details"],
    }),
    getRecommendations: builder.query<
      DETAILS.GetRecommendationsResponse,
      { movieId: number }
    >({
      query: ({ movieId }) => ({
        url: `/movie/${movieId}/recommendations`,
        method: "GET",
      }),
      providesTags: ["details"],
    }),
  }),
});

export const {
  useGetDetailsQuery,
  useGetCreditsQuery,
  useGetOfficilaVideoQuery,
  useGetSimilarMoviesQuery,
  useGetRecommendationsQuery,
} = api;
