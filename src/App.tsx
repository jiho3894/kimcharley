import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Customer from "./Routes/Customer";
import Detail from "./Routes/Detail";
import Header from "./Routes/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import TV from "./Routes/TV";

const App = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Customer />} />
        <Route path="/movies" element={<Home />} />
        <Route path="/movies/:movieId" element={<Home />} />
        <Route path="/Detail/:movieId" element={<Detail />} />
        <Route path="/tv" element={<TV />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
