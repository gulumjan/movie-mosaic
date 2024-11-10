namespace GENRE {
  type GetGenReListResponse = iGenreMovieList;
  type GetGenReListRequest = void;
  type PostFavouriteMovieResponse = {
    id: number;
    movieId: number;
    title: string;
    posterPath: string;
    release_date: string | null;
  };
  type PostFavouriteMovieRequest = {
    id: number;
    movieId: number;
    title: string;
    posterPath: string;
    release_date: string | null;
  };
  type GetFavouriteMovieResponse = {
    id: number;
    movieId: number;
    title: string;
    posterPath: string;
    release_date: string | null;
  }[];
  type GetFavouriteMovieRequest = number;

  type DeleteFavouriteMovieRequest = {
    movieId: number;
  };

  type DeleteFavouriteMovieResponse = {
    message: string;
    count?: number;
  };
}
