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
import InstagramIcon from "@mui/icons-material/Instagram";
import BookIcon from "@mui/icons-material/Book";

// Professional team member card component
const TeamMemberCard = ({
  member,
  index,
  handleSkillToggle,
  selectedSkills,
  darkMode,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [expandSkills, setExpandSkills] = useState(false);

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

            <p className="text-gray-400 text-sm font-medium mb-3">
              {member.role} • {member.experience}
            </p>

            {/* Skills with consistent styling */}
            <div className="flex flex-wrap gap-1">
              {(expandSkills ? member.skills : member.skills.slice(0, 3)).map(
                (skill) => (
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
                )
              )}

              {!expandSkills && member.skills.length > 3 && (
                <button
                  onClick={() => setExpandSkills(true)}
                  className={`m-0.5 px-2 py-1 rounded-md text-xs cursor-pointer ${
                    darkMode
                      ? "bg-white/5 text-white/80"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  +{member.skills.length - 3}
                </button>
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
                  <div className="flex flex-wrap gap-2 mb-4">
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

                  {/* Social links - Compact row below skills */}
                  {member.social && (
                    <div className="flex items-center space-x-2 mt-3">
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-full transition-colors relative group ${
                            darkMode
                              ? "text-white/70 hover:text-[#0077B5] hover:bg-white/5"
                              : "text-gray-500 hover:text-[#0077B5] hover:bg-gray-100"
                          }`}
                          aria-label="LinkedIn Profile"
                        >
                          <LinkedInIcon fontSize="small" />
                          <span
                            className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs font-medium rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-100 whitespace-nowrap ${
                              darkMode
                                ? "bg-gray-800 text-white shadow-lg"
                                : "bg-gray-700 text-white shadow-md"
                            }`}
                          >
                            LinkedIn
                          </span>
                        </a>
                      )}
                      {member.social.github && (
                        <a
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-full transition-colors relative group ${
                            darkMode
                              ? "text-white/70 hover:text-white hover:bg-white/5"
                              : "text-gray-500 hover:text-black hover:bg-gray-100"
                          }`}
                          aria-label="GitHub Profile"
                        >
                          <GitHubIcon fontSize="small" />
                          <span
                            className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs font-medium rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-100 whitespace-nowrap ${
                              darkMode
                                ? "bg-gray-800 text-white shadow-lg"
                                : "bg-gray-700 text-white shadow-md"
                            }`}
                          >
                            GitHub
                          </span>
                        </a>
                      )}
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-full transition-colors relative group ${
                            darkMode
                              ? "text-white/70 hover:text-[#1DA1F2] hover:bg-white/5"
                              : "text-gray-500 hover:text-[#1DA1F2] hover:bg-gray-100"
                          }`}
                          aria-label="Twitter Profile"
                        >
                          <TwitterIcon fontSize="small" />
                          <span
                            className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs font-medium rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-100 whitespace-nowrap ${
                              darkMode
                                ? "bg-gray-800 text-white shadow-lg"
                                : "bg-gray-700 text-white shadow-md"
                            }`}
                          >
                            Twitter
                          </span>
                        </a>
                      )}
                      {member.social.email && (
                        <a
                          href={`mailto:${member.social.email}`}
                          className={`p-2 rounded-full transition-colors relative group ${
                            darkMode
                              ? "text-white/70 hover:text-[#EA4335] hover:bg-white/5"
                              : "text-gray-500 hover:text-[#EA4335] hover:bg-gray-100"
                          }`}
                          aria-label="Email Contact"
                        >
                          <EmailIcon fontSize="small" />
                          <span
                            className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs font-medium rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-100 whitespace-nowrap ${
                              darkMode
                                ? "bg-gray-800 text-white shadow-lg"
                                : "bg-gray-700 text-white shadow-md"
                            }`}
                          >
                            Email
                          </span>
                        </a>
                      )}
                      {member.social.instagram && (
                        <a
                          href={member.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-full transition-colors relative group ${
                            darkMode
                              ? "text-white/70 hover:text-[#E1306C] hover:bg-white/5"
                              : "text-gray-500 hover:text-[#E1306C] hover:bg-gray-100"
                          }`}
                          aria-label="Instagram Profile"
                        >
                          <InstagramIcon fontSize="small" />
                          <span
                            className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs font-medium rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-100 whitespace-nowrap ${
                              darkMode
                                ? "bg-gray-800 text-white shadow-lg"
                                : "bg-gray-700 text-white shadow-md"
                            }`}
                          >
                            Instagram
                          </span>
                        </a>
                      )}
                      {member.social.medium && (
                        <a
                          href={member.social.medium}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-full transition-colors relative group ${
                            darkMode
                              ? "text-white/70 hover:text-white hover:bg-white/5"
                              : "text-gray-500 hover:text-black hover:bg-gray-100"
                          }`}
                          aria-label="Medium Profile"
                        >
                          <BookIcon fontSize="small" />
                          <span
                            className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs font-medium rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-100 whitespace-nowrap ${
                              darkMode
                                ? "bg-gray-800 text-white shadow-lg"
                                : "bg-gray-700 text-white shadow-md"
                            }`}
                          >
                            Medium
                          </span>
                        </a>
                      )}
                    </div>
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
  // Prevent default on pagination clicks
  const handlePageClick = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const renderPaginationItems = () => {
    const items = [];

    // Previous button
    items.push(
      <li key="prev">
        <button
          disabled={currentPage === 1}
          onClick={(e) => {
            e.preventDefault();
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
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

    // Generate page numbers
    const pageNumbers = [];

    // Always show first page
    pageNumbers.push(1);

    // Add middle pages with ellipsis if needed
    if (currentPage > 3) {
      pageNumbers.push(-1); // -1 represents ellipsis
    }

    // Pages around current
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (!pageNumbers.includes(i)) {
        pageNumbers.push(i);
      }
    }

    // Add ellipsis before last page if needed
    if (currentPage < totalPages - 2) {
      pageNumbers.push(-2); // -2 represents second ellipsis
    }

    // Always show last page if there is more than one page
    if (totalPages > 1 && !pageNumbers.includes(totalPages)) {
      pageNumbers.push(totalPages);
    }

    // Render the page buttons
    pageNumbers.forEach((pageNum) => {
      if (pageNum === -1 || pageNum === -2) {
        // Render ellipsis
        items.push(
          <li
            key={`ellipsis${pageNum}`}
            className="mx-0.5 flex items-center justify-center"
          >
            <MoreHorizIcon
              fontSize="small"
              className={darkMode ? "text-white/50" : "text-black/50"}
            />
          </li>
        );
      } else {
        // Render page number
        items.push(
          <li key={pageNum}>
            <button
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(pageNum);
              }}
              className={`w-9 h-9 rounded-md mx-0.5 flex items-center justify-center transition-all ${
                currentPage === pageNum
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
              aria-label={`Page ${pageNum}`}
            >
              {pageNum}
            </button>
          </li>
        );
      }
    });

    // Next button
    items.push(
      <li key="next">
        <button
          disabled={currentPage === totalPages}
          onClick={(e) => {
            e.preventDefault();
            if (currentPage < totalPages) {
              setCurrentPage(currentPage + 1);
            }
          }}
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
