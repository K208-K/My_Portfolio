// ============================================================
// SINGLE SOURCE OF TRUTH — Learning Journey
// ============================================================

export type LearningStatus = "Completed" | "In Progress" | "Next Goal";

export interface LearningItem {
  id: string;
  topic: string;
  area: string;
  status: LearningStatus;
  description: string;
  resources?: string[];
  completedDate?: string;
  startedDate?: string;
}

export const learningItems: LearningItem[] = [
  // ── Completed ────────────────────────────────────────────
  {
    id: "python-fundamentals",
    topic: "Python Programming",
    area: "Programming",
    status: "Completed",
    description: "Core Python: data structures, OOP, file handling, and standard libraries.",
  },
  {
    id: "data-analysis-pandas",
    topic: "Data Analysis with Pandas & NumPy",
    area: "Data Analytics",
    status: "Completed",
    description: "Data manipulation, aggregation, merging datasets, and vectorised operations.",
  },
  {
    id: "data-viz",
    topic: "Data Visualisation",
    area: "Data Analytics",
    status: "Completed",
    description: "Matplotlib, Seaborn — creating insightful charts and dashboards.",
  },
  {
    id: "sql-fundamentals",
    topic: "SQL & Database Fundamentals",
    area: "Data Analytics",
    status: "Completed",
    description: "SELECT, JOIN, aggregations, subqueries, and basic database design.",
  },
  {
    id: "classical-ml",
    topic: "Classical Machine Learning",
    area: "Machine Learning",
    status: "Completed",
    description:
      "Supervised learning: regression, classification, trees, ensembles. Scikit-learn pipelines and model evaluation.",
  },
  {
    id: "cnn-deep-learning",
    topic: "Convolutional Neural Networks (CNN)",
    area: "Deep Learning",
    status: "Completed",
    description: "CNN architecture, feature maps, pooling, image classification, and transfer learning.",
  },
  {
    id: "rnn-lstm",
    topic: "RNN / LSTM / GRU",
    area: "Deep Learning",
    status: "Completed",
    description: "Sequence modelling, LSTM gates, text and time-series applications.",
  },
  {
    id: "react-fundamentals",
    topic: "React & Next.js",
    area: "Full Stack",
    status: "Completed",
    description: "Components, hooks, routing, API routes, App Router, and server-side rendering.",
  },

  // ── In Progress ──────────────────────────────────────────
  {
    id: "generative-ai",
    topic: "Generative AI & LLMs",
    area: "Generative AI",
    status: "In Progress",
    description:
      "Large language models, prompt engineering, RAG systems, and building AI-powered applications.",
  },
  {
    id: "mlops",
    topic: "MLOps Fundamentals",
    area: "Machine Learning",
    status: "In Progress",
    description: "Model versioning, deployment pipelines, experiment tracking, and serving models in production.",
  },
  {
    id: "dsa",
    topic: "Data Structures & Algorithms",
    area: "Programming",
    status: "In Progress",
    description: "Arrays, linked lists, trees, graphs, sorting, searching, and dynamic programming for interview prep.",
  },

  // ── Next Goals ───────────────────────────────────────────
  {
    id: "transformers",
    topic: "Transformers & Attention Mechanisms",
    area: "Deep Learning",
    status: "Next Goal",
    description: "Self-attention, BERT, GPT architectures, and fine-tuning pre-trained models.",
  },
  {
    id: "computer-vision-adv",
    topic: "Advanced Computer Vision",
    area: "Deep Learning",
    status: "Next Goal",
    description: "Object detection (YOLO), image segmentation, and real-time vision systems.",
  },
  {
    id: "power-bi",
    topic: "Power BI & Business Analytics",
    area: "Data Analytics",
    status: "Next Goal",
    description: "Creating business dashboards, DAX, and connecting to live data sources.",
  },
  {
    id: "cloud-ai",
    topic: "Cloud AI Deployment",
    area: "Full Stack",
    status: "Next Goal",
    description: "Deploying ML models on AWS/GCP/Azure with scalable infrastructure.",
  },
];

export function getLearningByStatus(status: LearningStatus) {
  return learningItems.filter((item) => item.status === status);
}
