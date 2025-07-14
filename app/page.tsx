"use client";
import React, { useState, useRef, useEffect } from "react";

// ====== Portfolio Data (Replace with your info) ======
const portfolioData = {
  name: "Soujanya Gupta",
  title: "Full Stack Developer",
  profilePic: "/IMG_9186.jpg", // Updated to your real image
  about: `BTech in Computer Science and Engineering from Medi-Caps University (2020–2024). Passionate about building web applications, AI/ML, and delivering high-quality software solutions. Experienced in full stack development, prompt engineering, and UI/UX design.`,
  projects: [
    {
      name: "RideMate – Ride Sharing Platform (v1)",
      description: "MERN stack-based platform for college/school students. Enabled emergency and regular ride matching."
    },
    {
      name: "RideMate – Ride Sharing Platform (v2)",
      description: "Women-to-women ride sharing with AI gender detection (DeepFace) for validation. Women-specific redesign."
    },
    {
      name: "EventHub – Event Networking App",
      description: "AI-powered business card scanning (OCR) for profile auto-creation. Real-time chatrooms for event sessions and topics."
    }
  ],
  skills: [
    "C", "C++", "Python", "DSA", "JavaScript", "HTML", "CSS", "Bootstrap", "ReactJS", "NodeJS", "REST API", "Tailwind CSS", "MongoDB", "MySQL", "Git/GitHub", "VS Code", "Postman", "Windows", "Linux", "Jira", "Microsoft Teams"
  ],
  experience: [
    {
      company: "Green Rider Technology",
      role: "Associate Software Engineer",
      period: "2023-Present",
      details: "Worked as Prompt Engineer (created/tested ML prompts for high precision, analytics, governance, performance metrics, quality, fraud loss tool), React Developer (leave management, performance tracking, task updates), and QA (reviewed prompt quality)."
    },
    {
      company: "CodeAlpha",
      role: "React Developer Intern",
      period: "12/2023 – 02/2024 (Remote)",
      details: "Built responsive UI with React and custom hooks, advanced form validation, layout design, and front-end collaboration."
    },
    {
      company: "Robrotronix India",
      role: "Full Stack Engineer Intern",
      period: "02/2021 – 04/2021, Indore",
      details: "Developed React UI (components, state), backend API integration, and DB management."
    }
  ],
  contact: {
    email: "semrisoujanya2003@gmail.com",
    linkedin: "https://www.linkedin.com/in/soujanya-gupta-0224621ba/",
    github: "https://github.com/yourusername", // Update with your real GitHub username if desired
    phone: "+91 8878950951",
    location: "Indore, India"
  },
  education: [
    {
      school: "Medi-Caps University, Indore",
      degree: "BTech, Computer Science and Engineering",
      year: "2020 – 2024"
    }
  ],
  certifications: [
    { name: "AWS – Cloud Architecture", issuer: "Amazon Web Services", year: "N/A" },
    { name: "AWS – Cloud Foundation", issuer: "Amazon Web Services", year: "N/A" }
  ]
  // leadership removed
};

// ====== TerminalPortfolio Component ======
// Typewriter animation component
const Typewriter: React.FC<{ text: string; onDone?: () => void; className?: string }> = ({ text, onDone, className }) => {
  const safeText = typeof text === "string" ? text : "";
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    let cancelled = false;
    function type() {
      if (cancelled) return;
      setDisplayed(safeText.slice(0, i + 1));
      if (i < safeText.length - 1) {
        i++;
        setTimeout(type, 12);
      } else if (onDone) {
        onDone();
      }
    }
    type();
    return () => { cancelled = true; };
  }, [safeText, onDone]);
  return <span className={className}>{displayed}</span>;
};

// TypewriterParagraphs: animates paragraphs one after another, each as a blockquote
const TypewriterParagraphs: React.FC<{ paragraphs: string[] }> = ({ paragraphs }) => {
  const [current, setCurrent] = useState(0);
  return (
    <div>
      {paragraphs.map((p, idx) => (
        <blockquote
          key={idx}
          className="border-l-4 border-blue-300 pl-4 my-2 text-slate-900 bg-blue-50/90 rounded-md shadow-sm text-sm"
          style={{ display: idx > current ? 'none' : 'block' }}
        >
          {idx === current ? (
            <Typewriter text={p} onDone={() => setCurrent((c) => c + 1)} />
          ) : (
            p
          )}
        </blockquote>
      ))}
    </div>
  );
};

// TerminalInfoBlock: for info/error messages (e.g., command not found)
const TerminalInfoBlock: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex items-center gap-2 bg-blue-100/90 border border-blue-300 text-blue-800 rounded-md px-4 py-2 my-2 shadow-sm text-sm">
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" stroke="#3b82f6" strokeWidth="2" fill="#e0f2ff"/><text x="10" y="15" textAnchor="middle" fontSize="13" fill="#3b82f6">i</text></svg>
    <span className="font-medium">{message}</span>
  </div>
);

const COMMANDS = [
  "help",
  "about",
  "projects",
  "skills",
  "experience",
  "contact",
  "education",
  "certifications",
  "clear",
];

const PROMPT_USER = "yourname"; // Change to your username
const PROMPT_HOST = "portfolio";

function formatDateTime() {
  const now = new Date();
  return now.toLocaleString();
}

const TerminalPortfolio: React.FC = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ command: string; output: React.ReactNode }[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [dateTime, setDateTime] = useState(formatDateTime());
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setDateTime(formatDateTime()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (cmd: string): React.ReactNode => {
    const c = cmd.trim().toLowerCase();
    switch (c) {
      case "help":
        return <TypewriterParagraphs paragraphs={["Available commands:", ...COMMANDS]} />;
      case "about":
        return <TypewriterParagraphs paragraphs={[portfolioData.about]} />;
      case "projects":
        return (
          <TypewriterParagraphs
            paragraphs={[
              "Projects:",
              ...portfolioData.projects.map((p) => `${p.name}: ${p.description}`)
            ]}
          />
        );
      case "skills":
        return <TypewriterParagraphs paragraphs={[`Skills: ${portfolioData.skills.join(", ")}`]} />;
      case "experience":
        return (
          <TypewriterParagraphs
            paragraphs={[
              "Experience:",
              ...portfolioData.experience.map((e) => `${e.role} at ${e.company} (${e.period}): ${e.details}`)
            ]}
          />
        );
      case "contact":
        return (
          <TypewriterParagraphs
            paragraphs={[
              "Contact:",
              `Email: ${portfolioData.contact.email}`,
              `LinkedIn: ${portfolioData.contact.linkedin}`,
              `GitHub: ${portfolioData.contact.github}`,
              `Phone: ${portfolioData.contact.phone}`,
              `Location: ${portfolioData.contact.location}`
            ]}
          />
        );
      case "education":
        return (
          <TypewriterParagraphs
            paragraphs={[
              "Education:",
              ...portfolioData.education.map((e) => `${e.degree} at ${e.school} (${e.year})`)
            ]}
          />
        );
      case "certifications":
        return (
          <TypewriterParagraphs
            paragraphs={[
              "Certifications:",
              ...portfolioData.certifications.map((c) => `${c.name} (${c.issuer}, ${c.year})`)
            ]}
          />
        );
      case "clear":
        setHistory([]);
        return null;
      default:
        return <TerminalInfoBlock message={`Command not found: ${cmd}. Type help to see available commands.`} />;
    }
  };

  const handleInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const output = handleCommand(input);
    if (input.trim().toLowerCase() === "clear") {
      setInput("");
      setCommandHistory((prev) => [...prev, input]);
      setHistoryIndex(null);
      return;
    }
    setHistory((prev) => [...prev, { command: input, output }]);
    setCommandHistory((prev) => [...prev, input]);
    setInput("");
    setHistoryIndex(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      if (commandHistory.length === 0) return;
      setHistoryIndex((prev) => {
        const idx = prev === null ? commandHistory.length - 1 : Math.max(0, prev - 1);
        setInput(commandHistory[idx]);
        return idx;
      });
    } else if (e.key === "ArrowDown") {
      if (commandHistory.length === 0) return;
      setHistoryIndex((prev) => {
        if (prev === null) return null;
        const idx = Math.min(commandHistory.length - 1, prev + 1);
        setInput(commandHistory[idx] || "");
        return idx === commandHistory.length ? null : idx;
      });
    }
  };

  // Subtle modern terminal UI
  return (
    <div className="w-full max-w-4xl bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-200 flex overflow-hidden flex-col relative z-10" style={{boxShadow:'0 4px 24px #60a5fa22, 0 1px 0 #bae6fd'}}>
      {/* Terminal Top Bar */}
      <div className="flex items-center h-10 px-4 bg-gradient-to-r from-[#e0f2ff] via-[#f0f9ff] to-[#b6d0e2] border-b border-blue-100 rounded-t-2xl">
        <div className="flex space-x-2">
          <span className="w-3 h-3 rounded-full bg-[#fca5a5] border border-[#f87171]/40"></span>
          <span className="w-3 h-3 rounded-full bg-[#fde68a] border border-[#fbbf24]/40"></span>
          <span className="w-3 h-3 rounded-full bg-[#a7f3d0] border border-[#34d399]/40"></span>
        </div>
        <div className="flex-1 text-center text-blue-400 font-semibold tracking-wider text-sm select-none opacity-80">Terminal Portfolio</div>
      </div>
      <div className="flex-1 flex flex-row min-h-0">
        {/* Sidebar/Profile */}
        <div className="hidden md:flex flex-col items-center justify-center bg-white/40 p-4 w-48 border-r border-blue-100 rounded-bl-2xl">
          <div className="relative flex flex-col items-center w-full">
            {/* Glowing/gradient circle behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-gradient-to-br from-blue-200 via-blue-100 to-white blur-2xl opacity-80 z-0"></div>
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-200 shadow-lg z-10 relative">
              <img src={portfolioData.profilePic} alt="Profile" className="object-cover object-center w-full h-full" />
            </div>
          </div>
          <div className="mt-6 mb-1 text-2xl font-extrabold text-blue-900 drop-shadow-sm tracking-tight text-center">{portfolioData.name}</div>
          <div className="text-blue-500 text-sm italic font-medium mb-3 text-center tracking-wide opacity-90">{portfolioData.title}</div>
          <div className="w-8 h-1 rounded-full bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 opacity-60 mb-4"></div>
          {/* Social icons */}
          <div className="flex gap-3 mt-2">
            <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full bg-blue-100 hover:bg-blue-200 p-2 transition-colors shadow-sm">
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect width="20" height="20" rx="4" fill="#3b82f6"/><path d="M6.5 8.5v5m0-5V7.75A1.25 1.25 0 0 1 7.75 6.5h.5A1.25 1.25 0 0 1 9.5 7.75v.75m-3 5h3m0 0v-2.25A1.25 1.25 0 0 1 11.25 10h.5A1.25 1.25 0 0 1 13 11.25V13.5m-3-5v5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="rounded-full bg-blue-100 hover:bg-blue-200 p-2 transition-colors shadow-sm">
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#1e293b"/><path d="M13.5 15.5v-1.167c0-.322-.13-.63-.36-.858a1.25 1.25 0 0 0-.882-.358H7.742a1.25 1.25 0 0 0-.882.358c-.23.228-.36.536-.36.858V15.5m6-7.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>
        {/* Terminal Area */}
        <div className="flex-1 flex flex-col min-h-0 bg-blue-50/80">
          {/* Header */}
          <div className="bg-blue-100/80 px-4 py-2 border-b border-blue-200 flex items-center justify-between">
            <div>
              <span className="text-blue-900 font-bold">{portfolioData.name}</span> <span className="text-blue-500">- {portfolioData.title}</span>
            </div>
            <div className="text-blue-400 text-xs opacity-80">{dateTime}</div>
          </div>
          {/* Navigation Bar */}
          <div className="bg-blue-50/80 px-4 py-1 border-b border-blue-200 text-xs flex flex-wrap gap-4">
            {COMMANDS.map((cmd) => (
              <span
                key={cmd}
                className="text-blue-600/90 hover:text-blue-800 transition-colors cursor-pointer select-none font-medium"
                onClick={() => {
                  setInput(cmd);
                  inputRef.current?.focus();
                }}
              >
                {cmd}
              </span>
            ))}
          </div>
          {/* Terminal Content */}
          <div className="px-3 py-3 overflow-y-auto custom-scrollbar bg-white/90 rounded-b-xl text-base" style={{ height: 320, maxHeight: 320 }}>
            {history.map((item, idx) => (
              <div key={idx} className="mb-2 fade-in-block">
                <div>
                  <span className="text-blue-800 font-bold text-sm">{PROMPT_USER}@{PROMPT_HOST}</span>
                  <span className="text-blue-500 text-sm">:~$</span> <span className="text-slate-900 font-medium text-sm">{item.command}</span>
                </div>
                <div className="ml-6 text-slate-900 text-base">{item.output}</div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
          {/* Command Input */}
          <form onSubmit={handleInput} className="flex items-center px-3 py-2 bg-blue-50/80 rounded-b-xl">
            <span className="text-blue-800 font-bold text-sm">{PROMPT_USER}@{PROMPT_HOST}</span>
            <span className="text-blue-500 text-sm">:~$</span>
            <input
              ref={inputRef}
              className="bg-transparent outline-none border-none flex-1 ml-2 text-slate-900 placeholder-blue-400 animate-blink-cursor focus:ring-2 focus:ring-blue-200 rounded-md transition-all text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              autoComplete="off"
              spellCheck={false}
              placeholder="Type a command..."
              style={{caretColor: '#60a5fa'}}
            />
          </form>
          {/* Footer */}
          <div className="bg-blue-50/80 px-3 py-1 border-t border-blue-200 text-xs text-blue-500 text-right opacity-80 rounded-b-2xl">
            {dateTime}
          </div>
        </div>
      </div>
      {/* Custom styles for fade, scrollbar, etc. */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink-cursor::after {
          content: '_';
          animation: blink 1s steps(1) infinite;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #bae6fd #e0f2ff;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          background: #e0f2ff;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #bae6fd;
          border-radius: 4px;
        }
        @keyframes fadeInBlock {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }
        .fade-in-block {
          animation: fadeInBlock 0.7s cubic-bezier(.4,2,.6,1) both;
        }
      `}</style>
      {/* Artistic sidebar profile styles */}
      <style>{`
        .drop-shadow-sm { text-shadow: 0 2px 8px #e0e7ef33; }
      `}</style>
    </div>
  );
};

export default function Page() {
  // Artistic loader state
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => { clearTimeout(timer); };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f2ff] via-[#f0f9ff] to-[#b6d0e2] relative overflow-hidden">
        {/* Subtle animated background clouds */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg width="100%" height="100%" className="w-full h-full opacity-20" style={{position:'absolute',top:0,left:0}}>
            <defs>
              <radialGradient id="cloud1" cx="50%" cy="50%" r="80%">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#e0f2ff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse cx="30%" cy="40%" rx="180" ry="60" fill="url(#cloud1)" />
            <ellipse cx="70%" cy="60%" rx="140" ry="50" fill="url(#cloud1)" />
          </svg>
        </div>
        {/* Loader content */}
        <div className="z-10 flex flex-col items-center">
          <div className="flex items-center mb-4">
            <span className="text-blue-500 text-2xl font-mono">yourname@portfolio</span>
            <span className="text-blue-400 text-2xl font-mono ml-2">:~$</span>
            <span className="text-blue-300 text-2xl font-mono ml-2 animate-blink">_</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-blue-400 text-lg font-mono tracking-widest mb-2">Loading Portfolio</div>
            <div className="flex space-x-1 mt-1">
              <span className="w-2 h-2 rounded-full bg-blue-200 animate-bounce" style={{animationDelay:'0s'}}></span>
              <span className="w-2 h-2 rounded-full bg-blue-200 animate-bounce" style={{animationDelay:'0.2s'}}></span>
              <span className="w-2 h-2 rounded-full bg-blue-200 animate-bounce" style={{animationDelay:'0.4s'}}></span>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .animate-blink {
            animation: blink 1s steps(1) infinite;
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          .animate-bounce {
            animation: bounce 1s infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f2ff] via-[#f0f9ff] to-[#b6d0e2] font-mono relative overflow-hidden">
      <TerminalPortfolio />
    </div>
  );
}
