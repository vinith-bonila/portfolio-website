/**
 * ─────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR ALL SITE CONTENT
 *  Edit copy, links, projects, skills, and timeline here.
 *  No component needs to be touched to change text.
 * ─────────────────────────────────────────────────────────────
 */

export type NavItem = { id: string; label: string }

export const nav: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export const site = {
  name: 'Vinith Bonila',
  role: 'Data & AI/ML Engineer',
  resumeUrl: '/resume.pdf',
}

export const socials = {
  github: 'https://github.com/vinith-bonila',
  linkedin: 'https://linkedin.com/in/vinith-bonila-1510bv',
  email: 'bonilavinith@gmail.com',
  phone: '+91 7396878717',
}

export const hero = {
  name: 'Vinith Bonila',
  /** Availability pill shown above the name. */
  status: 'Open to opportunities',
  /** Rotating typewriter roles */
  roles: [
    'Data & AI/ML Engineer',
    'Data Analyst',
    'Business Analyst',
    'Python Developer',
    'PMO / Project Management',
    'Petroleum Engineer',
  ],
  tagline: 'Builds and deploys AI/ML systems end to end.',
  sub: 'Python developer and Petroleum Engineering graduate building and deploying end-to-end AI/ML applications. Two live LLM apps backed by FastAPI, Docker, automated tests, and CI — plus upstream oil & gas domain experience from ONGC.',
  location: 'Visakhapatnam, India · open to relocation',
  ctas: {
    primary: { label: 'View Projects', target: 'projects' },
    secondary: { label: 'Download Resume', href: '/resume.pdf' },
  },
  /** Role-tailored resumes offered from the Download Resume dropdown. */
  resumes: [
    { label: 'AI / Data Science', href: '/resume-ai-data-science.pdf' },
    { label: 'Data Analyst', href: '/resume-data-analyst.pdf' },
  ] as { label: string; href: string }[],
}

/** The horizontal "system profile" proof strip beneath the hero content. */
export const systemProfile = {
  title: 'System Profile',
  live: true,
  stats: [
    { label: 'Live Apps', value: '3', icon: 'server', accent: true, live: true },
    { label: 'Projects', value: '6+', icon: 'folder' },
    { label: 'Technologies', value: '15+', icon: 'cpu' },
    {
      label: 'Status',
      value: 'Open to Opportunities',
      icon: 'activity',
      accent: true,
    },
  ] as {
    label: string
    value: string
    icon: string
    accent?: boolean
    live?: boolean
  }[],
}

/** Interactive skill/section nodes orbiting the hero data core. */
export const heroNodes: {
  label: string
  icon: string
  target: string
}[] = [
  { label: 'Python', icon: 'code', target: 'skills' },
  { label: 'AI / ML', icon: 'brain', target: 'skills' },
  { label: 'SQL', icon: 'database', target: 'skills' },
  { label: 'Power BI', icon: 'barChart', target: 'skills' },
  { label: 'Analytics', icon: 'lineChart', target: 'skills' },
  { label: 'Projects', icon: 'box', target: 'projects' },
  { label: 'Skills', icon: 'layers', target: 'skills' },
]

export type Metric = {
  label: string
  /** Numeric value used for the count-up animation */
  value: number
  /** Digits after the decimal point */
  decimals?: number
  /** Rendered before the number, e.g. "~" */
  prefix?: string
  /** Rendered after the number, e.g. "ms", "+", "×" */
  suffix?: string
}

export type RepoLink = { label: string; url: string }

export type Project = {
  id: string
  title: string
  subtitle: string
  year: string
  live?: string
  livePlaceholder?: boolean
  /** Single source repo. */
  repo?: string
  /** Multiple labelled source repos (takes precedence over `repo`). */
  repos?: RepoLink[]
  stack: string[]
  summary: string
  details: string[]
  metrics?: Metric[]
  /** Two short at-a-glance stats shown on the project card. */
  highlights?: string[]
  /** Ordered architecture/pipeline nodes; renders an interactive flow strip. */
  architecture?: string[]
  /**
   * Screenshot file names in /public/images/. The first is the card cover;
   * all are shown in the modal gallery. Missing files fall back gracefully.
   */
  images?: string[]
}

export const projects: Project[] = [
  {
    id: 'docmind',
    title: 'DocMind',
    subtitle: 'AI Document Assistant (RAG)',
    year: '2026',
    live: 'https://docmind-x.streamlit.app',
    repo: 'https://github.com/vinith-bonila',
    stack: [
      'Python',
      'FastAPI',
      'Streamlit',
      'FAISS',
      'BM25',
      'Groq LLM',
      'Docker',
      'GitHub Actions',
    ],
    summary:
      'Production-grade RAG assistant answering questions over any uploaded PDF/DOCX/TXT with grounded, page-cited, streaming responses.',
    details: [
      'Served via FastAPI, containerized with Docker, hardened with 24 automated tests and GitHub Actions CI',
      'Hybrid dense (FAISS) + sparse (BM25) retrieval fused via Reciprocal Rank Fusion with cross-encoder reranking',
      'Evaluation harness using LLM-as-judge',
    ],
    metrics: [
      { label: 'recall@5', value: 1.0, decimals: 2 },
      { label: 'MRR', value: 0.96, decimals: 2 },
      { label: 'Faithfulness', value: 0.78, decimals: 2 },
      { label: 'Answer Relevance', value: 0.82, decimals: 2 },
    ],
    highlights: ['Recall@5 1.00', 'MRR 0.96'],
    architecture: [
      'PDF / DOCX / TXT',
      'Ingestion & chunking',
      'FAISS + BM25 retrieval',
      'RRF fusion',
      'Cross-encoder reranking',
      'Groq LLM',
      'Grounded answer + page citations',
    ],
    images: ['docmind.png'],
  },
  {
    id: 'autobi',
    title: 'AutoBI',
    subtitle: 'Automated Business Intelligence Platform',
    year: '2026',
    live: 'https://autobi-frontend-41it.onrender.com/',
    stack: [
      'Python',
      'FastAPI',
      'Pandas',
      'DuckDB',
      'PostgreSQL',
      'Next.js',
    ],
    summary:
      'Turns raw CSV/TSV uploads into interactive dashboards — automating data profiling, cleaning, KPI discovery, and chart recommendation end to end.',
    details: [
      'Built an analytics platform that converts raw CSV/TSV uploads into interactive dashboards, automating data profiling, cleaning, KPI discovery and chart recommendation through a FastAPI and Pandas/DuckDB pipeline.',
      'Shipped dashboards with dynamic filters, daily-to-yearly time aggregation, saved views, shareable links and PDF/Excel/CSV export, backed by PostgreSQL persistence and 241 automated backend tests; deployed on Render.',
    ],
    metrics: [
      { label: 'Backend tests', value: 241 },
      { label: 'Pipeline stages', value: 4 },
      { label: 'Export formats', value: 3 },
    ],
    highlights: ['241 backend tests', 'CSV → live dashboard'],
    architecture: [
      'CSV / TSV upload',
      'Profile & type detection',
      'Clean — auditable, non-destructive',
      'Analyse — trends, correlations, anomalies',
      'KPI & chart selection',
      'Interactive dashboard',
      'Export — PDF / Excel / CSV',
    ],
    images: ['autobi-dashboard.png', 'autobi-landing.png', 'autobi-analysis.png'],
  },
  {
    id: 'vini-ai',
    title: 'VINI AI',
    subtitle: 'NLP-First Voice Assistant',
    year: '2026',
    live: 'https://vini-ai-powered-nlp-voice-assistant.streamlit.app/',
    stack: [
      'Python',
      'Streamlit',
      'spaCy',
      'Whisper',
      'sentence-transformers',
      'SQLite',
      'Groq API',
    ],
    summary:
      'Voice assistant that resolves intent through semantic similarity instead of brittle keyword matching.',
    details: [
      'Sentence-transformer embeddings with TF-IDF and fuzzy fallbacks across a 19-intent catalog',
      'Modular NLU pipeline: spaCy NER with intent-aware slot extraction, dependency parsing, sentiment, language detection',
      'Live web-search RAG on Groq Llama-3.3-70B, Whisper speech-to-text + TTS loop, SQLite persistence, 15+ skill handler router',
    ],
    metrics: [
      { label: 'Classification latency', value: 20, prefix: '~', suffix: 'ms' },
      { label: 'Intents', value: 19 },
      { label: 'Skill handlers', value: 15, suffix: '+' },
    ],
    highlights: ['~15–20ms', '19 intents'],
    architecture: [
      'Voice / text input',
      'Whisper STT',
      'spaCy NER + slots',
      'Semantic intent match',
      'Skill handler router',
      'Groq Llama-3.3-70B',
      'TTS response + SQLite log',
    ],
    images: ['vini.png'],
  },
  {
    id: 'namma-yatri',
    title: 'Namma Yatri Trip Analytics',
    subtitle: 'BI & Data Analytics',
    year: '2024',
    repo: 'https://github.com/vinith-bonila/Namma-Yatri',
    stack: ['Python', 'SQL', 'Power BI', 'DAX', 'Excel'],
    summary:
      'Analytics over multi-table ride-hailing data, surfacing demand, conversion, and peak-period patterns across Bengaluru assemblies.',
    details: [
      'Performed EDA with SQL and Python on multi-table ride datasets, cleaning and joining raw records to surface demand, conversion, and peak-period patterns',
      'Built an interactive Power BI trip dashboard — completed trips, searches, estimates, quotes, driver earnings, and conversion rate — with DAX measures, geo drill-through, and assembly-level filters',
    ],
    highlights: ['Power BI', 'SQL + Python'],
    images: ['namma-yatri-1.jpg', 'namma-yatri-2.jpg'],
  },
  {
    id: 'zomato',
    title: 'Zomato Sales & User Analytics',
    subtitle: 'BI & Data Analytics',
    year: '2024',
    repo: 'https://github.com/vinith-bonila/Zomato-Cuisine-Popularity-Top-Orders',
    stack: ['Python', 'SQL', 'Power BI', 'DAX', 'Excel'],
    summary:
      'Restaurant-order analytics surfacing sales, ratings, cuisine popularity, and city- and user-level performance across India.',
    details: [
      'Performed EDA with SQL and Python on restaurant-order datasets, cleaning and joining raw records to surface sales, rating, and cuisine-popularity patterns',
      'Built a multi-page Power BI report — sales overview, user performance, and city performance — with DAX measures, KPI cards, search, and drill-through filters for data-driven decisions',
    ],
    highlights: ['Power BI', 'DAX'],
    images: ['zomato-1.jpg', 'zomato-2.jpg', 'zomato-3.jpg'],
  },
  {
    id: 'eor-co2',
    title: 'Enhanced Oil Recovery & CO₂ Sequestration Simulation',
    subtitle: 'Reservoir Simulation · CCUS',
    year: '2026',
    stack: ['CMG GEM', 'WinProp'],
    summary:
      '3D compositional reservoir modeling of long-term CO₂ storage in deep saline aquifers for safe geological sequestration.',
    details: [
      '3D compositional reservoir model simulating long-term CO₂ storage in deep saline aquifers; evaluated residual and solubility trapping for safe geological storage (CCUS)',
      'Compositional fluid modeling in WinProp on CO₂-brine interactions to characterize phase behaviour and solubility across reservoir pressure and temperature conditions',
    ],
    highlights: ['3D reservoir model', 'CO₂ storage'],
  },
]

export type SkillCategory = { name: string; skills: string[] }

export const skills: SkillCategory[] = [
  { name: 'Programming', skills: ['Python', 'SQL', 'C'] },
  {
    name: 'AI/ML & NLP',
    skills: [
      'RAG',
      'LLMs',
      'embeddings',
      'BM25',
      'cross-encoder reranking',
      'spaCy',
      'HuggingFace',
      'sentence-transformers',
    ],
  },
  {
    name: 'ML & Evaluation',
    skills: [
      'scikit-learn',
      'TensorFlow/Keras',
      'recall@k',
      'MRR',
      'faithfulness',
      'F1',
    ],
  },
  {
    name: 'Backend & DevOps',
    skills: [
      'FastAPI',
      'REST API design',
      'OOP',
      'unit testing',
      'Docker',
      'Git/GitHub',
      'GitHub Actions CI',
      'Streamlit',
    ],
  },
  {
    name: 'Data & BI',
    skills: [
      'pandas',
      'NumPy',
      'EDA',
      'MySQL/PostgreSQL',
      'FAISS',
      'SQLite',
      'Power BI',
      'DAX',
      'Tableau',
      'Excel',
    ],
  },
  {
    name: 'Domain & Simulation',
    skills: [
      'Upstream petroleum operations',
      'SCADA/field data',
      'CMG GEM',
      'WinProp',
    ],
  },
]

export type TimelineItem = {
  role: string
  org: string
  period: string
  kind: 'work' | 'leadership' | 'education'
  /** Short summary line (optional when `bullets` is provided). */
  description?: string
  /** Detailed accomplishment bullets, rendered as a list. */
  bullets?: string[]
}

export const timeline: TimelineItem[] = [
  {
    role: 'Intern',
    org: 'Oil and Natural Gas Corporation (ONGC), Ankleshwar Asset',
    period: 'May–Jul 2025',
    kind: 'work',
    description:
      'Analyzed upstream production facilities and SCADA-based real-time field-monitoring data across gas gathering, three-stage compression, dehydration, and metering.',
  },
  {
    role: 'President, ShutrX Photography Club 6.0',
    org: 'IIPE',
    period: 'Jul 2025 – May 2026',
    kind: 'leadership',
    description:
      'Ran the club like a project office — team leadership, ₹3L budget ownership, GeM-portal procurement, vendor coordination, and audit-ready compliance.',
    bullets: [
      'Spearheaded a 25+ member team to deliver end-to-end coverage and promotions for Shaswat, the flagship inter-college fest spanning IITs, NITs, and regional colleges',
      'Drove targeted digital campaigns and promotions that grew fest participation by 156% (90 → 230+ attendees) over the prior edition',
      'Conceptualised and led a full rebrand from "IIPE Photography" to "ShutrX," designing an original logo and identity that established the club as an official media face of the institute',
      'Grew club digital footprint to 60K+ combined account reach across event posts and reels over the tenure',
      'Instituted industry-expert photography workshops, elevating member skill and hands-on engagement',
      "Architected and executed the club's ₹3L annual budget, achieving ~93% utilisation efficiency (₹2.8L deployed) with zero overruns through data-backed forecasting",
      'Drove procurement of a dedicated videography camera via the GeM portal, expanding reels and video output to strengthen institute social-media presence',
      'Managed end-to-end procurement, vendor coordination, and bill processing under government financial protocols, ensuring 100% audit-ready compliance',
    ],
  },
  {
    role: 'Public Relations Officer, SPE Student Chapter',
    org: 'IIPE',
    period: 'Jul 2024 – Mar 2025',
    kind: 'leadership',
    description:
      'Outreach, speaker communication, and event promotion.',
  },
  {
    role: 'B.Tech, Petroleum Engineering',
    org: 'IIPE Visakhapatnam',
    period: '2026',
    kind: 'education',
    description:
      'Institute of National Importance under the Ministry of Petroleum & Natural Gas (MoPNG).',
  },
]

export const certifications: string[] = [
  'Supervised Machine Learning (Stanford Online / DeepLearning.AI)',
  'Data Business Analytics Specialization (Jobaaj)',
  'Excel Skills for Business (Macquarie)',
  'SQL Gold Badge (HackerRank)',
]

export const contact = {
  heading: "Let's build something precise.",
  sub: 'Open to Data / AI-ML and Python engineering roles. Reach out — I reply fast.',
  email: 'bonilavinith@gmail.com',
  phone: '+91 7396878717',
}

export type ProofStat = {
  value: number
  /** Zero-pad the integer to this width, e.g. 2 → "02". */
  pad?: number
  prefix?: string
  suffix?: string
  label: string
}

/** The count-up "proof of work" band directly under the hero. */
export const proofOfWork: ProofStat[] = [
  { value: 3, pad: 2, label: 'Live apps' },
  { value: 265, suffix: '+', label: 'Automated tests' },
  { value: 19, label: 'NLP intents' },
  { value: 15, suffix: '+', label: 'Skill handlers' },
  { value: 1, pad: 2, label: 'Petroleum domain' },
]

/** The "Currently" status block (rendered in Contact). */
export const currently = {
  openTo: [
    'Data Analyst',
    'Business Analyst',
    'AI / ML Engineer',
    'PMO / Project Management',
  ],
  basedIn: ['Visakhapatnam, India', 'Open to relocation'],
}

/** Footer "engineered with" credits. */
export const builtWith = {
  tools: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Framer Motion'],
  author: 'Vinith Bonila',
}

export type Shortcut = { keys: string; label: string }

/** Keyboard shortcuts (also drives the `?` help overlay). */
export const shortcuts: Shortcut[] = [
  { keys: 'G H', label: 'Home' },
  { keys: 'G P', label: 'Projects' },
  { keys: 'G S', label: 'Skills' },
  { keys: 'G E', label: 'Experience' },
  { keys: 'G C', label: 'Contact' },
  { keys: '?', label: 'Toggle this help' },
  { keys: 'Esc', label: 'Close modal / help' },
]
