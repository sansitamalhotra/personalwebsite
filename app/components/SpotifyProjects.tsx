'use client';

import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';
import { useState, useRef, useEffect } from 'react';
import ProjectModal from './ProjectModal';

const projects = [
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
    description: "KYC verification platform for gig economy workers using Face++ API.",
    longDescription: "GigIT revolutionizes identity verification for the gig economy by combining Face++ facial recognition with document validation. Built for gig workers who need fast, reliable KYC verification, the platform achieved 85% accuracy in identity validation while processing verification requests in under 60 seconds. Won 1st place at NewHacks 2025 out of 200+ competing teams.",
    tech: ["React", "Node.js", "MongoDB", "Face++ API", "Express.js", "JWT Auth"],
    plays: "85,234",
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
    description: "AI-powered crisis response system for women's safety with community-first approach.",
    longDescription: "SafetyNet HER is a comprehensive crisis response platform that puts community support before police escalation. Using Google Gemini AI for threat triage, the system analyzes incoming SMS messages to classify 12+ incident types, score urgency (1-10), and recommend appropriate response. Features include a production-ready fake call escape system with AI-generated voice scripts, real-time volunteer mesh network coordination, and predictive risk intelligence. Built at DeltaHacks 12 to address the gap in preventive safety tools for women.",
    tech: ["React", "TypeScript", "Node.js", "Google Gemini API", "MongoDB", "Twilio", "Socket.io"],
    plays: "42,891",
    duration: "4 tracks",
    color: "#ff6b9d",
    cover: "/images/safetynet-cover.png",
    github: "https://github.com/sansitamalhotra/SafetyNet-HER.git",
    achievements: [
      "92% accuracy in AI threat classification",
      "4.2 minute average response time (4x faster than 911)",
      "Real-time volunteer dispatch system",
      "Fake call escape feature with AI voice generation",
      "Built production-ready features in 36 hours"
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
    description: "AI-powered data integration tool using SBERT embeddings for intelligent field matching.",
    longDescription: "Schema Sync solves the critical problem of data integration across disparate systems by using SBERT (Sentence-BERT) embeddings to intelligently match database fields. The system achieved 92% accuracy in field matching by analyzing semantic similarity rather than relying on exact name matches. Built with Python and TensorFlow, it dramatically reduces manual data mapping effort and enables seamless integration between legacy systems and modern databases. Won Top 10 at Hack the Valley X.",
    tech: ["Python", "TensorFlow", "PostgreSQL", "SBERT", "FastAPI", "NumPy"],
    plays: "38,456",
    duration: "5 tracks",
    color: "#ffd93d",
    cover: "/images/schemasync-cover.png",
    github: "https://github.com/sansitamalhotra/SchemaSync.git",
    achievements: [
      "92% field match accuracy using SBERT embeddings",
      "Top 10 finish at Hack the Valley X",
      "Semantic similarity analysis outperformed rule-based matching",
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
    description: "Gamified coding interview preparation platform designed to reduce anxiety and build confidence.",
    longDescription: "CodeCrush reimagines technical interview preparation by focusing on learning psychology rather than just problem volume. Unlike traditional platforms that can feel intimidating, CodeCrush uses spaced repetition, guided learning paths, and encouraging feedback to help students build genuine confidence. The platform features 50+ curated DSA problems, progress tracking with visual streaks, and a non-judgmental environment that normalizes struggle as part of the learning process. Built with React and Firebase, it has helped 20+ beta users prepare for technical interviews with reduced anxiety.",
    tech: ["React", "TypeScript", "Firebase", "Tailwind CSS", "Vercel"],
    plays: "29,123",
    duration: "6 tracks",
    color: "#6bcf7f",
    cover: "/images/codecrush-cover.png",
    github: "https://github.com/sansitamalhotra/codecrush.git",
    demo: "https://mycodecrush.vercel.app",
    achievements: [
      "50+ curated DSA problems with guided learning paths",
      "20+ beta users with positive feedback",
      "Spaced repetition system for long-term retention",
      "Anxiety-reducing UI design focused on encouragement"
    ],
    screenshots: [
      "/screenshots-codecrush/home.png",
      "/screenshots-codecrush/dashboard.png",
      "/screenshots-codecrush/problem.png",
      "/screenshots-codecrush/achievement.png",
      "/screenshots-codecrush/stats.png"
    ],
  },
  {
    title: "PillPal",
    description: "Smart medication management system with intelligent reminders and tracking.",
    longDescription: "PillPal is a comprehensive medication management platform designed to help users track prescriptions, set intelligent reminders, and maintain medication adherence. Built with Next.js and TypeScript, the system features an intuitive interface for managing multiple medications, dosage tracking, and refill notifications. The platform aims to reduce medication errors and improve health outcomes through smart automation.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    plays: "18,456",
    duration: "4 tracks",
    color: "#89CFF0",
    cover: "/images/pillpal-cover.png",
    github: "https://github.com/sansitamalhotra/PillPal.git",
    demo: "https://youtu.be/IA-yJRzk594",
    achievements: [
      "Smart reminder system with customizable schedules",
      "Multi-medication tracking interface",
      "Refill notifications to prevent gaps in medication"
    ],
    screenshots: [
      "/screenshots-PillPal/Screenshot 2026-02-15 at 10.01.58 AM.png",
      "/screenshots-PillPal/Screenshot 2026-02-15 at 10.02.19 AM.png",
      "/screenshots-PillPal/Screenshot 2026-02-15 at 10.04.17 AM.png",
      "/screenshots-PillPal/Screenshot 2026-02-15 at 10.05.19 AM.png",
      "/screenshots-PillPal/Screenshot 2026-02-15 at 10.05.42 AM.png",
      "/screenshots-PillPal/Screenshot 2026-02-15 at 10.05.51 AM.png",
      "/screenshots-PillPal/Screenshot 2026-02-15 at 10.06.11 AM.png",
      "/screenshots-PillPal/Screenshot 2026-02-15 at 10.06.19 AM.png",
      "/screenshots-PillPal/Screenshot 2026-02-15 at 10.06.43 AM.png",
      "/screenshots-PillPal/Screenshot 2026-02-15 at 10.07.20 AM.png",
      "/screenshots-PillPal/Screenshot 2026-02-15 at 10.07.35 AM.png",
      "/screenshots-PillPal/Screenshot 2026-02-15 at 10.07.46 AM.png"
    ],
  },
  {
    title: "Bharatnatyam",
    description: "Classical Indian dance performances exploring storytelling through movement and expression.",
    longDescription: "Over 10 years of training and performing Bharatnatyam, a classical Indian dance form that tells stories through intricate footwork, hand gestures (mudras), and facial expressions. My performances blend traditional techniques with contemporary interpretations, bringing ancient stories to modern audiences. Dance has taught me discipline, attention to detail, and the importance of practice—skills that directly translate to my approach to software engineering.",
    tech: ["Dance", "Performance", "Cultural Arts", "Storytelling"],
    plays: "15,678",
    duration: "8 performances",
    color: "#c06c84",
    cover: "/images/dance-cover.png",
    type: "performance",
    demo: "https://www.youtube.com/playlist?list=PLLimH7k5Uz4r76VnGrpFRlEk9ZFYXSsX3", 
    achievements: [
      "10+ years of classical training",
      "Multiple stage performances",
      "Blend of traditional and contemporary styles",
      "Storytelling through movement and expression"
    ],
  },
];

export default function SpotifyProjects() {
  const { theme } = useTheme();
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll animation
  useEffect(() => {
  const scrollContainer = scrollRef.current;
  if (!scrollContainer) return;

  let animationFrameId: number;
  let isUserScrolling = false;
  let lastScrollLeft = 0;

  const smoothScroll = () => {
    if (!isUserScrolling && scrollContainer) {
      scrollContainer.scrollLeft += 0.8; // Constant smooth speed
      
      // Reset to start when reaching the end for infinite loop
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }
    }
    animationFrameId = requestAnimationFrame(smoothScroll);
  };

  // Pause auto-scroll when user interacts
  const handleUserScroll = () => {
    isUserScrolling = true;
    
    setTimeout(() => {
      isUserScrolling = false;
    }, 2000); // Resume after 2 seconds
  };

  scrollContainer.addEventListener('wheel', handleUserScroll);
  scrollContainer.addEventListener('touchstart', handleUserScroll);
  scrollContainer.addEventListener('mousedown', handleUserScroll);

  animationFrameId = requestAnimationFrame(smoothScroll);

  return () => {
    cancelAnimationFrame(animationFrameId);
    scrollContainer.removeEventListener('wheel', handleUserScroll);
    scrollContainer.removeEventListener('touchstart', handleUserScroll);
    scrollContainer.removeEventListener('mousedown', handleUserScroll);
  };
}, []);

  const handleProjectClick = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <div className={`px-8 py-12 min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-black to-gray-900' 
        : 'bg-gradient-to-b from-blue-50 to-white'
    }`}>
      
      {/* Header with scroll arrow */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Projects
          </h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            My discography of building cool stuff 🚀
          </p>
        </div>
        <button 
          onClick={scrollRight}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            theme === 'dark' 
              ? 'bg-white/10 hover:bg-white/20 text-white' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
          }`}
        >
          <span className="text-2xl">›</span>
        </button>
      </div>

      {/* Horizontal Scrolling Albums */}
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* Duplicate projects for infinite loop effect */}
        {[...projects, ...projects].map((project, index) => (
          <Tilt
            key={`${project.title}-${index}`}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            transitionSpeed={2000}
          >
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ 
                opacity: 1, 
                x: 0,
              }}
              transition={{ 
                delay: (index % projects.length) * 0.1, 
                duration: 0.5 
              }}
              onClick={() => handleProjectClick(project)}
              className="flex-shrink-0 w-[280px] cursor-pointer group"
            >
              {/* Album Cover with Vinyl */}
              <div className="relative w-full h-[280px] rounded-lg shadow-2xl overflow-hidden mb-4">
                {/* Vinyl peeking out */}
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10">
                  <div 
                    className="w-full h-full rounded-full relative"
                    style={{ 
                      backgroundColor: '#1a1a1a',
                      animation: 'spin 3s linear infinite',
                      border: '8px solid #2a2a2a'
                    }}
                  >
                    <div className="absolute inset-4 rounded-full border-4 border-gray-700 opacity-50"></div>
                    <div className="absolute inset-8 rounded-full border-4 border-gray-700 opacity-30"></div>
                    <div 
                      className="absolute inset-1/3 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: project.color }}
                    >
                      <div className="w-4 h-4 rounded-full bg-white"></div>
                    </div>
                  </div>
                </div>

                {/* Album Cover */}
                <div className={`relative w-full h-full transition-all duration-500 group-hover:translate-x-8 ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                }`}>
                  {project.cover && (
                    <Image
                      src={project.cover}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  )}
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-black text-2xl ml-1">▶</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Album Info */}
              <h3 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {project.title}
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {project.duration}
              </p>  
            </motion.div>
          </Tilt>
        ))}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}