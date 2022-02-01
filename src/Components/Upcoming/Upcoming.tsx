import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getUpcoming, IGetMoviesResult } from "../../Api/api";
import { makeImagePath, NothingPoster } from "../../Api/utils";
import Loading from "../../Styles/Loading";

const Body = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const Container = styled(motion.div)`
  width: 100%;
  height: calc(100vh - 86px);
  position: absolute;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(2, 1fr);
  justify-content: center;
  gap: 0.1%;
`;

const Box = styled(motion.div)<{ bgimg: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(prop) => prop.bgimg});
  background-position: center;
  background-size: cover;
  border-radius: 10px;
`;

const DetailBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.7)
  );
  border-radius: 10px;
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-content: space-between;
`;

const TitleBox = styled.div`
  width: 100%;
  height: 50%;
  text-align: center;
`;

const FooterBox = styled.div`
  width: 90%;
  height: 50%;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
`;
const Date = styled.div``;

const Average = styled.div``;

const Upcoming = () => {
  const { isLoading, data } = useQuery<IGetMoviesResult>("Upcoming", () =>
    getUpcoming(2)
  );
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Body>
          <Container>
            {data?.results.map((upcoming, index) => {
              return (
                <Link key={index} to={`/upcoming/${upcoming.id}`}>
                  <Box
                    bgimg={
                      upcoming.backdrop_path === null
                        ? NothingPoster
                        : makeImagePath(upcoming.poster_path)
                    }
                  >
                    <DetailBox whileHover={{ opacity: 1 }}>
                      <TitleBox>{upcoming.title}</TitleBox>
                      <FooterBox>
                        <Date>
                          {upcoming.release_date.substring(0, 4)}year{" "}
                        </Date>
                        <Average>⭐{upcoming.vote_average}</Average>
                      </FooterBox>
                    </DetailBox>
                  </Box>
                </Link>
              );
            })}
          </Container>
        </Body>
      )}
    </>
  );
};
export default Upcoming;
