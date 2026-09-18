// ============================================================
// SINGLE SOURCE OF TRUTH — Skills
// ============================================================

export type ProficiencyLevel = "Learning" | "Familiar" | "Project Experience" | "Strong";

export interface Skill {
  name: string;
  proficiency: ProficiencyLevel;
  icon?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  description: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    label: "Programming Languages",
    description: "Core languages used across projects and studies.",
    skills: [
      { name: "Python", proficiency: "Strong" },
      { name: "JavaScript", proficiency: "Project Experience" },
      { name: "TypeScript", proficiency: "Familiar" },
      { name: "SQL", proficiency: "Project Experience" },
      { name: "C / C++", proficiency: "Familiar" },
      { name: "HTML & CSS", proficiency: "Project Experience" },
    ],
  },
  {
    id: "data-analytics",
    label: "Data Analytics",
    description: "Tools and libraries for exploratory analysis and business intelligence.",
    skills: [
      { name: "Pandas", proficiency: "Strong" },
      { name: "NumPy", proficiency: "Strong" },
      { name: "Matplotlib", proficiency: "Project Experience" },
      { name: "Seaborn", proficiency: "Project Experience" },
      { name: "Excel", proficiency: "Familiar" },
      { name: "Power BI", proficiency: "Familiar" },
      { name: "Plotly", proficiency: "Familiar" },
    ],
  },
  {
    id: "data-science",
    label: "Data Science",
    description: "Statistical and data science fundamentals applied in projects.",
    skills: [
      { name: "Statistics & Probability", proficiency: "Project Experience" },
      { name: "Exploratory Data Analysis", proficiency: "Strong" },
      { name: "Feature Engineering", proficiency: "Project Experience" },
      { name: "Data Preprocessing", proficiency: "Strong" },
      { name: "Data Visualization", proficiency: "Project Experience" },
      { name: "Hypothesis Testing", proficiency: "Familiar" },
    ],
  },
  {
    id: "machine-learning",
    label: "Machine Learning",
    description: "Classical ML algorithms applied in supervised and unsupervised learning.",
    skills: [
      { name: "Linear / Logistic Regression", proficiency: "Project Experience" },
      { name: "Decision Trees", proficiency: "Project Experience" },
      { name: "Random Forest", proficiency: "Project Experience" },
      { name: "Gradient Boosting / XGBoost", proficiency: "Project Experience" },
      { name: "Scikit-learn", proficiency: "Strong" },
      { name: "Model Evaluation & Metrics", proficiency: "Project Experience" },
      { name: "Cross Validation", proficiency: "Project Experience" },
      { name: "Clustering", proficiency: "Familiar" },
    ],
  },
  {
    id: "deep-learning",
    label: "Deep Learning",
    description: "Neural network architectures studied and applied in projects.",
    skills: [
      { name: "Neural Networks (ANN)", proficiency: "Project Experience" },
      { name: "Convolutional Neural Networks (CNN)", proficiency: "Project Experience" },
      { name: "Recurrent Neural Networks (RNN)", proficiency: "Familiar" },
      { name: "LSTM / GRU", proficiency: "Familiar" },
      { name: "TensorFlow / Keras", proficiency: "Project Experience" },
      { name: "PyTorch", proficiency: "Familiar" },
      { name: "Transfer Learning", proficiency: "Familiar" },
      { name: "OpenCV", proficiency: "Project Experience" },
    ],
  },
  {
    id: "generative-ai",
    label: "Generative AI",
    description: "Modern AI concepts and tools in the generative AI landscape.",
    skills: [
      { name: "Large Language Models (LLMs)", proficiency: "Familiar" },
      { name: "Prompt Engineering", proficiency: "Familiar" },
      { name: "RAG (Retrieval Augmented Generation)", proficiency: "Familiar" },
      { name: "Google Gemini API", proficiency: "Familiar" },
      { name: "OpenAI API", proficiency: "Familiar" },
      { name: "AI Agents", proficiency: "Learning" },
    ],
  },
  {
    id: "full-stack",
    label: "Full Stack Development",
    description: "Web technologies used in building full-stack applications.",
    skills: [
      { name: "React", proficiency: "Project Experience" },
      { name: "Next.js", proficiency: "Project Experience" },
      { name: "Node.js", proficiency: "Familiar" },
      { name: "REST APIs", proficiency: "Familiar" },
      { name: "Tailwind CSS", proficiency: "Project Experience" },
      { name: "Flask", proficiency: "Project Experience" },
      { name: "Supabase / PostgreSQL", proficiency: "Familiar" },
      { name: "Git & GitHub", proficiency: "Strong" },
    ],
  },
];

export const featuredSkills = [
  "Python", "Machine Learning", "Deep Learning", "Data Science",
  "React / Next.js", "SQL", "Scikit-learn", "TensorFlow",
];
