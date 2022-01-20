import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useCallback, useState } from "react";
import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  getMovies,
  getMoviesTrailer,
  IGetMoviesResult,
  IGetMoviesTrailer,
} from "../../Api/api";
import { makeImagePath, makeTrailerPath } from "../../Api/utils";
import { isSoundAtom, SoundEnums } from "../../Recoil/Atom";
import Loading from "../../Styles/Loading";
import HometoDetail from "./HomeDetail";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import UpcomingSlider from "./UpcomingSlider";
import TVSlider from "./TVSlider";

const Wrapper = styled.div`
  background: black;
  min-width: 1400px;
  height: 100vh;
  height: 80vh;
`;

const PlayContainer = styled.div`
  min-width: 100%;
  height: 80vh;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Banner = styled.div`
  width: 100%;
  height: 100vh;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  position: absolute;
`;

export const SliderContainer = styled(motion.div)`
  height: 500px;
  width: 100%;
`;

export const SliderControl = styled(motion.div)`
  width: 92%;
  height: 50px;
  display: flex;
  color: white;
  margin-bottom: 5px;
  justify-content: space-between;
  align-items: center;
`;

export const Span1 = styled(motion.span)`
  color: white;
  z-index: 30;
  font-size: 30px;
  margin-left: 50px;
  font-weight: 600;
`;

const PlayBtn = styled(motion.button)`
  font-size: 15px;
  height: 30px;
  border-radius: 5px;
  font-weight: 600;
  border: none;
  outline: none;
  z-index: 10;
`;

const PageChange = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
`;

export const Increase = styled(motion.div)`
  width: 50px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  transform-origin: center right;
`;

export const Decrease = styled(motion.div)`
  width: 50px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
`;

export const Slider = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const Row = styled(motion.div)`
  display: grid;
  gap: 3px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 97%;
  opacity: 0.9;
`;

export const Box = styled(motion.div)<{ bgimg: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgimg});
  background-size: cover;
  background-position: center center;
  height: 400px;
  font-size: 66px;
  position: relative;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

export const Info = styled(motion.div)`
  padding: 10px;
  background-color: black;
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    color: white;
    font-size: 18px;
  }
`;

export const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  z-index: 100;
`;

export const BoxDetail = styled(motion.div)`
  width: 50%;
  height: 80vh;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 200;
`;

export const DetailContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 50px;
    background: black;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(#e0eafc, #cfdef3);
    border-radius: 50px;
  }
  border-radius: 50px 0 0 50px;
`;

export const MovieCover = styled(motion.div)<{ bgimg?: string }>`
  width: 100%;
  height: 50%;
  background-image: url(${(props) => props.bgimg});
  background-size: cover;
  background-position: center;
`;

export const rowVars = {
  hidden: (back: boolean) => ({
    x: back ? -window.outerWidth - 10 : window.outerWidth + 10,
  }),
  visible: {
    x: 0,
  },
  exit: (back: boolean) => ({
    x: back ? window.outerWidth + 10 : -window.outerWidth - 10,
  }),
};

export const boxVars = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: 2000,
    scale: 1.1,
    y: -40,
    transition: {
      delay: 0.1,
      type: "tween",
    },
  },
};

export const infoVars = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const Home = () => {
  const navigate = useNavigate();
  const movieMatch = useMatch(`/movies/:movieId`);
  const { scrollY } = useViewportScroll();
  const stateMovieId = localStorage.getItem("movieId");
  const { isLoading: infoLoading, data: info } = useQuery<IGetMoviesResult>(
    "nowPlaying",
    getMovies
  );
  const { data: trailer } = useQuery<IGetMoviesTrailer>("startTrailer", () =>
    getMoviesTrailer(String(stateMovieId))
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const [pause, setPause] = useState(false);
  const [isSound, setIsSound] = useRecoilState<SoundEnums>(isSoundAtom);
  const { OFF, ON } = SoundEnums;
  const handleChangeSound = useCallback((): void => {
    if (isSound === OFF) {
      localStorage.setItem("sound", ON);
      setIsSound(ON);
      return;
    }
    localStorage.setItem("sound", OFF);
    setIsSound(OFF);
  }, [OFF, ON, isSound, setIsSound]);
  let sliceF = 6;
  const increaseIndex = () => {
    if (info) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(false);
      const totalMovies = info?.results.length;
      const sliderPrev = Math.floor(totalMovies / sliceF) - 1;
      setIndex((prev) => (prev === sliderPrev ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (info) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(true);
      const totalMovies = info?.results.length - 1;
      const sliderPrev = Math.floor(totalMovies / sliceF) - 1;
      setIndex((prev) => (prev === 0 ? sliderPrev : prev - 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onClickBox = (movieId: number) => {
    navigate(`/movies/${movieId}`);
    setPause(true);
  };
  const onClickOverlay = () => {
    navigate("/movies");
    setPause(false);
  };
  const clickMovie =
    movieMatch?.params.movieId &&
    info?.results.find(
      (movie) => String(movie.id) === movieMatch?.params.movieId
    );
  return (
    <Wrapper>
      {infoLoading ? (
        <Loading />
      ) : (
        <>
          <PlayContainer>
            <ReactPlayer
              url={makeTrailerPath(trailer?.results[0].key)}
              volume={0.3}
              controls={false}
              playing={pause ? false : true}
              muted={isSound === "0" ? true : false}
              loop={true}
              width="200vw"
              height="calc(110vh)"
            ></ReactPlayer>
          </PlayContainer>
          <Banner />
          <SliderContainer>
            <SliderControl>
              <Span1>Charleyflix 인기 콘텐츠</Span1>
              <PlayBtn onClick={handleChangeSound}>
                <span>{isSound === "0" ? "Sound On" : "Sound Off"}</span>
              </PlayBtn>
            </SliderControl>
            <Slider>
              <PageChange>
                <Decrease whileHover={{ scale: 1.2 }} onClick={decreaseIndex}>
                  <ArrowBackIosIcon fontSize="large" />
                </Decrease>
                <Increase whileHover={{ scale: 1.2 }} onClick={increaseIndex}>
                  <ArrowForwardIosIcon fontSize="large" />
                </Increase>
              </PageChange>
              <AnimatePresence
                custom={isBack}
                initial={false}
                onExitComplete={toggleLeaving}
              >
                <Row
                  custom={isBack}
                  variants={rowVars}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                  key={index}
                >
                  {info?.results
                    ?.slice(index * sliceF + 1, index * sliceF + sliceF + 1)
                    .map((movie) => {
                      return (
                        <Box
                          layoutId={movie.id + ""}
                          key={movie.id}
                          onClick={() => onClickBox(movie.id)}
                          whileHover="hover"
                          initial="normal"
                          variants={boxVars}
                          transition={{ type: "tween" }}
                          bgimg={makeImagePath(movie.backdrop_path || "")}
                        >
                          <Info variants={infoVars}>
                            <h4>{movie.title}</h4>
                          </Info>
                        </Box>
                      );
                    })}
                </Row>
              </AnimatePresence>
            </Slider>
          </SliderContainer>
          <UpcomingSlider />
          <TVSlider />
          <AnimatePresence>
            {movieMatch && (
              <>
                <Overlay onClick={onClickOverlay} />
                <BoxDetail
                  layoutId={movieMatch?.params.movieId}
                  style={{ top: scrollY.get() + 100 }}
                >
                  {clickMovie && (
                    <DetailContainer>
                      <HometoDetail />
                    </DetailContainer>
                  )}
                </BoxDetail>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
};

export default Home;
