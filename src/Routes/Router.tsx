import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "../Components/Home/Home";
import Search from "../Components/Search/Search";
import TV from "../Components/Tv/Tv";
import Header from "./Header";
import MainHome from "../Components/Home/MainHome";
import TvDetail from "../Components/Detail/TVDetail";
import Upcoming from "../Components/Upcoming/Upcoming";
import UpcomingDetail from "../Components/Detail/UpcomingDetail";

const Router = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/movies" element={<Home />}>
          <Route path=":movieId" element={<Home />} />
        </Route>
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/upcoming/:upcomingId" element={<UpcomingDetail />} />
        <Route path="/tv" element={<TV />} />
        <Route path="/tv/Detail/:tvId" element={<TvDetail />} />
        <Route path="/search/*" element={<Search />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
