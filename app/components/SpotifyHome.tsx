'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';
import ProjectModal from './ProjectModal';

const allProjects = [
   
  {
  title: "PulseStock",
  description: "Real-Time Stock Sentiment Terminal • AI Agent + Live Data",
  longDescription: "PulseStock aggregates live financial news to surface market sentiment before it moves. FastAPI backend pulls headlines from NewsAPI, scores them with a custom NLP pipeline, and generates analyst-style briefs via GPT-4o-mini. Features a LangChain ReAct agent with persistent memory that compares tickers, answers follow-up questions, and calls live tools — plus shareable URLs, a persistent watchlist, and a Bloomberg-style terminal UI.",
  tech: ["Next.js", "FastAPI", "LangChain", "LangGraph", "OpenAI", "NewsAPI", "yfinance", "Framer Motion"],
  plays: "NEW",
  duration: "Live",
  color: "#00ff88",
  cover: "/images/pulsestock-cover.png",
  github: "https://github.com/sansitamalhotra/pulsestock",
  demo: "https://pulsestock.vercel.app",
  achievements: [
    "LangChain ReAct agent with tool calling and persistent session memory",
    "Real-time sentiment scoring across 500+ tickers via live news ingestion",
    "AI analyst briefs synthesized from live headlines using GPT-4o-mini",
    "Shareable ticker URLs, persistent watchlist, and scan history",
  ],
    screenshots: [
      "/screenshots-pulsestock/landing.png",
      "/screenshots-pulsestock/aapl.png",
      "/screenshots-pulsestock/nvda.png",
      "/screenshots-pulsestock/ai.png",
      "/screenshots-pulsestock/watchlist.png",
      "/screenshots-pulsestock/ticker.png"
    ],
  },
  {
    title: "GigIT",
    description: "KYC Verification Platform • NewHacks Winner",
    longDescription: "GigIT revolutionizes identity verification for the gig economy by combining Face++ facial recognition with document validation. Built for gig workers who need fast, reliable KYC verification, the platform achieved 85% accuracy in identity validation while processing verification requests in under 60 seconds. Won 1st place at NewHacks 2025 out of 200+ competing teams.",
    tech: ["React", "Node.js", "MongoDB", "Face++ API", "Express.js", "JWT Auth"],
    plays: "85K",
    duration: "3 tracks",
    color: "#1DB954",
    cover: "/images/gigit-cover.png",
    github: "https://github.com/sansitamalhotra/GigIT.git",
    achievements: [
      "🏆 1st Place Winner at NewHacks 2025",
      "85% accuracy in KYC verification",
      "Processed 1000+ test verifications",
      "60-second average verification time"
    ],
    screenshots: [
      "/screenshots-GigIT/landing.jpg",
      "/screenshots-GigIT/application.jpg",
      "/screenshots-GigIT/bank-login.jpg",
      "/screenshots-GigIT/risk-config.jpg"
    ],
  },
  {
    title: "SafetyNet HER",
    description: "AI Crisis Response System • DeltaHacks 12",
    longDescription: "SafetyNet HER is a comprehensive crisis response platform that puts community support before police escalation. Using Google Gemini AI for threat triage, the system analyzes incoming SMS messages to classify 12+ incident types, score urgency (1-10), and recommend appropriate response. Features include a production-ready fake call escape system with AI-generated voice scripts, real-time volunteer mesh network coordination, and predictive risk intelligence.",
    tech: ["React", "TypeScript", "Node.js", "Google Gemini API", "MongoDB", "Twilio", "Socket.io"],
    plays: "42K",
    duration: "4 tracks",
    color: "#ff6b9d",
    cover: "/images/safetynet-cover.png",
    github: "https://github.com/sansitamalhotra/SafetyNet-HER.git",
    achievements: [
      "92% accuracy in AI threat classification",
      "4.2 minute average response time (4x faster than 911)",
      "Real-time volunteer dispatch system",
      "Fake call escape feature with AI voice generation"
    ],
    screenshots: [
      "/ss/landingpage.png",
      "/ss/fakecall.png",
      "/ss/fakecall_part2.PNG",
      "/ss/ai-analysis.png",
      "/ss/volunteerscreen.png"
    ],
  },
  {
    title: "Schema Sync",
    description: "AI Data Integration • 92% Accuracy",
    longDescription: "Schema Sync solves the critical problem of data integration across disparate systems by using SBERT (Sentence-BERT) embeddings to intelligently match database fields. The system achieved 92% accuracy in field matching by analyzing semantic similarity rather than relying on exact name matches.",
    tech: ["Python", "TensorFlow", "PostgreSQL", "SBERT", "FastAPI", "NumPy"],
    plays: "38K",
    duration: "5 tracks",
    color: "#ffd93d",
    cover: "/images/schemasync-cover.png",
    github: "https://github.com/sansitamalhotra/SchemaSync.git",
    achievements: [
      "92% field match accuracy using SBERT embeddings",
      "Top 10 finish at Hack the Valley X",
      "Reduced manual data mapping time by 75%"
    ],
    screenshots: [
      "/screenshots-SchemaSync/landing.jpg",
      "/screenshots-SchemaSync/mapping.jpg",
      "/screenshots-SchemaSync/analytic.jpg",
      "/screenshots-SchemaSync/unified.jpg"
    ],
  },
  {
    title: "CodeCrush",
    description: "Gamified Interview Prep",
    longDescription: "CodeCrush reimagines technical interview preparation by focusing on learning psychology rather than just problem volume. The platform features 50+ curated DSA problems, progress tracking with visual streaks, and a non-judgmental environment that normalizes struggle as part of the learning process.",
    tech: ["React", "TypeScript", "Firebase", "Tailwind CSS", "Vercel"],
    plays: "29K",
    duration: "6 tracks",
    color: "#6bcf7f",
    cover: "/images/codecrush-cover.png",
    github: "https://github.com/sansitamalhotra/codecrush.git",
    demo: "https://mycodecrush.vercel.app",
    achievements: [
      "50+ curated DSA problems with guided learning paths",
      "20+ beta users with positive feedback",
      "Spaced repetition system for long-term retention"
    ],
    screenshots: [
      "/screenshots-codecrush/home.png",
      "/screenshots-codecrush/dashboard.png",
      "/screenshots-codecrush/problem.png",
      "/screenshots-codecrush/achievement.png",
      "/screenshots-codecrush/stats.png"
    ],
  },
];

interface SpotifyHomeProps {
  onSectionChange?: (section: string) => void;
}

export default function SpotifyHome({ onSectionChange }: SpotifyHomeProps) {
  const { theme } = useTheme();
  const [selectedProject, setSelectedProject] = useState<typeof allProjects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (projectTitle: string) => {
    const project = allProjects.find(p => p.title === projectTitle);
    if (project) {
      setSelectedProject(project);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Gradient Background */}
      <div 
        className={`absolute inset-0 ${
          theme === 'dark'
            ? 'bg-gradient-to-b from-purple-900 via-purple-900/50 to-black'
            : 'bg-gradient-to-b from-blue-100 via-blue-50 to-white'
        } transition-colors duration-300`}
        style={{ height: '400px' }}
      />

      {/* Content */}
      <div className="relative z-10 px-8 pt-20">
        
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-end gap-6 mb-8"
        >
          <div className={`w-48 h-48 rounded-full overflow-hidden shadow-2xl flex-shrink-0 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <Image
              src="/images/jukebox-removed.png"
              alt="Pixel Sansita"
              width={192}
              height={192}
              className="object-cover"
            />
          </div>

          <div className="pb-4">
            <p className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
              PORTFOLIO
            </p>
            <h1 className={`text-7xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Sansita Malhotra
            </h1>
            <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
              <span className="font-semibold">Computer Engineering @ UofT</span>
              <span>•</span>
              <span>Second Year</span>
              <span>•</span>
              <span>Toronto ⁶𓅓</span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex items-center gap-4 mb-12"
        >
          <button
            onClick={() => onSectionChange?.('projects')}
            className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-xl cursor-pointer"
          >
            <span className="text-2xl text-black">▶</span>
          </button>
          
          <a 
            href="/resume.pdf" 
            download="Sansita_Malhotra_Resume.pdf"
            className={`px-6 py-2 border rounded-full transition-colors inline-block ${
              theme === 'dark'
                ? 'border-gray-600 text-white hover:border-white'
                : 'border-gray-300 text-gray-700 hover:border-gray-900'
            }`}
          >
            View Resume
          </a>
          
          <button className={`text-2xl ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
            ⋯
          </button>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-4 gap-4 mb-12"
        >
          {[
            { emoji: '🏆', num: '2', label: 'Hackathon Wins' },
            { emoji: '⚡', num: '250+', label: 'Daily Users' },
            { emoji: '💃', num: '10+', label: 'Dance Performances' },
            { emoji: '💼', num: '3+', label: 'Years Coding' },
          ].map((stat, i) => (
            <div
              key={i}
              className={`rounded-lg p-4 transition-all backdrop-blur-md border ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10 hover:bg-white/10'
                  : 'bg-blue-50/70 border-blue-100/40 hover:bg-blue-100/80 shadow-lg'
              }`}
            >
              <p className="text-3xl font-bold mb-1">{stat.emoji}</p>
              <p className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {stat.num}
              </p>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Popular Section */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Popular
          </h2>
          <div className="space-y-2">
            {[
              { name: 'PulseStock', detail: 'Real-time Stock Sentiment Analysis • Live Data', plays: 'NEW' },
              { name: 'GigIT', detail: 'KYC Verification Platform • NewHacks Winner', plays: '85K' },
              { name: 'SafetyNet HER', detail: 'AI Crisis Response System • DeltaHacks 12', plays: '42K' },
              { name: 'Schema Sync', detail: 'AI Data Integration • 92% Accuracy', plays: '38K' },
              { name: 'CodeCrush', detail: 'Gamified Interview Prep', plays: '29K' },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                onClick={() => handleProjectClick(project.name)}
                className={`flex items-center gap-4 px-4 py-3 rounded transition-colors group cursor-pointer ${
                  theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-blue-50'
                }`}
              >
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>{index + 1}</span>
                <div className="flex-1">
                  <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {project.name}
                  </p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {project.detail}
                  </p>
                </div>
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {project.plays}
                </span>
                <span className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  ▶
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}