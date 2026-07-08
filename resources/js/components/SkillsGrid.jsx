import React from 'react';
import { motion } from 'framer-motion';

const skills = [
    { name: "Laravel", width: "90%", color: "from-purple-600 to-purple-400", hoverText: "text-purple-300" },
    { name: "PHP", width: "85%", color: "from-purple-600 to-purple-400", hoverText: "text-purple-300" },
    { name: "MySQL", width: "80%", color: "from-teal-600 to-teal-400", hoverText: "text-teal-300" },
    { name: "React.js", width: "85%", color: "from-blue-600 to-blue-400", hoverText: "text-blue-300" },
    { name: "Flutter", width: "75%", color: "from-blue-600 to-blue-400", hoverText: "text-blue-300" },
    { name: "REST API", width: "90%", color: "from-teal-600 to-teal-400", hoverText: "text-teal-300" },
    { name: "Troubleshooting software", width: "70%", color: "from-orange-500 to-amber-400", hoverText: "text-orange-300" },
    { name: "Git/GitHub", width: "85%", color: "from-red-600 to-red-400", hoverText: "text-red-400" }
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
                    <i className="fas fa-code text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-white tracking-wide">Keahlian</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                {skills.map((skill, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="group/skill cursor-default"
                    >
                        <div className="flex justify-between mb-2.5">
                            <span className={`text-slate-200 font-medium group-hover/skill:${skill.hoverText} transition-colors`}>{skill.name}</span>
                            <span className={`text-slate-400 text-sm font-semibold group-hover/skill:${skill.hoverText} transition-colors`}>{skill.width}</span>
                        </div>
                        <div className="h-2.5 w-full bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50">
                            <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: skill.width }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                                className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                            >
                                <div className="absolute inset-y-0 right-0 w-8 bg-white/20 blur-[2px]"></div>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}

                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: skills.length * 0.1, duration: 0.5 }}
                    className="col-span-1 sm:col-span-2 group/skill cursor-default"
                >
                    <div className="flex justify-between mb-2.5 sm:w-1/2 sm:pr-6">
                        <span className="text-slate-200 font-medium group-hover/skill:text-slate-300 transition-colors">Konfigurasi jaringan</span>
                        <span className="text-slate-400 text-sm font-semibold opacity-50 group-hover/skill:opacity-100 transition-opacity">50%</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50 sm:w-1/2">
                        <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: "50%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                            className="h-full bg-gradient-to-r from-slate-500 to-slate-400 rounded-full relative"
                        >
                            <div className="absolute inset-y-0 right-0 w-8 bg-white/20 blur-[2px]"></div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default SkillsGrid;
