import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getUpcoming, IGetMoviesResult } from "../../Api/api";
import { makeImagePath } from "../../Api/utils";
import { Box, boxVars, Info, infoVars } from "../Home/Home";

const Upcoming = () => {
  const { isLoading, data } = useQuery<IGetMoviesResult>(
    "Upcoming",
    getUpcoming
  );
  return (
    <>
      {isLoading
        ? "Loading"
        : data?.results.map((upcoming) => {
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
    </>
  );
};

export default Upcoming;