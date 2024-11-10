"use client";
import { FC } from "react";
import scss from "./SimilarMovies.module.scss";
import { useParams, useRouter } from "next/navigation";
import { useGetSimilarMoviesQuery } from "@/redux/api/details";
import { AiOutlinePlayCircle } from "react-icons/ai";

const SimilarMovies: FC = () => {
  const { movieId } = useParams();
  const router = useRouter();
  const { data: similar } = useGetSimilarMoviesQuery({
    movieId: Number(movieId),
  });
  return (
    <section className={scss.SimilarMovies}>
      <h1>Similar Movies</h1>
      <div className="container">
        <div className={scss.cards}>
          {similar?.results.map((movie) => (
            <div
              onClick={() => router.push(`/movie/${movie.id}`)}
              className={scss.card}
              key={movie.id}
            >
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg";
                }}
              />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimilarMovies;
