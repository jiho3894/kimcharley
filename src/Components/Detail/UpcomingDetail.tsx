import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import { getUpcoming, IGetMoviesResult } from "../../Api/api";

const Container = styled.div`
  width: 500px;
  height: 500px;
  background-color: yellow;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UpcmoingDetail = () => {
  const upcomingMatch = useMatch(`/upcoming/:upcomingId`);
  const { isLoading, data } = useQuery<IGetMoviesResult>(
    "Upcoming",
    getUpcoming
  );
  console.log(upcomingMatch);
  return (
    <Container>{isLoading ? "loading" : <>{data?.total_pages}</>}</Container>
  );
};

export default UpcmoingDetail;
