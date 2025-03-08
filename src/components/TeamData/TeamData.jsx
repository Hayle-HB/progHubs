import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../features/theme/themeSlice";

const developers = [
  // Sample data for developers
  {
    id: 1,
    name: "Alice Johnson",
    role: "Frontend Developer",
    img: "path/to/image1.jpg",
    github: "#",
    linkedin: "#",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Backend Developer",
    img: "path/to/image2.jpg",
    github: "#",
    linkedin: "#",
  },
  // Add more developers as needed
];

const TeamData = () => {
  const darkMode = useSelector(selectDarkMode);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");

  const filteredDevelopers = developers.filter((dev) => {
    return (
      dev.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterRole ? dev.role === filterRole : true)
    );
  });

  return (
    <div
      className={`p-10 ${darkMode ? "bg-gray-900" : "bg-white"} text-${
        darkMode ? "white" : "black"
      }`}
    >
      <h1 className="text-4xl font-bold mb-6">Developer Team</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for a developer..."
          className="p-2 border rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border rounded mt-2 w-full"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="Mobile Developer">Mobile Developer</option>
          <option value="ML Developer">ML Developer</option>
          <option value="UI/UX Designer">UI/UX Designer</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDevelopers.map((dev) => (
          <div key={dev.id} className="border rounded-lg p-4 shadow-lg">
            <img
              src={dev.img}
              alt={dev.name}
              className="w-full h-32 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-2">{dev.name}</h2>
            <p className="text-gray-600">{dev.role}</p>
            <div className="flex space-x-2 mt-2">
              {dev.github && (
                <a href={dev.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              )}
              {dev.linkedin && (
                <a
                  href={dev.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamData;
