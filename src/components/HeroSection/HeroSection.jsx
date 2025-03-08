import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../features/theme/themeSlice";
import { motion } from "framer-motion";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// Styled components with responsive design
const HeroContainer = styled(Box)(({ theme }) => ({
  minHeight: "calc(100vh - 80px)",
  marginTop: "80px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(4, 0),
  position: "relative",
  overflow: "hidden",
  backgroundSize: "cover",
  backgroundPosition: "center",
  transition: "background 0.5s ease-in-out",
  [theme.breakpoints.down("sm")]: {
    minHeight: "calc(100vh - 64px)",
    marginTop: "64px",
    padding: theme.spacing(3, 0),
  },
}));

const ContentWrapper = styled(Container)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  width: "100%",
}));

const HeroHeading = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  marginBottom: theme.spacing(2),
  background: "linear-gradient(45deg, #00E676, #1DE9B6)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textAlign: "left",
  [theme.breakpoints.down("md")]: {
    fontSize: "2.5rem",
    textAlign: "center",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
}));

const HeroSubheading = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  marginBottom: theme.spacing(4),
  textAlign: "left",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.2rem",
    textAlign: "center",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    marginBottom: theme.spacing(3),
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: "30px",
  padding: theme.spacing(1.5, 4),
  fontWeight: 600,
  textTransform: "none",
  fontSize: "1.1rem",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 25px rgba(0, 0, 0, 0.3)",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.2, 3),
    fontSize: "1rem",
  },
}));

const ScrollIndicator = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  bottom: "30px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
}));

const BackgroundPattern = styled(Box)(({ theme, darkMode }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  opacity: 0.05,
  background: darkMode
    ? `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    : `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
}));

const SpinningBorder = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  right: "-20px",
  top: "50%",
  transform: "translateY(-50%)",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: "linear-gradient(45deg, #00E676, #1DE9B6, #00E676, #1DE9B6)",
  backgroundSize: "300% 300%",
  opacity: 0.8,
  filter: "blur(8px)",
  zIndex: 0,
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  "& button": {
    position: "relative",
    zIndex: 1,
  },
}));

const TypewriterText = ({ text }) => {
  const darkMode = useSelector(selectDarkMode);
  const characters = text.split("");

  return (
    <motion.span
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      style={{
        background: !darkMode
          ? "linear-gradient(45deg, #333333, #666666)"
          : undefined,
        backgroundClip: !darkMode ? "text" : undefined,
        WebkitBackgroundClip: !darkMode ? "text" : undefined,
        WebkitTextFillColor: !darkMode ? "transparent" : undefined,
        color: darkMode ? "#00E676" : undefined,
      }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.1,
            delay: index * 0.05,
            ease: "easeIn",
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Update the CodeContainer component with hover effects
const CodeContainer = styled(Box)(({ theme, darkMode }) => ({
  padding: theme.spacing(3),
  borderRadius: "12px",
  fontFamily: "'Fira Code', monospace",
  background: darkMode ? "#1E1E1E" : "#2D2D2D",
  color: "#E0E0E0",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
  width: "100%",
  marginBottom: theme.spacing(4),
  border: "1px solid rgba(255, 255, 255, 0.1)",
  position: "relative",
  height: "460px",
  transition: "all 0.3s ease-in-out",
  "&:before": {
    content: '""',
    position: "absolute",
    top: "12px",
    left: "12px",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#FF5F56",
    boxShadow: "20px 0 0 #FFBD2E, 40px 0 0 #27C93F",
  },
  "&:after": {
    content: '"Python"',
    position: "absolute",
    top: "10px",
    right: "15px",
    fontSize: "0.75rem",
    color: "rgba(255, 255, 255, 0.4)",
    transition: "opacity 0.3s ease",
  },
  "& pre": {
    margin: "0 !important",
    marginTop: "20px !important",
    background: "transparent !important",
    fontFamily: "'Fira Code', monospace !important",
    height: "calc(100% - 20px) !important",
    overflow: "hidden !important",
    transition: "all 0.3s ease-in-out",
  },
  "&:hover": {
    boxShadow: `0 15px 35px rgba(0, 230, 118, 0.3), 0 0 15px ${
      darkMode ? "rgba(0, 230, 118, 0.1)" : "rgba(0, 230, 118, 0.2)"
    }`,
    border: `1px solid ${
      darkMode ? "rgba(0, 230, 118, 0.2)" : "rgba(0, 230, 118, 0.3)"
    }`,
    "&:after": {
      color: "rgba(255, 255, 255, 0.7)",
    },
    "& .window-controls": {
      opacity: 1,
    },
    "& .line-highlight": {
      opacity: 0.15,
    },
  },
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(2.5),
    height: "440px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
    height: "420px",
    "&:before": {
      width: "8px",
      height: "8px",
      top: "10px",
      left: "10px",
      boxShadow: "16px 0 0 #FFBD2E, 32px 0 0 #27C93F",
    },
  },
}));

// Add this component to create the animated line highlight
const LineHighlight = styled(motion.div)(({ theme, darkMode }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  height: "28px",
  background: `linear-gradient(90deg, ${
    darkMode ? "rgba(0, 230, 118, 0)" : "rgba(0, 230, 118, 0)"
  }, ${darkMode ? "rgba(0, 230, 118, 0.3)" : "rgba(0, 230, 118, 0.15)"})`,
  opacity: 0,
  transition: "opacity 0.3s ease",
  pointerEvents: "none",
}));

// Update the AnimatedCode component to incorporate the line highlight effect
const AnimatedCode = ({ code }) => {
  const [displayedCode, setDisplayedCode] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [highlightLine, setHighlightLine] = useState(0);
  const characters = code.split("");
  const darkMode = useSelector(selectDarkMode);

  useEffect(() => {
    if (currentIndex < characters.length) {
      const timer = setTimeout(() => {
        setDisplayedCode((prev) => prev + characters[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 20);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, characters]);

  // Animation for the line highlight
  useEffect(() => {
    if (displayedCode && currentIndex >= characters.length) {
      const interval = setInterval(() => {
        setHighlightLine((prev) => (prev + 1) % 12); // Cycle through lines
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [displayedCode, currentIndex, characters.length]);

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <Box
        className="window-controls"
        sx={{
          position: "absolute",
          top: "10px",
          left: "50px",
          right: "50px",
          opacity: 0.6,
          transition: "opacity 0.3s ease",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box></Box>
        <Box
          sx={{
            fontSize: "10px",
            color: "rgba(255,255,255,0.4)",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          twoSum.py - Read only
        </Box>
      </Box>

      {/* Animated line highlight */}
      <LineHighlight
        className="line-highlight"
        darkMode={darkMode}
        style={{
          top: `${49 + highlightLine * 24}px`,
        }}
      />

      <SyntaxHighlighter
        language="python"
        style={vscDarkPlus}
        showLineNumbers={true}
        wrapLines={true}
        customStyle={{
          fontSize: "0.9rem",
          lineHeight: "1.5",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        {displayedCode}
      </SyntaxHighlighter>
    </Box>
  );
};

const HeroSection = () => {
  const darkMode = useSelector(selectDarkMode);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [animate, setAnimate] = useState(false);

  // Animation trigger
  useEffect(() => {
    setAnimate(true);
  }, []);

  const scrollToNext = () => {
    const navbarHeight = isSmallScreen ? 64 : 80;
    window.scrollTo({
      top: window.innerHeight - navbarHeight,
      behavior: "smooth",
    });
  };

  // Properly indented Python code
  const pythonCode = `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        nums.sort()        
        left, right = 0, len(nums) - 1
        
        while left < right:
            current = nums[left] + nums[right]
            
            if current == target:
                  return [left, right]
            elif current > target:  
                right -= 1
            else:
                left += 1                
                
        return [-1, -1]`;

  return (
    <HeroContainer
      sx={{
        background: darkMode
          ? "linear-gradient(135deg, #1A1A1A, #2D2D2D)" // Dark grey background for dark mode
          : "linear-gradient(135deg, #FFFFFF, #F5F5F5)", // White to slight grey for light mode
        color: darkMode ? "#ffffff" : "#333333",
        position: "relative",
      }}
    >
      <BackgroundPattern darkMode={darkMode} />

      <ContentWrapper
        maxWidth="lg"
        sx={{ position: "relative", height: "100%" }}
      >
        <Grid
          container
          spacing={{ xs: 4, sm: 6, md: 8 }}
          alignItems="center"
          sx={{ minHeight: { xs: "80vh", sm: "70vh" } }}
        >
          {/* Left column - Text and buttons */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={animate ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <HeroHeading
                variant="h1"
                fontSize={{
                  xs: "2rem",
                  sm: "2.5rem",
                  md: "3.5rem",
                  lg: "4rem",
                }}
              >
                <TypewriterText text="Meet Our 160+ Developers at progHubs!" />
              </HeroHeading>

              <HeroSubheading
                variant="h5"
                sx={{
                  color: darkMode ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)",
                  fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.3rem" },
                  lineHeight: { xs: 1.4, md: 1.6 },
                }}
              >
                A talented team of frontend, backend, mobile, ML, and UI/UX
                engineers driving innovation and delivering exceptional
                solutions.
              </HeroSubheading>

              <Box
                sx={{
                  display: "flex",
                  gap: { xs: 1.5, sm: 2 },
                  mt: { xs: 3, md: 4 },
                  justifyContent: { xs: "center", md: "flex-start" },
                  flexWrap: { xs: "wrap", sm: "nowrap" },
                }}
              >
                <ButtonContainer>
                  <ActionButton
                    variant="contained"
                    color="primary"
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    size={isSmallScreen ? "medium" : "large"}
                  >
                    Explore Team
                  </ActionButton>
                  <SpinningBorder
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      repeatType: "loop",
                    }}
                  />
                </ButtonContainer>

                <ButtonContainer>
                  <ActionButton
                    variant="outlined"
                    sx={{
                      borderColor: darkMode
                        ? "rgba(255,255,255,0.5)"
                        : "rgba(0,0,0,0.5)",
                      color: darkMode
                        ? "rgba(255,255,255,0.9)"
                        : "rgba(0,0,0,0.8)",
                    }}
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    size={isSmallScreen ? "medium" : "large"}
                  >
                    Learn More
                  </ActionButton>
                  <SpinningBorder
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      repeatType: "loop",
                    }}
                  />
                </ButtonContainer>
              </Box>
            </motion.div>
          </Grid>

          {/* Right column - Enhanced code container */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: { xs: "auto", md: "500px" }, // Fixed height on medium+ screens
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={animate ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              style={{
                width: "100%",
                maxWidth: "600px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CodeContainer darkMode={darkMode}>
                <AnimatedCode code={pythonCode} />
              </CodeContainer>
            </motion.div>
          </Grid>
        </Grid>
      </ContentWrapper>

      <ScrollIndicator
        onClick={scrollToNext}
        component={motion.div}
        animate={{
          y: [0, 10, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
        }}
        sx={{
          position: "absolute",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          display: { xs: "none", sm: "flex" }, // Hide on very small screens
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
          Scroll Down
        </Typography>
        <ArrowDownwardIcon />
      </ScrollIndicator>
    </HeroContainer>
  );
};

export default HeroSection;
