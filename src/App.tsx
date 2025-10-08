import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  CircularProgress,
  Box,
} from "@mui/material";

import { store } from "./store";
import theme from "./theme";

import "./styles/global.css";

const Header = lazy(() => import("./components/Header/Header"));
const Home = lazy(() => import("./pages/Home"));
const ErrorBoundary = lazy(
  () => import("./components/ErrorBoundary/ErrorBoundary")
);

const LoadingFallback = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    <CircularProgress size={60} />
  </Box>
);

export default function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<LoadingFallback />}>
        <ErrorBoundary>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Suspense fallback={<LoadingFallback />}>
                <Header />
              </Suspense>
              <Container className="app-container" maxWidth="xl">
                <Suspense fallback={<LoadingFallback />}>
                  <Home />
                </Suspense>
              </Container>
            </ThemeProvider>
          </LocalizationProvider>
        </ErrorBoundary>
      </Suspense>
    </Provider>
  );
}
