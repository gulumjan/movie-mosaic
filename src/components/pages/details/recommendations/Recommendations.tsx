"use client";
import { FC } from "react";
import scss from "./Recommendations.module.scss";
import { useParams, useRouter } from "next/navigation";
import { useGetRecommendationsQuery } from "@/redux/api/details";

const Recommendations: FC = () => {
  const { movieId } = useParams();
  const router = useRouter();
  const { data: recommendations } = useGetRecommendationsQuery({
    movieId: Number(movieId),
  });
  return (
    <section className={scss.Recommendations}>
      <h1>Recommendations</h1>
      <div className="container">
        <div className={scss.cards}>
          {recommendations?.results.map((movie) => (
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

export default Recommendations;
