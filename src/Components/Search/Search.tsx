import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import { getSearch, IGetSearchResult } from "../../Api/api";
import { makeImagePath } from "../../Api/utils";
import Loading from "../../Routes/Loading";
import { Box, boxVars, Info, infoVars } from "../Home/Home";

const Search = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const { isLoading, data } = useQuery<IGetSearchResult>("search", () =>
    getSearch(query + "")
  );
  return (
    <>
      {isLoading
        ? <Loading/>
        : data?.results.map((search) => (
            <Link key={search.id} to={`/movies/Detail/${search.id}`}>
              <Box
                whileHover="hover"
                initial="normal"
                variants={boxVars}
                transition={{ type: "tween" }}
                bgimg={makeImagePath(search.backdrop_path)}
              >
                <Info variants={infoVars}>
                  <h4>{search.original_title}</h4>
                </Info>
              </Box>
            </Link>
          ))}
    </>
  );
};

export default Search;
