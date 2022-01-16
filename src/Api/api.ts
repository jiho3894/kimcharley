const API_KEY = "9594c9ccbbcc42235a2072ad7d3699ae";
const BASE_URL = "https://api.themoviedb.org/3";

export interface RouterID {
  state: {
    id: number;
  };
}

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

interface ITV {
  id: number;
  backdrop_path: string;
  original_name: string;
  overview: string;
  vote_average: number;
}

interface ISearch {
  backdrop_path: string;
  id: number;
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface IMovieTrailer {
  key: string;
  id: string;
}

interface ITVTrailer {
  key: string;
  id: string;
}

export interface IGetMoviesResult {
  page: number;
  results: IMovie[];
}

export interface IGetMoviesDetail {
  adult: boolean;
  backdrop_path: string;
  homepage: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export interface IGetMoviesTrailer {
  id: string;
  results: IMovieTrailer[];
}

export interface IGetTVResult {
  page: number;
  results: ITV[];
}

export interface IGetTVDetail {
  adult: boolean;
  backdrop_path: string;
  homepage: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
}

export interface IGetTVTrailer {
  id: string;
  results: ITVTrailer[];
}

export interface IGetSearchResult {
  results: ISearch[];
}

export const getMovies = () => {
  return fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
};

export const getMoviesDetail = (movieId?: string) => {
  return fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
};

export const getMoviesTrailer = (movieId?: string) => {
  return fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
};

export const getUpcoming = () => {
  return fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
};

export const getTv = () => {
  return fetch(
    `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
};

export const getTVDetail = (tvId?: string) => {
  return fetch(
    `${BASE_URL}/tv/${tvId}?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
};

export const getTvTrailer = (tvId?: string) => {
  return fetch(
    `${BASE_URL}/tv/${tvId}/videos?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
};

export const getSearch = (query?: string) => {
  return fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=true`
  ).then((response) => response.json());
};
