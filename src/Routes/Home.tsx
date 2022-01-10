import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
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

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
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

const Box = styled(motion.div)`
  width: inherit;
  height: 200px;
  font-size: 66px;
`;

const Img = styled(motion.img)`
  width: 100%;
  height: 100%;
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

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  const { isLoading, data } = useQuery<IGetMoviesResult>("hi", getMovies);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  console.log(selectedId);
  let sliceF = 6;
  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data?.results.length - 1;
      const sliderPrev = Math.floor(totalMovies / sliceF) - 1;
      setIndex((prev) => (prev === sliderPrev ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={incraseIndex}
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
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
                {data?.results
                  ?.slice(index * sliceF + 1, index * sliceF + sliceF + 1)
                  .map((i) => {
                    return (
                      <Box key={i.id}>
                        <Img
                          onClick={() => setSelectedId(i.id)}
                          layoutId={i.id}
                          whileHover={{ scale: 1.1, borderRadius: "5px" }}
                          alt=""
                          src={makeImagePath(i.backdrop_path || "")}
                        />
                      </Box>
                    );
                  })}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {selectedId && (
              <Overlay layoutId={selectedId}>
                <Box key={selectedId}>
                  <Img
                    layoutId={selectedId}
                    whileHover={{ scale: 1.1, borderRadius: "5px" }}
                    alt=""
                    src={makeImagePath(selectedId || "")}
                  />
                </Box>
              </Overlay>
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
};

export default Home;
