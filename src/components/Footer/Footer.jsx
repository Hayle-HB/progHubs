import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../features/theme/themeSlice";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Footer = () => {
  const darkMode = useSelector(selectDarkMode);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Implement subscription logic here
    alert(`Thank you for subscribing with: ${email}`);
    setEmail("");
  };

  return (
    <footer
      className={`${
        darkMode ? "bg-[#121212] text-white" : "bg-gray-50 text-gray-800"
      } pt-16 pb-6 relative`}
    >
      {/* Main Footer */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center mb-5">
              <div className="h-8 w-8 rounded-lg bg-[#00E676] mr-2 flex items-center justify-center">
                <span className="text-black font-bold text-lg">D</span>
              </div>
              <h3 className="text-xl font-bold">DevTeam</h3>
            </div>
            <p
              className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              We build exceptional digital experiences with cutting-edge
              technology and innovative designs.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-transparent hover:border-[#00E676]"
              >
                <TwitterIcon className="text-[#00E676]" fontSize="small" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-transparent hover:border-[#00E676]"
              >
                <FacebookIcon className="text-[#00E676]" fontSize="small" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-transparent hover:border-[#00E676]"
              >
                <InstagramIcon className="text-[#00E676]" fontSize="small" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-transparent hover:border-[#00E676]"
              >
                <LinkedInIcon className="text-[#00E676]" fontSize="small" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-transparent hover:border-[#00E676]"
              >
                <GitHubIcon className="text-[#00E676]" fontSize="small" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              <span className="relative z-10">Quick Links</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#00E676]"></span>
            </h3>
            <ul className="space-y-3">
              {[
                "Home",
                "About",
                "Services",
                "Team",
                "Projects",
                "Blog",
                "Contact",
              ].map((item, index) => (
                <li key={index} className="group">
                  <a
                    href={`#${item.toLowerCase()}`}
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    } hover:text-[#00E676] transition-colors group-hover:pl-1 duration-300 flex items-center`}
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity mr-1 text-xs">
                      <ArrowForwardIcon style={{ fontSize: 14 }} />
                    </span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              <span className="relative z-10">Contact Us</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#00E676]"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <LocationOnIcon
                  className="text-[#00E676] mt-1 mr-3"
                  fontSize="small"
                />
                <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  123 Innovation Drive
                  <br />
                  San Francisco, CA 94107
                </span>
              </li>
              <li className="flex items-center">
                <PhoneIcon className="text-[#00E676] mr-3" fontSize="small" />
                <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-center">
                <EmailIcon className="text-[#00E676] mr-3" fontSize="small" />
                <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  hello@devteam.com
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              <span className="relative z-10">Stay Updated</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#00E676]"></span>
            </h3>
            <p
              className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form onSubmit={handleSubscribe}>
              <div className="flex items-stretch overflow-hidden rounded-lg">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className={`py-3 px-4 flex-grow focus:outline-none ${
                    darkMode
                      ? "bg-[#1E1E1E] text-white placeholder-gray-400 border-[#333]"
                      : "bg-white text-gray-800 placeholder-gray-500 border-gray-100"
                  } border`}
                />
                <button
                  type="submit"
                  className="bg-[#00E676] text-black px-4 font-medium hover:bg-[#00C853] transition-colors flex items-center"
                >
                  Subscribe <ArrowRightAltIcon className="ml-1" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Award/Recognition Section */}
        <div
          className={`py-8 border-t border-b ${
            darkMode ? "border-gray-800" : "border-gray-200"
          } mb-8`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <h4 className="text-3xl font-bold text-[#00E676]">250+</h4>
              <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                Projects Completed
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-3xl font-bold text-[#00E676]">45+</h4>
              <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                Team Members
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-3xl font-bold text-[#00E676]">18</h4>
              <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                Awards Won
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-3xl font-bold text-[#00E676]">120+</h4>
              <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                Happy Clients
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div
        className={`border-t ${
          darkMode ? "border-gray-800" : "border-gray-200"
        } pt-8 mt-4`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              } mb-4 md:mb-0`}
            >
              © {new Date().getFullYear()} DevTeam. All rights reserved. Made
              with{" "}
              <FavoriteIcon className="text-[#00E676] mx-1" fontSize="small" />{" "}
              by our talented team.
            </p>
            <div className="flex space-x-6">
              <a
                href="#privacy"
                className={`text-sm ${
                  darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className={`text-sm ${
                  darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                Terms of Service
              </a>
              <a
                href="#cookies"
                className={`text-sm ${
                  darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration - SVG wave */}
      <div
        className="absolute bottom-0 left-0 w-full overflow-hidden"
        style={{ zIndex: -1 }}
      >
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-20 ${
            darkMode ? "text-[#1A1A1A]" : "text-gray-100"
          }`}
          preserveAspectRatio="none"
        >
          <path
            d="M0 0L48 8.875C96 17.75 192 35.5 288 53.25C384 71 480 88.75 576 80.625C672 71 768 35.5 864 26.625C960 17.75 1056 35.5 1152 44.375C1248 53.25 1344 53.25 1392 53.25L1440 53.25V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
