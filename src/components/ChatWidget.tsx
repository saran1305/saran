'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Terminal, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { useSound } from '@/context/SoundContext';

type ChatMessage = {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: string;
};

const quickActions = [
  'Cloud Experience',
  'DevSecOps',
  'Glido Architecture',
  'Projects',
  'Production Troubleshooting',
  'Notice & Remote',
  'Blog',
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { isSoundEnabled } = useSound();

  const playClickSound = () => {
    if (isSoundEnabled) {
      try {
        const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.15;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
        oscillator.stop(audioContext.currentTime + 0.1);
      } catch (err) {
        // ignore
      }
    }
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi, I'm Saran's portfolio assistant. What would you like to explore?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Local knowledge query engine
  const queryKnowledgeBase = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('glido') || q.includes('gcp') || q.includes('google cloud')) {
      return `Glido is Saran's flagship GCP Cloud Infrastructure project. He architected a serverless setup on Cloud Run, Cloud SQL (PostgreSQL), Google Cloud Build CI/CD, Secret Manager runtime injection, and Cloud Storage. It features VPC Service Controls, SOC 2 / ISO 27001 readiness, and auto-scaling.`;
    }

    if (q.includes('devsecops') || q.includes('security') || q.includes('compliance') || q.includes('soc 2') || q.includes('iso')) {
      return `Saran embeds security controls across all 8 SDLC phases: pre-commit secret scanning, SonarQube SAST, Trivy container CVE scanning, Checkov IaC linting, signed Artifact Registry containers, GCP/AWS Secret Manager injection, least-privilege IAM, and audit logging for SOC 2 / ISO 27001 readiness.`;
    }

    if (q.includes('troubleshoot') || q.includes('incident') || q.includes('failure') || q.includes('lesson') || q.includes('disk i/o')) {
      return `Saran's production troubleshooting methodology follows 8 steps: 1) Application -> 2) Load -> 3) CPU/Memory -> 4) Disk I/O -> 5) Network -> 6) Database -> 7) Logs -> 8) Deployment history. For example, he resolved a CI/CD build runner disk I/O freeze by implementing concurrency locks and layer caching.`;
    }

    if (q.includes('project') || q.includes('work') || q.includes('srd') || q.includes('assure') || q.includes('ackumen')) {
      return `Saran has built 4 key featured production case studies: 1) Glido (Production GCP Cloud Run & Cloud SQL), 2) SRD (AWS Cloud & Jenkins CI/CD), 3) Assure Bharath (Docker Containerization & GitHub Actions), and 4) Ackumen (Enterprise React & Redux Dashboard).`;
    }

    if (q.includes('cloud') || q.includes('aws') || q.includes('azure') || q.includes('platform')) {
      return `Saran has 5+ years experience as a Senior Cloud & DevSecOps Engineer across AWS, GCP, and Azure. He specializes in Terraform IaC, Docker, Kubernetes, Jenkins, GitHub Actions, Cloud Build, Splunk, CloudWatch, and Cloud Monitoring.`;
    }

    if (q.includes('notice') || q.includes('interview') || q.includes('remote') || q.includes('hire') || q.includes('contact')) {
      return `Saran's notice period is fully negotiable, and he is open to remote interviews and opportunities! You can contact him directly at shreecharan1305@gmail.com or via LinkedIn at linkedin.com/in/saran1305.`;
    }

    if (q.includes('blog') || q.includes('journal') || q.includes('article') || q.includes('writing')) {
      return `Saran writes technical articles in his Engineering Journal covering topics like "How I Built a Production CI/CD Pipeline on GCP Cloud Run", "DevSecOps Controls for CI/CD Pipelines", and "Preparing Infrastructure for SOC 2 & ISO 27001 Audit Readiness".`;
    }

    return `Saran M is a Senior Cloud & DevSecOps Engineer with 5+ years of experience across AWS, GCP, Azure, Terraform, Docker, Kubernetes, CI/CD pipelines, and security compliance. Feel free to ask about his Glido GCP architecture, SRD AWS deployment, DevSecOps lifecycle, or production troubleshooting experience!`;
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    playClickSound();

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');

    // Simulate bot thinking response
    setTimeout(() => {
      const botResponseText = queryKnowledgeBase(text);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 400);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          playClickSound();
          setIsOpen(!isOpen);
        }}
        className={`fixed bottom-6 right-6 z-[9990] px-4 py-3 rounded-full flex items-center gap-2.5 shadow-2xl transition-all border ${
          isOpen
            ? 'bg-red-600 hover:bg-red-700 text-white border-red-500'
            : 'bg-accent-blue hover:bg-blue-600 text-white border-blue-400 shadow-blue-500/25'
        }`}
      >
        {isOpen ? (
          <>
            <X className="w-5 h-5" />
            <span className="text-xs font-bold">Close Assistant</span>
          </>
        ) : (
          <>
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs font-bold">Ask Saran</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </>
        )}
      </motion.button>

      {/* Chat Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-22 right-6 z-[9990] w-[90vw] max-w-[400px] h-[520px] bg-[#0c0d12] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Window Header */}
            <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-accent-blue/20 border border-accent-blue/40 flex items-center justify-center text-accent-blue">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Ask Saran — Portfolio Bot</h3>
                  <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Portfolio Knowledge Base Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-foreground-muted hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs scrollbar-hide">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-accent-blue text-white rounded-br-xs font-medium'
                        : 'bg-white/10 text-gray-200 border border-white/5 rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-foreground-muted mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Pills */}
            <div className="px-3 py-2 border-t border-white/5 bg-black/40 overflow-x-auto scrollbar-hide flex gap-1.5">
              {quickActions.map((action) => (
                <button
                  key={action}
                  onClick={() => handleSend(action)}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-accent-blue hover:text-white border border-white/10 text-[10px] font-semibold text-gray-300 whitespace-nowrap transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-white/10 bg-white/5 flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about Saran's experience, GCP, Glido..."
                className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-foreground-muted focus:outline-none focus:border-accent-blue transition-colors"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim()}
                className="p-2 rounded-xl bg-accent-blue text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
