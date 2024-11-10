"use client";
import { FC } from "react";
import scss from "./SimilarMovies.module.scss";
import { useParams, useRouter } from "next/navigation";
import { useGetTvSimilarMoviesQuery } from "@/redux/api/tv_details";
import Image from "next/image";

const SimilarTv: FC = () => {
  const { tvId } = useParams();
  const router = useRouter();
  const { data: similar } = useGetTvSimilarMoviesQuery({
    tvId: Number(tvId),
  });
  return (
    <section className={scss.SimilarMovies}>
      <h1>Similar Movies</h1>
      <div className="container">
        <div className={scss.cards}>
          {similar?.results.map((movie) => (
            <div
              onClick={() => router.push(`/tv/${movie.id}`)}
              className={scss.card}
              key={movie.id}
            >
              <Image
                width={220}
                height={340}
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimilarTv;
