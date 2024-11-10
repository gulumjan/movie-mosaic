"use client";
import { useEffect, useState } from "react";
import { useGetCreditsQuery, useGetDetailsQuery } from "@/redux/api/details";
import scss from "./Details.module.scss";
import { useParams } from "next/navigation";
import Rating from "./rating/Rating";
import { AiOutlinePlayCircle } from "react-icons/ai";
import TopCast from "./top-cast/TopCast";
import OfficialVideo from "./official/OfficialVideo";
import SimilarMovies from "./similar/SimilarMovies";
import Recommendations from "./recommendations/Recommendations";
import { GoHeart, GoHeartFill } from "react-icons/go";
import axios from "axios";
import useYoutubeVideoStore from "@/stores/useYoutubeVideoStore";
import { useGetTrailersQuery } from "@/redux/api/trailer";
import Modal from "@/components/ui/modal/Modal";
import { useSendFavouriteMutation } from "@/redux/api/genre";

const Details = () => {
  const [isClient, setIsClient] = useState(false);
  const { movieId } = useParams();
  const [heart, setHeart] = useState<boolean>(false);
  const [movieDetails, setMovieDetails] = useState<iDetails | null>(null);
  const openModal = useYoutubeVideoStore((state) => state.openModal);

  const {
    data: detailsData,
    error,
    isLoading,
  } = useGetDetailsQuery({
    movieId: Number(movieId),
  });
  const { data: credits } = useGetCreditsQuery({
    movieId: Number(movieId),
  });
  const { data: movieTrailer } = useGetTrailersQuery(movieId);
  const [sendFavourite] = useSendFavouriteMutation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const checkFavourite = async () => {
      try {
        const response = await axios.get(`/api/favourite/${movieId}`);
        if (response.data.isFavourite) setHeart(true);
      } catch (error) {
        console.error("Error checking if movie is in favourites:", error);
      }
    };

    checkFavourite();
  }, [movieId]);

  const handleFavourite = async () => {
    const obj: GENRE.PostFavouriteMovieRequest = {
      movieId: Number(movieId),
      title: movieDetails?.title || "",
      posterPath: movieDetails?.poster_path || "",
      release_date: movieDetails?.release_date || null,
    };

    try {
      await sendFavourite(obj).unwrap();
      setHeart(true);
    } catch (error) {
      console.error("Error adding to favourites:", error);
    }
  };

  useEffect(() => {
    if (detailsData) {
      setMovieDetails(detailsData);
    }
  }, [detailsData]);

  if (!isClient || isLoading) return <div className={scss.loader}></div>;

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
          url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movieDetails?.backdrop_path})`,
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
            src={`https://image.tmdb.org/t/p/original${movieDetails?.poster_path}`}
            alt={movieDetails?.title}
          />
          <div className={scss.text}>
            <h1>
              {movieDetails?.title} {`${movieDetails?.release_date}`}
            </h1>
            <h4>{movieDetails?.tagline}</h4>
            <div className={scss.genre}>
              {movieDetails?.genres.map((el, index) => (
                <button key={index}>{el.name}</button>
              ))}
            </div>

            <div className={scss.play}>
              <Rating rating={movieDetails?.vote_average} />
              <AiOutlinePlayCircle
                onClick={() => openModal(movieTrailer?.results[0]?.key)}
                className={scss.icon}
              />
              {heart ? (
                <GoHeartFill className={scss.icon} />
              ) : (
                <GoHeart className={scss.icon} onClick={handleFavourite} />
              )}
            </div>
            <h2>Overview</h2>
            <p style={{ fontSize: "25px" }}>
              {movieDetails?.overview.length > 160
                ? movieDetails.overview.slice(0, 160)
                : movieDetails.overview}
            </p>
            <div className={scss.release}>
              <h5>
                Status : <span>Released</span>
              </h5>
              <h5>
                Release Date : <span>{movieDetails?.release_date}</span>
              </h5>
              <h5>
                Runtime :{" "}
                <span>
                  {Math.floor(movieDetails!.runtime / 60)}h{" "}
                  {Math.round(movieDetails!.runtime % 60)}m
                </span>
              </h5>
            </div>
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
