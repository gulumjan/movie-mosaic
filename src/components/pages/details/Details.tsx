"use client";
import { useEffect, useState } from "react";
import { useGetDetailsQuery, useGetCreditsQuery } from "@/redux/api/details";
import { useParams } from "next/navigation";
import scss from "./Details.module.scss";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { AiOutlinePlayCircle } from "react-icons/ai";
import useYoutubeVideoStore from "@/stores/useYoutubeVideoStore";
import {
  useGetUserQuery,
  useSendFavouriteMutation,
  useCheckFavouriteQuery,
} from "@/redux/api/genre";
import { useGetTrailersQuery } from "@/redux/api/trailer";
import Modal from "@/components/ui/modal/Modal";
import TopCast from "./top-cast/TopCast";
import OfficialVideo from "./official/OfficialVideo";
import SimilarMovies from "./similar/SimilarMovies";
import Recommendations from "./recommendations/Recommendations";

const Details = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState<iDetails | null>(null);
  const openModal = useYoutubeVideoStore((state) => state.openModal);
  const { data: session } = useGetUserQuery();
  const userId = session?.id;
  const { data: movieTrailer } = useGetTrailersQuery(movieId);

  const {
    data: detailsData,
    isLoading,
    error,
  } = useGetDetailsQuery({ movieId: Number(movieId) });
  const { data: favouriteData } = useCheckFavouriteQuery({ userId, movieId });
  const [sendFavourite] = useSendFavouriteMutation();

  useEffect(() => {
    if (detailsData) {
      setMovieDetails(detailsData);
    }
  }, [detailsData]);

  const handleFavourite = async () => {
    try {
      if (!movieDetails) return;

      await sendFavourite({
        id: Number(movieDetails.id),
        movieId: Number(movieId),
        title: movieDetails.title || "",
        posterPath: movieDetails.poster_path || "",
        release_date: movieDetails.release_date || null,
      }).unwrap();
    } catch (error) {
      console.error("Error adding to favourites:", error);
    }
  };

  if (isLoading) return <div className={scss.loader}></div>;
  if (error)
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  if (!movieDetails) return <div>Loading movie details...</div>;

  return (
    <section
      style={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundImage: `linear-gradient(
          to right,
          rgba(9, 14, 65, 0.913) calc((50vw - 170px) - 340px),
          rgba(2, 7, 55, 0.879) 50%,
          rgba(4, 12, 80, 0.821) 100%),
          url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movieDetails.backdrop_path})`,
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
            src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
            alt={movieDetails.title}
          />
          <div className={scss.text}>
            <h1>
              {movieDetails.title} {`${movieDetails.release_date}`}
            </h1>
            <h4>{movieDetails.tagline}</h4>
            <div className={scss.genre}>
              {movieDetails.genres.map((el, index) => (
                <button key={index}>{el.name}</button>
              ))}
            </div>

            <div className={scss.play}>
              <AiOutlinePlayCircle
                onClick={() => openModal(movieTrailer?.results[0]?.key)}
                className={scss.icon}
              />
              {favouriteData?.exists ? (
                <GoHeartFill className={scss.icon} />
              ) : (
                <GoHeart className={scss.icon} onClick={handleFavourite} />
              )}
            </div>
            <h2>Overview</h2>
            <p style={{ fontSize: "25px" }}>
              {movieDetails.overview.length > 160
                ? movieDetails.overview.slice(0, 160)
                : movieDetails.overview}
            </p>
          </div>
        </div>
        <TopCast />
        <OfficialVideo />
        <SimilarMovies />
        <Recommendations />
      </div>
      <Modal />
    </section>
  );
};

export default Details;
