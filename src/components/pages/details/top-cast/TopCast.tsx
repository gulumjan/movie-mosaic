"use client";

import { useGetCreditsQuery, useGetDetailsQuery } from "@/redux/api/details";
import { useParams, useRouter } from "next/navigation";
import scss from "./TopCast.module.scss";

const TopCast = () => {
  const { movieId } = useParams();
  console.log("🚀 ~ TopCast ~ movieId:", movieId);
  const router = useRouter();
  const { data: credits } = useGetCreditsQuery({
    movieId: Number(movieId),
  });
  const {
    data: movieDetails,
    error,
    isLoading,
  } = useGetDetailsQuery({
    movieId: Number(movieId),
  });
  return (
    <div className={scss.TopCast}>
      <h1>Top Cast</h1>
      <div className={scss.cards}>
        {isLoading && <p>Loading...</p>}
        {credits?.cast.map((movie) => (
          <div
            onClick={() => router.push(`/movie/${movie.id}`)}
            className={scss.card}
            key={movie.id}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${movie.profile_path}`}
              alt=""
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src =
                  "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg";
              }}
            />

            <p>{movie.name || movie.name}</p>
            <h6>
              {movie.character}/{movie.original_name}
            </h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCast;
