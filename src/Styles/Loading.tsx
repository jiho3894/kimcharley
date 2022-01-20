import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Back from "./Back";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 86px);
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const Loading = () => {
  return (
    <>
      <Back />
      <Container>
        <Box>
          <CircularProgress />
        </Box>
        미완성
      </Container>
    </>
  );
};

export default Loading;
