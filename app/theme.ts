import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#1E3A8A" : "#059669",
        light: mode === "light" ? "#3B82F6" : "#10B981",
        dark: mode === "light" ? "#1D4ED8" : "#047857",
      },
      secondary: {
        main: mode === "light" ? "#E76F51" : "#FF7043",
        light: mode === "light" ? "#F4A261" : "#FF8A65",
        dark: mode === "light" ? "#D45D3F" : "#F4511E",
      },
      background: {
        default: mode === "light" ? "#F3F4F6" : "#0F172A",
        paper: mode === "light" ? "rgba(255, 255, 255, 0.95)" : "rgba(30, 41, 59, 0.95)",
      },
      text: {
        primary: mode === "light" ? "#1E293B" : "#F9FAFB",
        secondary: mode === "light" ? "#6B7280" : "#D1D5DB",
      },
    },
    typography: {
      fontFamily: "'Inter', sans-serif",
      h1: { fontWeight: 800, letterSpacing: "-0.025em" },
      h2: { fontWeight: 700, letterSpacing: "-0.015em" },
      button: { fontWeight: 600, textTransform: "none" },
    },
    shape: { borderRadius: 16 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: "12px 28px",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": { transform: "translateY(-3px)", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            // REMOVED: backdropFilter: "blur(12px)",
            background: mode === "light" ? "rgba(255, 255, 255, 0.95)" : "rgba(30, 41, 59, 0.95)",
            border: `1px solid ${mode === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"}`,
            boxShadow: mode === "light" ? "0 4px 20px rgba(0,0,0,0.1)" : "0 4px 20px rgba(0,0,0,0.2)",
          },
        },
      },
    },
  });