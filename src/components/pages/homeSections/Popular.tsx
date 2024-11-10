"use client";
import { useGetPopularMovieQuery } from "@/redux/api/popular";
import scss from "./Popular.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Popular = () => {
  const [isMovies, setIsMovies] = useState<boolean>(true);

  const timeWindow = isMovies ? "movie/popular" : "tv/popular";
  const router = useRouter();

  const { data, error, isLoading } = useGetPopularMovieQuery({
    timeWindow,
  });

  return (
    <section className={scss.Popular}>
      <div className="container">
        <div className={scss.content}>
          <div
            className={scss.metres}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h1>What is Popular</h1>
            <div className={scss.btns}>
              {isMovies ? (
                <>
                  <button
                    className={scss.purple}
                    onClick={() => setIsMovies(true)}
                  >
                    Movies
                  </button>
                  <button onClick={() => setIsMovies(false)}>TV Shows</button>
                </>
              ) : (
                <>
                  <button onClick={() => setIsMovies(true)}>Movies</button>
                  <button
                    className={scss.purple}
                    onClick={() => setIsMovies(false)}
                  >
                    TV Shows
                  </button>
                </>
              )}
            </div>
          </div>

          <div className={scss.cards}>
            {isLoading && <p>Loading...</p>}
            {data?.results?.map((movie) => (
              <div
                onClick={() =>
                  router.push(
                    isMovies ? `/movie/${movie.id}` : `/tv/${movie.id}`
                  )
                }
                className={scss.card}
                key={movie.id}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title || movie?.title}
                />
                <p>{movie.title || movie.name}</p>
                <h6>{new Date(movie.release_date).toLocaleDateString()}</h6>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Popular;
