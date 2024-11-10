"use client";
import { FC } from "react";
import scss from "./TvDetails.module.scss";
import { useParams } from "next/navigation";
import { useGetTvDetailsQuery } from "@/redux/api/tv_details";
import Rating from "../details/rating/Rating";
import { AiOutlinePlayCircle } from "react-icons/ai";
import TopCastTv from "../details/top-cast/TopCastTv";
import OfficialTvVideo from "../details/official/OfficialTvVideos";
import SimilarMovies from "../details/similar/SimilarMovies";
import RecommendationsTv from "../details/recommendations/RecommendationsTv";
import useYoutubeVideoStore from "@/stores/useYoutubeVideoStore";
import { useGetTrailersTvQuery } from "@/redux/api/trailer";

const TvDetails: FC = () => {
  const { tvId } = useParams();
  const openModal = useYoutubeVideoStore((state) => state.openModal);

  const { data: tvTrailer } = useGetTrailersTvQuery(tvId);
  const {
    data: tvDetails,
    error,
    isLoading,
  } = useGetTvDetailsQuery({
    series_id: Number(tvId),
  });
  if (error)
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  return (
    <div
      style={{
        position: "relative",
        background: `url(https://image.tmdb.org/t/p/original${tvDetails?.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className={scss.Details}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 1,
        }}
      ></div>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className={scss.content}>
          <img
            src={`https://image.tmdb.org/t/p/original${tvDetails?.poster_path}`}
            alt={tvDetails?.name}
          />
          <div className={scss.text}>
            <h1>
              {tvDetails?.name} {`${tvDetails?.first_air_date}`}
            </h1>
            <h4>{tvDetails?.tagline}</h4>
            <div className={scss.genre}>
              {tvDetails?.genres.map((el, index) => (
                <button key={index}>{el.name}</button>
              ))}
            </div>

            <div className={scss.play}>
              <Rating rating={tvDetails?.vote_average ?? 0} />{" "}
              {/* Safe default value */}
              <AiOutlinePlayCircle
                onClick={() => {
                  if (tvTrailer?.result && tvTrailer.result.length > 0) {
                    openModal(tvTrailer.result[0].key);
                  } else {
                    console.error("No trailer available");
                  }
                }}
                style={{ fontSize: "56px" }}
              />
            </div>
            <h2>Overview</h2>
            <p style={{ fontSize: "25px" }}>{tvDetails?.overview}</p>
            <div className={scss.release}>
              <h5>
                Status : <span>Released</span>
              </h5>
              <h5>
                Release Date : <span>{tvDetails?.first_air_date}</span>
              </h5>
              <h5></h5>
            </div>
            <div className={scss.writers}>
              <h5>
                Director: <span>Justin Baldony</span>
              </h5>
              <h5>
                Writer: <span>Justin Baldony</span>
              </h5>
            </div>
          </div>
        </div>
        <TopCastTv />
        <OfficialTvVideo />
        <RecommendationsTv />
        <SimilarMovies />
      </div>
    </div>
  );
};

export default TvDetails;
