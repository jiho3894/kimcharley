import { Alert, AlertTitle, Stack } from "@mui/material";
import styled from "styled-components";
import Back from "./Back";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 86px);
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("https://user-images.githubusercontent.com/79081800/150473965-fbc32c06-12b2-4b22-8c75-fba34e923475.jpg");
`;

const Error = () => {
  return (
    <>
      <Back />
      <Container>
        <Stack sx={{ width: "30%" }}>
          <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            영화 정보가 없습니다 😭
          </Alert>
        </Stack>
      </Container>
    </>
  );
};
export default Error;
