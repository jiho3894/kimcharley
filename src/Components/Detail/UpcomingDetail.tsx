import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import {
  getTrailer,
  getUpcoming,
  IGetMoviesResult,
  IGetMoviesTrailer,
} from "../../Api/api";

const PlayContainer = styled.div`
  width: 100%;
  height: 88%;
  background-color: black;
`;

const UpcmoingDetail = () => {
  const upcomingMatch = useMatch(`/upcoming/:upcomingId`);
  const { data: info } = useQuery<IGetMoviesResult>(
    "Upcoming",
    getUpcoming
  );
  const { isLoading, data } = useQuery<IGetMoviesTrailer>("trailer", () =>
    getTrailer(upcomingMatch?.params.upcomingId)
  );
  const clickMatch =
    upcomingMatch?.params.upcomingId &&
    info?.results.find(
      (movie) => String(movie.id) === upcomingMatch?.params.upcomingId
    );
  return (
    <PlayContainer>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          <ReactPlayer
            url={`https://www.youtube.com/embed/${data?.results[0].key}`}
            controls={false}
            playing={true}
            loop={true}
            width="80%"
            height="calc(80vh - 80px)"
          ></ReactPlayer>
          <>{clickMatch && <>{clickMatch.id}</>}</>
        </>
      )}
    </PlayContainer>
  );
};

export default UpcmoingDetail;
