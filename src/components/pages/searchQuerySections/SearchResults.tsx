"use client";
import { FC, useState, useCallback } from "react";
import scss from "./SearchResult.module.scss";
import { useGetSearchCollectionsQuery } from "@/redux/api/search";
import { useParams, useRouter } from "next/navigation";

const SearchResults: FC = () => {
  const router = useRouter();
  const { searchQuery } = useParams();
  const [category, setCategory] = useState<
    "movie" | "multi" | "person" | "collection"
  >("movie");

  const {
    data: collection,
    error,
    isLoading,
  } = useGetSearchCollectionsQuery({
    category,
    query: String(searchQuery),
  });

  const handleCategoryChange = useCallback(
    (newCategory: "movie" | "multi" | "person" | "collection") => {
      setCategory(newCategory);
    },
    []
  );

  if (error) {
    return (
      <div className={scss.error}>
        {"Something went wrong! Please try again."}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={scss.loaderContainer}>
        <div className={scss.loader}></div>
      </div>
    );
  }

  return (
    <section className={scss.SearchResults}>
      <div className={scss.btns}>
        {["movie", "multi", "person", "collection"].map((cat) => (
          <button
            key={cat}
            onClick={() =>
              handleCategoryChange(
                cat as "movie" | "multi" | "person" | "collection"
              )
            }
            className={category === cat ? scss.active : ""}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className={scss.container}>
        <div className={scss.content}>
          <div className={scss.moviesList}>
            {collection?.results?.map((item) => (
              <div
                onClick={() => router.push(`/movie/${item.id}`)}
                className={scss.card}
                key={item.id}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7LL5QDXtA_-N-B_uSXsemRA7HaEWJSOf26A&s";
                  }}
                  alt={item.title || item.name}
                />
                <p>{item.title || item.name}</p>
                <h6>
                  {item.release_date
                    ? new Date(item.release_date).toLocaleDateString()
                    : "N/A"}
                </h6>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchResults;