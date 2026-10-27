// Edit this file to update your portfolio content and links.
// Leave a link as an empty string until you have a real public URL for it.
export const profile = {
  name: "N S Abin Beni",
  initials: "NSAB",
  role: "Java Backend Developer",
  location: "Hyderabad, India",
  availability: "Open to backend engineering opportunities",
  intro:
    "I build and support backend systems, REST APIs, and cloud-connected applications. My experience spans application support, troubleshooting, Java/Spring Boot development, PostgreSQL, and AWS services.",
  github: "https://github.com/abinbeni2002",
  linkedin: "https://www.linkedin.com/in/n-s-abin-beni-2808571b9/",
  email: "abinbeni2002@gmail.com", // Add a public contact email if you want it shown.
  resumeUrl: "", // Add a public PDF URL, or place your resume in /public and set e.g. "/resume.pdf".
};

export const experience = [
  {
    company: "Tata Consultancy Services (TCS)",
    role: "Systems Engineer · Application Support",
    period: "2024 — Present",
    details: [
      "Support enterprise applications, investigate issues, and work through application incidents and defects.",
      "Use AWS CloudWatch and application logs to help troubleshoot and understand system behaviour.",
      "Work with Java, REST APIs, PostgreSQL, and AWS deployment services in a support-project environment.",
      "Trigger and monitor established CI/CD deployments; experience is operational rather than pipeline architecture ownership.",
    ],
  },
];

export const projects = [
  {
    number: "01",
    name: "FaceNest",
    type: "Full-stack application · Personal project",
    summary:
      "A profile-focused application with a React frontend and Spring Boot backend, including profile completion and multipart profile-picture upload.",
    highlights: ["React", "Spring Boot", "REST API", "Multipart upload"],
    status: "In development",
    repo: "", // Add the actual repository URL when it is public.
    live: "", // Add the deployed URL when available.
  },
  {
    number: "02",
    name: "ClearMind",
    type: "AI companion · Personal project",
    summary:
      "A mental-wellness companion prototype exploring conversational AI with a locally hosted model through Ollama and a Python API service.",
    highlights: ["Python", "FastAPI", "Ollama", "Qwen3"],
    status: "Prototype",
    repo: "", // Add the actual repository URL when it is public.
    live: "", // Add the deployed URL when available.
  },
];

export const skills = [
  {
    group: "Backend",
    items: ["Java 17", "Spring Boot", "REST APIs", "Python"],
  },
  {
    group: "Data",
    items: ["PostgreSQL", "SQL", "Data modelling fundamentals"],
  },
  {
    group: "AWS & delivery",
    items: [
      "CloudWatch",
      "ECS",
      "Lambda",
      "Fargate",
      "Step Functions",
      "CodePipeline",
      "CI/CD operations",
    ],
  },
  {
    group: "Frontend & tools",
    items: [
      "React",
      "Git",
      "GitHub",
      "Incident troubleshooting",
      "Log analysis",
    ],
  },
];
