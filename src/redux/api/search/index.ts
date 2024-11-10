import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getSearchCollections: builder.query<
      SEACRH.GetSearchCollectionResponse,
      SEACRH.GetSearchCollectionRequest
    >({
      query: ({ category, query }) => ({
        url: `/search/${category}?query=${query}`,
        method: "GET",
      }),
      providesTags: ["search_collection"],
    }),
  }),
});

export default api;
export const { useGetSearchCollectionsQuery } = api;
