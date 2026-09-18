// ============================================================
// SINGLE SOURCE OF TRUTH — Projects
// Based on real GitHub repositories: K208-K
// ============================================================

export type ProjectCategory =
  | "machine-learning"
  | "deep-learning"
  | "data-analytics"
  | "data-science"
  | "generative-ai"
  | "full-stack"
  | "python";

export type ProjectStatus = "Completed" | "In Progress" | "Planned";

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  description: string;
  longDescription?: string;
  featured: boolean;
  status: ProjectStatus;
  technologies: string[];
  // Optional technical fields
  problem?: string;
  objective?: string;
  dataset?: string;
  methodology?: string;
  model?: string;
  metrics?: Record<string, string>;
  results?: string;
  challenges?: string;
  learnings?: string;
  // Links
  githubUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
  // Media
  thumbnail?: string;
  images?: string[];
}

export const projects: Project[] = [
  {
    id: "heart-attack-prediction",
    slug: "heart-attack-prediction",
    title: "AI Heart Attack Prediction System",
    category: "machine-learning",
    categoryLabel: "Machine Learning",
    description:
      "A predictive system that uses Random Forest classification to predict heart attack risk based on clinical patient data, deployed with a React frontend and Flask backend.",
    longDescription:
      "Developed an end-to-end machine learning pipeline for heart attack risk prediction. The project includes data preprocessing, EDA, feature engineering, model training with Random Forest, and a full deployment with a Flask REST API and a React + Tailwind CSS frontend. Hosted on Vercel.",
    featured: true,
    status: "Completed",
    technologies: ["Python", "Scikit-learn", "Random Forest", "Flask", "React", "Tailwind CSS", "Pandas", "Matplotlib"],
    problem:
      "Cardiovascular disease is one of the leading causes of death globally. Early risk identification through patient data can enable preventive action.",
    objective:
      "Build a classification model that predicts whether a patient is at risk of a heart attack based on clinical features.",
    dataset:
      "Heart disease clinical dataset with features such as age, cholesterol, blood pressure, chest pain type, and ECG results.",
    methodology:
      "Data preprocessing → EDA → Feature selection → Random Forest classification → Model evaluation → Flask API → React frontend deployment.",
    model: "Random Forest Classifier (Scikit-learn)",
    metrics: {
      // [PLACEHOLDER] — Replace with real metrics from the model
      Accuracy: "[XX%]",
      Precision: "[XX%]",
      Recall: "[XX%]",
      F1Score: "[XX%]",
    },
    results:
      "[PLACEHOLDER — describe real model results and performance here]",
    challenges:
      "Handling class imbalance in the dataset and selecting the most predictive clinical features.",
    learnings:
      "End-to-end ML deployment, API design, React integration with Python backends, and clinical feature interpretation.",
    githubUrl: "https://github.com/K208-K/heart-attack-prediction",
    liveUrl: "https://heart-attack-prediction-woad.vercel.app",
    thumbnail: "/projects/heart-attack/thumbnail.jpg",
  },
  {
    id: "house-price-prediction",
    slug: "house-price-prediction",
    title: "House Price Prediction",
    category: "machine-learning",
    categoryLabel: "Machine Learning",
    description:
      "A regression-based machine learning system to predict house prices based on property features, deployed as a web application.",
    longDescription:
      "Built a complete regression pipeline for house price prediction. Performed extensive EDA, handled missing data, applied feature engineering, trained multiple regression models, and deployed the best-performing model with a web interface.",
    featured: true,
    status: "Completed",
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Flask", "React"],
    problem: "Real estate pricing is complex and subjective. A data-driven model can provide objective price estimates.",
    objective: "Predict property sale prices using supervised regression on historical data.",
    dataset:
      "Housing dataset with features such as square footage, number of rooms, location, age of property, and amenities.",
    methodology:
      "EDA → Data cleaning → Feature engineering → Regression modelling → Hyperparameter tuning → Deployment.",
    model: "Multiple regression models evaluated; best performer selected.",
    metrics: {
      // [PLACEHOLDER] — Replace with real metrics
      RMSE: "[X,XXX]",
      R2Score: "[0.XX]",
      MAE: "[X,XXX]",
    },
    results:
      "[PLACEHOLDER — describe real model results and performance here]",
    challenges: "Handling skewed distributions, outliers in price data, and multicollinearity between features.",
    learnings:
      "Regression fundamentals, feature engineering for real estate data, model comparison, and full-stack deployment.",
    githubUrl: "https://github.com/K208-K/house-price-prediction-ml",
    liveUrl: "https://house-price-prediction-ml.vercel.app",
    thumbnail: "/projects/house-price/thumbnail.jpg",
  },
  {
    id: "ocr-captcha",
    slug: "ocr-captcha",
    title: "OCR Model for Reading CAPTCHAs",
    category: "deep-learning",
    categoryLabel: "Deep Learning",
    description:
      "A deep learning OCR system using CNNs, RNNs, and CTC loss to automatically read and decode CAPTCHA images.",
    longDescription:
      "Implemented a complete OCR pipeline for CAPTCHA recognition using a combination of Convolutional Neural Networks for spatial feature extraction, Recurrent Neural Networks for sequential decoding, and CTC (Connectionist Temporal Classification) loss for alignment-free training.",
    featured: true,
    status: "Completed",
    technologies: ["Python", "TensorFlow", "Keras", "CNN", "RNN", "CTC Loss", "OpenCV", "NumPy"],
    problem:
      "CAPTCHAs are designed to prevent automated bots, but building an OCR model to read them demonstrates the power and limitations of modern deep learning perception.",
    objective:
      "Build a sequence recognition model that accurately reads variable-length CAPTCHA text from images.",
    methodology:
      "Image preprocessing → CNN feature extraction → RNN sequence modelling → CTC loss decoding → Evaluation.",
    model: "CNN + RNN hybrid with CTC loss (TensorFlow/Keras)",
    metrics: {
      // [PLACEHOLDER]
      CharacterAccuracy: "[XX%]",
      SequenceAccuracy: "[XX%]",
    },
    results:
      "[PLACEHOLDER — describe real model results and accuracy here]",
    challenges:
      "Variable-length output sequences, CTC loss alignment, and handling different CAPTCHA font styles.",
    learnings:
      "Sequence-to-sequence modelling, CTC loss mechanics, CNN+RNN architectures, and OCR pipeline design.",
    githubUrl: "https://github.com/K208-K/OCR-model-for-reading-Captchas",
    thumbnail: "/projects/ocr-captcha/thumbnail.jpg",
  },
  {
    id: "college-student-dashboard",
    slug: "college-student-dashboard",
    title: "College Student Utility Dashboard",
    category: "full-stack",
    categoryLabel: "Full Stack",
    description:
      "A full-stack utility dashboard designed for college students to manage academic resources, schedules, and productivity tools.",
    longDescription:
      "Designed and built a comprehensive student utility dashboard as a full-stack web application. The platform provides tools relevant to college students including schedule management, academic tracking, and resource organisation.",
    featured: false,
    status: "Completed",
    technologies: ["React", "JavaScript", "HTML", "CSS", "Node.js"],
    objective:
      "Create a centralised dashboard that helps college students manage their academic life more efficiently.",
    challenges: "Designing an intuitive UI that serves multiple use cases without becoming cluttered.",
    learnings:
      "Frontend component architecture, state management, responsive design, and user-centric design thinking.",
    githubUrl: "https://github.com/K208-K/college-student-utility-dashboard",
    thumbnail: "/projects/college-dashboard/thumbnail.jpg",
  },
  {
    id: "karrim-portfolio",
    slug: "karrim-portfolio",
    title: "Karrim AI Portfolio",
    category: "full-stack",
    categoryLabel: "Full Stack",
    description:
      "This portfolio website itself — a production-quality Next.js application with an AI assistant, interactive terminal, scroll-driven animation, and dynamic project system.",
    longDescription:
      "Built this portfolio as a real AI-powered web product. Features include a scroll-driven canvas animation with 151 frames, a Lenis-powered smooth scroll system, an AI assistant grounded in portfolio data, an interactive terminal, global search, project case studies, and full responsive design.",
    featured: true,
    status: "In Progress",
    technologies: [
      "Next.js", "TypeScript", "React", "Tailwind CSS",
      "Framer Motion", "Lenis", "Google Gemini API",
      "Canvas API", "RAG"
    ],
    objective:
      "Build a portfolio that doesn't just claim AI/ML skills — it demonstrates them through its own architecture.",
    githubUrl: "https://github.com/K208-K",
    thumbnail: "/projects/portfolio/thumbnail.jpg",
  },
  {
    id: "ai-interview-trainer",
    slug: "ai-interview-trainer",
    title: "AI Interview Trainer",
    category: "generative-ai",
    categoryLabel: "Generative AI",
    description:
      "An AI-powered interview preparation assistant that generates domain-specific questions, evaluates answers, and provides feedback using LLMs.",
    longDescription:
      "Planning an AI interview trainer that uses large language models to simulate technical and HR interviews. The system will generate adaptive questions based on the user's domain, evaluate responses, and give structured feedback.",
    featured: false,
    status: "In Progress",
    technologies: ["Python", "LLM", "RAG", "React", "Next.js", "Google Gemini", "Prompt Engineering"],
    objective:
      "Build an accessible, personalised AI interview preparation tool for CS/AI/ML students.",
    learnings: "LLM prompt engineering, RAG pipeline design, evaluation strategies for open-ended responses.",
    thumbnail: "/projects/ai-interview/thumbnail.jpg",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

export function getInProgressProjects() {
  return projects.filter((p) => p.status === "In Progress");
}

export function getProjectsByCategory(category: ProjectCategory) {
  return projects.filter((p) => p.category === category);
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug) ?? null;
}

export const categoryMeta: Record<ProjectCategory, { label: string; description: string }> = {
  "machine-learning": {
    label: "Machine Learning",
    description: "Classical ML projects covering regression, classification, and model evaluation.",
  },
  "deep-learning": {
    label: "Deep Learning",
    description: "Neural network projects including CNNs, RNNs, and sequence modelling.",
  },
  "data-analytics": {
    label: "Data Analytics",
    description: "Data exploration, dashboards, KPI tracking, and business insight generation.",
  },
  "data-science": {
    label: "Data Science",
    description: "End-to-end data science pipelines: EDA, feature engineering, and modelling.",
  },
  "generative-ai": {
    label: "Generative AI",
    description: "LLM-based applications, RAG systems, prompt engineering, and AI agents.",
  },
  "full-stack": {
    label: "Full Stack",
    description: "Web applications built with React, Next.js, Flask, and various databases.",
  },
  python: {
    label: "Python & Software",
    description: "Python automation, scripting, algorithms, and software projects.",
  },
};
