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
  release_date: string;
  vote_average: string;
}

interface ITV {
  id: number;
  backdrop_path: string;
  original_name: string;
  overview: string;
  vote_average: number;
  poster_path: string;
  first_air_date: string;
}

interface ISearch {
  backdrop_path: string;
  id: number;
  original_title: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  media_type: string;
  name: string;
}

interface IMovieTrailer {
  key: string;
  id: string;
}

interface ITVTrailer {
  key: string;
  id: string;
}

interface IGenres {
  name: string;
}

interface ICompanies {
  logo_path: string;
}

interface ILanguages {
  name: string;
}

export interface IGetMoviesResult {
  results: IMovie[];
}

export interface IGetMoviesDetail {
  adult: boolean;
  backdrop_path: string;
  homepage: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  genres: IGenres[];
  production_companies: ICompanies[];
  spoken_languages: ILanguages[];
}

export interface IGetMoviesTrailer {
  id: number;
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
  original_name: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
}

export interface IMoiveSimilar {
  backdrop_path: string;
  original_title: string;
}

export interface IGetTVTrailer {
  results: ITVTrailer[];
}

export interface IGetSearchResult {
  results: ISearch[];
  total_results: number;
}

export interface IGetMovieSimilar {
  results: IMoiveSimilar[];
}

export const getMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=1`
  );
  return await response.json();
};

export const getMoviesDetail = async (movieId?: string) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
  );
  return await response.json();
};

export const getMoviesTrailer = async (movieId?: string) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
  );
  return await response.json();
};

export const getUpcoming = async (number?: number) => {
  const response = await fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${number}`
  );
  return await response.json();
};

export const getTv = async (number?: number) => {
  const response = await fetch(
    `${BASE_URL}/tv/popular?api_key=${API_KEY}&page=${number}`
  );
  return await response.json();
};

export const getTVDetail = async (tvId?: string) => {
  const response = await fetch(
    `${BASE_URL}/tv/${tvId}?api_key=${API_KEY}&language=ko-KR`
  );
  return await response.json();
};

export const getTvTrailer = async (tvId?: string) => {
  const response = await fetch(
    `${BASE_URL}/tv/${tvId}/videos?api_key=${API_KEY}`
  );
  return await response.json();
};

export const getSearch = async (query?: string) => {
  const response = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}&page=1&include_adult=false`
  );
  return await response.json();
};

export const getMovieSimilar = async (movieId?: string) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&page=1`
  );
  return await response.json();
};
