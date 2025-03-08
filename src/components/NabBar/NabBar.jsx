import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { toggleTheme, selectDarkMode } from "../../features/theme/themeSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectDarkMode);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isSpinning, setIsSpinning] = React.useState(false);

  const toggleThemeHandler = () => {
    setIsSpinning(true);
    dispatch(toggleTheme());
    setTimeout(() => setIsSpinning(false), 300);
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 backdrop-blur-md transition-all duration-500 ease-in-out ${
        isDarkMode
          ? "bg-slate-900/90 border-b border-slate-700"
          : "bg-white/90 border-b border-slate-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="text-2xl font-extrabold">
              <span
                className={`transition-all duration-500 ease-in-out ${
                  isDarkMode
                    ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400"
                    : "bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600"
                } bg-clip-text text-transparent hover:scale-105 transform`}
              >
                progHubs
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div
              className={`relative group transition-all duration-300 ease-in-out ${
                isDarkMode ? "bg-slate-800/50" : "bg-slate-100"
              } rounded-xl`}
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MagnifyingGlassIcon
                  className={`h-5 w-5 transition-colors duration-300 ease-in-out ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`block w-full pl-11 pr-4 py-3 text-sm rounded-xl 
                  transition-all duration-300 ease-in-out
                  ${
                    isDarkMode
                      ? "bg-slate-800/50 text-slate-100 placeholder-slate-400 focus:bg-slate-800"
                      : "bg-slate-100 text-slate-900 placeholder-slate-400 focus:bg-white"
                  }
                  border-2 border-transparent
                  focus:outline-none focus:border-indigo-500`}
                placeholder="Search team members..."
              />
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center">
            <button
              onClick={toggleThemeHandler}
              className={`p-3 rounded-full 
                transition-colors duration-300 ease-in-out
                ${
                  isDarkMode
                    ? "bg-gray-800 text-yellow-300 hover:bg-gray-700"
                    : "bg-white text-gray-800 hover:bg-gray-200"
                } shadow-lg`}
            >
              {isDarkMode ? (
                <SunIcon className={`h-6 w-6 hover:animate-spin`} />
              ) : (
                <MoonIcon className={`h-6 w-6 hover:animate-spin`} />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
