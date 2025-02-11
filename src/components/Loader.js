import { CircularProgress, Box } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress color="primary" aria-label="Loading..." />
    </Box>
  );
};

export default Loader;
