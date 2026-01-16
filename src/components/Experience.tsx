'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Calendar, MapPin, Building2 } from 'lucide-react';

const experiences = [
    {
        id: 1,
        title: 'Digital Transformation Specialist',
        company: 'Ideassion Technology Solutions',
        location: 'Chennai, Tamil Nadu, India (Hybrid)',
        period: 'Aug 2025 - Present',
        description: 'Driving R&D and cross-functional collaborations while architecting cloud and DevOps solutions. Leading digital transformation initiatives.',
        highlights: [
            'Spearheading Research and Development (R&D) initiatives',
            'Driving leadership development and cross-functional collaborations',
            'Architecting multi-cloud solutions on AWS, Azure, GCP, and DigitalOcean',
            'Specializing in DevOps practices and modern web technologies (React.js)'
        ],
        technologies: ['AWS', 'Azure', 'GCP', 'DigitalOcean', 'DevOps', 'React.js', 'JavaScript'],
    },
    {
        id: 2,
        title: 'Senior Digital Transformation Engineer',
        company: 'Ideassion Technology Solutions',
        location: 'Chennai, Tamil Nadu, India (Hybrid)',
        period: 'Aug 2024 - Aug 2025',
        description: 'Led cloud infrastructure management and advanced front-end engineering for enterprise solutions.',
        highlights: [
            'Managed complex cloud environments across AWS, Azure, and GCP',
            'Optimized DevOps workflows for improved deployment efficiency',
            'Developed scalable applications using React.js and JavaScript',
            'Mentored junior engineers and led technical decision making'
        ],
        technologies: ['AWS', 'Azure', 'GCP', 'DigitalOcean', 'DevOps', 'React.js', 'JavaScript'],
    },
    {
        id: 3,
        title: 'Digital Transformation Engineer',
        company: 'Ideassion Technology Solutions',
        location: 'Chennai, Tamil Nadu, India (Hybrid)',
        period: 'May 2021 - Aug 2024',
        description: 'Core contributor to full-stack development and cloud migrations.',
        highlights: [
            'Built responsive user interfaces with React.js and CSS',
            'Implemented backend services using Node.js',
            'Managed cloud resources on AWS and Microsoft Azure',
            'Collaborated on full lifecycle software development'
        ],
        technologies: ['React.js', 'Node.js', 'AWS', 'Azure', 'JavaScript', 'CSS'],
    },
    {
        id: 4,
        title: 'Digital Transformation Intern',
        company: 'Ideassion Technology Solutions',
        location: 'Chennai, Tamil Nadu, India (On-site)',
        period: 'Feb 2021 - May 2021',
        description: 'Gained hands-on experience in modern web development and front-end technologies.',
        highlights: [
            'Developed foundational skills in HTML, CSS, and JavaScript',
            'Assisted in building React.js components',
            'Participated in agile development processes',
            'Learned industry best practices for software delivery'
        ],
        technologies: ['React.js', 'JavaScript', 'HTML', 'CSS'],
    },
];

function ExperienceCard({
    experience,
    index,
    isInView
}: {
    experience: typeof experiences[0];
    index: number;
    isInView: boolean;
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid grid-cols-[1fr_auto_1fr] gap-8 items-start"
        >
            {/* Content - alternating sides */}
            <div className={`${index % 2 === 0 ? 'col-start-1' : 'col-start-3 order-3'}`}>
                <motion.div
                    layout
                    className="glass-card p-8 group hover:border-accent-blue/30 transition-all duration-300"
                >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="text-xl font-bold mb-1">{experience.title}</h3>
                            <div className="flex items-center gap-2 text-foreground-muted">
                                <Building2 className="w-4 h-4" />
                                <span>{experience.company}</span>
                            </div>
                        </div>
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-wrap gap-4 text-sm text-foreground-muted mb-4">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {experience.period}
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {experience.location}
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-foreground-muted mb-4">{experience.description}</p>

                    {/* Expand button */}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-2 text-sm text-accent-blue hover:text-foreground transition-colors"
                    >
                        {isExpanded ? 'Show less' : 'Show more'}
                        <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChevronDown className="w-4 h-4" />
                        </motion.div>
                    </button>

                    {/* Expandable content */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="pt-4 mt-4 border-t border-glass-border">
                                    <h4 className="font-semibold mb-3">Key Achievements</h4>
                                    <ul className="space-y-2">
                                        {experience.highlights.map((highlight, i) => (
                                            <li key={i} className="flex items-start gap-2 text-foreground-muted">
                                                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 shrink-0" />
                                                {highlight}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {experience.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 text-xs rounded-full glass"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Timeline line and dot */}
            <div className="col-start-2 flex flex-col items-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: index * 0.2 + 0.3 }}
                    className="w-4 h-4 rounded-full bg-foreground border-4 border-background z-10"
                />
                <div className="w-px h-full bg-glass-border -mt-2" />
            </div>

            {/* Empty space for alternating layout */}
            <div className={`${index % 2 === 0 ? 'col-start-3 order-3' : 'col-start-1'}`} />
        </motion.div>
    );
}

export default function Experience() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="section relative overflow-hidden"
        >
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <span className="text-sm text-accent-blue tracking-[0.3em] uppercase mb-4 block">
                        Career Journey
                    </span>
                    <h2 className="section-title mb-6">
                        Professional <span className="gradient-text">Experience</span>
                    </h2>
                    <p className="section-subtitle mx-auto">
                        A track record of delivering impactful digital transformation projects
                        across diverse industries and technology stacks.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Central Base Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-glass-border -translate-x-1/2" />

                    {/* Glowing Scroll Progress Line */}
                    <motion.div
                        style={{ height: useTransform(useScroll({ target: sectionRef, offset: ["start center", "end center"] }).scrollYProgress, [0, 1], ["0%", "100%"]) }}
                        className="absolute left-1/2 top-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 -translate-x-1/2 shadow-[0_0_15px_rgba(59,130,246,0.6)] z-0"
                    />

                    {/* Experience cards */}
                    <div className="space-y-12 relative z-10">
                        {experiences.map((experience, index) => (
                            <ExperienceCard
                                key={experience.id}
                                experience={experience}
                                index={index}
                                isInView={isInView}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
