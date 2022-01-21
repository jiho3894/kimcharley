import styled from "styled-components";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
  position: absolute;
  z-index: 9999;
  display: none;
  @media screen and (max-width: 768px) {
    display: flex !important;
    justify-content: center;
    align-items: center;
  }
`;

const Mobile = () => {
  return (
    <Container>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          PC 또는 태블릿에서 사용 가능합니다.
        </Alert>
      </Stack>
    </Container>
  );
};

export default Mobile;
