"use client";

import { useGetDetailsQuery } from "@/redux/api/details";
import { useParams, useRouter } from "next/navigation";
import scss from "./TopCast.module.scss";
import { useGetTvCreditsQuery } from "@/redux/api/tv_details";
import Image from "next/image";

const TopCastTv = () => {
  const { tvId } = useParams();
  const router = useRouter();
  const { data: credits } = useGetTvCreditsQuery({
    tvId: Number(tvId),
  });
  const {
    data: movieDetails,
    error,
    isLoading,
  } = useGetDetailsQuery({
    movieId: Number(tvId),
  });
  return (
    <div className={scss.TopCast}>
      <h1>Top Cast</h1>
      <div className={scss.cards}>
        {isLoading && <p>Loading...</p>}
        {credits?.cast.map((movie) => (
          <div
            onClick={() => router.push(`/tv/${movie.id}`)}
            className={scss.card}
            key={movie.id}
          >
            <Image
              width={200}
              height={220}
              src={`https://image.tmdb.org/t/p/original${movie.profile_path}`}
              alt=""
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

export default TopCastTv;
