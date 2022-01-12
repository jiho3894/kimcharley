import React from "react";
import { useBeforeunload } from "react-beforeunload";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customer from "./Routes/Customer";
import Header from "./Routes/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import TV from "./Routes/TV";

const App = () => {
  useBeforeunload((event) => {
    event.preventDefault();
    return "hid"
  });
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Customer />} />
        <Route path="/movies" element={<Home />} />
        <Route path="/movies/:movieId" element={<Home />} />
        <Route path="/tv" element={<TV />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
