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
  width: 100%;
  height: 88%;
  background-color: black;
`;

const UpcmoingDetail = () => {
  const upcomingMatch = useMatch(`/upcoming/:upcomingId`);
  const { isLoading, data } = useQuery<IGetMoviesTrailer>("trailer", () =>
    getMoviesTrailer(upcomingMatch?.params.upcomingId)
  );
  const { data: info } = useQuery<IGetMoviesDetail>("MovieDetail", () =>
    getMoviesDetail(upcomingMatch?.params.upcomingId)
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
              volume={0.2}
              controls={false}
              playing={true}
              loop={true}
              width="100%"
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

export default UpcmoingDetail;
