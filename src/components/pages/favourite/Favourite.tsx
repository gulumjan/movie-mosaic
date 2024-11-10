"use client";
import { FC } from "react";
import scss from "./Favourite.module.scss";
import { useGetFavouritesQuery } from "@/redux/api/genre";
import Image from "next/image";

const Favourite: FC = () => {
  const { data: favourites, isLoading, error } = useGetFavouritesQuery();

  if (isLoading) {
    return <p>Loading favourites...</p>;
  }

  if (error) {
    return <p>Failed to load favourites. Please try again.</p>;
  }

  return (
    <section className={scss.Favourite}>
      <div className="container">
        <div className={scss.content}>
          <h2>Favourite Movies</h2>
          <div className={scss.movieGrid}>
            {favourites?.map((movie) => (
              <div key={movie.id} className={scss.movieCard}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                  alt={movie.title || "Movie Poster"}
                  onError={(
                    e: React.SyntheticEvent<HTMLImageElement, Event>
                  ) => {
                    e.currentTarget.src =
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7LL5QDXtA_-N-B_uSXsemRA7HaEWJSOf26A&s";
                  }}
                />
                <div className={scss.details}>
                  <p className={scss.title}>{movie.title || movie.title}</p>
                  <p className={scss.releaseDate}>
                    {movie.release_date
                      ? new Date(movie.release_date).toLocaleDateString()
                      : "Release date N/A"}
                  </p>
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
