import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getUpcoming, IGetMoviesResult } from "../../Api/api";
import { makeImagePath, NothingPoster } from "../../Api/utils";
import Loading from "../../Styles/Loading";
import { Info, infoVars, Span1 } from "./Home";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const UpcomingContainer = styled.div`
  width: 100%;
  height: 450px;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const UpcomingTitle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Container = styled.div`
  width: 98%;
  height: 400px;
  display: grid;
  grid-template-columns: repeat(20, 300px);
  align-items: center;
  margin-left: 2%;
  gap: 3px;
  position: absolute;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    width: 5px;
    height: 10px;
    border-radius: 50px;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(#e0eafc, #cfdef3);
    border-radius: 50px;
  }
`;

const Box = styled(motion.div)`
  width: 300px;
  height: 400px;
  transform-origin: bottom;
`;

const UpcomingBox = styled(motion.div)<{ bgimg: string }>`
  width: 300px;
  height: 400px;
  background-image: url(${(prop) => prop.bgimg});
  background-size: cover;
  background-position: center;
  margin-bottom: 15px;
`;

const UpcomingSlider = () => {
  const { isLoading, data } = useQuery<IGetMoviesResult>("Upcoming", () =>
    getUpcoming(1)
  );
  return (
    <>
      <UpcomingTitle>
        <Link to="/upcoming">
          <Span1>Charleyflix 상영 예정</Span1>
        </Link>
        <Link to="/upcoming">
          <ArrowCircleRightIcon fontSize="large" />
        </Link>
      </UpcomingTitle>
      <UpcomingContainer>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Container>
              {data?.results.map((upcoming, index) => {
                return (
                  <Box key={index} whileHover={{ scale: 1.05 }}>
                    <Link to={`/upcoming/${upcoming.id}`}>
                      <UpcomingBox
                        bgimg={
                          upcoming.backdrop_path === null
                            ? NothingPoster
                            : makeImagePath(upcoming.backdrop_path)
                        }
                      >
                        <Info variants={infoVars}>
                          <h4>{upcoming.title}</h4>
                        </Info>
                      </UpcomingBox>
                    </Link>
                  </Box>
                );
              })}
            </Container>
          </>
        )}
      </UpcomingContainer>
    </>
  );
};

export default UpcomingSlider;
