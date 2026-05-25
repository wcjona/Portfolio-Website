export type Experience = {
  dateRange: string;
  role: string;
  company: string;
  companyHref?: string;
  location?: string;
  bullets: string[];
};

export const experiences: Experience[] = [
  {
    dateRange: "MAY 2023 - AUG 2024",
    role: "Software Development Engineer Intern",
    company: "Advanced Micro Devices (AMD)",
    companyHref: "https://www.amd.com",
    location: "Toronto, Ontario",
    bullets: [
      "Architected a centralized database consolidating data from critical internal tools and trained a model to automate failure classification at 93% accuracy (SQL, TensorFlow).",
      "Deployed a full-stack web platform to log test failures, analyze failure rates, predict build times, and surface software defects, eliminating dozens of hours of manual triage (Snowflake, SQL, React, Flask, Ansible).",
      "Engineered a front-end UI and back-end search engine that replaced a legacy workflow for 350+ engineers (SQL, Python, Flask, Axios, React, JavaScript, MUI).",
      "Leveraged LLMs with Retrieval-Augmented Generation (RAG) over Confluence and Jira APIs to automate ticket creation (Azure OpenAI, LangChain, Python).",
      "Established the CI/CD pipeline for 10+ CPU, GPU, and NPU products used by 350+ engineers (Linux, Buildbot, Python).",
      "Maintained and contributed to multiple repositories responsible for ASIC and firmware qualification, IP design verification, and benchmarking across 10+ GPU, CPU, and NPU programs.",
    ],
  },
  {
    dateRange: "JAN 2022 - DEC 2022",
    role: "Software Engineer Intern",
    company: "Garmin Ltd.",
    companyHref: "https://www.garmin.com",
    location: "Calgary, Alberta",
    bullets: [
      "Launched a Python module for transmitting and receiving low-level data with embedded devices, adopted by 50+ engineers and integrated as a core component across 6+ repositories.",
      "Automated Bluetooth Low Energy (BLE) protocol testing between sensors and consumer products using C++.",
      "Refactored a legacy test application to support modern Android/iOS devices and additional mobile apps with Selenium and pytest, raising automated test coverage 60%+.",
      "Applied Test-Driven Development to build a framework for controlling modern and legacy applications via REST APIs and Python.",
      "Built internal tooling (including a mobile app and log-retrieval script) that eliminated hours of repetitive work using Kotlin, Java, and Bash.",
    ],
  },
  {
    dateRange: "JAN 2021 - DEC 2021",
    role: "Software Developer",
    company: "Neocycle (Startup)",
    location: "Calgary, Alberta",
    bullets: [
      "Spearheaded a synthetic biology solution to recover rare earth elements from electronic waste, reducing environmental impact by 80% and costs by 30%.",
      "Designed a Random Forest model with nested cross-validation to predict kinetic rate constants for a target protein-ligand interaction at 95% accuracy.",
      "Engineered novel protein sequences that improved binding affinity by 25% using convolutional neural networks (CNNs) and additional ML techniques.",
      "Secured over $25,000 in startup funding through business and research competitions.",
    ],
  },
];

export type Honor = { title: string; meta?: string };

export const honors: Honor[] = [
  { title: "AMD Executive Spotlight Award", meta: "$1,500" },
  { title: "Society of Asian Scientists & Engineers Scholarship", meta: "$5,000" },
  { title: "Schulich School of Engineering Award", meta: "$6,000" },
  { title: "Jason Lang Scholarship", meta: "$4,000" },
  { title: "Schulich School of Engineering Dean's List", meta: "University of Calgary · 2019 - 2023" },
];
