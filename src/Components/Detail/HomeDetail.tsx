import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import { getTrailer, IGetMoviesTrailer } from "../../Api/api";

const PlayContainer = styled.div`
  width: 100%;
  height: 88%;
  background-color: black;
`;

const Detail = () => {
  const movieMatch = useMatch(`/movies/Detail/:movieId`);
  const { data } = useQuery<IGetMoviesTrailer>("trailer", () =>
    getTrailer(movieMatch?.params.movieId)
  );
  return (
    <div style={{ width: 200, height: 200, backgroundColor: "red" }}>
      <PlayContainer>
        <ReactPlayer
          url={`https://www.youtube.com/embed/${data?.results[0].key}&origin=http://localhost:3000`}
          controls={false}
          playing={true}
          loop={true}
          width="100%"
          height="calc(100vh - 80px)"
        ></ReactPlayer>
      </PlayContainer>
    </div>
  );
};

export default Detail;
