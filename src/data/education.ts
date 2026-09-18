// ============================================================
// SINGLE SOURCE OF TRUTH — Education & Academic Journey
// ============================================================

export interface AcademicMilestone {
  id: string;
  level: string;
  institution: string;
  board?: string;
  degree?: string;
  field?: string;
  startYear: number;
  endYear: number | "Present";
  // [PLACEHOLDER] fields — fill with real data
  grade?: string;
  percentage?: string;
  cgpa?: string;
  subjects?: string[];
  achievements?: string[];
  description?: string;
}

export const education: AcademicMilestone[] = [
  {
    id: "class-10",
    level: "Secondary School (Class 10)",
    institution: "SHANTI MISSION ACADEMY SAHARSHA",
    board: "[CBSE]",
    startYear: 2020,
    endYear: 2021,
    // [PLACEHOLDER] — Replace with real marks
    percentage: "[75%]",
    subjects: ["Mathematics", "Science", "English", "Social Science", "Hindi"],
    description: "Completed secondary education with a strong foundation in Mathematics and Science.",
  },
  {
    id: "class-12",
    level: "Senior Secondary (Class 12)",
    institution: "SHANTI MISSION ACADEMY SAHARSHA",
    board: "[CBSE]",
    startYear: 2021,
    endYear: 2023,
    // [PLACEHOLDER] — Replace with real marks
    percentage: "[70%]",
    subjects: ["Physics", "Chemistry", "Mathematics", "Computer Science", "English"],
    description:
      "Completed higher secondary with PCM stream. Developed strong interest in Computer Science.",
  },
  {
    id: "btech",
    level: "B.Tech — Computer Science & Engineering",
    institution: "Quantum University",
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering (AI/ML Specialization)",
    startYear: 2023,
    endYear: "Present",
    // [PLACEHOLDER] — Replace with real CGPA when available
    cgpa: "[8.45 / 10.0]",
    subjects: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Machine Learning",
      "Deep Learning",
      "Artificial Intelligence",
      "Computer Vision",
      "Natural Language Processing",
      "Software Engineering",
      "Web Development",
      "Statistics & Probability",
    ],
    achievements: [
      // [PLACEHOLDER] — Add real achievements when available
    ],
    description:
      "Pursuing B.Tech with specialization in Artificial Intelligence and Machine Learning at Quantum University, Roorkee. Focused on practical AI/ML applications, data science, and software development.",
  },
];

export type Education = typeof education;
