import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 86px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoQuery = () => {
  return (
    <Container>
      <Stack sx={{ width: "30%" }} spacing={2}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          검색 정보가 없습니다 😭
        </Alert>
      </Stack>
    </Container>
  );
};

export default NoQuery;
