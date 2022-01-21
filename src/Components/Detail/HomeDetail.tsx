import { motion } from "framer-motion";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getMoviesDetail,
  getMovieSimilar,
  getMoviesTrailer,
  IGetMoviesDetail,
  IGetMovieSimilar,
  IGetMoviesTrailer,
} from "../../Api/api";
import { makeImagePath, makeTrailerPath, NothingPoster } from "../../Api/utils";
import Stack from "@mui/material/Stack";
import CancelIcon from "@mui/icons-material/Cancel";
import Rating from "@mui/material/Rating";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Loading from "../../Styles/Loading";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

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
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Banner = styled.div`
  width: 100%;
  height: 300px;
  background: linear-gradient(
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.5)
  );
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`;

const BannerBackContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const BannerBackBox = styled.div`
  width: 95%;
  display: flex;
  justify-content: flex-end;
  z-index: 10;
  position: absolute;
`;

const BannerBack = styled(motion.div)`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  background-color: #2c3e50;
  border-radius: 50%;
`;

const BannerFooterBox = styled.footer`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
`;

const BannerFooter = styled.footer`
  width: 95%;
  height: 50px;
  display: flex;
  justify-content: space-between;
`;

const BannerPlayBtn = styled.button`
  width: 150px;
  font-size: 30px;
  font-weight: 600;
  border-radius: 10px;
  border: 0;
`;

const BannerVolum = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 0;
  background-color: #9ca7b2;
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
  margin-right: 3px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
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
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Companies = styled.div`
  width: 100%;
  height: 60px;
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
  span {
    font-size: 30px;
    font-weight: 600;
  }
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
  const navigate = useNavigate();
  const [volum, setVolum] = useState(false);
  const { isLoading, data } = useQuery<IGetMoviesTrailer>("Movietrailer", () =>
    getMoviesTrailer(movieMatch?.params.movieId)
  );
  const { data: info } = useQuery<IGetMoviesDetail>("MovieDetail", () =>
    getMoviesDetail(movieMatch?.params.movieId)
  );
  const { data: similar } = useQuery<IGetMovieSimilar>("MovieSimilar", () =>
    getMovieSimilar(movieMatch?.params.movieId)
  );
  const onClick = () => {
    navigate("/movies");
  };
  const volumClick = () => setVolum((prev) => !prev);
  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {movieMatch && (
            <DetailPoster>
              <DetailPlayContainer>
                <ReactPlayer
                  url={makeTrailerPath(data?.results[0].key)}
                  volume={volum ? 0.2 : 0}
                  playing={true}
                  loop={true}
                  width="150%"
                  height="600px"
                  style={{ scale: 1.5 }}
                ></ReactPlayer>
                <Banner>
                  <BannerBackContainer>
                    <BannerBackBox>
                      <BannerBack
                        onClick={onClick}
                        whileHover={{ rotate: "90deg" }}
                      >
                        <CancelIcon fontSize="large"></CancelIcon>
                      </BannerBack>
                    </BannerBackBox>
                  </BannerBackContainer>
                  <BannerFooterBox>
                    <BannerFooter>
                      <BannerPlayBtn
                        onClick={() => alert("로그인 후 이용 가능합니다.")}
                      >
                        <DoubleArrowIcon />
                        Play
                      </BannerPlayBtn>
                      <BannerVolum onClick={volumClick}>
                        {volum ? <VolumeUpIcon /> : <VolumeOffIcon />}
                      </BannerVolum>
                    </BannerFooter>
                  </BannerFooterBox>
                </Banner>
              </DetailPlayContainer>
              <DetailBanner bgimg={
                    info?.backdrop_path === null
                      ? NothingPoster
                      : makeImagePath(info?.backdrop_path || "")
                  } />
              <OverviewContainer>
                <TitleContainer>
                  <Title>{info?.original_title}</Title>
                </TitleContainer>
                <ReleaseContainer>
                  <span>{info?.release_date} / </span>
                  <span>
                    <Stack spacing={1}>
                      <Rating
                        name="half-rating-read"
                        defaultValue={
                          info?.vote_average === undefined
                            ? 3.0
                            : Math.floor(Number(info?.vote_average))
                        }
                        precision={0.5}
                        readOnly
                        size="small"
                      />
                    </Stack>
                  </span>
                  <span>&nbsp;{info?.runtime}min / </span>
                  <span>&nbsp;{info?.spoken_languages[0].name}</span>
                  <span style={{ color: "red" }}>
                    &nbsp;{info?.adult ? "/ 청소년 관람불가" : ""}
                  </span>
                  <a href={info?.homepage} target="_blank" rel="noreferrer">
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        size="small"
                        endIcon={<SendIcon />}
                      >
                        HomePage
                      </Button>
                    </Stack>
                  </a>
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
                        {info?.genres.slice(0, 3).map((genres, index) => {
                          return <span key={index}>&nbsp;{genres.name} /</span>;
                        })}
                      </GenresContainer>
                      <Companies>
                        {info?.production_companies
                          .slice(0, 2)
                          .map((companies, index) => {
                            return (
                              <LogoPath
                                key={index}
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
                    {similar?.results.slice(0, 6).map((movie, index) => {
                      return (
                        <Similar
                          key={index}
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
