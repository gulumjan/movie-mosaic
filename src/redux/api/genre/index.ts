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
    checkFavourite: builder.query({
      query: ({ userId, movieId }) => ({
        url: "/api/check-fav",
        method: "POST",
        body: { userId, movieId },
      }),
      providesTags: ["favourites"],
    }),
    getUser: builder.query<User, void>({
      query: () => ({
        url: "/api/v2/get-user",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
    deleteFavouriteProduct: builder.mutation<
      GENRE.DeleteFavouriteMovieResponse,
      GENRE.DeleteFavouriteMovieRequest
    >({
      query: ({ movieId }) => ({
        url: `/api/fav-delete`,
        method: "DELETE",
        body: { movieId },
      }),
      invalidatesTags: ["favourites"],
    }),
  }),
});

export const {
  useGetGenreListQuery,
  useGetFavouritesQuery,
  useSendFavouriteMutation,
  useCheckFavouriteQuery,
  useGetUserQuery,
  useDeleteFavouriteProductMutation,
} = api;
