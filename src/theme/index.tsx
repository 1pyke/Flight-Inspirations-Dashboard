import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3a86ff",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#212529",
      secondary: "#6c757d",
    },
    warning: {
      main: "#f39c12",
    },
    error: {
      main: "#e74c3c",
      light: "#f1948a",
      dark: "#c0392b",
    },
  },
  typography: {
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 1.2,
      color: "var(--color-text-heading)",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      lineHeight: 1.3,
      color: "var(--color-text-heading)",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.4,
      color: "var(--color-text-heading)",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.4,
      color: "var(--color-text-heading)",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      color: "var(--color-text-heading)",
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
      color: "var(--color-text-body)",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "12px 24px",
          fontSize: "1rem",
          fontWeight: 600,
          boxShadow: "var(--shadow-sm)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "var(--shadow-lg)",
            transform: "translateY(-2px)",
          },
        },
        containedPrimary: {
          background: "var(--gradient-primary)",
          "&:hover": {
            background: "var(--gradient-primary-hover)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            backgroundColor: "var(--color-white)",
            boxShadow: "var(--shadow-xs)",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "var(--shadow-sm)",
            },
            "&.Mui-focused": {
              boxShadow: "var(--shadow-md)",
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--color-white)",
          boxShadow: "var(--shadow-header)",
          borderBottom: "1px solid var(--color-grey-200)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "var(--shadow-md)",
          borderRadius: 16,
        },
        elevation0: {
          boxShadow: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
        colorPrimary: {
          background: "var(--gradient-primary)",
        },
      },
    },
  },
});

export default theme;
