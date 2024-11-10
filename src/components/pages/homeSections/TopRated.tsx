"use client";
import { useState } from "react";
import scss from "./TopRated.module.scss";
import { useGetTopRatedMoviesOrShowsQuery } from "@/redux/api/top_rated";
import { useRouter } from "next/navigation";

const TopRated = () => {
  const [isMovies, setIsMovies] = useState<boolean>(true);
  const router = useRouter();

  const type = isMovies ? "movie/top_rated" : "tv/top_rated";

  const { data, error, isLoading } = useGetTopRatedMoviesOrShowsQuery({ type });

  return (
    <section className={scss.TopRated}>
      <div className="container">
        <div className={scss.content}>
          <div
            className={scss.metres}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h1>Top Rated</h1>
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
                  alt={movie.title || movie.name}
                />
                <p>{movie.title || movie.name}</p>
                <h6>
                  {new Date(
                    movie.release_date || movie.release_date
                  ).toLocaleDateString()}
                </h6>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopRated;
