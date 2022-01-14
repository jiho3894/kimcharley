import { ThemeProvider } from "styled-components";
import Router from "./Routes/Router";
import { GlobalStyle } from "./Styles/GlobalStyle";
import { theme } from "./Styles/theme";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
};

export default App;
