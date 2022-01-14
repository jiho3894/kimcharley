import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getUpcoming, IGetMoviesResult } from "../../Api/api";
import { makeImagePath } from "../../Api/utils";
import { Box, boxVars, Info, infoVars, Slider } from "../Home/Home";

const Upcoming = () => {
  const { data } = useQuery<IGetMoviesResult>("Upcoming", getUpcoming);
  return (
    <>
      <Slider>
        {data?.results.map((upcoming) => {
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
      </Slider>
    </>
  );
};

export default Upcoming;
