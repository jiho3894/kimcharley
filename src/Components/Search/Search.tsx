/* eslint-disable array-callback-return */
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { getSearch, IGetSearchResult } from "../../Api/api";
import { makeImagePath, NothingPoster } from "../../Api/utils";
import Back from "../../Styles/Back";
import Loading from "../../Styles/Loading";
import NoQuery from "../../Styles/NoQuery";

const Body = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Container = styled(motion.div)`
  width: 100%;
  height: calc(100vh - 86px);
  position: absolute;
  top: 0;
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

const Average = styled.div``;

const container = {
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Search = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const { isLoading, data } = useQuery<IGetSearchResult>("search", () =>
    getSearch(query + "")
  );
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Back />
          {data?.total_results === 0 ? (
            <NoQuery />
          ) : (
            <>
              <Body>
                <Container
                  variants={container}
                  initial="hidden"
                  animate="visible"
                >
                  {data?.results.map((info, index) => {
                    if (info.media_type === "movie") {
                      return (
                        <Link key={index} to={`/upcoming/${info.id}`}>
                          <Box
                            variants={item}
                            bgimg={
                              info.backdrop_path === null
                                ? NothingPoster
                                : makeImagePath(
                                    info.backdrop_path || info.poster_path
                                  )
                            }
                          >
                            <DetailBox whileHover={{ opacity: 1 }}>
                              <TitleBox>{info.original_title}</TitleBox>
                              <FooterBox>
                                <Average>⭐{info.vote_average}</Average>
                              </FooterBox>
                            </DetailBox>
                          </Box>
                        </Link>
                      );
                    } else if (info.media_type === "tv") {
                      return (
                        <Link key={index} to={`/tv/${info.id}`}>
                          <Box
                            variants={item}
                            bgimg={
                              info.backdrop_path === null
                                ? NothingPoster
                                : makeImagePath(
                                    info.backdrop_path || info.poster_path
                                  )
                            }
                          >
                            <DetailBox whileHover={{ opacity: 1 }}>
                              <TitleBox>{info.name}</TitleBox>
                              <FooterBox>
                                <Average>⭐{info.vote_average}</Average>
                              </FooterBox>
                            </DetailBox>
                          </Box>
                        </Link>
                      );
                    }
                  })}
                </Container>
              </Body>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Search;
