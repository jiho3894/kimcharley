import { motion } from "framer-motion";
import React from "react";
import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import {
  getMoviesDetail,
  getMovieSimilar,
  getMoviesTrailer,
  IGetMoviesDetail,
  IGetMovieSimilar,
  IGetMoviesTrailer,
} from "../../Api/api";
import { makeImagePath, makeTrailerPath } from "../../Api/utils";

const Container = styled(motion.div)`
  width: 100%;
  height: 100vh;
  color: white;
`;

const DetailPoster = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const DetailPlayContainer = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
`;

const Banner = styled.div`
  width: 100%;
  height: 300px;
  background: linear-gradient(
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.5)
  );
  position: absolute;
  top: 0;
  display: flex;
  align-items: flex-end;
`;

const DetailBanner = styled.div<{ bgimg?: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgimg});
  background-position: center;
`;

const OverviewContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 300px;
  background: linear-gradient(
    rgba(0, 0, 0, 0.95),
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.9)
  );
`;

const TitleContainer = styled.header`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Title = styled.span`
  font-size: 40px;
`;

const Explanation = styled.div`
  width: 95%;
  height: 100px;
  display: flex;
  margin-left: 10px;
`;

const OverviewBox = styled.div`
  width: 70%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 12px;
    border-radius: 50px;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(#e0eafc, #cfdef3);
    border-radius: 50px;
  }
`;

const Overview = styled.span`
  height: initial;
  font-size: 16px;
  font-weight: 300;
  width: 100%;
  height: 100%;
`;

const ReleaseContainer = styled.div`
  width: 95%;
  height: 50px;
  display: flex;
  align-items: center;
  font-weight: 600;
  margin-bottom: 20px;
  margin-left: 20px;
`;

const Wrapper = styled.div`
  width: 30%;
  height: 250px;
`;

const WrapperColor = styled.div`
  background-color: #e6e6e6;
  border-radius: 20px;
  color: black;
  font-weight: 600;
`;

const GenresContainer = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
`;

const Companies = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  padding-left: 20px;
`;

const LogoPath = styled.div<{ bgimg: string }>`
  width: 100px;
  height: 40px;
  background-image: url(${(prop) => prop.bgimg});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  margin: 10px;
`;

const SemiContainer = styled.div`
  width: 100%;
  height: calc(100% - 300px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  border-top: 2px solid gray;
`;

const SemiHeader = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
`;

const SemiBox = styled.div`
  width: 90%;
  height: 90%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
`;

const Similar = styled(motion.div)<{ bgimg: string }>`
  background-image: url(${(prop) => prop.bgimg});
  background-position: center;
  background-size: cover;
  border-radius: 10px;
`;

const HomeDetail = () => {
  const movieMatch = useMatch(`/movies/:movieId`);
  const { isLoading, data } = useQuery<IGetMoviesTrailer>("Movietrailer", () =>
    getMoviesTrailer(movieMatch?.params.movieId)
  );
  const { data: info } = useQuery<IGetMoviesDetail>("MovieDetail", () =>
    getMoviesDetail(movieMatch?.params.movieId)
  );
  const { data: similar } = useQuery<IGetMovieSimilar>("MovieSimilar", () =>
    getMovieSimilar(movieMatch?.params.movieId)
  );
  return (
    <Container>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          {movieMatch && (
            <DetailPoster>
              <DetailPlayContainer>
                <ReactPlayer
                  url={makeTrailerPath(data?.results[0].key)}
                  volume={0.2}
                  playing={true}
                  width="100%"
                  height="300px"
                ></ReactPlayer>
                <Banner>
                  <button>재생</button>
                </Banner>
              </DetailPlayContainer>
              <DetailBanner bgimg={makeImagePath(info?.backdrop_path || "")} />
              <OverviewContainer>
                <TitleContainer>
                  <Title>{info?.original_title}</Title>
                </TitleContainer>
                <ReleaseContainer>
                  <span>{info?.release_date} / </span>
                  <span>⭐{info?.vote_average} / </span>
                  <span>&nbsp;{info?.runtime}min / </span>
                  <span>&nbsp;{info?.spoken_languages[0].name}</span>
                  <span style={{ color: "red" }}>
                    &nbsp;{info?.adult ? "/ 청소년 관람불가" : ""}
                  </span>
                </ReleaseContainer>
                <Explanation>
                  <OverviewBox>
                    <Overview>
                      <span>{info?.overview}</span>
                    </Overview>
                  </OverviewBox>
                  <Wrapper>
                    <WrapperColor>
                      <GenresContainer>
                        {info?.genres.slice(0, 3).map((genres) => {
                          return (
                            <span key={genres.name}>
                              &nbsp;{genres.name} /{" "}
                            </span>
                          );
                        })}
                      </GenresContainer>
                      <Companies>
                        {info?.production_companies
                          .slice(0, 2)
                          .map((companies) => {
                            return (
                              <LogoPath
                                key={companies.logo_path}
                                bgimg={makeImagePath(companies.logo_path || "")}
                              ></LogoPath>
                            );
                          })}
                      </Companies>
                    </WrapperColor>
                  </Wrapper>
                </Explanation>
                <SemiContainer>
                  <SemiHeader>
                    <span>비슷한 콘텐츠</span>
                  </SemiHeader>
                  <SemiBox>
                    {similar?.results.slice(0, 6).map((movie) => {
                      return (
                        <Similar
                          key={movie.original_title}
                          whileHover={{ scale: 1.1 }}
                          bgimg={makeImagePath(movie.backdrop_path || "")}
                        />
                      );
                    })}
                  </SemiBox>
                </SemiContainer>
              </OverviewContainer>
            </DetailPoster>
          )}
        </>
      )}
    </Container>
  );
};

export default HomeDetail;
