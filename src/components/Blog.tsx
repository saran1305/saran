'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, Tag, Clock, Calendar, ArrowRight, X, User, Share2 } from 'lucide-react';
import { PORTFOLIO_DATA, BlogPost } from '@/data/portfolioData';

export default function Blog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);

  const categories = ['All', 'Cloud', 'DevOps', 'DevSecOps', 'Architecture', 'Security', 'Troubleshooting'];

  const filteredPosts = PORTFOLIO_DATA.blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="section relative overflow-hidden bg-background"
    >
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm text-accent-blue tracking-[0.3em] uppercase mb-4 block">
            Technical Insights & Documentation
          </span>
          <h2 className="section-title mb-6">
            Engineering <span className="gradient-text">Journal</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Articles, architecture patterns, and production troubleshooting post-mortems written from hands-on cloud experience.
          </p>
        </motion.div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  selectedCategory === cat
                    ? 'bg-accent-blue text-white border-accent-blue shadow-lg shadow-blue-500/20'
                    : 'glass text-foreground-muted border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles & tags..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-foreground-muted focus:outline-none focus:border-accent-blue transition-colors"
            />
          </div>
        </div>

        {/* Blog Post Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group glass-card p-6 border border-white/10 flex flex-col justify-between hover:border-accent-blue/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-foreground-muted mb-3">
                  <span className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 font-mono font-bold">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-blue transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-foreground-muted mb-4 leading-relaxed line-clamp-3">
                  {post.summary}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5">
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setReadingPost(post)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-accent-blue hover:text-white border border-white/10 text-xs font-semibold text-gray-200 transition-all group-hover:border-accent-blue"
                >
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 text-foreground-muted text-sm">
            No articles found matching "{searchQuery}". Try searching another keyword or selecting "All".
          </div>
        )}
      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {readingPost && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReadingPost(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0d12] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-accent-blue" />
                  <span className="text-xs font-mono font-bold text-accent-blue">{readingPost.category} Article</span>
                </div>
                <button
                  onClick={() => setReadingPost(null)}
                  className="p-2 rounded-lg text-foreground-muted hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Reader Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 text-foreground-muted leading-relaxed">
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">{readingPost.title}</h1>
                  <div className="flex items-center gap-4 text-xs text-foreground-muted border-b border-white/10 pb-6">
                    <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-accent-blue" /> Saran M</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-accent-blue" /> {readingPost.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-accent-blue" /> {readingPost.readTime}</span>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none text-gray-300 text-sm space-y-4">
                  {readingPost.content.split('\n\n').map((paragraph, i) => {
                    if (paragraph.startsWith('### ')) {
                      return <h3 key={i} className="text-xl font-bold text-white mt-6 mb-2">{paragraph.replace('### ', '')}</h3>;
                    }
                    if (paragraph.startsWith('#### ')) {
                      return <h4 key={i} className="text-base font-bold text-accent-blue mt-4 mb-1">{paragraph.replace('#### ', '')}</h4>;
                    }
                    if (paragraph.startsWith('```')) {
                      return (
                        <pre key={i} className="p-4 rounded-xl bg-black/80 border border-white/10 text-xs font-mono text-blue-300 overflow-x-auto my-4">
                          {paragraph.replace(/```[a-z]*/g, '').trim()}
                        </pre>
                      );
                    }
                    return <p key={i} className="leading-relaxed">{paragraph}</p>;
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-white/5 border-t border-white/10 flex justify-between items-center text-xs">
                <span className="text-foreground-muted">Engineering Journal • Saran M</span>
                <button
                  onClick={() => setReadingPost(null)}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
