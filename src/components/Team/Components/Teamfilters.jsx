import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import RefreshIcon from "@mui/icons-material/Refresh";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import { filterData } from "./TeamUtils";

const TeamFilters = ({
  search,
  setSearch,
  department,
  setDepartment,
  experience,
  setExperience,
  selectedSkills,
  handleSkillToggle,
  resetFilters,
  setCurrentPage,
  darkMode,
  isOpen,
  toggleSidebar,
  isMobile = false,
}) => {
  const { allDepartments, allExperience, allSkills } = filterData;

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
    setCurrentPage(1);
  };

  const handleExperienceChange = (e) => {
    setExperience(e.target.value);
    setCurrentPage(1);
  };

  const hasActiveFilters =
    search ||
    department !== "all" ||
    experience !== "all" ||
    selectedSkills.length > 0;

  const filterContent = (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h2
          className={`text-lg font-semibold ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Filters
        </h2>
        {isMobile ? (
          // Close button only for mobile view
          <button
            onClick={toggleSidebar}
            className={`p-1 rounded-full ${
              darkMode
                ? "hover:bg-white/10 text-white"
                : "hover:bg-black/5 text-gray-800"
            }`}
          >
            <CloseIcon fontSize="medium" />
          </button>
        ) : (
          // Toggle button for desktop view
          <button
            onClick={toggleSidebar}
            className={`p-1 rounded-full ${
              darkMode
                ? "hover:bg-white/10 text-white"
                : "hover:bg-black/5 text-gray-800"
            }`}
            title={isOpen ? "Hide Filters" : "Show Filters"}
          >
            {isOpen ? (
              <MenuOpenIcon fontSize="small" />
            ) : (
              <FilterListIcon fontSize="small" />
            )}
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div className="relative">
          <h3
            className={`font-semibold mb-2 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Search
          </h3>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search developers"
              className={`w-full py-2 pl-10 pr-4 rounded-lg border text-sm ${
                darkMode
                  ? "bg-[#2A2A2A] border-[#444] text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-700 placeholder-gray-500"
              } focus:outline-none focus:ring-2 focus:ring-[#00E676]/50`}
            />
            <SearchIcon
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
              fontSize="small"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <ClearIcon fontSize="small" />
              </button>
            )}
          </div>
        </div>

        {/* Department */}
        <div>
          <h3
            className={`font-semibold mb-2 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Department
          </h3>
          <select
            value={department}
            onChange={handleDepartmentChange}
            className={`w-full p-2 rounded-lg border text-sm ${
              darkMode
                ? "bg-[#2A2A2A] border-[#444] text-white"
                : "bg-white border-gray-300 text-gray-700"
            } focus:outline-none focus:ring-2 focus:ring-[#00E676]/50`}
          >
            {allDepartments.map((dept) => (
              <option key={dept} value={dept}>
                {dept === "all" ? "All Departments" : dept}
              </option>
            ))}
          </select>
        </div>

        {/* Experience */}
        <div>
          <h3
            className={`font-semibold mb-2 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Experience Level
          </h3>
          <select
            value={experience}
            onChange={handleExperienceChange}
            className={`w-full p-2 rounded-lg border text-sm ${
              darkMode
                ? "bg-[#2A2A2A] border-[#444] text-white"
                : "bg-white border-gray-300 text-gray-700"
            } focus:outline-none focus:ring-2 focus:ring-[#00E676]/50`}
          >
            {allExperience.map((exp) => (
              <option key={exp} value={exp}>
                {exp === "all" ? "All Experience Levels" : exp}
              </option>
            ))}
          </select>
        </div>

        {/* Skills */}
        <div>
          <h3
            className={`font-semibold mb-2 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Skills
          </h3>
          <div className="max-h-52 overflow-y-auto pr-1 rounded-lg border border-gray-200 dark:border-gray-700 p-2">
            <div className="flex flex-wrap gap-1.5">
              {allSkills.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    onClick={() => handleSkillToggle(skill)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      isSelected
                        ? "bg-[rgba(0,230,118,0.15)] text-[#00E676] border border-[rgba(0,230,118,0.3)] hover:bg-[rgba(0,230,118,0.25)]"
                        : darkMode
                        ? "bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.9)] hover:bg-[rgba(255,255,255,0.1)]"
                        : "bg-[rgba(0,0,0,0.05)] text-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.1)]"
                    }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Reset Filters Button */}
      {hasActiveFilters && (
        <div className="mt-auto pt-6">
          <button
            onClick={resetFilters}
            className="w-full py-2.5 px-4 border border-[#00E676] text-[#00E676] rounded-lg hover:bg-[rgba(0,230,118,0.08)] transition-colors flex items-center justify-center"
          >
            <RefreshIcon className="mr-2" fontSize="small" />
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    // Mobile version - overlay popup contained within the Team component
    return (
      <>
        {/* Sidebar Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Sidebar */}
        <div
          className={`fixed top-0 h-screen w-[90%] max-w-[320px] overflow-y-auto z-50 transition-all duration-300 ease-in-out
          ${
            darkMode
              ? "bg-[#121212] border-r border-r-white/10"
              : "bg-[#F8F9FA] border-r border-r-black/10"
          }
          ${isOpen ? "right-0" : "right-[-100%]"} 
          shadow-2xl pt-16`}
        >
          <div className="p-6">{filterContent}</div>
        </div>
      </>
    );
  } else {
    // Desktop version - contained sidebar
    return (
      <div className="h-full">
        {isOpen ? (
          <div className="p-6 h-full overflow-y-auto">{filterContent}</div>
        ) : (
          <div className="p-3 flex flex-col items-center">
            <button
              onClick={toggleSidebar}
              className={`p-2 rounded-full ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
              title="Show Filters"
            >
              <FilterListIcon />
              {hasActiveFilters && (
                <span className="absolute top-3 right-2 flex items-center justify-center w-4 h-4 rounded-full bg-[#00E676] text-black text-xs font-bold">
                  {(search ? 1 : 0) +
                    (department !== "all" ? 1 : 0) +
                    (experience !== "all" ? 1 : 0) +
                    selectedSkills.length}
                </span>
              )}
            </button>
          </div>
        )}
      </div>
    );
  }
};

// Active filters component 280
const ActiveFilters = ({
  search,
  setSearch,
  department,
  setDepartment,
  experience,
  setExperience,
  selectedSkills,
  handleSkillToggle,
  resetFilters,
  darkMode,
}) => {
  return (
    <div
      className={`mb-6 p-4 rounded-xl ${
        darkMode
          ? "bg-white/[0.03] border border-white/5"
          : "bg-black/[0.02] border border-black/5"
      }`}
      style={{ width: "100%", maxWidth: "800px" }}
    >
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium">Active Filters</p>
        <button
          onClick={resetFilters}
          className="text-[#00E676] text-sm flex items-center hover:underline"
        >
          <RefreshIcon fontSize="small" className="mr-1" />
          Reset All
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5" style={{ maxWidth: "100%" }}>
        {search && (
          <div
            className="px-3 py-1.5 text-xs rounded-full bg-[rgba(0,230,118,0.1)] border border-[rgba(0,230,118,0.2)] flex items-center shadow-sm"
            style={{
              color: darkMode ? "#00E676" : "#007F3D",
              width: "fit-content",
              maxWidth: "200px",
            }}
          >
            <span className="truncate">Search: {search}</span>
            <button
              onClick={() => setSearch("")}
              className="ml-1.5 hover:text-red-500 flex-shrink-0"
            >
              <ClearIcon style={{ fontSize: 14 }} />
            </button>
          </div>
        )}
        {department !== "all" && (
          <div
            className="px-3 py-1.5 text-xs rounded-full bg-[rgba(0,230,118,0.1)] border border-[rgba(0,230,118,0.2)] flex items-center shadow-sm"
            style={{
              color: darkMode ? "#00E676" : "#007F3D",
              width: "fit-content",
              maxWidth: "200px",
            }}
          >
            <span className="truncate">Department: {department}</span>
            <button
              onClick={() => setDepartment("all")}
              className="ml-1.5 hover:text-red-500 flex-shrink-0"
            >
              <ClearIcon style={{ fontSize: 14 }} />
            </button>
          </div>
        )}
        {experience !== "all" && (
          <div
            className="px-3 py-1.5 text-xs rounded-full bg-[rgba(0,230,118,0.1)] border border-[rgba(0,230,118,0.2)] flex items-center shadow-sm"
            style={{
              color: darkMode ? "#00E676" : "#007F3D",
              width: "fit-content",
              maxWidth: "200px",
            }}
          >
            <span className="truncate">Experience: {experience}</span>
            <button
              onClick={() => setExperience("all")}
              className="ml-1.5 hover:text-red-500 flex-shrink-0"
            >
              <ClearIcon style={{ fontSize: 14 }} />
            </button>
          </div>
        )}
        {selectedSkills.map((skill) => (
          <div
            key={skill}
            className="px-3 py-1.5 text-xs rounded-full bg-[rgba(0,230,118,0.1)] border border-[rgba(0,230,118,0.2)] flex items-center shadow-sm"
            style={{
              color: darkMode ? "#00E676" : "#007F3D",
              width: "fit-content",
              maxWidth: "200px",
            }}
          >
            <span className="truncate">{skill}</span>
            <button
              onClick={() => handleSkillToggle(skill)}
              className="ml-1.5 hover:text-red-500 flex-shrink-0"
            >
              <ClearIcon style={{ fontSize: 14 }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

TeamFilters.ActiveFilters = ActiveFilters;

export default TeamFilters;
