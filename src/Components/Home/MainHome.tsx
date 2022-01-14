import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getMovies, IGetMoviesResult } from "../../Api/api";

const Customer = () => {
  const { isLoading, data } = useQuery<IGetMoviesResult>("start", getMovies);
  localStorage.setItem('movieId', String(data?.results[0].id));
  return (
    <>
      {isLoading ? (
        "Loading"
      ) : (
        <div
          style={{
            width: 300,
            height: 300,
            backgroundColor: "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to="/movies">
            {data?.results[0].id}
          </Link>
        </div>
      )}
    </>
  );
};
export default Customer;

