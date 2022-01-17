import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import {
  getTVDetail,
  getTvTrailer,
  IGetTVDetail,
  IGetTVTrailer,
} from "../../Api/api";
import { makeTrailerPath } from "../../Api/utils";

const PlayContainer = styled.div`
  width: 100%;
  height: 88%;
  background-color: black;
`;

const Fuck = styled.details`
  &[open] {
    color: blue;
  }

`

const TVDetail = () => {
  const tvMatch = useMatch(`/tv/Detail/:tvId`);
  const { isLoading, data } = useQuery<IGetTVTrailer>("TVtrailer", () =>
    getTvTrailer(tvMatch?.params.tvId)
  );
  const { data: info } = useQuery<IGetTVDetail>("TVDetail", () =>
    getTVDetail(tvMatch?.params.tvId)
  );
  return (
    <>
      {isLoading ? (
        "Loading"
      ) : data?.results[0] === undefined ? (
        <div
          style={{
            width: 300,
            height: 300,
            backgroundColor: "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></div>
      ) : (
        <>
          <PlayContainer>
            <ReactPlayer
              url={makeTrailerPath(data?.results[0].key)}
              controls={false}
              playing={true}
              loop={true}
              width="100%"
              height="calc(70vh - 80px)"
            ></ReactPlayer>
          </PlayContainer>
          <Fuck
            style={{
              width: 300,
              height: 300,
              backgroundColor: "red",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <a
              href={`${info?.homepage}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              이동
            </a> */}
            <summary>?</summary>
            {info?.overview}
          </Fuck>
        </>
      )}
    </>
  );
};

export default TVDetail;
