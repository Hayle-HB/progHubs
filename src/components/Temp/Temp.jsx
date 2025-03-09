import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../features/theme/themeSlice";
import CloseIcon from "@mui/icons-material/Close";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Temp = () => {
  const darkMode = useSelector(selectDarkMode);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [positions, setPositions] = useState([]);
  const maxTrailLength = 20; // Maximum number of trail points
  const isDrawing = useRef(false);
  const [showQuote, setShowQuote] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(null);

  // Collection of inspirational programming quotes
  const quotes = [
    {
      text: "Programming isn't about what you know; it's about what you can figure out.",
      author: "Chris Pine",
    },
    {
      text: "The only way to learn a new programming language is by writing programs in it.",
      author: "Dennis Ritchie",
    },
    {
      text: "Sometimes it's better to leave something alone, to pause, and that's very true of programming.",
      author: "Joyce Wheeler",
    },
    {
      text: "Testing leads to failure, and failure leads to understanding.",
      author: "Burt Rutan",
    },
    {
      text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      author: "Martin Fowler",
    },
    {
      text: "የህይወትህን መብራት ላምን ሰጠህኝ ፤\nሔድኩኝ ፣\nከነፍኩኝ.......በመብራትህ ፤\nአንተን ጨለማ ላይ ትቼህ ፤\nለባእዳን ላበራልህ፣",
      author: "@Hayle_HB",
      isAmharic: true,
      memorial: true,
    },
  ];

  // Set a random quote when the overlay is opened
  const openQuoteOverlay = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote);
    setShowQuote(true);
  };

  // Initialize canvas when component mounts
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas size to match container
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track mouse position
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      // Get mouse position relative to the container
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });
      isDrawing.current = true;
    };

    const handleMouseLeave = () => {
      isDrawing.current = false;
      // Clear the trail when mouse leaves the component
      setPositions([]);

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const handleMouseEnter = (e) => {
      if (e.buttons === 1) {
        isDrawing.current = true;
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Update positions array with mouse position
  useEffect(() => {
    if (mousePosition.x === null || mousePosition.y === null) return;

    setPositions((prev) => {
      const newPositions = [...prev, mousePosition];
      if (newPositions.length > maxTrailLength) {
        return newPositions.slice(newPositions.length - maxTrailLength);
      }
      return newPositions;
    });
  }, [mousePosition]);

  // Draw the trail
  useEffect(() => {
    if (positions.length < 2) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set line style
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    // Create gradient based on theme
    const gradient = ctx.createLinearGradient(
      positions[0].x,
      positions[0].y,
      positions[positions.length - 1].x,
      positions[positions.length - 1].y
    );

    if (darkMode) {
      gradient.addColorStop(0, "rgba(0, 230, 118, 0.1)");
      gradient.addColorStop(1, "rgba(0, 230, 118, 0.8)");
    } else {
      gradient.addColorStop(0, "rgba(0, 114, 255, 0.1)");
      gradient.addColorStop(1, "rgba(0, 114, 255, 0.8)");
    }

    ctx.strokeStyle = gradient;

    // Draw the line
    ctx.beginPath();
    ctx.moveTo(positions[0].x, positions[0].y);

    // Create a smooth curve
    for (let i = 1; i < positions.length - 2; i++) {
      const xc = (positions[i].x + positions[i + 1].x) / 2;
      const yc = (positions[i].y + positions[i + 1].y) / 2;
      ctx.quadraticCurveTo(positions[i].x, positions[i].y, xc, yc);
    }

    // Curve through the last two points
    if (positions.length > 2) {
      const lastIndex = positions.length - 1;
      ctx.quadraticCurveTo(
        positions[lastIndex - 1].x,
        positions[lastIndex - 1].y,
        positions[lastIndex].x,
        positions[lastIndex].y
      );
    }

    ctx.stroke();
  }, [positions, darkMode]);

  return (
    <div
      ref={containerRef}
      className={`w-full min-h-screen pt-20 overflow-hidden relative ${
        darkMode ? "bg-[#0A0A1F] text-white" : "bg-[#F5F7FB] text-gray-800"
      }`}
    >
      {/* Canvas for cursor trail */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-50"
      />

      {/* Background graphic elements */}
      <div className="absolute inset-0 z-0">
        <div
          className={`absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20 ${
            darkMode ? "bg-purple-600" : "bg-blue-400"
          } blur-3xl`}
        ></div>
        <div
          className={`absolute bottom-20 -left-20 w-80 h-80 rounded-full opacity-20 ${
            darkMode ? "bg-indigo-600" : "bg-green-400"
          } blur-3xl`}
        ></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 h-[calc(100vh-80px)] flex flex-col justify-center items-center relative z-10">
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          {/* Logo badge */}
          <div
            className={`mb-6 px-4 py-2 rounded-full text-sm font-medium tracking-wide ${
              darkMode
                ? "bg-[#1E1E3F] text-[#00E676]"
                : "bg-[#E3F2FD] text-[#2563EB]"
            }`}
          >
            WELCOME TO
          </div>

          {/* Main title */}
          <h1
            className={`text-6xl md:text-8xl font-black mb-8 tracking-tight ${
              darkMode ? "text-white" : "text-[#1E293B]"
            }`}
            style={{
              fontFamily: "'Poppins', 'Montserrat', sans-serif",
              textShadow: darkMode
                ? "0 0 25px rgba(59, 130, 246, 0.3)"
                : "none",
            }}
          >
            <span
              className={`${
                darkMode
                  ? "bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899]"
                  : "bg-gradient-to-r from-[#0072FF] via-[#00C6FF] to-[#0072FF]"
              } bg-clip-text text-transparent`}
            >
              Prog
            </span>
            <span
              className={`${darkMode ? "text-[#F5F5F5]" : "text-[#272343]"}`}
            >
              Hubs
            </span>
          </h1>

          {/* Tagline */}
          <p
            className={`text-xl md:text-3xl mb-12 text-center font-light leading-relaxed ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            for Programmers by Programmers
          </p>

          {/* "with best" badge */}
          <div
            className={`mt-4 flex items-center ${
              darkMode ? "text-[#A5B4FC]" : "text-[#4F46E5]"
            }`}
          >
            <div className="w-12 h-[1px] bg-current opacity-50"></div>
            <div
              className={`mx-4 font-semibold tracking-wider uppercase text-sm ${
                darkMode ? "text-[#A5B4FC]" : "text-[#4F46E5]"
              }`}
            >
              with best
            </div>
            <div className="w-12 h-[1px] bg-current opacity-50"></div>
          </div>

          {/* Today's Quote button */}
          <button
            onClick={openQuoteOverlay}
            className={`mt-16 px-8 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
              darkMode
                ? "bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white shadow-lg shadow-blue-500/30"
                : "bg-gradient-to-r from-[#0072FF] to-[#00C6FF] text-white shadow-lg shadow-blue-500/20"
            }`}
          >
            Today's Quote
          </button>
        </div>
      </div>

      {/* Quote overlay */}
      {showQuote && currentQuote && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
          onClick={(e) => {
            // Only close if the backdrop is clicked, not the quote card
            if (e.target === e.currentTarget) {
              setShowQuote(false);
            }
          }}
        >
          <div
            className={`relative max-w-3xl w-full mx-4 p-12 md:p-16 rounded-2xl shadow-2xl ${
              darkMode
                ? "bg-gradient-to-br from-[#1A1A2E] to-[#16213E] text-white"
                : "bg-gradient-to-br from-white to-[#F8FAFC] text-gray-800"
            } ${currentQuote.isAmharic ? "amharic-quote" : ""}`}
          >
            {/* Close button */}
            <button
              onClick={() => setShowQuote(false)}
              className={`absolute top-4 right-4 p-2 rounded-full transition-all hover:scale-110 ${
                darkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <CloseIcon />
            </button>

            {/* Quote icon */}
            <div
              className={`${
                currentQuote.isAmharic
                  ? darkMode
                    ? "text-amber-500"
                    : "text-amber-600"
                  : darkMode
                  ? "text-[#00E676]"
                  : "text-[#0072FF]"
              } opacity-20 text-9xl absolute -top-4 left-4`}
            >
              <FormatQuoteIcon style={{ fontSize: "6rem" }} />
            </div>

            {/* Memorial badge - only for Amharic quote */}
            {currentQuote.memorial && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 px-6 py-2 rounded-full flex items-center shadow-lg border border-amber-500/30">
                <FavoriteIcon className="text-red-500 mr-2" fontSize="small" />
                <span className="text-white text-sm font-medium">
                  In Loving Memory
                </span>
              </div>
            )}

            {/* Quote content */}
            <div
              className="text-center px-4"
              style={{
                backgroundImage: "url('/path/to/your/memorial-image.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundBlendMode: "overlay",
              }}
            >
              <p
                className={`${
                  currentQuote.isAmharic
                    ? "text-xl md:text-3xl mb-8 leading-loose font-medium whitespace-pre-line"
                    : "text-2xl md:text-4xl mb-8 leading-relaxed italic font-light"
                } ${darkMode ? "text-gray-100" : "text-gray-700"}`}
                style={{
                  fontFamily: currentQuote.isAmharic
                    ? "'Nyala', 'Abyssinica SIL', sans-serif"
                    : "'Georgia', serif",
                  textShadow: darkMode
                    ? "0 4px 8px rgba(0,0,0,0.3)"
                    : "0 2px 4px rgba(0,0,0,0.1)",
                  direction: currentQuote.isAmharic ? "ltr" : "auto",
                }}
              >
                "{currentQuote.text}"
              </p>

              <div className="flex flex-col items-center">
                <div
                  className={`w-16 h-1 mb-6 ${
                    currentQuote.isAmharic
                      ? "bg-amber-500"
                      : darkMode
                      ? "bg-[#00E676]"
                      : "bg-[#0072FF]"
                  }`}
                ></div>
                <p
                  className={`text-lg md:text-xl font-semibold ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  } ${currentQuote.isAmharic ? "text-amber-500" : ""}`}
                >
                  {currentQuote.author}
                </p>
              </div>

              {/* Memorial message - only for Amharic quote */}
              {currentQuote.memorial && (
                <div
                  className={`mt-6 p-3 rounded-lg ${
                    darkMode ? "bg-black/30" : "bg-white/70"
                  } border ${
                    darkMode ? "border-amber-500/30" : "border-amber-600/30"
                  }`}
                >
                  <p
                    className={`text-base italic ${
                      darkMode ? "text-amber-200" : "text-amber-800"
                    }`}
                  >
                    For my Brother
                  </p>
                  <p
                    className={`mt-2 text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Your absence is a wound that never heals. In my darkest
                    moments, I reach for your hand, only to grasp emptiness. Yet
                    somehow, in that void, I still feel you—my brother, my
                    guardian, forever.
                  </p>
                </div>
              )}

              {/* Decorative elements - special for Amharic quote */}
              {currentQuote.isAmharic ? (
                <>
                  <div
                    className={`absolute top-8 right-12 w-24 h-24 rounded-full opacity-30 bg-amber-500 blur-xl`}
                  ></div>
                  <div
                    className={`absolute bottom-12 left-12 w-16 h-16 rounded-full opacity-30 bg-amber-500 blur-xl`}
                  ></div>
                  <div
                    className={`absolute -bottom-4 right-24 w-20 h-20 rounded-full opacity-20 bg-amber-500 blur-xl`}
                  ></div>
                </>
              ) : (
                <div
                  className={`absolute bottom-8 right-8 w-20 h-20 rounded-full opacity-30 ${
                    darkMode ? "bg-[#3B82F6]" : "bg-[#0072FF]"
                  } blur-xl`}
                ></div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Temp;
