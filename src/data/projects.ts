export interface Project {
  id: string;
  title: string;
  description: string;
  category: "frontend" | "fullstack" | "ai";
  categoryLabel: string;
  role: string;
  tags: string[];
  metrics: {
    label1: string;
    val1: string;
    label2: string;
    val2: string;
  };
  image: string;
  github: string;
  liveLink: string;
  detailedOverview: string;
  techStack: string[];
}

export const projectsData: Project[] = [
  {
    id: "sukhloans",
    title: "Sukhloans",
    description: "A streamlined digital lending interface designed to make loan applications simple, fast, and accessible.",
    category: "frontend",
    categoryLabel: "Frontend / FinTech",
    role: "Frontend Developer",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    metrics: {
      label1: "Load Time",
      val1: "1.2s",
      label2: "Conversion Rate",
      val2: "+28%"
    },
    image: "/Sukhloans/image.png",
    github: "https://github.com/Sanskar059",
    liveLink: "https://github.com/Sanskar059",
    detailedOverview: "Sukhloans is a client-facing credit application platform designed with accessibility at its core. It simplifies complex financial terms into a wizard-style application, optimizing user conversion. Special care was taken to meet WCAG AA contrast guidelines and full keyboard navigation support.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "React Hook Form", "Zod"]
  },
  {
    id: "analytics",
    title: "Analytics Dashboard",
    description: "Performance monitoring for modern dev teams. Real-time metrics visualization with custom d3.js integrations and high-fidelity canvas rendering.",
    category: "frontend",
    categoryLabel: "Frontend / SaaS",
    role: "Frontend Developer",
    tags: ["React", "TypeScript", "D3.js", "Tailwind CSS"],
    metrics: {
      label1: "Update Rate",
      val1: "10ms",
      label2: "Uptime",
      val2: "99.9%"
    },
    image: "/Analytics/image.png",
    github: "https://github.com/Sanskar059",
    liveLink: "https://github.com/Sanskar059/analytics-demo",
    detailedOverview: "A high-frequency dashboard designed for technical teams to monitor server loads, API latencies, and transaction volumes in real time. Features a customized high-performance canvas engine to render thousands of data points without blocking the main browser thread. Uses WebSockets for continuous bi-directional telemetry.",
    techStack: ["React", "D3.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
  },
  {
    id: "mocklingo",
    title: "Mocklingo",
    description: "An AI-driven language interview platform designed to simulate real-world pressure. Built with React and Whisper AI, featuring real-time speech-to-text feedback loops.",
    category: "fullstack",
    categoryLabel: "Fullstack / AI",
    role: "Fullstack Developer",
    tags: ["React", "Node.js", "Whisper AI", "Tailwind CSS"],
    metrics: {
      label1: "Active Users",
      val1: "150+",
      label2: "Latency",
      val2: "2.4s"
    },
    image: "/Mock/Screenshot%202026-06-23%20173522.png",
    github: "https://github.com/Sanskar059",
    liveLink: "https://github.com/Sanskar059/mocklingo-demo",
    detailedOverview: "Mocklingo helps candidates prepare for technical interviews by simulating a realistic dialogue with an AI-driven interlocutor. The app listens to spoken answers, transcribes them in real time using OpenAI's Whisper API, and generates constructive feedback using GPT-4. Special emphasis was placed on mimicking real interview pressure with custom audio visualizations and time-constrained questions.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Web Audio API", "OpenAI Whisper", "Zustand", "Node.js", "Express.js", "MongoDB"]
  },
  {
    id: "allumni",
    title: "Allumni Association",
    description: "A comprehensive community platform for university alumni. Features networking tools, job boards, and mentorship matchmaking.",
    category: "fullstack",
    categoryLabel: "Fullstack / Community",
    role: "Fullstack Developer",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Socket.io"],
    metrics: {
      label1: "Active Members",
      val1: "5K+",
      label2: "Match Rate",
      val2: "88%"
    },
    image: "/Allumni/Screenshot%202026-06-25%20011311.png",
    github: "https://github.com/Sanskar059",
    liveLink: "https://github.com/Sanskar059",
    detailedOverview: "A complete networking portal for university graduates to stay connected, discover career opportunities, and seek mentorship. Built with a robust backend using Express and PostgreSQL, it handles real-time messaging, events management, and automated recommendations based on career interests.",
    techStack: ["React", "Node.js", "Express.js", "PostgreSQL", "Tailwind CSS", "Docker", "Socket.io", "Framer Motion"]
  },
  {
    id: "2dvoice",
    title: "2dVoice chat",
    description: "2D spatial audio chat application with real-time room rendering and noise filtering.",
    category: "fullstack",
    categoryLabel: "Fullstack / Spatial",
    role: "Fullstack Architect",
    tags: ["React", "Web Audio API", "WebRTC", "Socket.io"],
    metrics: {
      label1: "Audio Latency",
      val1: "<15ms",
      label2: "Concurrent Users",
      val2: "500+"
    },
    image: "/2dVoice/Screenshot%202026-06-25%20012947.png",
    github: "https://github.com/Sanskar059",
    liveLink: "https://github.com/Sanskar059/2dvoice",
    detailedOverview: "2dVoice chat reimagines virtual office meetings by mapping participants in a 2D canvas room. The volume and panning of participants' voices adjust in real time according to their distance and orientation. Built entirely with Web Audio API, WebRTC peer-to-peer data channels, and Socket.io.",
    techStack: ["React", "TypeScript", "Web Audio API", "WebRTC", "Socket.io", "Framer Motion", "Tailwind CSS", "Node.js", "Express.js"]
  },
  {
    id: "agentic_orchestration",
    title: "Agentic AI Orchestration System",
    description: "Dynamic agent workflow management and execution engine. Automates multi-agent coordination for complex task fulfillment.",
    category: "ai",
    categoryLabel: "AI / Orchestration",
    role: "AI Lead",
    tags: ["Python", "LangChain", "FastAPI", "React"],
    metrics: {
      label1: "Execution Speed",
      val1: "-45%",
      label2: "Success Rate",
      val2: "96.4%"
    },
    image: "/Aiworkflow/Screenshot%202026-06-25%20012357.png",
    github: "https://github.com/Sanskar059",
    liveLink: "https://github.com/Sanskar059",
    detailedOverview: "A high-performance orchestration system that schedules, monitors, and runs autonomous AI agents. Features a visual DAG designer for editing workflows and a streaming execution viewer to observe agent reasoning steps in real time.",
    techStack: ["React", "LangChain", "LangGraph", "FastAPI", "Python", "Docker", "Tailwind CSS", "Redis"]
  },
  {
    id: "ai_ticket",
    title: "AI Ticket Creation",
    description: "Automatic bug reporting and ticket generation using natural language parsing and screen recording analysis.",
    category: "ai",
    categoryLabel: "AI / Automation",
    role: "AI Developer",
    tags: ["OpenAI", "Claude", "React", "Node.js"],
    metrics: {
      label1: "Triage Time",
      val1: "<1m",
      label2: "Accuracy",
      val2: "92%"
    },
    image: "/AiTicket/image.png",
    github: "https://github.com/Sanskar059",
    liveLink: "https://github.com/Sanskar059",
    detailedOverview: "Automatically turns user bug descriptions and system console logs into fully fleshed-out Jira/Linear tickets. Uses GPT-4o for visual report analysis and Claude Sonnet for generating clear reproduction steps.",
    techStack: ["React", "Node.js", "Express.js", "OpenAI API", "Anthropic API", "Puppeteer", "Tailwind CSS"]
  },
  {
    id: "rag_chatbot",
    title: "RAG Document Chatbot",
    description: "Retrieve-and-generate chatbot for querying large PDF, DOCX, and Markdown document corpus with precise citations.",
    category: "ai",
    categoryLabel: "AI / LLM",
    role: "AI Engineer",
    tags: ["Pinecone", "LangChain", "Python", "OpenAI"],
    metrics: {
      label1: "Retrieval Time",
      val1: "80ms",
      label2: "F1 Score",
      val2: "0.89"
    },
    image: "/RagChatbot/image.png",
    github: "https://github.com/Sanskar059",
    liveLink: "https://github.com/Sanskar059",
    detailedOverview: "A document QA bot that leverages Retrieval-Augmented Generation. Documents are chunked, embedded using OpenAI embeddings, and stored in Pinecone vector database. The conversational interface retrieves the most relevant context to answer user queries with precise source citations.",
    techStack: ["React", "Python", "FastAPI", "Pinecone", "LangChain", "OpenAI GPT-4", "SentenceTransformers"]
  },
  {
    id: "persona_chatbot",
    title: "Persona Chatbot",
    description: "Conversational agent capable of adopting specific historical, fictional, or custom-defined personalities with consistent voice and context preservation.",
    category: "ai",
    categoryLabel: "AI / NLP",
    role: "AI Developer",
    tags: ["React", "LLM", "Prompt Engineering", "Zustand"],
    metrics: {
      label1: "Response Time",
      val1: "310ms",
      label2: "Retention",
      val2: "94%"
    },
    image: "/PersonaChatbot/image.png",
    github: "https://github.com/Sanskar059",
    liveLink: "https://github.com/Sanskar059",
    detailedOverview: "A chatbot playground where users can chat with historical figures, fictional characters, or create their own personas by writing custom system prompts. Implements advanced conversational memory management to maintain consistency across long conversations.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Zustand", "OpenAI API", "Framer Motion"]
  }
];
