import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getTvDetails: builder.query<
      TVDETAILS.GetTvDetailsResponse,
      { series_id: number }
    >({
      query: ({ series_id }) => ({
        url: `/tv/${series_id}`,
      }),
      providesTags: ["tv_details"],
    }),
    getTvCredits: builder.query<DETAILS.GetCreditsResponse, { tvId: number }>({
      query: ({ tvId }) => ({
        url: `/tv/${tvId}/credits`,
        method: "GET",
      }),
      providesTags: ["details"],
    }),
    getTvOfficilaVideo: builder.query<
      DETAILS.GetOfficialVideosResponse,
      { tvId: number }
    >({
      query: ({ tvId }) => ({
        url: `/tv/${tvId}/videos`,
        method: "GET",
      }),
      providesTags: ["details"],
    }),
    getTvSimilarMovies: builder.query<
      DETAILS.GetSimilarMoviesResponse,
      { tvId: number }
    >({
      query: ({ tvId }) => ({
        url: `/tv/${tvId}/similar`,
        method: "GET",
      }),
      providesTags: ["details"],
    }),
    getTvRecommendations: builder.query<
      DETAILS.GetRecommendationsResponse,
      { tvId: number }
    >({
      query: ({ tvId }) => ({
        url: `/tv/${tvId}/recommendations`,
        method: "GET",
      }),
      providesTags: ["details"],
    }),
  }),
});

export default api;

export const {
  useGetTvDetailsQuery,
  useGetTvCreditsQuery,
  useGetTvOfficilaVideoQuery,
  useGetTvRecommendationsQuery,
  useGetTvSimilarMoviesQuery,
} = api;
