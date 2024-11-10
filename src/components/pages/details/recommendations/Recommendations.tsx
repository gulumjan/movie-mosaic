"use client";
import { FC } from "react";
import scss from "./Recommendations.module.scss";
import { useParams, useRouter } from "next/navigation";
import { useGetRecommendationsQuery } from "@/redux/api/details";
import Image from "next/image";

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
              <Image
                width={200}
                height={300}
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
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
