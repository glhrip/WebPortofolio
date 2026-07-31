import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
    {
        title: "Web Technologies & Frameworks",
        icon: "fas fa-globe",
        color: "from-blue-500/20 to-blue-500/5",
        iconColor: "text-blue-400",
        shadow: "shadow-blue-500/5",
        border: "border-blue-500/20",
        skills: ["Laravel", "React.js (19)", "RESTful APIs", "Flutter", "Vite & PWA", "TanStack Query"]
    },
    {
        title: "Programming Languages",
        icon: "fas fa-code",
        color: "from-purple-500/20 to-purple-500/5",
        iconColor: "text-purple-400",
        shadow: "shadow-purple-500/5",
        border: "border-purple-500/20",
        skills: ["JavaScript", "TypeScript", "PHP", "SQL / T-SQL", "Dart", "C / C++"]
    },
    {
        title: "Databases & Cloud",
        icon: "fas fa-database",
        color: "from-teal-500/20 to-teal-500/5",
        iconColor: "text-teal-400",
        shadow: "shadow-teal-500/5",
        border: "border-teal-500/20",
        skills: ["Relational DB Design", "MySQL", "SQL Server", "Firebase Auth"]
    },
    {
        title: "Tools & Infrastructure",
        icon: "fas fa-tools",
        color: "from-orange-500/20 to-orange-500/5",
        iconColor: "text-orange-400",
        shadow: "shadow-orange-500/5",
        border: "border-orange-500/20",
        skills: ["Git / GitHub", "Docker", "Linux", "VPS Deployment", "Nginx / Apache", "Postman"]
    }
];

const SkillsGrid = () => {
    return (
        <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="glass rounded-[2rem] p-8 sm:p-10 border-t border-t-white/10 relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 rounded-bl-[120px] -z-10 group-hover:bg-purple-500/10 transition-colors duration-500"></div>
            <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center text-purple-400 border border-purple-500/20 shadow-lg shadow-purple-500/5">
                    <i className="fas fa-layer-group text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-white tracking-wide">Ringkasan Keahlian Teknis</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillCategories.map((category, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className={`bg-slate-900/40 p-6 rounded-2xl border border-slate-700/50 hover:border-slate-600/80 transition-all duration-300 group/cat`}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center ${category.iconColor} border ${category.border} shadow-lg ${category.shadow}`}>
                                <i className={`${category.icon} text-lg`}></i>
                            </div>
                            <h3 className="text-white font-semibold text-lg">{category.title}</h3>
                        </div>
                        
                        <div className="flex flex-wrap gap-2.5">
                            {category.skills.map((skill, i) => (
                                <span 
                                    key={i} 
                                    className="px-3.5 py-1.5 bg-slate-800/80 text-slate-300 text-sm font-medium rounded-lg border border-slate-700/80 hover:bg-slate-700 hover:text-white transition-colors cursor-default"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default SkillsGrid;
