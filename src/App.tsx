import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import Router from "./Routes/Router";
import { GlobalStyle } from "./Styles/GlobalStyle";

const App = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <GlobalStyle />
      <Router />
    </Suspense>
  );
};

export default App;
