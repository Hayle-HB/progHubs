import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  TextField,
  InputAdornment,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Button,
  Skeleton,
  Drawer,
  Divider,
  useTheme,
  useMediaQuery,
  Badge,
} from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../features/theme/themeSlice";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";

// Page layout components
const PageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  minHeight: "calc(100vh - 80px)",
  marginTop: "80px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    marginTop: "64px",
  },
}));

const FilterSidebar = styled(Box)(({ theme, darkMode }) => ({
  width: "320px",
  flexShrink: 0,
  padding: theme.spacing(4),
  borderRight: darkMode
    ? "1px solid rgba(255,255,255,0.05)"
    : "1px solid rgba(0,0,0,0.05)",
  position: "sticky",
  top: 80,
  height: "calc(100vh - 80px)",
  overflowY: "auto",
  background: darkMode ? "#121212" : "#F8F9FA",
  transition: "all 0.3s ease",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    position: "relative",
    height: "auto",
    top: 0,
    borderRight: "none",
    padding: theme.spacing(3),
  },
}));

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(3),
  },
}));

// Filter components
const FilterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const FilterTitle = styled(Typography)(({ theme, darkMode }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  color: darkMode ? "#ffffff" : "#333333",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const FilterChipsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

const ActiveFiltersContainer = styled(Box)(({ theme, darkMode }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  borderRadius: "10px",
  background: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
  border: darkMode
    ? "1px solid rgba(255,255,255,0.05)"
    : "1px solid rgba(0,0,0,0.05)",
}));

const MobileFilterButton = styled(Button)(
  ({ theme, darkMode, filtersActive }) => ({
    marginBottom: theme.spacing(2),
    backgroundColor: filtersActive
      ? "rgba(0,230,118,0.1)"
      : darkMode
      ? "rgba(255,255,255,0.05)"
      : "rgba(0,0,0,0.05)",
    color: filtersActive ? "#00E676" : darkMode ? "#ffffff" : "#333333",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1.5, 2),
    textTransform: "none",
    border: filtersActive ? "1px solid rgba(0,230,118,0.3)" : "none",
    "&:hover": {
      backgroundColor: filtersActive
        ? "rgba(0,230,118,0.15)"
        : darkMode
        ? "rgba(255,255,255,0.08)"
        : "rgba(0,0,0,0.08)",
    },
  })
);

// Team card components
const TeamGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const TeamMemberCard = styled(Card)(({ theme, darkMode }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  background: darkMode ? "#1E1E1E" : "#FFFFFF",
  boxShadow: darkMode
    ? "0 4px 20px rgba(0,0,0,0.5)"
    : "0 4px 20px rgba(0,0,0,0.08)",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: darkMode
      ? "0 10px 30px rgba(0,0,0,0.7)"
      : "0 10px 30px rgba(0,0,0,0.15)",
  },
  borderRadius: "12px",
  overflow: "hidden",
  border: darkMode ? "1px solid rgba(255,255,255,0.05)" : "none",
}));

const MemberImage = styled(CardMedia)(({ theme }) => ({
  height: 220,
  position: "relative",
  background: `linear-gradient(135deg, rgba(0,230,118,0.2), rgba(29,233,182,0.2))`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  [theme.breakpoints.down("sm")]: {
    height: 180,
  },
}));

const MemberInfo = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const MemberName = styled(Typography)(({ theme, darkMode }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(0.5),
  color: darkMode ? "#FFFFFF" : "#333333",
  fontSize: "1.1rem",
}));

const MemberRole = styled(Typography)(({ theme, darkMode }) => ({
  color: "#00E676",
  marginBottom: theme.spacing(1.5),
  fontWeight: 500,
  fontSize: "0.95rem",
}));

const SocialLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const SkillChip = styled(Chip)(({ theme, darkMode, selected }) => ({
  margin: theme.spacing(0.5),
  background: selected
    ? "rgba(0,230,118,0.2)"
    : darkMode
    ? "rgba(255,255,255,0.05)"
    : "rgba(0,0,0,0.05)",
  color: selected
    ? "#00E676"
    : darkMode
    ? "rgba(255,255,255,0.9)"
    : "rgba(0,0,0,0.8)",
  border: selected ? "1px solid rgba(0,230,118,0.3)" : "none",
  "&.MuiChip-clickable:hover": {
    background: selected
      ? "rgba(0,230,118,0.3)"
      : darkMode
      ? "rgba(255,255,255,0.1)"
      : "rgba(0,0,0,0.1)",
  },
}));

const StyledPagination = styled(Pagination)(({ theme, darkMode }) => ({
  marginTop: theme.spacing(6),
  display: "flex",
  justifyContent: "center",
  "& .MuiPaginationItem-root": {
    color: darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
  },
  "& .MuiPaginationItem-page.Mui-selected": {
    background: "rgba(0,230,118,0.2)",
    color: darkMode ? "#00E676" : "#007F3D",
  },
}));

// Main component
const Team = () => {
  const darkMode = useSelector(selectDarkMode);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  // State
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [experience, setExperience] = useState("all");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const ITEMS_PER_PAGE = 12;

  // Sample data for filters
  const allDepartments = [
    "all",
    "Frontend",
    "Backend",
    "DevOps",
    "Mobile",
    "AI/ML",
    "QA",
    "Design",
    "Product",
  ];
  const allExperience = [
    "all",
    "Junior",
    "Mid-Level",
    "Senior",
    "Lead",
    "Architect",
  ];
  const allSkills = [
    "JavaScript",
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "Java",
    "AWS",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "GraphQL",
    "MongoDB",
    "SQL",
    "Swift",
    "Kotlin",
    "Flutter",
    "TensorFlow",
    "Go",
    "Ruby",
    "C#",
    ".NET",
    "Vue.js",
    "Angular",
    "PHP",
    "Laravel",
    "Django",
    "Spring Boot",
    "Android",
    "iOS",
    "Azure",
  ];

  // Generate sample team members
  useEffect(() => {
    const generateTeamMembers = () => {
      setIsLoading(true);

      const members = [];
      const names = [
        "Alex Johnson",
        "Sam Rivera",
        "Jordan Lee",
        "Taylor Chen",
        "Morgan Smith",
        "Casey Wong",
        "Riley Patel",
        "Jamie Garcia",
        "Avery Martinez",
        "Quinn Nguyen",
        "Dakota Kim",
        "Reese Thompson",
        "Jordan Wilson",
        "Skyler Brown",
        "Hayden Davis",
        // Add more diverse names to reach 160+ developers
        "Raj Patel",
        "Wei Chen",
        "Aisha Khan",
        "Carlos Rodriguez",
        "Fatima Ahmed",
        "Hiroshi Tanaka",
        "Elena Popova",
        "Ahmed Hassan",
        "Sofia Costa",
        "Kwame Osei",
        "Maria Gonzalez",
        "Li Wei",
        "Olga Ivanova",
        "Jamal Washington",
        "Nina Patel",
        "Juan Fernandez",
        "Yuki Tanaka",
        "Priya Sharma",
        "Mohammed Al-Farsi",
        "Zara Khan",
        "Dmitri Ivanov",
        "Amara Okafor",
        "Cheng Wei",
        "Isabella Rossi",
        "Abdul Rahman",
        "Fatou Diallo",
        "Ravi Patel",
        "Mei Lin",
        "Valentina Lopez",
        "Omar Abdullah",
      ];

      const roles = [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "DevOps Engineer",
        "Mobile Developer",
        "UI/UX Designer",
        "Data Scientist",
        "ML Engineer",
        "QA Engineer",
        "Product Manager",
        "Solutions Architect",
        "Systems Engineer",
        "Cloud Specialist",
      ];

      const experiences = [
        "Junior",
        "Mid-Level",
        "Senior",
        "Lead",
        "Architect",
      ];

      const bios = [
        "Passionate about creating beautiful, intuitive interfaces with modern web technologies.",
        "Specialized in building scalable backend systems and RESTful APIs.",
        "Experienced in full-stack development with a focus on performance optimization.",
        "Loves containerization, CI/CD pipelines, and infrastructure automation.",
        "Mobile app wizard turning ideas into elegant native applications.",
        "Bringing user-centered design principles to every project.",
        "Extracting meaningful insights from data and building predictive models.",
        "Building intelligent systems that learn and adapt to user needs.",
        "Ensuring software quality through comprehensive testing strategies.",
        "Driving product vision and roadmap with a focus on user value.",
      ];

      // Generate 160+ developers
      for (let i = 1; i <= 160; i++) {
        const nameIndex = Math.floor(Math.random() * names.length);
        const name = names[nameIndex];

        const roleIndex = Math.floor(Math.random() * roles.length);
        const role = roles[roleIndex];

        const expIndex = Math.floor(Math.random() * experiences.length);
        const experience = experiences[expIndex];

        const bioIndex = Math.floor(Math.random() * bios.length);
        const bio = bios[bioIndex];

        // Assign department based on role
        let department = "Frontend";
        if (role.includes("Backend")) department = "Backend";
        else if (role.includes("Full Stack"))
          department = Math.random() > 0.5 ? "Frontend" : "Backend";
        else if (role.includes("DevOps")) department = "DevOps";
        else if (role.includes("Mobile")) department = "Mobile";
        else if (role.includes("Data") || role.includes("ML"))
          department = "AI/ML";
        else if (role.includes("QA")) department = "QA";
        else if (role.includes("Design") || role.includes("UI/UX"))
          department = "Design";
        else if (role.includes("Product")) department = "Product";

        // Assign 3-6 skills based on department
        const skills = [];
        const numSkills = 3 + Math.floor(Math.random() * 4); // 3-6 skills

        let departmentSkills = [];

        switch (department) {
          case "Frontend":
            departmentSkills = [
              "JavaScript",
              "TypeScript",
              "React",
              "Vue.js",
              "Angular",
              "HTML",
              "CSS",
              "Redux",
              "Next.js",
            ];
            break;
          case "Backend":
            departmentSkills = [
              "Node.js",
              "Python",
              "Java",
              "Go",
              "Ruby",
              "PHP",
              "C#",
              "SQL",
              "MongoDB",
              "GraphQL",
            ];
            break;
          case "DevOps":
            departmentSkills = [
              "AWS",
              "Docker",
              "Kubernetes",
              "CI/CD",
              "Terraform",
              "Ansible",
              "Linux",
              "Jenkins",
              "Git",
            ];
            break;
          case "Mobile":
            departmentSkills = [
              "Swift",
              "Kotlin",
              "Flutter",
              "React Native",
              "Android",
              "iOS",
              "Mobile Testing",
            ];
            break;
          case "AI/ML":
            departmentSkills = [
              "Python",
              "TensorFlow",
              "PyTorch",
              "Data Analysis",
              "Statistics",
              "Big Data",
              "NLP",
            ];
            break;
          case "QA":
            departmentSkills = [
              "Selenium",
              "Jest",
              "Testing",
              "QA Automation",
              "Cypress",
              "JUnit",
              "Test Planning",
            ];
            break;
          case "Design":
            departmentSkills = [
              "Figma",
              "Sketch",
              "Adobe XD",
              "UI Design",
              "UX Research",
              "Wireframing",
              "Prototyping",
            ];
            break;
          case "Product":
            departmentSkills = [
              "Product Strategy",
              "Agile",
              "Scrum",
              "User Research",
              "Roadmapping",
              "Analytics",
            ];
            break;
          default:
            departmentSkills = allSkills;
        }

        // Add unique skills
        while (skills.length < numSkills) {
          const skillIndex = Math.floor(
            Math.random() * departmentSkills.length
          );
          const skill = departmentSkills[skillIndex];

          if (!skills.includes(skill)) {
            skills.push(skill);
          }
        }

        members.push({
          id: i,
          name,
          role,
          department,
          experience,
          bio,
          skills,
          image: `https://i.pravatar.cc/300?img=${(i % 70) + 1}`, // Using pravatar for demo images
        });
      }

      setTimeout(() => {
        setTeamMembers(members);
        setIsLoading(false);
      }, 1500); // Simulate loading delay
    };

    generateTeamMembers();
  }, []);

  // Filter team members
  const filteredMembers = teamMembers.filter((member) => {
    // Filter by search
    const searchMatch =
      !search ||
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.role.toLowerCase().includes(search.toLowerCase()) ||
      member.skills.some((skill) =>
        skill.toLowerCase().includes(search.toLowerCase())
      );

    // Filter by department
    const departmentMatch =
      department === "all" || member.department === department;

    // Filter by experience
    const experienceMatch =
      experience === "all" || member.experience === experience;

    // Filter by skills
    const skillsMatch =
      selectedSkills.length === 0 ||
      selectedSkills.every((skill) => member.skills.includes(skill));

    return searchMatch && departmentMatch && experienceMatch && skillsMatch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedMembers = filteredMembers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Handle skill toggle
  const handleSkillToggle = (skill) => {
    setSelectedSkills((prev) => {
      if (prev.includes(skill)) {
        return prev.filter((s) => s !== skill);
      } else {
        return [...prev, skill];
      }
    });
    setCurrentPage(1);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearch("");
    setDepartment("all");
    setExperience("all");
    setSelectedSkills([]);
    setCurrentPage(1);
  };

  // Check if any filters are active
  const hasActiveFilters =
    search ||
    department !== "all" ||
    experience !== "all" ||
    selectedSkills.length > 0;

  // Mobile filter drawer
  const filterDrawer = (
    <Box sx={{ width: isMediumScreen ? "100%" : 320, p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Filters
        </Typography>
        {isMediumScreen && (
          <IconButton onClick={() => setMobileFiltersOpen(false)}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <Divider sx={{ mb: 3 }} />

      <FilterSection>
        <FilterTitle variant="subtitle1" darkMode={darkMode}>
          <SearchIcon fontSize="small" /> Search
        </FilterTitle>
        <TextField
          fullWidth
          placeholder="Search developers..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" color="action" />
              </InputAdornment>
            ),
            endAdornment: search && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearch("")}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              borderRadius: "8px",
            },
          }}
        />
      </FilterSection>

      <FilterSection>
        <FilterTitle variant="subtitle1" darkMode={darkMode}>
          Department
        </FilterTitle>
        <FormControl fullWidth size="small">
          <Select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setCurrentPage(1);
            }}
            displayEmpty
            sx={{ borderRadius: "8px" }}
          >
            {allDepartments.map((dept) => (
              <MenuItem key={dept} value={dept}>
                {dept === "all" ? "All Departments" : dept}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FilterSection>

      <FilterSection>
        <FilterTitle variant="subtitle1" darkMode={darkMode}>
          Experience Level
        </FilterTitle>
        <FormControl fullWidth size="small">
          <Select
            value={experience}
            onChange={(e) => {
              setExperience(e.target.value);
              setCurrentPage(1);
            }}
            displayEmpty
            sx={{ borderRadius: "8px" }}
          >
            {allExperience.map((exp) => (
              <MenuItem key={exp} value={exp}>
                {exp === "all" ? "All Experience Levels" : exp}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FilterSection>

      <FilterSection>
        <FilterTitle variant="subtitle1" darkMode={darkMode}>
          Skills
        </FilterTitle>
        <FilterChipsContainer>
          {allSkills.map((skill) => (
            <SkillChip
              key={skill}
              label={skill}
              darkMode={darkMode}
              selected={selectedSkills.includes(skill)}
              onClick={() => handleSkillToggle(skill)}
              size="small"
              clickable
            />
          ))}
        </FilterChipsContainer>
      </FilterSection>

      {hasActiveFilters && (
        <Button
          fullWidth
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={resetFilters}
          sx={{
            mt: 2,
            borderColor: "#00E676",
            color: "#00E676",
            borderRadius: "8px",
            "&:hover": {
              borderColor: "#00E676",
              backgroundColor: "rgba(0,230,118,0.08)",
            },
          }}
        >
          Reset All Filters
        </Button>
      )}
    </Box>
  );

  return (
    <PageContainer>
      {/* Filter sidebar - desktop */}
      {!isMediumScreen && (
        <FilterSidebar darkMode={darkMode}>{filterDrawer}</FilterSidebar>
      )}

      {/* Main content area */}
      <MainContent>
        {/* Header section */}
        <Box sx={{ mb: 5 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h4"
              component="h1"
              fontWeight={700}
              sx={{
                mb: 1,
                background: "linear-gradient(45deg, #00E676, #1DE9B6)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Our Developer Team
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
                maxWidth: "800px",
              }}
            >
              Meet our diverse team of 160+ talented developers passionate about
              creating cutting-edge software solutions across various
              technologies and domains.
            </Typography>
          </motion.div>
        </Box>

        {/* Mobile filters button */}
        {isMediumScreen && (
          <MobileFilterButton
            fullWidth
            darkMode={darkMode}
            filtersActive={hasActiveFilters}
            onClick={() => setMobileFiltersOpen(true)}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FilterListIcon sx={{ mr: 1 }} />
              Filters
            </Box>
            {hasActiveFilters && (
              <Badge
                badgeContent={
                  (search ? 1 : 0) +
                  (department !== "all" ? 1 : 0) +
                  (experience !== "all" ? 1 : 0) +
                  selectedSkills.length
                }
                color="primary"
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#00E676",
                    color: "#fff",
                  },
                }}
              />
            )}
          </MobileFilterButton>
        )}

        {/* Active filters chips */}
        {hasActiveFilters && (
          <ActiveFiltersContainer darkMode={darkMode}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography variant="body2" fontWeight={500}>
                Active Filters
              </Typography>
              <Button
                size="small"
                onClick={resetFilters}
                startIcon={<RefreshIcon fontSize="small" />}
                sx={{
                  color: "#00E676",
                  textTransform: "none",
                  p: 0,
                  minWidth: "auto",
                }}
              >
                Reset All
              </Button>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {search && (
                <Chip
                  label={`Search: ${search}`}
                  onDelete={() => setSearch("")}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(0,230,118,0.1)",
                    color: darkMode ? "#00E676" : "#007F3D",
                    border: "1px solid rgba(0,230,118,0.2)",
                  }}
                />
              )}
              {department !== "all" && (
                <Chip
                  label={`Department: ${department}`}
                  onDelete={() => setDepartment("all")}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(0,230,118,0.1)",
                    color: darkMode ? "#00E676" : "#007F3D",
                    border: "1px solid rgba(0,230,118,0.2)",
                  }}
                />
              )}
              {experience !== "all" && (
                <Chip
                  label={`Experience: ${experience}`}
                  onDelete={() => setExperience("all")}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(0,230,118,0.1)",
                    color: darkMode ? "#00E676" : "#007F3D",
                    border: "1px solid rgba(0,230,118,0.2)",
                  }}
                />
              )}
              {selectedSkills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  onDelete={() => handleSkillToggle(skill)}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(0,230,118,0.1)",
                    color: darkMode ? "#00E676" : "#007F3D",
                    border: "1px solid rgba(0,230,118,0.2)",
                  }}
                />
              ))}
            </Box>
          </ActiveFiltersContainer>
        )}

        {/* Results count */}
        <Typography
          variant="body2"
          sx={{
            mb: 2,
            color: darkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
            fontStyle: "italic",
          }}
        >
          Showing {filteredMembers.length} developers out of{" "}
          {teamMembers.length}
        </Typography>

        {/* Team members grid */}
        <TeamGrid container spacing={3}>
          {isLoading
            ? Array.from(new Array(12)).map((_, index) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                  <Card sx={{ height: "100%", borderRadius: "12px" }}>
                    <Skeleton variant="rectangular" height={220} />
                    <CardContent>
                      <Skeleton variant="text" height={28} width="80%" />
                      <Skeleton variant="text" height={24} width="50%" />
                      <Skeleton variant="text" height={60} />
                      <Box sx={{ mt: 1, display: "flex", gap: 0.5 }}>
                        <Skeleton
                          variant="rectangular"
                          height={32}
                          width={60}
                        />
                        <Skeleton
                          variant="rectangular"
                          height={32}
                          width={80}
                        />
                        <Skeleton
                          variant="rectangular"
                          height={32}
                          width={70}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : displayedMembers.map((member, index) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={member.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    style={{ height: "100%" }}
                  >
                    <TeamMemberCard darkMode={darkMode}>
                      <MemberImage image={member.image} title={member.name} />
                      <MemberInfo>
                        <MemberName variant="h6" darkMode={darkMode}>
                          {member.name}
                        </MemberName>
                        <MemberRole variant="subtitle1" darkMode={darkMode}>
                          {member.role} • {member.experience}
                        </MemberRole>
                        <Typography
                          variant="body2"
                          sx={{
                            color: darkMode
                              ? "rgba(255,255,255,0.7)"
                              : "rgba(0,0,0,0.7)",
                            mb: 2,
                            minHeight: "60px",
                          }}
                        >
                          {member.bio}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 0.5,
                            mb: 2,
                          }}
                        >
                          {member.skills.slice(0, 3).map((skill) => (
                            <SkillChip
                              key={`${member.id}-${skill}`}
                              label={skill}
                              size="small"
                              darkMode={darkMode}
                              selected={selectedSkills.includes(skill)}
                              onClick={() => handleSkillToggle(skill)}
                              clickable
                            />
                          ))}
                          {member.skills.length > 3 && (
                            <Chip
                              label={`+${member.skills.length - 3}`}
                              size="small"
                              sx={{
                                background: darkMode
                                  ? "rgba(255,255,255,0.1)"
                                  : "rgba(0,0,0,0.05)",
                                color: darkMode
                                  ? "rgba(255,255,255,0.8)"
                                  : "rgba(0,0,0,0.7)",
                              }}
                            />
                          )}
                        </Box>
                        <SocialLinks>
                          <IconButton
                            size="small"
                            aria-label="linkedin"
                            sx={{
                              color: darkMode
                                ? "rgba(255,255,255,0.7)"
                                : "rgba(0,0,0,0.7)",
                              "&:hover": { color: "#0077B5" },
                            }}
                          >
                            <LinkedInIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            aria-label="github"
                            sx={{
                              color: darkMode
                                ? "rgba(255,255,255,0.7)"
                                : "rgba(0,0,0,0.7)",
                              "&:hover": {
                                color: darkMode ? "#FFFFFF" : "#333333",
                              },
                            }}
                          >
                            <GitHubIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            aria-label="twitter"
                            sx={{
                              color: darkMode
                                ? "rgba(255,255,255,0.7)"
                                : "rgba(0,0,0,0.7)",
                              "&:hover": { color: "#1DA1F2" },
                            }}
                          >
                            <TwitterIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            aria-label="email"
                            sx={{
                              color: darkMode
                                ? "rgba(255,255,255,0.7)"
                                : "rgba(0,0,0,0.7)",
                              "&:hover": { color: "#00E676" },
                            }}
                          >
                            <EmailIcon fontSize="small" />
                          </IconButton>
                        </SocialLinks>
                      </MemberInfo>
                    </TeamMemberCard>
                  </motion.div>
                </Grid>
              ))}
        </TeamGrid>

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <StyledPagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            color="primary"
            size={isMobile ? "small" : "medium"}
            darkMode={darkMode}
          />
        )}

        {/* No results message */}
        {!isLoading && displayedMembers.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              color: darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              No developers match your search criteria
            </Typography>
            <Typography variant="body1">
              Try adjusting your filters or search term
            </Typography>
            <Button
              variant="outlined"
              onClick={resetFilters}
              sx={{
                mt: 3,
                borderColor: "#00E676",
                color: "#00E676",
                "&:hover": {
                  borderColor: "#00E676",
                  backgroundColor: "rgba(0,230,118,0.08)",
                },
              }}
            >
              Reset All Filters
            </Button>
          </Box>
        )}
      </MainContent>

      {/* Mobile filters drawer */}
      {isMediumScreen && (
        <Drawer
          anchor="left"
          open={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: "80%", // Reduced width
              maxWidth: "300px", // Smaller max width
              background: darkMode ? "#121212" : "#F8F9FA",
              height: "auto", // Adjust height automatically
              maxHeight: "90vh", // Prevent full screen height
              overflowY: "auto", // Enable scrolling if needed
              padding: "16px", // Add some padding
              borderRadius: "0 8px 8px 0", // Rounded corners on right side
              transition: "transform 0.3s ease-in-out", // Smooth animation
              transform: mobileFiltersOpen ? "translateX(0)" : "translateX(-100%)" // Slide animation
            },
          }}
        >
          <Box sx={{ 
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2
          }}>
            <Typography variant="h6">Filters</Typography>
            <IconButton onClick={() => setMobileFiltersOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          {filterDrawer}
        </Drawer>
      )}
    </PageContainer>
  );
};

export default Team;
