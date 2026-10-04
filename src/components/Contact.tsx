'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle2, Copy } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const eng = PORTFOLIO_DATA.engineer;

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:${eng.email}?subject=${subject}&body=${body}`;
    }, 800);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(eng.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" ref={sectionRef} className="section relative overflow-hidden bg-background">
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm text-accent-blue tracking-[0.3em] uppercase mb-4 block">
            Get In Touch
          </span>
          <h2 className="section-title mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Open to discussing Cloud Infrastructure, DevOps, DevSecOps and senior engineering opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          {/* Contact Details & Links Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-card p-6 border border-white/10 space-y-6">
              <h3 className="text-xl font-bold text-white mb-2">Direct Contact Information</h3>

              <div className="space-y-4">
                {/* Email with copy button */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-accent-blue">
                      <Mail className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase text-foreground-muted font-bold">Email</div>
                      <a href={`mailto:${eng.email}`} className="text-xs text-white font-medium hover:text-accent-blue">
                        {eng.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={copyEmailToClipboard}
                    className="p-2 text-foreground-muted hover:text-white transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-9 h-9 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-foreground-muted font-bold">Phone</div>
                    <div className="text-xs text-white font-medium">{eng.phone}</div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-foreground-muted font-bold">Location</div>
                    <div className="text-xs text-white font-medium">{eng.location}</div>
                  </div>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-accent-blue">Professional Links</div>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={eng.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl glass hover:bg-white/10 border border-white/10 flex items-center gap-2 text-xs font-semibold text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-blue-400" /> LinkedIn Profile
                  </a>
                  <a
                    href={eng.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl glass hover:bg-white/10 border border-white/10 flex items-center gap-2 text-xs font-semibold text-white transition-colors"
                  >
                    <Github className="w-4 h-4" /> GitHub Profile
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-7"
          >
            <div className="glass-card p-6 md:p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">Send a Message</h3>
              <p className="text-xs text-foreground-muted mb-6">
                Have a question about cloud architecture, DevSecOps pipelines, or notice period? Send a message directly.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">Message Prepared!</h4>
                  <p className="text-xs text-emerald-200">
                    Your default email client has been launched with your message. Thank you for reaching out!
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 rounded-lg bg-emerald-500 text-black text-xs font-bold mt-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Johnson"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-foreground-muted focus:outline-none focus:border-accent-blue transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1.5">Your Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-foreground-muted focus:outline-none focus:border-accent-blue transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1.5">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your infrastructure needs, job opportunity, or inquiry..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-foreground-muted focus:outline-none focus:border-accent-blue transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-accent-blue hover:bg-blue-600 text-white font-semibold text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Opening Mail Client...' : 'Send Message'}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
