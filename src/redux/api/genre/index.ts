import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getGenreList: builder.query<
      GENRE.GetGenReListResponse,
      { timeWindow: "genre/movie/list" | "genre/tv/list" }
    >({
      query: ({ timeWindow }) => ({
        url: `${timeWindow}`,
        method: "GET",
      }),
      providesTags: ["genre"],
    }),
    getFavourites: builder.query<
      GENRE.GetFavouriteMovieResponse,
      GENRE.GetFavouriteMovieRequest
    >({
      query: (userId) => ({
        url: `/api/get-favourite/${userId} `,
        method: "GET",
      }),
      providesTags: ["favourites"],
    }),
    sendFavourite: builder.mutation<
      GENRE.PostFavouriteMovieResponse,
      GENRE.PostFavouriteMovieRequest
    >({
      query: (data) => ({
        url: "/api/favourite",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["favourites"],
    }),
  }),
});

export const {
  useGetGenreListQuery,
  useGetFavouritesQuery,
  useSendFavouriteMutation,
} = api;
