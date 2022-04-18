import { motion } from "framer-motion";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { getTv, IGetTVResult, ITV } from "../../Api/api";
import { makeImagePath, NothingPoster } from "../../Api/utils";
import { getTvImg } from "../../Recoil/Atom";
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

const Tv = () => {
  const { isLoading, data } = useQuery<IGetTVResult>("TV", () => getTv(2));
  const dataRecoil = useSetRecoilState(getTvImg);
  useEffect(() => {
    dataRecoil(data?.results);
  }, [data, dataRecoil]);
  const post = useRecoilValue(getTvImg);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Body>
          <Container>
            {post?.map((tv: ITV) => {
              return (
                <Link key={tv.id} to={`/tv/${tv.id}`}>
                  <Box
                    bgimg={
                      tv.backdrop_path === null
                        ? NothingPoster
                        : makeImagePath(tv.poster_path)
                    }
                  >
                    <DetailBox whileHover={{ opacity: 1 }}>
                      <TitleBox>{tv.original_name}</TitleBox>
                      <FooterBox>
                        <Date>{tv.first_air_date.substring(0, 4)}year </Date>
                        <Average>⭐{tv.vote_average}</Average>
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

export default Tv;
