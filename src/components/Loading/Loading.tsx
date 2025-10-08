import { Box, CircularProgress, Typography, Fade } from "@mui/material";
import "./Loading.style.css";

const Loading = () => (
  <Fade in={true} timeout={600}>
    <Box className="loading-container">
      <Box className="loading-spinner-box">
        <CircularProgress
          size={60}
          thickness={4}
          className="loading-spinner-progress"
        />
        <Box className="loading-spinner-icon-box">
          <img
            alt="Loading Icon"
            className="loading-spinner-icon spin-animation"
            src="https://play-lh.googleusercontent.com/91GnKxQ-yDybZHNocHSx17ApYU6ERlD7zDUFmPdcbNn4EJt_hoivJb0cRJnBIjjcr7Q"
            width={30}
            height={30}
          />
        </Box>
      </Box>

      <Typography
        variant="h6"
        fontWeight={600}
        className="loading-spinner-title"
      >
        Searching for flights...
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        textAlign="center"
        className="loading-spinner-desc"
      >
        Please wait while we find the best flight options for you
      </Typography>
    </Box>
  </Fade>
);

export default Loading;
