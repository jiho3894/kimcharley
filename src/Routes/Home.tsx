import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { Outlet, useMatch, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  getDetail,
  getMovies,
  IGetMoviesDetail,
  IGetMoviesResult,
} from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgImg: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgImg});
  background-size: cover;
  color: white;
`;

const Title = styled.h2`
  font-size: 55px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 30%;
  margin-bottom: 20px;
`;

const PlayBtn = styled(motion.button)`
  width: 100px;
  margin-bottom: 100px;
  height: 40px;
  font-size: 15px;
  background-color: rgba(128, 128, 128, 0.3);
  border-radius: 5px;
  color: white;
  font-weight: 600;
  border: none;
  outline: none;
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

const Box = styled(motion.div)<{ bgImg: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgImg});
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

const BoxDetail = styled(motion.div)<{ bgImg: string }>`
  width: 50%;
  height: 50vh;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-image: url(${(props) => props.bgImg});
  background-size: cover;
  background-position: center;
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
  const { movieId } = useParams();
  const navigate = useNavigate();
  const movieMatch = useMatch(`/movies/:movieId`);
  const { scrollY } = useViewportScroll();
  const { isLoading: infoLoading, data: info } = useQuery<IGetMoviesResult>(
    "nowPlaying",
    getMovies
  );
  const { isLoading: detailLoading, data: detail } = useQuery<IGetMoviesDetail>(
    ["Detail", movieId],
    () => getDetail(movieId)
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  let sliceF = 6;
  const incraseIndex = () => {
    if (info) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = info?.results.length - 1;
      const sliderPrev = Math.floor(totalMovies / sliceF) - 1;
      setIndex((prev) => (prev === sliderPrev ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onClickBox = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  const onClickOverlay = () => {
    navigate("/");
  };
  return (
    <Wrapper>
      {infoLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={incraseIndex}
            bgImg={makeImagePath(info?.results[0].backdrop_path || "")}
          >
            <Title>{info?.results[0].title}</Title>
            <Overview>{info?.results[0].overview}</Overview>
            <PlayBtn>
              <span>&gt; 재생</span>
            </PlayBtn>
          </Banner>
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
                        bgImg={makeImagePath(movie.backdrop_path || "")}
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
            {movieMatch || detailLoading ? (
              <>
                <Overlay onClick={onClickOverlay} />
                <BoxDetail
                  bgImg={makeImagePath(detail?.backdrop_path || "")}
                  layoutId={movieMatch?.params.movieId}
                  style={{ top: scrollY.get() + 100 }}
                ></BoxDetail>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
      <Outlet />
    </Wrapper>
  );
};

export default Home;
