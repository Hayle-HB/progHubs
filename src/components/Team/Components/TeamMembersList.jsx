import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";

// Professional team member card component
const TeamMemberCard = ({
  member,
  index,
  handleSkillToggle,
  selectedSkills,
  darkMode,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="h-full"
      >
        <div
          className={`group h-full flex flex-col rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg 
          ${
            darkMode
              ? "bg-[#1E1E1E] border border-white/10 hover:border-[#00E676]"
              : "bg-white border border-gray-100 shadow-sm hover:border-[#00E676]"
          }`}
        >
          {/* Image with hover overlay - now part of group hover */}
          <div className="relative">
            <div
              className="h-[200px] relative bg-cover bg-center"
              style={{
                backgroundImage: `url(${member.image})`,
                backgroundPosition: "50% 25%",
              }}
            >
              {/* Department badge at top right */}
              <div className="absolute top-3 right-3 px-2.5 py-1 text-xs font-medium rounded-md bg-black/30 text-white backdrop-blur-sm z-10">
                {member.department}
              </div>

              {/* Overlay that appears on group hover (entire card) */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 bg-[#00E676] text-black rounded-md font-medium transform transition-transform duration-300 hover:scale-105 flex items-center"
                >
                  <InfoIcon style={{ fontSize: 18, marginRight: 4 }} />
                  View Profile
                </button>
              </div>
            </div>
          </div>

          <div className="flex-grow p-5 flex flex-col">
            <h3
              className={`text-lg font-semibold ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {member.name}
            </h3>

            <p className="text-[#00E676] text-sm font-medium mb-3">
              {member.role} • {member.experience}
            </p>

            {/* Skills with consistent styling */}
            <div className="flex flex-wrap gap-1">
              {member.skills.slice(0, 3).map((skill) => (
                <button
                  key={`${member.id}-${skill}`}
                  onClick={() => handleSkillToggle(skill)}
                  className={`m-0.5 px-2 py-1 rounded-md text-xs transition-colors ${
                    selectedSkills.includes(skill)
                      ? "bg-[rgba(0,230,118,0.1)] text-[#00E676] border border-[rgba(0,230,118,0.3)]"
                      : darkMode
                      ? "bg-white/5 text-white/80 hover:bg-white/10"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {skill}
                </button>
              ))}

              {member.skills.length > 3 && (
                <div className="relative group">
                  <span
                    className={`m-0.5 px-2 py-1 rounded-md text-xs cursor-pointer ${
                      darkMode
                        ? "bg-white/5 text-white/80"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    +{member.skills.length - 3}
                  </span>
                  <div
                    className={`absolute z-20 bottom-full left-0 mb-2 p-2 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out ${
                      darkMode
                        ? "bg-[#1E1E1E] border border-white/10"
                        : "bg-white border border-gray-100"
                    }`}
                    style={{ width: "180px" }}
                  >
                    <div className="flex flex-wrap gap-1">
                      {member.skills.slice(3).map((skill) => (
                        <button
                          key={`${member.id}-${skill}-tooltip`}
                          onClick={() => handleSkillToggle(skill)}
                          className={`px-2 py-1 rounded-md text-xs ${
                            selectedSkills.includes(skill)
                              ? "bg-[rgba(0,230,118,0.1)] text-[#00E676] border border-[rgba(0,230,118,0.3)]"
                              : darkMode
                              ? "bg-white/5 text-white/80 hover:bg-white/10"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal for detailed view */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className={`relative w-full max-w-3xl rounded-xl overflow-hidden ${
                darkMode ? "bg-[#1E1E1E]" : "bg-white"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 z-10 p-1 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-all"
                aria-label="Close modal"
              >
                <CloseIcon />
              </button>

              <div className="flex flex-col md:flex-row">
                {/* Left side - Image */}
                <div className="md:w-1/3 h-60 md:h-auto relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${member.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
                  </div>
                </div>

                {/* Right side - Content */}
                <div className="md:w-2/3 p-6 md:p-8">
                  <div className="mb-3">
                    <span
                      className={`inline-block px-2.5 py-1 text-xs font-medium rounded-md mb-2 ${
                        darkMode
                          ? "bg-white/10 text-white/80"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {member.department}
                    </span>
                  </div>

                  <h2
                    className={`text-2xl font-bold mb-1 ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {member.name}
                  </h2>

                  <p className="text-[#00E676] text-lg font-medium mb-4">
                    {member.role} • {member.experience}
                  </p>

                  <div
                    className={`mb-6 ${
                      darkMode ? "text-white/80" : "text-gray-600"
                    }`}
                  >
                    <p>{member.bio}</p>
                  </div>

                  <h3
                    className={`text-xl font-semibold mb-3 ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Skills & Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {member.skills.map((skill) => (
                      <span
                        key={`modal-${member.id}-${skill}`}
                        className={`px-3 py-1.5 rounded-md text-sm ${
                          darkMode
                            ? "bg-white/5 text-white/90"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Social links */}
                  {member.social && (
                    <>
                      <h3
                        className={`text-xl font-semibold mb-3 ${
                          darkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        Connect
                      </h3>
                      <div className="flex gap-3">
                        {member.social.linkedin && (
                          <a
                            href={member.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 rounded-md transition-colors ${
                              darkMode
                                ? "text-white/60 hover:text-[#0077B5] hover:bg-white/5"
                                : "text-gray-500 hover:text-[#0077B5] hover:bg-gray-100"
                            }`}
                            aria-label="LinkedIn Profile"
                          >
                            <LinkedInIcon />
                          </a>
                        )}
                        {member.social.github && (
                          <a
                            href={member.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 rounded-md transition-colors ${
                              darkMode
                                ? "text-white/60 hover:text-white hover:bg-white/5"
                                : "text-gray-500 hover:text-black hover:bg-gray-100"
                            }`}
                            aria-label="GitHub Profile"
                          >
                            <GitHubIcon />
                          </a>
                        )}
                        {member.social.twitter && (
                          <a
                            href={member.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 rounded-md transition-colors ${
                              darkMode
                                ? "text-white/60 hover:text-[#1DA1F2] hover:bg-white/5"
                                : "text-gray-500 hover:text-[#1DA1F2] hover:bg-gray-100"
                            }`}
                            aria-label="Twitter Profile"
                          >
                            <TwitterIcon />
                          </a>
                        )}
                        {member.social.email && (
                          <a
                            href={`mailto:${member.social.email}`}
                            className={`p-2 rounded-md transition-colors ${
                              darkMode
                                ? "text-white/60 hover:text-[#EA4335] hover:bg-white/5"
                                : "text-gray-500 hover:text-[#EA4335] hover:bg-gray-100"
                            }`}
                            aria-label="Email Contact"
                          >
                            <EmailIcon />
                          </a>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Loading skeleton for team members
const TeamMemberSkeleton = ({ darkMode }) => {
  return (
    <div
      className={`h-full flex flex-col rounded-lg overflow-hidden ${
        darkMode
          ? "bg-[#1E1E1E] border border-white/5"
          : "bg-white border border-gray-100 shadow-sm"
      }`}
    >
      <div className="h-[200px] bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse"></div>
      <div className="p-5 flex-grow">
        <div
          className={`h-5 w-2/3 mb-3 rounded ${
            darkMode ? "bg-gray-700" : "bg-gray-200"
          } animate-pulse`}
        ></div>
        <div
          className={`h-4 w-1/2 mb-4 rounded ${
            darkMode ? "bg-gray-700" : "bg-gray-200"
          } animate-pulse`}
        ></div>
        <div className="flex flex-wrap gap-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-7 w-16 rounded-md ${
                darkMode ? "bg-gray-700" : "bg-gray-200"
              } animate-pulse`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main component
const TeamMembersList = ({
  isLoading,
  displayedMembers,
  handleSkillToggle,
  selectedSkills,
  darkMode,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const renderPaginationItems = () => {
    const items = [];

    // Previous button
    items.push(
      <li key="prev">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`w-9 h-9 rounded-md mx-0.5 flex items-center justify-center transition-all ${
            currentPage === 1
              ? `opacity-50 cursor-not-allowed ${
                  darkMode ? "text-white/30" : "text-black/30"
                }`
              : `${
                  darkMode
                    ? "text-white/80 hover:text-white"
                    : "text-black/80 hover:text-black"
                } ${darkMode ? "hover:bg-white/5" : "hover:bg-black/5"}`
          }`}
          aria-label="Previous page"
        >
          <NavigateBeforeIcon fontSize="small" />
        </button>
      </li>
    );

    // First page
    items.push(
      <li key={1}>
        <button
          onClick={() => setCurrentPage(1)}
          className={`w-9 h-9 rounded-md mx-0.5 flex items-center justify-center transition-all ${
            currentPage === 1
              ? `${
                  darkMode
                    ? "bg-[#00E676] text-black"
                    : "bg-[#00E676] text-black"
                }`
              : `${
                  darkMode
                    ? "text-white hover:bg-white/10"
                    : "text-black hover:bg-black/5"
                }`
          }`}
          aria-label="Page 1"
        >
          1
        </button>
      </li>
    );

    // Ellipsis if needed before current
    if (currentPage > 3) {
      items.push(
        <li key="ellipsis1" className="mx-0.5 flex items-center justify-center">
          <MoreHorizIcon
            fontSize="small"
            className={darkMode ? "text-white/50" : "text-black/50"}
          />
        </li>
      );
    }

    // Pages around current
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i === 1 || i === totalPages) continue; // Skip first and last as they're always shown

      items.push(
        <li key={i}>
          <button
            onClick={() => setCurrentPage(i)}
            className={`w-9 h-9 rounded-md mx-0.5 flex items-center justify-center transition-all ${
              currentPage === i
                ? `${
                    darkMode
                      ? "bg-[#00E676] text-black"
                      : "bg-[#00E676] text-black"
                  }`
                : `${
                    darkMode
                      ? "text-white hover:bg-white/10"
                      : "text-black hover:bg-black/5"
                  }`
            }`}
            aria-label={`Page ${i}`}
          >
            {i}
          </button>
        </li>
      );
    }

    // Ellipsis if needed after current
    if (currentPage < totalPages - 2) {
      items.push(
        <li key="ellipsis2" className="mx-0.5 flex items-center justify-center">
          <MoreHorizIcon
            fontSize="small"
            className={darkMode ? "text-white/50" : "text-black/50"}
          />
        </li>
      );
    }

    // Last page
    if (totalPages > 1) {
      items.push(
        <li key={totalPages}>
          <button
            onClick={() => setCurrentPage(totalPages)}
            className={`w-9 h-9 rounded-md mx-0.5 flex items-center justify-center transition-all ${
              currentPage === totalPages
                ? `${
                    darkMode
                      ? "bg-[#00E676] text-black"
                      : "bg-[#00E676] text-black"
                  }`
                : `${
                    darkMode
                      ? "text-white hover:bg-white/10"
                      : "text-black hover:bg-black/5"
                  }`
            }`}
            aria-label={`Page ${totalPages}`}
          >
            {totalPages}
          </button>
        </li>
      );
    }

    // Next button
    items.push(
      <li key="next">
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`w-9 h-9 rounded-md mx-0.5 flex items-center justify-center transition-all ${
            currentPage === totalPages
              ? `opacity-50 cursor-not-allowed ${
                  darkMode ? "text-white/30" : "text-black/30"
                }`
              : `${
                  darkMode
                    ? "text-white/80 hover:text-white"
                    : "text-black/80 hover:text-black"
                } ${darkMode ? "hover:bg-white/5" : "hover:bg-black/5"}`
          }`}
          aria-label="Next page"
        >
          <NavigateNextIcon fontSize="small" />
        </button>
      </li>
    );

    return items;
  };

  return (
    <>
      {/* Team Members Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? Array.from(new Array(8)).map((_, index) => (
              <div key={index}>
                <TeamMemberSkeleton darkMode={darkMode} />
              </div>
            ))
          : displayedMembers.map((member, index) => (
              <div key={member.id}>
                <TeamMemberCard
                  member={member}
                  index={index}
                  handleSkillToggle={handleSkillToggle}
                  selectedSkills={selectedSkills}
                  darkMode={darkMode}
                />
              </div>
            ))}
      </div>

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <nav aria-label="Pagination" className="inline-flex">
            <ul className="flex list-none items-center">
              {renderPaginationItems()}
            </ul>
          </nav>
        </div>
      )}

      {/* No results state */}
      {!isLoading && displayedMembers.length === 0 && (
        <div
          className={`text-center py-16 ${
            darkMode ? "text-white/70" : "text-black/70"
          }`}
        >
          <svg
            className="mx-auto h-12 w-12 mb-4 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3
            className={`text-lg font-semibold mb-2 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            No results found
          </h3>
          <p className="text-sm max-w-md mx-auto mb-4">
            Try adjusting your filters to find team members
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#00E676] text-black rounded-md font-medium hover:bg-[#00C853] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </>
  );
};

export default TeamMembersList;
