import React from 'react';
import { motion } from 'framer-motion';

const projects = [
    {
        title: "Hajj & Umrah Travel Management System",
        description: "Merancang arsitektur full-stack terpisah (Decoupled SPA & PWA) dengan pelacakan pembayaran, manajemen jemaah, dan RBAC.",
        icon: "fas fa-plane-departure",
        color: "orange",
        tags: ["React 19 & Vite", "Laravel REST API", "TanStack Query", "TailwindCSS"]
    },
    {
        title: "Mobile POS System for Car Wash",
        description: "Mengembangkan aplikasi POS mobile lintas platform yang terintegrasi penuh dengan backend Laravel untuk analitik penjualan.",
        icon: "fas fa-car-side",
        color: "teal",
        tags: ["Flutter & Dart", "Laravel REST API", "MySQL", "Cross-Platform Mobile"]
    },
    {
        title: "Full-Stack F&B POS & Web Admin",
        description: "Membangun aplikasi POS mobile dan dashboard web admin untuk manajemen inventory, dilengkapi autentikasi Firebase.",
        icon: "fas fa-utensils",
        color: "blue",
        tags: ["Flutter", "Laravel", "Firebase Auth", "Google Sign-In", "MySQL"]
    },
    {
        title: "Consignment E-Commerce Platform",
        description: "Platform e-commerce full-stack khusus penjualan barang konsinyasi dengan arsitektur backend Laravel dan frontend React.",
        icon: "fas fa-store",
        color: "purple",
        tags: ["React.js", "TypeScript", "Laravel", "E-Commerce Architecture"]
    },
    {
        title: "Real-Time Inventory Management",
        description: "Aplikasi web sistem inventaris untuk pencatatan stok real-time dengan skema database relasional terstruktur.",
        icon: "fas fa-boxes",
        color: "orange",
        tags: ["Laravel", "Relational SQL", "RESTful APIs", "Database Optimization"]
    }
];

const colorMaps = {
    orange: {
        bg: "bg-orange-500/5",
        hoverBg: "group-hover:bg-orange-500/10",
        iconContainer: "from-orange-500/20 to-orange-500/5 text-orange-400",
        shadow: "hover:shadow-[0_8px_30px_rgba(249,115,22,0.1)]",
        borderHover: "hover:border-orange-500/50",
        titleHover: "group-hover/card:text-orange-300",
        tagText: "text-orange-300",
        tagBg: "bg-orange-500/10",
        tagBorder: "border-orange-500/20"
    },
    teal: {
        bg: "bg-teal-500/5",
        hoverBg: "group-hover:bg-teal-500/10",
        iconContainer: "from-teal-500/20 to-teal-500/5 text-teal-400",
        shadow: "hover:shadow-[0_8px_30px_rgba(45,212,191,0.1)]",
        borderHover: "hover:border-teal-500/50",
        titleHover: "group-hover/card:text-teal-300",
        tagText: "text-teal-300",
        tagBg: "bg-teal-500/10",
        tagBorder: "border-teal-500/20"
    },
    blue: {
        bg: "bg-blue-500/5",
        hoverBg: "group-hover:bg-blue-500/10",
        iconContainer: "from-blue-500/20 to-blue-500/5 text-blue-400",
        shadow: "hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)]",
        borderHover: "hover:border-blue-500/50",
        titleHover: "group-hover/card:text-blue-300",
        tagText: "text-blue-300",
        tagBg: "bg-blue-500/10",
        tagBorder: "border-blue-500/20"
    },
    purple: {
        bg: "bg-purple-500/5",
        hoverBg: "group-hover:bg-purple-500/10",
        iconContainer: "from-purple-500/20 to-purple-500/5 text-purple-400",
        shadow: "hover:shadow-[0_8px_30px_rgba(168,85,247,0.1)]",
        borderHover: "hover:border-purple-500/50",
        titleHover: "group-hover/card:text-purple-300",
        tagText: "text-purple-300",
        tagBg: "bg-purple-500/10",
        tagBorder: "border-purple-500/20"
    }
};

const ProjectsGallery = () => {
    return (
        <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="glass rounded-[2rem] p-6 sm:p-8 border-t border-t-white/10 relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-bl-[100px] -z-10 group-hover:bg-orange-500/10 transition-colors duration-500"></div>
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center text-orange-400 border border-orange-500/20 shadow-lg shadow-orange-500/5">
                    <i className="fas fa-laptop-code text-lg"></i>
                </div>
                <h2 className="text-xl font-bold text-white tracking-wide">Project</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map((project, idx) => {
                    const theme = colorMaps[project.color];
                    const isLastOdd = idx === projects.length - 1 && projects.length % 2 !== 0;
                    return (
                        <motion.div 
                            key={idx}
                            whileHover={{ y: -4 }}
                            className={`group/card bg-slate-900/40 hover:bg-slate-800/80 p-5 rounded-2xl border border-slate-700/50 ${theme.borderHover} ${theme.shadow} transition-all duration-300 cursor-pointer flex flex-col h-full ${isLastOdd ? 'sm:col-span-2 sm:flex-row sm:items-start sm:gap-5' : ''}`}
                        >
                            <div className={`w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br ${theme.iconContainer} flex items-center justify-center mb-3 ${isLastOdd ? 'sm:mb-0 sm:mt-0.5' : ''} group-hover/card:scale-110 ${idx % 2 === 0 ? 'group-hover/card:rotate-3' : 'group-hover/card:-rotate-3'} transition-transform duration-300`}>
                                <i className={`${project.icon} text-base`}></i>
                            </div>
                            <div className={`flex flex-col flex-1 h-full`}>
                                <h3 className={`text-white font-semibold text-base leading-tight ${theme.titleHover} transition-colors`}>{project.title}</h3>
                                <p className={`text-slate-400 text-[13px] text-justify mt-2 mb-3 flex-1 ${isLastOdd ? 'sm:max-w-2xl' : ''}`}>{project.description}</p>
                                <div className="flex flex-wrap gap-1.5 mt-auto">
                                    {project.tags.map(tag => (
                                        <span key={tag} className={`text-[11px] font-medium ${theme.tagText} ${theme.tagBg} px-2 py-1 rounded-md border ${theme.tagBorder}`}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </motion.section>
    );
};

export default ProjectsGallery;
