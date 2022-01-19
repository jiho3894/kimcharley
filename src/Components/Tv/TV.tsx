import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getTv, IGetTVResult } from "../../Api/api";
import { makeImagePath } from "../../Api/utils";
import { Box, boxVars, Info, infoVars } from "../Home/Home";

const Tv = () => {
  const { isLoading, data } = useQuery<IGetTVResult>("TV", getTv);
  return (
    <>
      {isLoading
        ? "Loading"
        : data?.results.map((tv) => {
            return (
              <Link key={tv.id} to={`/tv/Detail/${tv.id}`}>
                <Box
                  whileHover="hover"
                  initial="normal"
                  variants={boxVars}
                  transition={{ type: "tween" }}
                  bgimg={makeImagePath(tv.backdrop_path)}
                >
                  <Info variants={infoVars}>
                    <h4>{tv.original_name}</h4>
                  </Info>
                </Box>
              </Link>
            );
          })}
    </>
  );
};

export default Tv;
