"use client";
import { useState } from "react";
import scss from "./Movie.module.scss";
import { useGetGenreListQuery } from "@/redux/api/genre";
import { useGetDiscoverTvQuery } from "@/redux/api/discover";
import { useRouter } from "next/navigation";

const Tv = () => {
  const sortOptions = [
    { label: "Popularity Descending", value: "popularity.desc" },
    { label: "Popularity Ascending", value: "popularity.asc" },
    { label: "Rating Descending", value: "vote_average.desc" },
    { label: "Release Date Descending", value: "release_date.desc" },
    { label: "Release Date Ascending", value: "release_date.asc" },
    { label: "Title (A-Z)", value: "original_title.asc" },
  ];

  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const {
    data: genresData,
    isLoading: loadingGenres,
    isError: errorLoadingGenres,
  } = useGetGenreListQuery({ timeWindow: "genre/tv/list" });

  const { data: tvShowsData, isLoading: loadingTvShows } =
    useGetDiscoverTvQuery({
      timeWindow: "/discover/tv",
      genre: selectedGenre,
      sort_by: selectedSort,
    });

  const router = useRouter();

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(e.target.value);
  };

  return (
    <div className={scss.Movie}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.select}>
            <h1>Explore TV Shows</h1>
            <div className={scss.options}>
              <select value={selectedGenre} onChange={handleGenreChange}>
                <option value="" disabled>
                  {loadingGenres ? "Loading Genres..." : "Select Genres"}
                </option>
                {errorLoadingGenres && (
                  <option value="" disabled>
                    Error Loading Genres
                  </option>
                )}
                {!loadingGenres &&
                  genresData?.genres?.map((genre: any) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
              </select>

              <select value={selectedSort} onChange={handleSortChange}>
                <option value="" disabled>
                  Sort By
                </option>
                {sortOptions.map((sort) => (
                  <option key={sort.value} value={sort.value}>
                    {sort.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={scss.moviesList}>
            {loadingTvShows ? (
              <p>Loading TV shows...</p>
            ) : (
              tvShowsData?.results?.map((tvShow: any) => (
                <div
                  onClick={() => router.push(`/tv/${tvShow.id}`)}
                  className={scss.card}
                  key={tvShow.id}
                >
                  <img
                    src={
                      `https://image.tmdb.org/t/p/original${tvShow.poster_path}` ||
                      "https://clipart-library.com/newhp/150-1502107_movies-vector-slate-film-slate-no-background.png"
                    }
                    alt={tvShow.title || tvShow.name}
                  />
                  <p>{tvShow.title || tvShow.name}</p>
                  <h6>
                    {new Date(
                      tvShow.first_air_date || tvShow
                    ).toLocaleDateString()}
                  </h6>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tv;
