import { api as index } from "..";
const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getUpcoming: builder.query<
      UPCOMING.GetUpComingResponse,
      UPCOMING.GetUpComingRequest
    >({
      query: () => ({
        url: `/movie/upcoming`,
        method: "GET",
      }),
      providesTags: ["upcoming"],
    }),
  }),
});

export const { useGetUpcomingQuery } = api;
