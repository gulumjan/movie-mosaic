"use client";
import React, { useEffect, useState } from "react";
import { useGetUpcomingQuery } from "@/redux/api/upcoming";
import Search from "./searchInp/Search";
import scss from "./Welcome.module.scss";
import { WriterAnimation } from "@/writerAnimation/WriterAnimation";
import { useRouter } from "next/navigation";

const Welcome = () => {
  const { data } = useGetUpcomingQuery();
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  useEffect(() => {
    if (data && data.results && data.results.length > 0) {
      const randomMovie =
        data.results[Math.floor(Math.random() * data.results.length)];
      const imageUrl = `https://image.tmdb.org/t/p/original${
        randomMovie.backdrop_path || randomMovie.poster_path
      }`;
      setBackgroundImage(imageUrl);
    }
  }, [data]);

  return (
    <section
      className={scss.Welcome}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: 0.5,
      }}
    >
      <div className="container">
        <div className={scss.content}>
          <h1>
            <span className="title">
              <WriterAnimation />
            </span>
          </h1>
          <p>
            Millions of movies, TV shows and people to discover. Explore now.
          </p>
          <Search />
        </div>
      </div>
    </section>
  );
};

export default Welcome;
