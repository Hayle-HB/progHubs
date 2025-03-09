// Data and utility functions for the Team component

// Filter data
export const filterData = {
  allDepartments: [
    "all",
    "Frontend",
    "Backend",
    "DevOps",
    "Mobile",
    "AI/ML",
    "QA",
    "Design",
    "Product",
  ],
  allExperience: ["all", "Junior", "Mid-Level", "Senior", "Lead", "Architect"],
  allSkills: [
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
  ],
};

// Generate team members data
export const generateTeamMembers = () => {
  return new Promise((resolve) => {
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
      "Cloud Engineer",
      "Security Engineer",
      "Database Administrator",
      "Network Engineer",
      "Technical Lead",
      "Engineering Manager",
      "Site Reliability Engineer",
      "Software Architect",
    ];

    const departments = [
      "Frontend",
      "Backend",
      "DevOps",
      "Mobile",
      "AI/ML",
      "QA",
      "Design",
      "Product",
    ];

    const experiences = ["Junior", "Mid-Level", "Senior", "Lead", "Architect"];

    const skillsByDepartment = {
      Frontend: [
        "JavaScript",
        "TypeScript",
        "React",
        "Vue.js",
        "Angular",
        "HTML/CSS",
        "Redux",
        "Webpack",
        "GraphQL",
        "Jest",
      ],
      Backend: [
        "Node.js",
        "Python",
        "Java",
        "C#",
        "Go",
        "Ruby",
        "PHP",
        "SQL",
        "MongoDB",
        "GraphQL",
        "Express",
        "Django",
        "Spring Boot",
        "Laravel",
        ".NET",
      ],
      DevOps: [
        "AWS",
        "Azure",
        "GCP",
        "Docker",
        "Kubernetes",
        "Terraform",
        "Jenkins",
        "CI/CD",
        "Linux",
      ],
      Mobile: [
        "React Native",
        "Swift",
        "Kotlin",
        "Flutter",
        "Android",
        "iOS",
        "Xamarin",
        "Firebase",
        "Ionic",
      ],
      "AI/ML": [
        "Python",
        "TensorFlow",
        "PyTorch",
        "Scikit-learn",
        "NLP",
        "Computer Vision",
        "Pandas",
        "NumPy",
        "Data Visualization",
        "Jupyter",
      ],
      QA: [
        "Selenium",
        "Cypress",
        "Jest",
        "Mocha",
        "Chai",
        "JUnit",
        "TestNG",
        "Appium",
        "API Testing",
        "Manual Testing",
        "Automation",
      ],
      Design: [
        "Figma",
        "Adobe XD",
        "Sketch",
        "InVision",
        "UI Design",
        "UX Research",
        "Wireframing",
        "Prototyping",
        "Design Systems",
      ],
      Product: [
        "Agile",
        "Scrum",
        "Jira",
        "Product Strategy",
        "User Stories",
        "Requirements Gathering",
        "Roadmapping",
        "Stakeholder Management",
      ],
    };

    const bioTemplates = [
      "Passionate {experience} {role} with a focus on {skill1} and {skill2}. Love solving complex problems and building scalable solutions.",
      "Innovative {role} with {experience}-level expertise in {skill1}, {skill2}, and {skill3}. Committed to writing clean, maintainable code.",
      "{experience} {role} specializing in {skill1} and {skill2}. Enjoys collaborating with cross-functional teams to deliver high-quality products.",
      "Detail-oriented {role} with {experience} experience. Expert in {skill1}, {skill2}, and {skill3}. Advocate for best practices and continuous learning.",
      "Creative {experience} {role} focused on {skill1} development. Passionate about building intuitive user experiences and optimized systems.",
      "{experience} {role} with strong background in {skill1} and {skill2}. Dedicated to creating robust, efficient, and scalable applications.",
    ];

    // Generate 160+ developers
    for (let i = 0; i < 165; i++) {
      // Select random attributes
      const name = names[Math.floor(Math.random() * names.length)];
      const department =
        departments[Math.floor(Math.random() * departments.length)];
      const experience =
        experiences[Math.floor(Math.random() * experiences.length)];

      // Select appropriate role based on department
      let role;
      if (department === "Frontend") {
        role = roles[0]; // Frontend Developer
      } else if (department === "Backend") {
        role = roles[1]; // Backend Developer
      } else if (department === "DevOps") {
        role = roles[3]; // DevOps Engineer
      } else if (department === "Mobile") {
        role = roles[4]; // Mobile Developer
      } else if (department === "AI/ML") {
        role = roles[7]; // ML Engineer
      } else if (department === "QA") {
        role = roles[8]; // QA Engineer
      } else if (department === "Design") {
        role = roles[5]; // UI/UX Designer
      } else if (department === "Product") {
        role = roles[9]; // Product Manager
      } else {
        role = roles[Math.floor(Math.random() * roles.length)];
      }

      // Get skills based on department
      const departmentSkills = skillsByDepartment[department];
      // Randomly select 3-5 skills
      const numSkills = Math.floor(Math.random() * 3) + 3; // 3-5 skills
      const skills = [];

      for (let j = 0; j < numSkills; j++) {
        const skill =
          departmentSkills[Math.floor(Math.random() * departmentSkills.length)];
        if (!skills.includes(skill)) {
          skills.push(skill);
        }
      }

      // Generate bio
      const bioTemplate =
        bioTemplates[Math.floor(Math.random() * bioTemplates.length)];
      const bio = bioTemplate
        .replace("{experience}", experience)
        .replace("{role}", role)
        .replace("{skill1}", skills[0] || "JavaScript")
        .replace("{skill2}", skills[1] || "React")
        .replace("{skill3}", skills[2] || "Node.js");

      // Generate a placeholder image URL
      const imageId = Math.floor(Math.random() * 1000);
      const imageUrl = `https://randomuser.me/api/portraits/${
        Math.random() > 0.5 ? "men" : "women"
      }/${imageId % 100}.jpg`;

      // Generate random social media profiles - ensure all users have all networks
      const social = {
        linkedin: `https://linkedin.com/in/${name
          .toLowerCase()
          .replace(" ", "-")}${Math.floor(Math.random() * 100)}`,
        github: `https://github.com/${name
          .split(" ")[0]
          .toLowerCase()}${Math.floor(Math.random() * 1000)}`,
        twitter: `https://twitter.com/${name
          .split(" ")[0]
          .toLowerCase()}${Math.floor(Math.random() * 100)}`,
        email: `${name.toLowerCase().replace(" ", ".")}@example.com`,
        // Add additional platforms consistently for all users
        instagram: `https://instagram.com/${name
          .split(" ")[0]
          .toLowerCase()}${Math.floor(Math.random() * 100)}`,
        medium: `https://medium.com/@${name
          .toLowerCase()
          .replace(" ", ".")}${Math.floor(Math.random() * 100)}`,
      };

      members.push({
        id: i + 1,
        name,
        role,
        department,
        experience,
        skills,
        bio,
        image: imageUrl,
        social,
      });
    }

    // Simulate API delay
    setTimeout(() => {
      resolve(members);
    }, 800);
  });
};

// Helper utility to get available skills for filtering
export const getUniqueSkills = (members) => {
  const skillsSet = new Set();
  members.forEach((member) => {
    member.skills.forEach((skill) => skillsSet.add(skill));
  });
  return Array.from(skillsSet).sort();
};

// Sort utility for team members
export const sortMembers = (members, sortBy) => {
  switch (sortBy) {
    case "nameAsc":
      return [...members].sort((a, b) => a.name.localeCompare(b.name));
    case "nameDesc":
      return [...members].sort((a, b) => b.name.localeCompare(a.name));
    case "experienceAsc":
      const expOrder = {
        Junior: 1,
        "Mid-Level": 2,
        Senior: 3,
        Lead: 4,
        Architect: 5,
      };
      return [...members].sort(
        (a, b) => expOrder[a.experience] - expOrder[b.experience]
      );
    case "experienceDesc":
      const expOrderDesc = {
        Junior: 5,
        "Mid-Level": 4,
        Senior: 3,
        Lead: 2,
        Architect: 1,
      };
      return [...members].sort(
        (a, b) => expOrderDesc[a.experience] - expOrderDesc[b.experience]
      );
    default:
      return members;
  }
};
