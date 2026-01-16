'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const profileImages = [
    '/profile.png',
    '/profile-slideshow/slide-2.png',
    '/profile-slideshow/slide-3.png'
];

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    const [isHovering, setIsHovering] = React.useState(false);

    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isHovering) {
            interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % profileImages.length);
            }, 2500); // Slower interval
        } else {
            setCurrentImageIndex(0); // Reset to default
        }
        return () => clearInterval(interval);
    }, [isHovering]);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="section relative overflow-hidden"
        >
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative flex justify-center lg:justify-start"
                    >
                        <div
                            className="relative group"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            {/* Glow effect behind image */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-accent-blue/20 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            {/* Glass card container */}
                            <motion.div
                                whileHover={{ rotateY: 8, rotateX: -5, scale: 1.02 }}
                                transition={{ duration: 0.4 }}
                                className="relative glass-card p-1 overflow-hidden shadow-2xl"
                                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                            >
                                {/* Increased size: w-80 md:w-96 to w-96 md:w-[450px] approximately +20-25% */}
                                <div className="relative w-80 h-[30rem] md:w-[30rem] md:h-[38rem] overflow-hidden rounded-2xl">
                                    {profileImages.map((src, index) => (
                                        <Image
                                            key={src}
                                            src={src}
                                            alt="Saran M - Digital Transformation Specialist"
                                            fill
                                            className={`object-cover object-top transition-opacity duration-700 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                                }`}
                                            priority={index === 0}
                                        />
                                    ))}
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent z-10" />
                                </div>

                                {/* Floating info card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.5, duration: 0.6 }}
                                    className="absolute bottom-8 left-4 right-4 glass p-4 rounded-xl z-20"
                                >
                                    <p className="text-sm text-foreground-muted">Based in</p>
                                    <p className="font-semibold">Chennai, India</p>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.3 }}
                            className="text-sm text-accent-blue tracking-[0.3em] uppercase mb-4 block"
                        >
                            About Me
                        </motion.span>

                        <h2 className="section-title mb-8">
                            Transforming Ideas Into
                            <br />
                            <span className="gradient-text">Digital Excellence</span>
                        </h2>

                        <div className="space-y-6 text-foreground-muted text-lg leading-relaxed">
                            <p>
                                With over <span className="text-foreground font-medium">5 years of experience</span> in
                                digital transformation, I specialize in architecting scalable front-end solutions and
                                building resilient cloud infrastructure that powers modern enterprises.
                            </p>

                            <p>
                                I lead cross-functional teams to deliver high-impact projects that bridge the gap between
                                complex technical requirements and seamless user experiences. My expertise spans from
                                crafting pixel-perfect React applications to orchestrating sophisticated CI/CD pipelines
                                across multi-cloud environments.
                            </p>

                            <p>
                                I believe in <span className="text-foreground font-medium">building systems that scale</span> —
                                not just technically, but in a way that empowers teams and accelerates business growth.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-glass-border">
                            {[
                                { value: '5+', label: 'Years Experience' },
                                { value: '20+', label: 'Projects Delivered' },
                                { value: '100%', label: 'Client Satisfaction' },
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                                    <div className="text-sm text-foreground-muted">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
