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
  const { isLoading: wait, data: info } = useQuery<IGetMoviesResult>(
    "Upcoming",
    getUpcoming
  );
  const upcomingMatch = useMatch(`/upcoming/:upcomingId`);
  const { isLoading, data } = useQuery<IGetMoviesTrailer>("trailer", () =>
    getTrailer(upcomingMatch?.params.upcomingId)
  );
  console.log(data?.results[0].key);
  return (
    <PlayContainer>
      {isLoading ? (
        "Loading"
      ) : (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${data?.results[0].key}`}
          controls={false}
          playing={true}
          loop={true}
          width="100%"
          height="calc(100vh - 80px)"
        ></ReactPlayer>
      )}
    </PlayContainer>
  );
};

export default UpcmoingDetail;
