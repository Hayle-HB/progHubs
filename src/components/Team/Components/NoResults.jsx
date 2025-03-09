import React from "react";

const NoResults = ({ resetFilters, darkMode }) => {
  return (
    <div
      className={`text-center py-16 ${
        darkMode ? "text-white/70" : "text-black/70"
      }`}
    >
      <h2 className="text-xl font-medium mb-4">
        No developers match your search criteria
      </h2>
      <p className="text-base">Try adjusting your filters or search term</p>
      <button
        onClick={resetFilters}
        className="mt-6 px-4 py-2 border border-[#00E676] text-[#00E676] rounded hover:bg-[#00E676]/8 transition-colors"
      >
        Reset All Filters
      </button>
    </div>
  );
};

export default NoResults;
