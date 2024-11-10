"use client";
import { useState } from "react";
import scss from "./Trending.module.scss";
import { useGetTrendingMovieQuery } from "@/redux/api/trending";
import { useRouter } from "next/navigation";

const Trending = () => {
  const [btn, setBtn] = useState<boolean>(true);
  const router = useRouter();

  const { data, error, isLoading } = useGetTrendingMovieQuery({
    timeWindow: btn ? "day" : "week",
  });

  return (
    <section className={scss.Trending}>
      <div className="container">
        <div className={scss.content}>
          <div
            className={scss.metres}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h1>Trending</h1>
            <div className={scss.btns}>
              {btn ? (
                <>
                  <button className={scss.purple} onClick={() => setBtn(true)}>
                    Day
                  </button>
                  <button onClick={() => setBtn(false)}>Week</button>
                </>
              ) : (
                <>
                  <button onClick={() => setBtn(true)}>Day</button>
                  <button className={scss.purple} onClick={() => setBtn(false)}>
                    Week
                  </button>
                </>
              )}
            </div>
          </div>

          <div className={scss.cards}>
            {isLoading && <p>Loading...</p>}
            {data?.results?.map((movie) => (
              <div
                onClick={() => router.push(`movie/${movie.id}`)}
                className={scss.card}
                key={movie.id}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title}
                />
                <p>{movie.title}</p>
                <h6>{new Date(movie.release_date).toLocaleDateString()}</h6>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trending;
