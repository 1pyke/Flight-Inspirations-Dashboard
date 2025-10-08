import { AppBar, Box, Toolbar, Typography, Container } from "@mui/material";
import "./Header.style.css";

const Header = () => {
  return (
    <AppBar position="fixed" elevation={0} className="header-appbar">
      <Container maxWidth="xl">
        <Toolbar className="header-toolbar">
          <Box className="header-logo-box">
            <Box className="header-icon-box">
              <img
                src="https://media.glassdoor.com/sqll/2342260/almosafer-squarelogo-1572464174174.png"
                height={100}
                alt="Logo"
              />
            </Box>

            <Box>
              <Typography
                variant="h5"
                component="h1"
                className="gradient-text header-title"
              >
                Flight Inspirations
              </Typography>
              <Typography variant="body2" className="header-subtitle">
                Find your next destination. Fly smarter.
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
