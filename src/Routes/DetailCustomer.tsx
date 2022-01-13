import { motion } from "framer-motion";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";

const Container = styled(motion.div)`
  width: 100%;
  height: 50%;
  color: ${(prop) => prop.theme.white.lighter};
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
  useEffect(() => {
    if (!match) return;
  }, [match]);
  return (
    <Container>
      {isLoading ? (
        "hi"
      ) : (
        <>
          {movieMatch && (
            <>
              {match && (
                <Link to={`/Detail/${match.id}`} state={{ id: match.id }}>
                  {match.id}
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
