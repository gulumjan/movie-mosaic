// import Search from "./homeSections/searchInp/Search";
import Popular from "./homeSections/Popular";
import TopRated from "./homeSections/TopRated";
import Trending from "./homeSections/Trending";
import Welcome from "./homeSections/Welcome";

const HomePage = () => {
  return (
    <>
      <Welcome />
      <Trending />
      <Popular />
      <TopRated />
    </>
  );
};

export default HomePage;
