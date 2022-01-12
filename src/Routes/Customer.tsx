import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.black.lighter};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Customer = () => {
  const { isLoading, data } = useQuery<IGetMoviesResult>(
    "nowPlaying",
    getMovies
  );
  console.log(data?.results.slice(0, 1));
  return (
    <Container>
      {isLoading ? (
        "loading"
      ) : (
        <>
          {data?.results.slice(0, 1).map((movie) => (
            <Container>
              <Link to="/movies/" state={{ id: movie.id }}>
                여기눌러
              </Link>
            </Container>
          ))}
        </>
      )}
    </Container>
  );
};

export default Customer;
