import { Button, Rating, Stack } from "@mui/material";
import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import {
  getTVDetail,
  getTvTrailer,
  IGetTVDetail,
  IGetTVTrailer,
} from "../../Api/api";
import { makeImagePath, makeTrailerPath } from "../../Api/utils";
import Loading from "../../Styles/Loading";
import Back from "../../Styles/Back";
import {
  BackGroundImage,
  Banner,
  Body,
  Container,
  DetailBox,
  DetailContainer,
  MainContainer,
  MiniTrailer,
  MiniTrailerBox,
  Overview,
  OverviewBox,
  PosterBox,
  PosterImage,
  Time,
  TimeBox,
  Title,
  TitleBox,
  TrailerBox,
  TrailerContainer,
} from "./UpcomingDetail";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

const TVContainer = styled.div`
  width: 100%;
  height: calc(100vh - 86px);
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BannerVolum = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 0;
  background-color: #9ca7b2;
  position: absolute;
`;

const TVDetail = () => {
  const [volum, setVolum] = useState(false);
  const tvMatch = useMatch(`/tv/:tvId`);
  const { isLoading, data } = useQuery<IGetTVTrailer>("TVtrailer", () =>
    getTvTrailer(tvMatch?.params.tvId)
  );
  const { data: info } = useQuery<IGetTVDetail>("TVDetail", () =>
    getTVDetail(tvMatch?.params.tvId)
  );
  const volumClick = () => setVolum((prev) => !prev);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : data?.results[0] === undefined ? (
        <Loading />
      ) : (
        <Body>
          <Back />
          <BackGroundImage bgimg={makeImagePath(info?.backdrop_path || "")} />
          <Banner />
          <TVContainer>
            <Container>
              <PosterBox>
                <PosterImage bgimg={makeImagePath(info?.poster_path || "")} />
              </PosterBox>
              <DetailContainer>
                <DetailBox>
                  <MainContainer>
                    <TitleBox>
                      <Title>
                        <span>{info?.original_name}</span>
                      </Title>
                    </TitleBox>
                    <OverviewBox>
                      <Overview>
                        <span>{info?.overview}</span>
                      </Overview>
                    </OverviewBox>
                    <TimeBox>
                      <Time>
                        <span>{info?.first_air_date} / </span>
                        <span>
                          <Stack spacing={1}>
                            <Rating
                              name="half-rating-read"
                              defaultValue={
                                info?.vote_average === undefined
                                  ? 4.0
                                  : Math.floor(Number(info?.vote_average))
                              }
                              precision={0.5}
                              readOnly
                              size="small"
                            />
                          </Stack>
                        </span>
                        <span style={{ color: "red" }}>
                          &nbsp;{info?.adult ? "/ 청소년 관람불가" : ""}
                        </span>
                        <a href={info?.homepage}>
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
                      </Time>
                    </TimeBox>
                  </MainContainer>
                  <TrailerContainer>
                    <TrailerBox>
                      <ReactPlayer
                        url={makeTrailerPath(data?.results[0].key)}
                        volume={volum ? 0.2 : 0}
                        controls={false}
                        playing={true}
                        loop={true}
                        width="180%"
                        height="180%"
                      ></ReactPlayer>
                      <BannerVolum onClick={volumClick}>
                        {volum ? <VolumeUpIcon /> : <VolumeOffIcon />}
                      </BannerVolum>
                    </TrailerBox>
                    <MiniTrailerBox>
                      {data?.results === null ? (
                        <Loading />
                      ) : (
                        <MiniTrailer>
                          {data?.results === undefined ? (
                            <Loading />
                          ) : (
                            data.results.slice(1, 6).map((trailer) => {
                              return (
                                <ReactPlayer
                                  key={trailer.id}
                                  url={makeTrailerPath(trailer.key)}
                                  volume={0}
                                  controls={true}
                                  playing={false}
                                  width="20%"
                                  height="100%"
                                ></ReactPlayer>
                              );
                            })
                          )}
                        </MiniTrailer>
                      )}
                    </MiniTrailerBox>
                  </TrailerContainer>
                </DetailBox>
              </DetailContainer>
            </Container>
          </TVContainer>
        </Body>
      )}
    </>
  );
};

export default TVDetail;
