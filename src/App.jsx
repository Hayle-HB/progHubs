import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material";
import { CssBaseline } from "@mui/material";
import NavBar from "./components/NabBar/NabBar";
import HeroSection from "./components/HeroSection/HeroSection";
import { selectDarkMode } from "./features/theme/themeSlice";
import Team from "./components/Team/Team";
// import Upwork from './components/TextEditerWithImage/Upwork'

const App = () => {
  const isDarkMode = useSelector(selectDarkMode);

  // Define light and dark themes directly in the App component
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#4A90E2",
      },
      secondary: {
        main: "#F5A623",
      },
      background: {
        default: "#F0F4F8",
        paper: "#FFFFFF",
      },
      text: {
        primary: "#333333",
        secondary: "#666666",
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#4A90E2",
      },
      secondary: {
        main: "#F5A623",
      },
      background: {
        default: "#1E1E1E",
        paper: "#2A2A2A",
      },
      text: {
        primary: "#FFFFFF",
        secondary: "#B3B3B3",
      },
    },
  });

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <NavBar />
        <HeroSection /> 
      <Team />
      {/* Additional content can go here

          {/* <Upwork/> */}
      




    </ThemeProvider>
  );
};

export default App;
