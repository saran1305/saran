'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Mail, MessageSquare, CheckCircle2 } from 'lucide-react';

type Message = {
    id: string;
    text: string;
    sender: 'bot' | 'user';
    type?: 'input-name' | 'input-email' | 'input-message' | 'text';
};

const initialMessages: Message[] = [
    {
        id: '1',
        text: "Hi there! 👋 I'm Saran's AI Assistant.",
        sender: 'bot',
        type: 'text'
    },
    {
        id: '2',
        text: "I can help you get in touch with him directly. First, what's your name?",
        sender: 'bot',
        type: 'input-name'
    }
];

import { useSound } from '@/context/SoundContext';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const { isSoundEnabled } = useSound();

    const playClickSound = () => {
        if (isSoundEnabled) {
            const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.value = 0.2;

            oscillator.start();
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    };
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [inputValue, setInputValue] = useState('');
    const [currentStep, setCurrentStep] = useState<'name' | 'email' | 'message' | 'complete'>('name');
    const [userData, setUserData] = useState({ name: '', email: '', message: '' });
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        // Add user message
        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            type: 'text'
        };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');

        // Process step
        setTimeout(() => {
            let botResponse: Message | null = null;

            if (currentStep === 'name') {
                setUserData(prev => ({ ...prev, name: userMsg.text }));
                botResponse = {
                    id: Date.now().toString() + 'bot',
                    text: `Nice to meet you, ${userMsg.text}! What's your email address?`,
                    sender: 'bot',
                    type: 'input-email'
                };
                setCurrentStep('email');
            } else if (currentStep === 'email') {
                setUserData(prev => ({ ...prev, email: userMsg.text }));
                botResponse = {
                    id: Date.now().toString() + 'bot',
                    text: "Got it. What message would you like to send to Saran?",
                    sender: 'bot',
                    type: 'input-message'
                };
                setCurrentStep('message');
            } else if (currentStep === 'message') {
                setUserData(prev => ({ ...prev, message: userMsg.text }));
                botResponse = {
                    id: Date.now().toString() + 'bot',
                    text: "Perfect! I'm preparing your email now...",
                    sender: 'bot',
                    type: 'text'
                };
                setCurrentStep('complete');

                // Simulate sending and open mailto
                setTimeout(() => {
                    const subject = encodeURIComponent(`Portfolio Contact from ${userData.name}`);
                    const body = encodeURIComponent(`Name: ${userData.name}\nEmail: ${userData.email}\n\nMessage:\n${userMsg.text}`);
                    window.location.href = `mailto:shreecharan1305@gmail.com?subject=${subject}&body=${body}`;

                    setMessages(prev => [...prev, {
                        id: Date.now().toString() + 'final',
                        text: "I've opened your email client to send the message. Thanks for reaching out!",
                        sender: 'bot',
                        type: 'text'
                    }]);
                }, 1500);
            }

            if (botResponse) {
                setMessages(prev => [...prev, botResponse!]);
            }
        }, 600);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <>
            {/* Widget Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                    setIsOpen(!isOpen);
                    playClickSound();
                }}
                className={`fixed bottom-8 right-8 z-[9990] w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 transition-colors ${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X className="text-white w-6 h-6" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                        >
                            <MessageCircle className="text-white w-6 h-6" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-8 z-[9990] w-[350px] md:w-[400px] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[600px]"
                    >
                        {/* Header */}
                        <div className="p-4 bg-white/5 border-b border-white/10 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-600/50">
                                <span className="text-xl">🤖</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Saran's Assistant</h3>
                                <p className="text-xs text-green-400 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                    Online
                                </p>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-4 min-h-[300px] max-h-[400px] scrollbar-hide">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                            ? 'bg-blue-600 text-white rounded-br-none'
                                            : 'bg-white/10 text-gray-200 rounded-bl-none'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        {currentStep !== 'complete' && (
                            <div className="p-3 border-t border-white/10 bg-white/5">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        placeholder={
                                            currentStep === 'name' ? "Enter your name..." :
                                                currentStep === 'email' ? "Enter your email..." :
                                                    "Type your message..."
                                        }
                                        className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                                        autoFocus
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!inputValue.trim()}
                                        className="p-2 rounded-xl bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
