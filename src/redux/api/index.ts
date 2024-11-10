import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/3`,
  prepareHeaders: (headers) => {
    headers.set(
      "Authorization",
      `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
    );
    return headers;
  },
});

const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryExtended,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: [
    "trending",
    "upcoming",
    "popular",
    "top_rated",
    "genre",
    "discover",
    "details",
    "tv_details",
    "search_collection",
    "trailers",
    "favourites",
  ],
  endpoints: () => ({}),
});
