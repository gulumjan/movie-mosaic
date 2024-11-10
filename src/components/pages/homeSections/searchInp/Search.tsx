"use client";
import { useRouter } from "next/navigation";
import scss from "./Search.module.scss";
import { useState } from "react";

const Search = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search/${searchQuery}`);
    }
  };

  return (
    <div className={scss.Search}>
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        placeholder="Search for a movie or TV show"
        type="text"
        value={searchQuery}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
