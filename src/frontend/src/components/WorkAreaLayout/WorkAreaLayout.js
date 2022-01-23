import { useState } from "react";
import { useSelector } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";

import { styled } from "@mui/material/styles";
import { Alert, Box, Container, Typography } from "@mui/material";

import { selectPageTitle } from "@user-context-slice";

import ActiveEvaluationProfile from "./ActiveEvaluationProfile";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const sidebarWidth = 220;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  backgroundColor: theme.palette.background.default,
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: `${sidebarWidth}px`,
  },
}));

const ErrorFallback = ({ error }) => {
  return <Alert severity="error">Something went wrong:{error.message}</Alert>;
};

const WorkAreaLayout = (props) => {
  const pageTitle = useSelector(selectPageTitle);
  const { children } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <LayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box
            sx={{
              height: "80px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "#FFF",
            }}
          >
            <Container sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h2">{pageTitle}</Typography>
              <Box sx={{ flexGrow: 1 }} />
              <ActiveEvaluationProfile />
            </Container>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Container
              sx={{
                minHeight: "100vh",
                width: "95%",
                padding: "20px 10px",
                borderTop: "solid 5px #e7eaec",
                margin: "20 20px 0 20px",
                backgroundColor: "#FFF",
              }}
            >
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                {children}
              </ErrorBoundary>
            </Container>
          </Box>
        </Box>
      </LayoutRoot>
      <Navbar
        sidebarWidth={sidebarWidth}
        onOpenSidebar={() => setIsSidebarOpen(true)}
      />
      <Sidebar
        sidebarWidth={sidebarWidth}
        onClose={() => setIsSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};

export default WorkAreaLayout;
