"use client";
import { FC } from "react";
import scss from "./Favourite.module.scss";
import {
  useDeleteFavouriteProductMutation,
  useGetFavouritesQuery,
  useGetUserQuery,
} from "@/redux/api/genre";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Favourite: FC = () => {
  const { data: session } = useGetUserQuery();
  const userId = session?.id;
  const {
    data: favourites,
    isLoading,
    error,
    refetch,
  } = useGetFavouritesQuery(userId!);
  const [deleteFavouriteMovie] = useDeleteFavouriteProductMutation();
  const router = useRouter();

  if (!userId) {
    return <p>Please log in to view your favourites.</p>;
  }
  if (isLoading) {
    return <div className={scss.loader}></div>;
  }

  if (error) {
    return (
      <div className={scss.loaderContainer}>
        <div className={scss.loader}></div>
      </div>
    );
  }

  const handleDeleteMovie = async (movieId: number) => {
    try {
      await deleteFavouriteMovie({ movieId }).unwrap();
      console.log("Product successfully deleted");
      refetch();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };
  return (
    <section className={scss.Favourite}>
      <div className="container">
        <div className={scss.content}>
          <h2>Favourite Movies</h2>
          <div className={scss.movieGrid}>
            {favourites?.map((movie) => (
              <div
                onClick={() => router.push(`/movie/${movie.id}`)}
                key={movie.id}
                className={scss.movieCard}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                  alt={movie.title || "Movie Poster"}
                  width={300}
                  height={450}
                  onError={(
                    e: React.SyntheticEvent<HTMLImageElement, Event>
                  ) => {
                    e.currentTarget.src =
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7LL5QDXtA_-N-B_uSXsemRA7HaEWJSOf26A&s";
                  }}
                />
                <div className={scss.details}>
                  <p className={scss.title}>{movie.title}</p>
                  <p className={scss.releaseDate}>
                    {movie.release_date
                      ? new Date(movie.release_date).toLocaleDateString()
                      : "Release date N/A"}
                  </p>
                  <button onClick={() => handleDeleteMovie(movie.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Favourite;
