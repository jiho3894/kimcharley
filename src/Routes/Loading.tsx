import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const Loading = () => {
  return (
    <Container>
      <Box>
        <CircularProgress />
      </Box>
      미공개
    </Container>
  );
};

export default Loading;
