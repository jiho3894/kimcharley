import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getTv, IGetTVResult } from "../../Api/api";
import { makeImagePath } from "../../Api/utils";
import Loading from "../../Styles/Loading";
import { Info, infoVars, Span1 } from "./Home";

const UpcomingContainer = styled.div`
  width: 100%;
  height: 450px;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const UpcomingTitle = styled.div`
  width: 100%;
`;

const Container = styled.div`
  width: 98%;
  height: 400px;
  display: grid;
  grid-template-columns: repeat(18, 300px);
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
`;

const UpcomingBox = styled(motion.div)<{ bgimg: string }>`
  width: 300px;
  height: 400px;
  background-image: url(${(prop) => prop.bgimg});
  background-size: cover;
  background-position: center;
  margin-bottom: 15px;
`;

const TVSlider = () => {
  const { isLoading, data } = useQuery<IGetTVResult>("TV", getTv);
  return (
    <>
      <UpcomingTitle>
        <Span1>Charleyflix TV 프로그램</Span1>
      </UpcomingTitle>
      <UpcomingContainer>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Container>
              {data?.results.slice(2, 20).map((tv) => {
                return (
                  <Box whileHover={{ scale: 1.1 }}>
                    <Link key={tv.id} to={`/tv/${tv.id}`}>
                      <UpcomingBox bgimg={makeImagePath(tv.backdrop_path)}>
                        <Info variants={infoVars}>
                          <h4>{tv.original_name}</h4>
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

export default TVSlider;
