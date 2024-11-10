namespace SEACRH {
  type GetSearchCollectionResponse = ISearchCollections;
  type GetSearchCollectionRequest = {
    category: string;
    query: string;
  };
}
