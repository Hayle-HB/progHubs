import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../features/theme/themeSlice";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";

// Import modularized components
import TeamFilters from "./Components/Teamfilters";
import TeamMembersList from "./Components/TeamMembersList";
import NoResults from "./Components/NoResults";
import {
  generateTeamMembers,
  getUniqueSkills,
  sortMembers,
} from "./Components/TeamUtils";

const Team = () => {
  const darkMode = useSelector(selectDarkMode);
  const [isLoading, setIsLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState([]);
  const [displayedMembers, setDisplayedMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [experience, setExperience] = useState("all");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("nameAsc");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true); // Default open on desktop
  const itemsPerPage = 12;

  // Toggle mobile sidebar
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  // Toggle desktop sidebar
  const toggleDesktopSidebar = () => {
    setIsDesktopSidebarOpen(!isDesktopSidebarOpen);
  };

  // Fetch team members on initial load
  useEffect(() => {
    const fetchTeamMembers = async () => {
      setIsLoading(true);
      try {
        const data = await generateTeamMembers();
        setTeamMembers(data);
        setAllSkills(getUniqueSkills(data));
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // Filter and sort team members
  useEffect(() => {
    let filtered = [...teamMembers];

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (member) =>
          member.name.toLowerCase().includes(searchLower) ||
          member.role.toLowerCase().includes(searchLower) ||
          member.bio.toLowerCase().includes(searchLower) ||
          member.skills.some((skill) =>
            skill.toLowerCase().includes(searchLower)
          )
      );
    }

    // Filter by department
    if (department !== "all") {
      filtered = filtered.filter((member) => member.department === department);
    }

    // Filter by experience
    if (experience !== "all") {
      filtered = filtered.filter((member) => member.experience === experience);
    }

    // Filter by selected skills
    if (selectedSkills.length > 0) {
      filtered = filtered.filter((member) =>
        selectedSkills.every((skill) => member.skills.includes(skill))
      );
    }

    // Sort members
    filtered = sortMembers(filtered, sortBy);

    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    setDisplayedMembers(filtered.slice(startIndex, startIndex + itemsPerPage));
  }, [
    teamMembers,
    search,
    department,
    experience,
    selectedSkills,
    sortBy,
    currentPage,
  ]);

  // Separate useEffect to reset page when filters change, not when page changes
  useEffect(() => {
    // Reset to page 1 when filters change
    setCurrentPage(1);
  }, [search, department, experience, selectedSkills, sortBy]);

  // Calculate total pages
  const totalPages = Math.max(
    1,
    Math.ceil(
      teamMembers.filter((member) => {
        // Apply all filters except pagination
        const matchesSearch =
          !search ||
          member.name.toLowerCase().includes(search.toLowerCase()) ||
          member.role.toLowerCase().includes(search.toLowerCase()) ||
          member.bio.toLowerCase().includes(search.toLowerCase()) ||
          member.skills.some((skill) =>
            skill.toLowerCase().includes(search.toLowerCase())
          );

        const matchesDepartment =
          department === "all" || member.department === department;
        const matchesExperience =
          experience === "all" || member.experience === experience;
        const matchesSkills =
          selectedSkills.length === 0 ||
          selectedSkills.every((skill) => member.skills.includes(skill));

        return (
          matchesSearch &&
          matchesDepartment &&
          matchesExperience &&
          matchesSkills
        );
      }).length / itemsPerPage
    )
  );

  const handleSkillToggle = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setDepartment("all");
    setExperience("all");
    setSelectedSkills([]);
    setSortBy("nameAsc");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    search ||
    department !== "all" ||
    experience !== "all" ||
    selectedSkills.length > 0;

  // Check if we should show filters (when there are enough team members)
  const showFilters = teamMembers.length > 3;

  return (
    <div className="min-h-[calc(100vh-80px)] mt-20 md:mt-[80px] relative">
      {/* Main content area */}
      <div className="flex h-full">
        {/* Desktop sidebar - contained within the component */}
        {showFilters && (
          <div
            className={`hidden md:block transition-all duration-300 ease-in-out
              ${isDesktopSidebarOpen ? "w-[280px]" : "w-[60px]"}
              ${
                darkMode
                  ? "bg-[#121212] border-r-2 border-r-white/10"
                  : "bg-[#F8F9FA] border-r-2 border-r-black/10"
              }
              h-[calc(100vh-80px)]`}
            style={{ position: "sticky", top: "80px" }}
          >
            <TeamFilters
              search={search}
              setSearch={setSearch}
              department={department}
              setDepartment={setDepartment}
              experience={experience}
              setExperience={setExperience}
              selectedSkills={selectedSkills}
              handleSkillToggle={handleSkillToggle}
              resetFilters={resetFilters}
              setCurrentPage={setCurrentPage}
              darkMode={darkMode}
              isOpen={isDesktopSidebarOpen}
              toggleSidebar={toggleDesktopSidebar}
              isMobile={false}
            />
          </div>
        )}

        {/* Main content area */}
        <div className="flex-1">
          <div className="p-6 md:p-8">
            {/* Completely redesigned header - centered with new styling */}
            <div className="text-center max-w-4xl mx-auto mb-16 px-4">
              <div
                className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${
                  darkMode
                    ? "bg-[#00E676]/10 text-[#00E676]"
                    : "bg-[#00E676]/10 text-[#00E676]"
                }`}
              >
                Our Talented Professionals
              </div>

              <h1
                className={`text-3xl md:text-5xl font-bold mb-6 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                The Team Behind Our Success
              </h1>

              <p
                className={`text-lg md:text-xl mx-auto max-w-3xl ${
                  darkMode ? "text-white/70" : "text-gray-600"
                }`}
              >
                Meet the creative minds and technical experts who transform
                ideas into exceptional digital solutions. Each member brings
                unique talents and perspectives to our collaborative
                environment.
              </p>

              {showFilters && (
                <div
                  className={`mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                    darkMode ? "bg-white/5" : "bg-gray-100"
                  }`}
                >
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Looking for specific skills?"
                      className={`py-1 pl-7 pr-2 w-full bg-transparent border-none ${
                        darkMode
                          ? "text-white/60 placeholder-white/60"
                          : "text-gray-500 placeholder-gray-500"
                      } focus:outline-none focus:ring-0`}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 absolute left-0 top-1/2 transform -translate-y-1/2 ${
                        darkMode ? "text-white/60" : "text-gray-500"
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <button
                    onClick={() => {
                      // For mobile, open the mobile sidebar
                      if (window.innerWidth < 768) {
                        setIsMobileSidebarOpen(true);
                      } else {
                        // For desktop, make sure desktop sidebar is open
                        setIsDesktopSidebarOpen(true);
                      }
                    }}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      darkMode
                        ? "bg-[#00E676] text-black hover:bg-[#00E676]/90"
                        : "bg-[#00E676] text-black hover:bg-[#00E676]/90"
                    }`}
                  >
                    Use Filters
                  </button>
                </div>
              )}
            </div>

            {/* Active filters (horizontal) */}
            {showFilters && hasActiveFilters && (
              <TeamFilters.ActiveFilters
                search={search}
                setSearch={setSearch}
                department={department}
                setDepartment={setDepartment}
                experience={experience}
                setExperience={setExperience}
                selectedSkills={selectedSkills}
                handleSkillToggle={handleSkillToggle}
                resetFilters={resetFilters}
                darkMode={darkMode}
              />
            )}

            {/* Sort & results count */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
              <p
                className={`text-sm ${
                  darkMode ? "text-white/70" : "text-black/70"
                }`}
              >
                {!isLoading &&
                  `Showing ${displayedMembers.length} of ${
                    teamMembers.filter((member) => {
                      const matchesSearch =
                        !search ||
                        member.name
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        member.role
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        member.bio
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        member.skills.some((skill) =>
                          skill.toLowerCase().includes(search.toLowerCase())
                        );

                      const matchesDepartment =
                        department === "all" ||
                        member.department === department;
                      const matchesExperience =
                        experience === "all" ||
                        member.experience === experience;
                      const matchesSkills =
                        selectedSkills.length === 0 ||
                        selectedSkills.every((skill) =>
                          member.skills.includes(skill)
                        );

                      return (
                        matchesSearch &&
                        matchesDepartment &&
                        matchesExperience &&
                        matchesSkills
                      );
                    }).length
                  } developers`}
              </p>
              <div className="w-full sm:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`w-full sm:w-auto py-2 px-3 rounded-lg border text-sm ${
                    darkMode
                      ? "bg-[#2A2A2A] border-[#444] text-white"
                      : "bg-white border-gray-300 text-gray-700"
                  }`}
                >
                  <option value="nameAsc">Name (A-Z)</option>
                  <option value="nameDesc">Name (Z-A)</option>
                  <option value="experienceAsc">
                    Experience (Junior → Architect)
                  </option>
                  <option value="experienceDesc">
                    Experience (Architect → Junior)
                  </option>
                </select>
              </div>
            </div>

            {/* Results or no results */}
            {!isLoading && displayedMembers.length === 0 ? (
              <NoResults resetFilters={resetFilters} darkMode={darkMode} />
            ) : (
              <TeamMembersList
                isLoading={isLoading}
                displayedMembers={displayedMembers}
                handleSkillToggle={handleSkillToggle}
                selectedSkills={selectedSkills}
                darkMode={darkMode}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter overlay - renders inside the team component */}
      {showFilters && (
        <>
          <div className="md:hidden">
            <TeamFilters
              search={search}
              setSearch={setSearch}
              department={department}
              setDepartment={setDepartment}
              experience={experience}
              setExperience={setExperience}
              selectedSkills={selectedSkills}
              handleSkillToggle={handleSkillToggle}
              resetFilters={resetFilters}
              setCurrentPage={setCurrentPage}
              darkMode={darkMode}
              isOpen={isMobileSidebarOpen}
              toggleSidebar={toggleMobileSidebar}
              isMobile={true}
            />
          </div>

          {/* Mobile Filter Button */}
          <div className="md:hidden fixed bottom-6 right-6 z-40">
            <button
              onClick={toggleMobileSidebar}
              className={`p-4 rounded-full shadow-lg flex items-center justify-center ${
                darkMode ? "bg-[#1E1E1E] text-white" : "bg-white text-gray-800"
              } hover:shadow-xl transition-all duration-200`}
              title="Filter Developers"
            >
              <FilterListIcon />
              {hasActiveFilters && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-[#00E676] text-black text-xs font-bold">
                  {(search ? 1 : 0) +
                    (department !== "all" ? 1 : 0) +
                    (experience !== "all" ? 1 : 0) +
                    selectedSkills.length}
                </span>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Team;
