"use client";
import { FC } from "react";
import scss from "./Recommendations.module.scss";
import { useParams, useRouter } from "next/navigation";
import { useGetTvRecommendationsQuery } from "@/redux/api/tv_details";
import Image from "next/image";

const RecommendationsTv: FC = () => {
  const { tvId } = useParams();
  const router = useRouter();
  const { data: recommendations } = useGetTvRecommendationsQuery({
    tvId: Number(tvId),
  });

  return (
    <section className={scss.Recommendations}>
      <h1>Recommendations</h1>
      <div className="container">
        <div className={scss.cards}>
          {recommendations?.results.map((movie) => (
            <div
              onClick={() => router.push(`/tv/${movie.id}`)}
              className={scss.card}
              key={movie.id}
            >
              <Image
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                    : "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
                }
                alt={movie.title || "Movie Poster"}
                width={200} // Adjust the width and height according to your design
                height={300} // Adjust accordingly
                placeholder="blur" // Optional: a blur placeholder
                blurDataURL="/path/to/placeholder.jpg" // Optional: small, low-quality image as a blur placeholder
              />
              <p>{movie.title || "Untitled"}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendationsTv;
