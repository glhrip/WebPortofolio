import React from 'react';
import { motion } from 'framer-motion';

const projects = [
    {
        title: "Sistem Manajemen Biro Perjalanan Haji",
        description: "Aplikasi full-stack web untuk manajemen administrasi dan operasional biro perjalanan.",
        icon: "fas fa-plane-departure",
        color: "orange",
        tags: ["React.js", "Laravel"]
    },
    {
        title: "Sistem POS Cuci Kendaraan",
        description: "Aplikasi POS mobile cross-platform terintegrasi backend Laravel untuk bisnis cuci mobil.",
        icon: "fas fa-car-side",
        color: "teal",
        tags: ["Flutter", "REST API"]
    },
    {
        title: "Aplikasi POS Mobile F&B",
        description: "Aplikasi kasir digital dengan manajemen state Provider dan sinkronisasi real-time.",
        icon: "fas fa-utensils",
        color: "blue",
        tags: ["Flutter", "Firebase"]
    },
    {
        title: "E-Commerce Barang Konsinyasi",
        description: "Aplikasi e-commerce full-stack untuk penjualan dan pengelolaan barang second-hand.",
        icon: "fas fa-store",
        color: "purple",
        tags: ["Laravel", "React.js"]
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
            className="glass rounded-[2rem] p-8 sm:p-10 border-t border-t-white/10 relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/5 rounded-bl-[120px] -z-10 group-hover:bg-orange-500/10 transition-colors duration-500"></div>
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center text-orange-400 border border-orange-500/20 shadow-lg shadow-orange-500/5">
                    <i className="fas fa-laptop-code text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-white tracking-wide">Project</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {projects.map((project, idx) => {
                    const theme = colorMaps[project.color];
                    return (
                        <motion.div 
                            key={idx}
                            whileHover={{ y: -6 }}
                            className={`group/card bg-slate-900/40 hover:bg-slate-800/80 p-6 rounded-2xl border border-slate-700/50 ${theme.borderHover} ${theme.shadow} transition-all duration-300 cursor-pointer flex flex-col h-full`}
                        >
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${theme.iconContainer} flex items-center justify-center mb-4 group-hover/card:scale-110 ${idx % 2 === 0 ? 'group-hover/card:rotate-3' : 'group-hover/card:-rotate-3'} transition-transform duration-300`}>
                                <i className={`${project.icon} text-lg`}></i>
                            </div>
                            <h3 className={`text-white font-semibold text-lg leading-tight ${theme.titleHover} transition-colors`}>{project.title}</h3>
                            <p className="text-slate-400 text-sm mt-3 flex-1 mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tags.map(tag => (
                                    <span key={tag} className={`text-xs font-medium ${theme.tagText} ${theme.tagBg} px-2.5 py-1 rounded-md border ${theme.tagBorder}`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </motion.section>
    );
};

export default ProjectsGallery;
