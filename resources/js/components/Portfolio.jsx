import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import ExperienceTimeline from './ExperienceTimeline';
import SkillsGrid from './SkillsGrid';
import ProjectsGallery from './ProjectsGallery';

const Portfolio = () => {
    return (
        <>
            {/* Animated Background Glows */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-teal-600/10 blur-[120px] animate-[pulse_8s_ease-in-out_infinite]"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] animate-[pulse_10s_ease-in-out_infinite_1s]"></div>
                <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full bg-purple-600/5 blur-[100px] animate-[pulse_7s_ease-in-out_infinite_2s]"></div>
            </div>

            <main className="max-w-5xl mx-auto px-6 py-12 sm:py-20 space-y-12">
                <Header />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-5 space-y-8">
                        <ExperienceTimeline />
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-7 space-y-8">
                        <SkillsGrid />
                    </div>
                </div>
                
                <ProjectsGallery />

                {/* Footer */}
                <motion.footer 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center text-slate-500 text-sm py-10"
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="h-px bg-slate-800 w-16"></div>
                        <div className="text-slate-700"><i className="fas fa-star"></i></div>
                        <div className="h-px bg-slate-800 w-16"></div>
                    </div>
                    <p>&copy; 2026 Galih Rizky Pradana. Crafted with <i className="fas fa-heart text-red-500/80 mx-1 animate-pulse"></i> and React.</p>
                </motion.footer>
            </main>
        </>
    );
};

export default Portfolio;
