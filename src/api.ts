const API_KEY = "9594c9ccbbcc42235a2072ad7d3699ae";
const BASE_URL = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

interface ITrailer {
  key: string;
  id: string;
}

export interface RouterID {
  state: {
    id: string;
  };
}

export interface DetailID {
  state: {
    id: string;
  }
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetMoviesTrailer {
  id: number;
  results: ITrailer[];
}

export const getMovies = () => {
  return fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
};

export const getTrailer = (movieId?: string) => {
  return fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
};
