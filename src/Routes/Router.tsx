import { lazy } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

const Header = lazy(() => import("./Header"));
const Home = lazy(() => import("../Components/Home/Home"));
const Search = lazy(() => import("../Components/Search/Search"));
const TV = lazy(() => import("../Components/Tv/Tv"));
const MainHome = lazy(() => import("../Components/Home/MainHome"));
const Upcoming = lazy(() => import("../Components/Upcoming/Upcoming"));
const UpcomingDetail = lazy(
  () => import("../Components/Detail/UpcomingDetail")
);
const TVDetail = lazy(() => import("../Components/Detail/TVDetail"));
const Login = lazy(() => import("../Components/Home/Login"));

const Router = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies" element={<Home />}>
          <Route path=":movieId" element={<Home />} />
        </Route>
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/upcoming/:upcomingId" element={<UpcomingDetail />} />
        <Route path="/tv" element={<TV />} />
        <Route path="/tv/:tvId" element={<TVDetail />} />
        <Route path="/search/*" element={<Search />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
