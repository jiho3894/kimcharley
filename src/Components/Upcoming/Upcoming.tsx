import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getUpcoming, IGetMoviesResult } from "../../Api/api";
import { makeImagePath } from "../../Api/utils";
import Loading from "../../Routes/Loading";
import { boxVars, Info, infoVars } from "../Home/Home";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  align-items: center;
`;

const UpcomingBox = styled(motion.div)<{ bgimg: string }>`
  width: 250px;
  height: 500px;
  background-image: url(${(prop) => prop.bgimg});
  background-size: cover;
  background-position: center;
  margin-bottom: 15px;
`;

const UpcomingMirror = styled(motion.div)<{ bgimg: string }>`
  width: 250px;
  height: 500px;
  background-image: url(${(prop) => prop.bgimg});
  background-size: cover;
  background-position: center;
  transform: rotateX(180deg);
  opacity: 0.6;
`;

const Upcoming = () => {
  const { isLoading, data } = useQuery<IGetMoviesResult>(
    "Upcoming",
    getUpcoming
  );
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          {data?.results.map((upcoming) => {
            return (
              <Link key={upcoming.id} to={`/upcoming/${upcoming.id}`}>
                <UpcomingBox
                  whileHover="hover"
                  initial="normal"
                  variants={boxVars}
                  transition={{ type: "tween" }}
                  bgimg={makeImagePath(upcoming.backdrop_path)}
                >
                  <Info variants={infoVars}>
                    <h4>{upcoming.title}</h4>
                  </Info>
                </UpcomingBox>
                <UpcomingMirror
                  bgimg={makeImagePath(upcoming.backdrop_path)}
                ></UpcomingMirror>
              </Link>
            );
          })}
        </Container>
      )}
    </>
  );
};

export default Upcoming;
