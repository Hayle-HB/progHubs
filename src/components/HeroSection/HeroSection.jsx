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
import CodeIcon from "@mui/icons-material/Code";
import TeamIcon from "@mui/icons-material/Groups";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

// Styled components with responsive design
const HeroContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(4, 0),
  position: "relative",
  overflow: "hidden",
  backgroundSize: "cover",
  backgroundPosition: "center",
  transition: "background 0.5s ease-in-out",
}));

const ContentWrapper = styled(Container)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
}));

const HeroHeading = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  marginBottom: theme.spacing(2),
  background: "linear-gradient(45deg, #4A90E2, #845EC2)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textAlign: "left",
  [theme.breakpoints.down("md")]: {
    fontSize: "2.5rem",
    textAlign: "center",
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
}));

const StatsCard = styled(motion.div)(({ theme, darkMode }) => ({
  padding: theme.spacing(3),
  borderRadius: "16px",
  background: darkMode ? "rgba(30, 30, 30, 0.8)" : "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  boxShadow: darkMode
    ? "0 10px 30px rgba(0, 0, 0, 0.3)"
    : "0 10px 30px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginBottom: theme.spacing(2),
  border: darkMode
    ? "1px solid rgba(255, 255, 255, 0.1)"
    : "1px solid rgba(0, 0, 0, 0.05)",
  [theme.breakpoints.down("md")]: {
    alignItems: "center",
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
  background: "linear-gradient(45deg, #4A90E2, #845EC2, #D65DB1, #FF6F91)",
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

// Add this new component after other styled components
const TypewriterText = ({ text }) => {
  const characters = text.split("");

  return (
    <motion.span initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
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

// Add this new component for the code container
const CodeContainer = styled(Box)(({ theme, darkMode }) => ({
  padding: theme.spacing(3),
  borderRadius: "8px",
  fontFamily: "'Fira Code', monospace",
  background: darkMode ? "#1E1E1E" : "#2D2D2D",
  color: "#E0E0E0",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
  overflowX: "auto",
  width: "100%",
  marginBottom: theme.spacing(4),
  border: "1px solid rgba(255, 255, 255, 0.1)",
  maxWidth: "600px",
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
  },
}));

// Code typing component
const TypewriterCode = ({ code }) => {
  const characters = code.split("");

  return (
    <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.05,
            delay: index * 0.02,
            ease: "easeIn",
          }}
          style={{
            color: getCharColor(char, code.substring(0, index)),
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Simple function to color Python syntax
const getCharColor = (char, prevText) => {
  // Simple Python syntax coloring
  if (
    prevText.endsWith("def ") ||
    prevText.endsWith("class ") ||
    prevText.match(/def\s+\w+$/) ||
    prevText.match(/class\s+\w+$/)
  ) {
    return "#569CD6"; // Function/class names in blue
  } else if (
    [
      "def",
      "class",
      "import",
      "from",
      "return",
      "if",
      "else",
      "elif",
      "for",
      "while",
      "try",
      "except",
      "with",
      "as",
      "in",
      "not",
      "and",
      "or",
    ].includes(prevText.split(/\s+/).pop())
  ) {
    return "#C586C0"; // Keywords in purple
  } else if (char.match(/[0-9]/)) {
    return "#B5CEA8"; // Numbers in green
  } else if (
    ['"', "'"].includes(char) ||
    (prevText.match(/["'](?:[^"'\\]|\\.)*$/) && !prevText.endsWith("\\"))
  ) {
    return "#CE9178"; // Strings in orange
  } else if (char === "#" || prevText.match(/#.*$/)) {
    return "#6A9955"; // Comments in green
  } else if (char.match(/[\(\)\[\]\{\}]/)) {
    return "#D4D4D4"; // Brackets in white
  } else if (char.match(/[+\-*/=<>:\.]/)) {
    return "#D4D4D4"; // Operators in white
  }
  return "#9CDCFE"; // Default light blue for variables
};

const HeroSection = () => {
  const darkMode = useSelector(selectDarkMode);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [animate, setAnimate] = useState(false);

  // Animation trigger
  useEffect(() => {
    setAnimate(true);
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const stats = [
    {
      icon: (
        <CodeIcon
          sx={{ fontSize: 40, color: darkMode ? "#4A90E2" : "#2D68B2" }}
        />
      ),
      title: "160+ Developers",
      subtitle: "Expert talent ready for your project",
    },
    {
      icon: (
        <TeamIcon
          sx={{ fontSize: 40, color: darkMode ? "#845EC2" : "#5E42A6" }}
        />
      ),
      title: "5 Specialized Teams",
      subtitle: "Frontend, Backend, Mobile, ML, and UI/UX",
    },
  ];

  // Sample Python code
  const pythonCode = `# Machine Learning function
def train_model(data, model_type="regression"):
    """
    Train a machine learning model on the provided data
    """
    if model_type == "regression":
        model = LinearRegression()
    elif model_type == "classification":
        model = RandomForest()
    
    # Fit the model
    model.fit(data.X, data.y)
    return model`;

  return (
    <HeroContainer
      sx={{
        background: darkMode
          ? "linear-gradient(135deg, #121212, #1E1E1E)"
          : "linear-gradient(135deg, #f7f7f7, #ffffff)",
        color: darkMode ? "#ffffff" : "#333333",
        position: "relative",
      }}
    >
      <BackgroundPattern darkMode={darkMode} />

      <ContentWrapper
        maxWidth="lg"
        sx={{ position: "relative", height: "100%" }}
      >
        <Grid container spacing={6} alignItems="center">
          {/* Left column - Text and buttons */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={animate ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <HeroHeading
                variant="h1"
                fontSize={{ xs: "2.5rem", md: "3.5rem", lg: "4rem" }}
              >
                <TypewriterText text="Meet Our 160+ Developers at progHubs!" />
              </HeroHeading>

              <HeroSubheading
                variant="h5"
                sx={{
                  color: darkMode ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)",
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                }}
              >
                A talented team of frontend, backend, mobile, ML, and UI/UX
                engineers driving innovation and delivering exceptional
                solutions.
              </HeroSubheading>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 4,
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <ButtonContainer>
                  <ActionButton
                    variant="contained"
                    color="primary"
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
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

          {/* Right column - Code container */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={animate ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <CodeContainer darkMode={darkMode}>
                <TypewriterCode code={pythonCode} />
              </CodeContainer>
            </motion.div>
          </Grid>
        </Grid>
      </ContentWrapper>

      {/* Stats boxes moved outside ContentWrapper to ensure they're at bottom */}
      <Box
        sx={{
          position: "absolute",
          bottom: "80px",
          right: { xs: "50%", md: "40px" },
          transform: { xs: "translateX(50%)", md: "none" },
          display: "flex",
          flexDirection: "row",
          gap: 3,
          width: { xs: "90%", sm: "auto" },
          maxWidth: "800px",
          justifyContent: "center",
          zIndex: 5,
        }}
      >
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            darkMode={darkMode}
            component={motion.div}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            custom={index}
            variants={cardVariants}
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 auto" },
              maxWidth: { xs: "100%", sm: "250px" },
              minWidth: { sm: "180px" },
            }}
          >
            <Box sx={{ mb: 1 }}>{stat.icon}</Box>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
              {stat.title}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {stat.subtitle}
            </Typography>
          </StatsCard>
        ))}
      </Box>

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
