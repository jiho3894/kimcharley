import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import {
  getMoviesDetail,
  getMoviesTrailer,
  IGetMoviesDetail,
  IGetMoviesTrailer,
} from "../../Api/api";
import { makeTrailerPath } from "../../Api/utils";

const PlayContainer = styled.div`
  width: 80%;
  height: 50%;
  background-color: black;
`;

const Detail = () => {
  const movieMatch = useMatch(`/movies/Detail/:movieId`);
  const { isLoading, data } = useQuery<IGetMoviesTrailer>("Movietrailer", () =>
    getMoviesTrailer(movieMatch?.params.movieId)
  );
  const { data: info } = useQuery<IGetMoviesDetail>("MovieDetail", () =>
    getMoviesDetail(movieMatch?.params.movieId)
  );
  return (
    <>
      {isLoading ? (
        "Loading"
      ) : data?.results[0] === undefined ? (
        <div
          style={{
            width: 300,
            height: 300,
            backgroundColor: "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }} 
        ></div>
      ) : (
        <>
          <PlayContainer>
            <ReactPlayer
              url={makeTrailerPath(data?.results[0].key)}
              controls={false}
              playing={true}
              loop={true}
              width="80"
              height="calc(70vh - 80px)"
            ></ReactPlayer>
          </PlayContainer>
          <div
            style={{
              width: 300,
              height: 300,
              backgroundColor: "red",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <a
              href={`${info?.homepage}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              이동
            </a>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
