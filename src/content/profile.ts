/**
 * Single source of truth for every word on the site.
 * Edit here; every section reads from this file.
 */

export const profile = {
  name: "Abinash Sinha",
  firstName: "Abinash",
  lastName: "Sinha",
  currentTitle: "Senior Data Scientist",
  location: "Irving, TX",
  availability: "Open to Principal Data Scientist roles",

  // The only place the email appears. Set emailIsPlaceholder to true to
  // hide every email affordance on the site without touching components.
  email: "as4research@gmail.com",
  emailIsPlaceholder: false as boolean,

  github: "https://github.com/abis330",
  githubHandle: "abis330",
  linkedin: "https://www.linkedin.com/in/abis330",
  linkedinHandle: "abis330",
  resumeHref: "/abinash-sinha-resume.pdf",

  tagline: "Anomaly detection at petabyte scale.",
  intro:
    "I turn raw telemetry from hundreds of thousands of distributed network elements into real-time detection, autonomous triage, and risk signal that operations teams act on.",
  summary:
    "Eight years building production data science across telecom, banking, and retail — most of it on the messy end of the pipeline, where the data is streaming, unlabeled, and enormous. Currently architecting real-time anomaly detection over petabyte-scale telco telemetry at Verizon, alongside an MS in Information Technology and Cybersecurity.",
} as const;

/** Headline figures. Ordered by how much they'd matter to a hiring panel. */
export const metrics = [
  {
    value: "8+",
    unit: "yrs",
    label: "Production data science",
    detail: "Telecom, banking, retail — shipped, monitored, and governed.",
  },
  {
    value: "PB",
    unit: "scale",
    label: "Telemetry under model",
    detail: "Petabyte-scale network telemetry processed on Spark and BigQuery.",
  },
  {
    value: "100K",
    unit: "+",
    label: "Network elements monitored",
    detail: "Distributed telco elements scored for anomalies in near real time.",
  },
  {
    value: "~50",
    unit: "%",
    label: "Faster issue detection",
    detail: "Time-to-detect cut roughly in half against the prior baseline.",
  },
] as const;

/** What I actually do, framed as capability areas rather than job titles. */
export const pillars = [
  {
    id: "telemetry",
    icon: "activity",
    title: "Telemetry-Scale Anomaly Detection",
    body: "Real-time detection over petabyte streams from 100K+ distributed network elements. Time-series modeling, drift-aware thresholds, and the distributed compute to run it continuously rather than in a notebook.",
    tags: ["ARIMA+", "PatchTST", "Spark", "BigQuery", "Dataproc", "GCS"],
  },
  {
    id: "agentic",
    icon: "bot",
    title: "Agentic AI & LLM Systems",
    body: "Autonomous triage agents that isolate, flag, and resolve micro-severe outages across complex distributed systems — built with the evaluation and observability layer that makes them trustworthy in production.",
    tags: ["Gemini", "LangChain", "LangFuse", "Galileo", "Claude Code"],
  },
  {
    id: "governance",
    icon: "shield",
    title: "Model Risk & Governance",
    body: "Model risk documentation and automated statistical monitoring aligned to the Federal Reserve Board's SR 11-7 framework, plus explainability that holds up in front of non-technical auditors.",
    tags: ["SR 11-7", "Shapley / XAI", "KS & Chi-squared", "Evidently", "Optuna"],
  },
  {
    id: "retrieval",
    icon: "search",
    title: "Search & Representation Learning",
    body: "Embedding pipelines and hybrid retrieval evaluated the honest way — with a design-of-experiments framework proving relevance gains are statistically significant, not noise.",
    tags: ["BM25", "ELSER", "ViT", "CLIP", "BERT", "NDCG@10"],
  },
] as const;

export type Role = {
  company: string;
  client?: string;
  title: string;
  location: string;
  start: string;
  end: string;
  period: string;
  current?: boolean;
  summary: string;
  highlights: { text: string; metric?: string }[];
  tags: string[];
};

export const experience: Role[] = [
  {
    company: "Infinite Computer Solutions",
    client: "Verizon",
    title: "Senior Data Scientist",
    location: "Irving, TX",
    start: "Feb 2025",
    end: "Present",
    period: "Feb 2025 — Present",
    current: true,
    summary:
      "Own the detection layer for a petabyte-scale telco telemetry estate — from wrangling raw network data to the agentic systems that triage what the models flag.",
    highlights: [
      {
        text: "Architected and deployed an end-to-end data wrangling and ML pipeline for real-time anomaly detection across 100Ks of distributed telco network elements on petabyte-scale telemetry.",
        metric: "~50% faster detection · ~70% hit rate on impaired sites",
      },
      {
        text: "Engineered an agentic AI triaging system using frontier LLMs to autonomously isolate, flag, and resolve micro-severe operational outages across complex distributed systems.",
      },
      {
        text: "Designed data-driven, risk-aware network change management, converting raw system and performance metadata into actionable risk mitigation across interconnected network elements.",
        metric: "Reduced network outage rate",
      },
      {
        text: "Applied XGBoost modeling to surface and textually explain extremities in radio access network energy consumption, feeding executive decision-making.",
      },
    ],
    tags: ["ARIMA+", "XGBoost", "Gemini", "BigQuery", "Dataproc", "Spark", "GCS"],
  },
  {
    company: "Experis US LLC",
    client: "Bank of America",
    title: "Data Scientist",
    location: "Plano, TX",
    start: "Aug 2023",
    end: "Feb 2025",
    period: "Aug 2023 — Feb 2025",
    summary:
      "Built NLP systems for regulatory audit workflows, then built the governance and explainability scaffolding that let them pass model risk review.",
    highlights: [
      {
        text: "Pioneered an automated text manipulation and metadata extraction pipeline using Transformer architectures to ingest and categorize 10Ks of complex regulatory audit requests.",
        metric: "~70% reduction in document processing lead time",
      },
      {
        text: "Authored model risk development documentation and engineered ongoing automated statistical monitoring to hold strict alignment with the Federal Reserve Board's SR 11-7 framework.",
      },
      {
        text: "Developed an end-to-end explainable AI framework using Shapley values to interpret NLP predictions, giving internal auditors clear, evidence-based transparency.",
      },
      {
        text: "Formulated a Design of Experiments framework to validate statistically significant gains in hybrid search relevance.",
        metric: "NDCG@10 and Hit Rate@10 via BM25 + ELSER",
      },
    ],
    tags: ["Transformers", "SR 11-7", "Shapley", "Optuna", "Evidently", "BM25", "ELSER"],
  },
  {
    company: "CGI",
    title: "Senior Data Scientist",
    location: "Dallas, TX",
    start: "Aug 2022",
    end: "May 2023",
    period: "Aug 2022 — May 2023",
    summary:
      "Led a cross-functional group building production ML inference backends, while shipping a large-scale NLP pipeline of my own.",
    highlights: [
      {
        text: "Led and mentored a cross-functional team of 10 subject matter experts and 2 junior ML engineers to build, test, and scale production-grade ML inference backends on cloud infrastructure.",
        metric: "12 people guided",
      },
      {
        text: "Developed a large-scale BERT-based text manipulation and topic modeling pipeline extracting structural patterns from 100Ks of unstructured corporate survey texts.",
        metric: "~60% decrease in processing lead time",
      },
    ],
    tags: ["BERT", "Topic Modeling", "Team Leadership", "Cloud ML"],
  },
  {
    company: "Michaels Stores",
    title: "Data Scientist II — Search",
    location: "Irving, TX",
    start: "Oct 2021",
    end: "Aug 2022",
    period: "Oct 2021 — Aug 2022",
    summary:
      "Multimodal retrieval work on a distributed search stack — embeddings, vision-language evaluation, and query understanding.",
    highlights: [
      {
        text: "Pioneered a large-scale multimodal data extraction pipeline on Dataproc, Cloud Run, Airflow, and Spark, generating deep embeddings for product imagery to drive search relevance.",
        metric: "1M+ product images embedded",
      },
      {
        text: "Built and productionized a vision-language proof-of-concept using Vision Transformers and CLIP to evaluate image-to-text similarity, directly improving data quality and content understanding.",
      },
      {
        text: "Enhanced core algorithmic query understanding within a distributed search architecture, improving pipeline throughput and reducing system latency.",
        metric: "~2% latency reduction",
      },
    ],
    tags: ["ViT", "CLIP", "Airflow", "Spark", "Cloud Run", "Dataproc"],
  },
  {
    company: "ICICI Bank",
    title: "Senior Software Engineer",
    location: "India",
    start: "Mar 2018",
    end: "Jul 2018",
    period: "Mar 2018 — Jul 2018",
    summary: "Backend engineering for national-scale real-time payments infrastructure.",
    highlights: [
      {
        text: "Contributed to design and development of the application backend serving Unified Payment Interface (UPI) transactions.",
      },
    ],
    tags: ["Java", "UPI", "Backend"],
  },
  {
    company: "Oracle Corporation",
    title: "Applications Developer II — Banking",
    location: "India",
    start: "Aug 2015",
    end: "Mar 2018",
    period: "Aug 2015 — Mar 2018",
    summary:
      "Led feature development on Oracle Banking Platform's overdraft line-of-credit billing, from ETL through UAT.",
    highlights: [
      {
        text: "Led 4 junior developers building the flagship overdraft line-of-credit billing feature in Oracle Banking Platform.",
      },
      {
        text: "Formulated the ETL framework for interest-rate change functionality.",
        metric: "~7% shorter batch processing",
      },
      {
        text: "Developed the MVP fee reassessment capability serving loan, checking, savings, and term customers, and supported the initial UAT.",
        metric: "~6M bank accounts served at a Tier 1 US bank",
      },
    ],
    tags: ["Java", "ETL", "Oracle Banking Platform", "Mentorship"],
  },
];

export const research = [
  {
    title: "Time-Series Network Intrusion Detection",
    venue: "New England College — MS Capstone",
    period: "2024 — 2026",
    body: "Self-supervised intrusion detection over network flow data, treating intrusion as a sequence-modeling problem rather than a per-packet classification one. Built on the UNSW-NB15 benchmark and raw NetFlow.",
    tags: ["Self-Supervision", "S3Rec", "PatchTST", "UNSW-NB15", "NetFlow"],
    results: [],
  },
  {
    title: "MOOCRec",
    subtitle: "Mutual Information Maximization Self-Supervision for Topic Recommendation",
    venue: "University of Minnesota — MS Plan B Project",
    period: "Defended Dec 2023",
    body: "Applied mutual-information-maximizing self-supervision to topic recommendation in massive open online courses, evaluated on the MOOCCube dataset against a non-self-supervised baseline.",
    tags: ["Self-Supervision", "Recommender Systems", "MOOCCube"],
    results: [
      { label: "NDCG@5", value: "~65%", note: "vs. baseline without self-supervision" },
      { label: "Hit Rate@5", value: "~54%", note: "vs. baseline without self-supervision" },
    ],
  },
] as const;

export const skillGroups = [
  {
    label: "Languages & AI",
    items: [
      "Python",
      "PyTorch",
      "LangChain",
      "LangFuse",
      "Gemini",
      "Claude Code",
      "Java",
      "SQL",
      "Bash",
    ],
  },
  {
    label: "Data & Compute",
    items: ["Spark", "Airflow", "BigQuery", "Dataproc", "GCS", "Cloud Run", "GCP", "Spanner Graph"],
  },
  {
    label: "Stores & Retrieval",
    items: ["Elasticsearch", "Redis", "MongoDB", "BM25", "ELSER"],
  },
  {
    label: "Quality & Observability",
    items: ["Databuck", "Galileo", "Evidently", "Optuna", "Docker", "Git"],
  },
] as const;

export const education = [
  {
    school: "New England College",
    abbr: "NEC",
    degree: "M.S. Information Technology and Cybersecurity (Executive)",
    period: "Sep 2024 — Apr 2026",
    detail: "GPA 3.97 / 4.00",
    note: "Capstone: self-supervised time-series network intrusion detection on UNSW-NB15 and NetFlow.",
  },
  {
    school: "University of Minnesota, Twin Cities",
    abbr: "UMN",
    degree: "M.S. Computer Science",
    period: "Sep 2018 — Sep 2021",
    detail: "Research & Teaching Assistant",
    note: "Plan B Project (defended Dec 2023): MOOCRec — mutual information maximization self-supervision.",
  },
  {
    school: "Indian Institute of Technology, Kharagpur",
    abbr: "IIT KGP",
    degree: "B.Tech (Honors), Instrumentation Engineering",
    period: "Jul 2011 — Jun 2015",
    detail: "",
    note: "",
  },
] as const;

export const navItems = [
  { label: "Focus", href: "#focus" },
  { label: "Experience", href: "#experience" },
  { label: "Research", href: "#research" },
  { label: "Stack", href: "#stack" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#terminal" },
] as const;