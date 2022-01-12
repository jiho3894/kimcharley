import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useState } from "react";
import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import { Outlet, useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getMovies,
  getTrailer,
  IGetMoviesResult,
  IGetMoviesTrailer,
  RouterID,
} from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background: black;
  width: 1910px;
  height: 100vh;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  position: absolute;
  background-color: black;
  background: linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.8));
`;

const Title = styled.h2`
  font-size: 50px;
  margin-left: 100px;
  margin-bottom: 10px;
`;

const Overview = styled.p`
  font-size: 25px;
  width: 30%;
  margin-left: 100px;
`;

const PlayBtn = styled(motion.button)`
  width: 100px;
  margin-left: 100px;
  height: 40px;
  font-size: 15px;
  background-color: rgba(128, 128, 128, 0.3);
  border-radius: 5px;
  color: white;
  font-weight: 600;
  border: none;
  outline: none;
`;

const SliderControl = styled(motion.div)`
  width: 400px;
  height: 30px;
  display: flex;
  margin-bottom: 110px;
  color: white;
`;

const Span1 = styled(motion.span)`
  color: white;
  z-index: 3000;
  font-size: 20px;
  margin-left: 30px;
  font-weight: 600;
`;

const Increase = styled(motion.div)`
  width: 100px;
  background-color: red;
  z-index: 3000;
`;

const Decrease = styled(motion.div)`
  width: 100px;
  background-color: green;
  z-index: 3000;
  margin-left: 30px;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgimg: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgimg});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  position: relative;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
`;

const BoxDetail = styled(motion.div)`
  width: 50%;
  height: 50vh;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

const MovieCover = styled(motion.div)<{ bgimg?: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgimg});
  background-size: cover;
  background-position: center;
`;

const Fake = styled(motion.div)<{ bgimg?: string }>`
  width: 100%;
  height: 90%;
  background-image: url(${(props) => props.bgimg});
  background-size: cover;
  background-position: center;
`;

const Fucking = styled.div`
  width: 100%;
  height: 88%;
  background-color: black;
`;

const rowVars = {
  hidden: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
  },
};

const boxVars = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: 99,
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVars = {
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
  const { state } = useLocation() as RouterID;
  const navigate = useNavigate();
  const movieMatch = useMatch(`/movies/:movieId`);
  const { scrollY } = useViewportScroll();
  const { isLoading: infoLoading, data: info } = useQuery<IGetMoviesResult>(
    "nowPlaying",
    getMovies
  );
  
  const { isLoading: trailerLoading, data: trailer } =
    useQuery<IGetMoviesTrailer>("trailer", () => getTrailer(state.id));
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [sound, setSound] = useState(false);
  let sliceF = 6;
  const increaseIndex = () => {
    if (info) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = info?.results.length - 1;
      const sliderPrev = Math.floor(totalMovies / sliceF) - 1;
      setIndex((prev) => (prev === sliderPrev ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (info) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = info?.results.length - 1;
      const sliderPrev = Math.floor(totalMovies / sliceF) - 1;
      setIndex((prev) => (prev !== sliderPrev ? 3 : prev - 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onClickBox = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  const onClickOverlay = () => {
    navigate("/movies");
  };
  const onClickSound = () => {
    setSound((prev) => !prev);
  };
  const clickMovie =
    movieMatch?.params.movieId &&
    info?.results.find(
      (movie) => String(movie.id) === movieMatch?.params.movieId
    );
  return (
    <Wrapper>
      {infoLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {trailerLoading || trailer?.results[0]?.key === undefined ? (
            <Fake
              bgimg={makeImagePath(info?.results[0].backdrop_path || "")}
            ></Fake>
          ) : (
            <Fucking>
              <ReactPlayer
                url={`https://www.youtube.com/embed/${trailer?.results[0]?.key}`}
                controls={false}
                playing={true}
                muted={sound ? true : false}
                loop={true}
                width="100%"
                height="calc(100vh - 80px)"
              ></ReactPlayer>
            </Fucking>
          )}
          <Banner>
            <Title>{info?.results[0].title}</Title>
            <Overview>{info?.results[0].overview}</Overview>
            <PlayBtn onClick={onClickSound}>
              <span>{sound ? "Sound On" : "Sound Off"}</span>
            </PlayBtn>
          </Banner>
          <SliderControl>
            <Span1>인기영화</Span1>
            <Decrease onClick={decreaseIndex} />
            <Increase onClick={increaseIndex} />
          </SliderControl>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
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
          <AnimatePresence>
            {movieMatch && (
              <>
                <Overlay onClick={onClickOverlay} />
                <BoxDetail
                  layoutId={movieMatch?.params.movieId}
                  style={{ top: scrollY.get() + 100 }}
                >
                  {clickMovie && (
                    <>
                      <MovieCover
                        bgimg={makeImagePath(clickMovie.backdrop_path)}
                      ></MovieCover>
                    </>
                  )}
                </BoxDetail>
              </>
            )}
          </AnimatePresence>
        </>
      )}
      <Outlet />
    </Wrapper>
  );
};

export default Home;
