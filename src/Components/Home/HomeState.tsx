import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../../Api/api";

const Container = styled(motion.div)`
  width: 100%;
  height: 50%;
  color: white;
`;

const DetailCustomer = () => {
  const movieMatch = useMatch(`/movies/:movieId`);
  const { isLoading, data } = useQuery<IGetMoviesResult>(
    "nowPlaying",
    getMovies
  );
  const match =
    movieMatch?.params.movieId &&
    data?.results.find(
      (moive) => String(moive.id) === movieMatch.params.movieId
    );
  return (
    <Container>
      {isLoading ? (
        "hi"
      ) : (
        <>
          {movieMatch && (
            <>
              {match && (
                <Link
                  to={`/movies/Detail/${match.id}`}
                >
                  {match.title}
                </Link>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default DetailCustomer;
