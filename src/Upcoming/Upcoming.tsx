import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getUpcoming, IGetMoviesResult } from "../Api/api";
import { makeImagePath } from "../Api/utils";
import {
  Box,
  boxVars,
  Decrease,
  Increase,
  Info,
  infoVars,
  Row,
  rowVars,
  Slider,
  SliderControl,
  Span1,
} from "../Components/Home/Home";

const Upcoming = () => {
  const { data } = useQuery<IGetMoviesResult>("Upcoming", getUpcoming);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [isBack, setIsBack] = useState(false);
  let sliceF = 6;
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(false);
      const totalMovies = data?.results.length - 1;
      const sliderPrev = Math.floor(totalMovies / sliceF) - 1;
      setIndex((prev) => (prev === sliderPrev ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(true);
      const totalMovies = data?.results.length - 1;
      const sliderPrev = Math.floor(totalMovies / sliceF) - 1;
      setIndex((prev) => (prev === 0 ? sliderPrev : prev - 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  return (
    <>
      <SliderControl>
        <Span1>인기영화</Span1>
        <Decrease onClick={decreaseIndex} />
        <Increase onClick={increaseIndex} />
      </SliderControl>
      <Slider>
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
            {data?.results
              ?.slice(index * sliceF + 1, index * sliceF + sliceF + 1)
              .map((upcoming) => {
                return (
                  <Link key={upcoming.id} to={`/upcoming/${upcoming.id}`}>
                    <Box
                      whileHover="hover"
                      initial="normal"
                      variants={boxVars}
                      transition={{ type: "tween" }}
                      bgimg={makeImagePath(upcoming.backdrop_path)}
                    >
                      <Info variants={infoVars}>
                        <h4>{upcoming.title}</h4>
                      </Info>
                    </Box>
                  </Link>
                );
              })}
          </Row>
        </AnimatePresence>
      </Slider>
    </>
  );
};

export default Upcoming;
