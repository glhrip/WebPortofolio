import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
    return (
        <motion.header 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="glass rounded-[2rem] p-8 sm:p-12 flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-10 relative overflow-hidden group hover:border-white/10 transition-colors duration-500"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="flex-1 space-y-6 relative z-10 text-center sm:text-left w-full">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 tracking-tight">
                        Galih Rizky <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Pradana</span>
                    </h1>
                    <p className="text-slate-400 text-lg sm:text-xl font-medium tracking-wide">Full-Stack & Mobile Developer | Informatics Engineer</p>
                    <p className="text-slate-300 text-sm leading-relaxed mt-4 bg-slate-900/30 p-4 rounded-xl border border-slate-800/50">
                        Dedicated Full-Stack Developer dan lulusan S1 Informatika Universitas Atma Jaya Yogyakarta dengan keahlian kuat dalam membangun aplikasi web yang scalable menggunakan Laravel, React.js, dan TypeScript. Berpengalaman merancang arsitektur basis data relasional yang robust serta RESTful APIs untuk mendukung solusi bisnis end-to-end. Dilengkapi kemampuan pengembangan aplikasi mobile lintas platform (Flutter), kepemimpinan organisasi, serta pengalaman praktis IT Support.
                    </p>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="flex flex-col sm:flex-row flex-wrap items-center sm:items-start justify-center sm:justify-start gap-3 text-sm"
                >
                    <a href="mailto:galihrizky829@gmail.com" className="flex items-center gap-2 text-slate-300 hover:text-white transition-all duration-300 bg-slate-900/50 hover:bg-slate-800 px-5 py-2.5 rounded-full border border-slate-800 hover:border-teal-500/50 w-full sm:w-auto justify-center shadow-lg hover:shadow-teal-500/20">
                        <i className="fas fa-envelope text-teal-400"></i> galihrizky829@gmail.com
                    </a>
                    <a href="tel:+6281328562495" className="flex items-center gap-2 text-slate-300 hover:text-white transition-all duration-300 bg-slate-900/50 hover:bg-slate-800 px-5 py-2.5 rounded-full border border-slate-800 hover:border-blue-500/50 w-full sm:w-auto justify-center shadow-lg hover:shadow-blue-500/20">
                        <i className="fas fa-phone text-blue-400"></i> +6281328562495
                    </a>
                    <a href="https://linkedin.com/in/galihrizkyp" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-white transition-all duration-300 bg-slate-900/50 hover:bg-slate-800 px-5 py-2.5 rounded-full border border-slate-800 hover:border-blue-600/50 w-full sm:w-auto justify-center shadow-lg hover:shadow-blue-600/20">
                        <i className="fab fa-linkedin text-blue-500"></i> LinkedIn
                    </a>
                    <a href="https://github.com/glhrip" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-white transition-all duration-300 bg-slate-900/50 hover:bg-slate-800 px-5 py-2.5 rounded-full border border-slate-800 hover:border-slate-500/50 w-full sm:w-auto justify-center shadow-lg hover:shadow-slate-500/20">
                        <i className="fab fa-github text-slate-300"></i> GitHub
                    </a>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="flex items-start gap-3 text-sm text-slate-400 mt-4 max-w-lg mx-auto sm:mx-0 bg-slate-900/30 p-4 rounded-2xl border border-slate-800/50"
                >
                    <div className="mt-0.5"><i className="fas fa-location-dot text-teal-500"></i></div>
                    <p className="leading-relaxed">Beluk, Kec. Bayat, Kabupaten Klaten, Jawa Tengah, 57462 Kab. Klaten</p>
                </motion.div>
            </div>
            
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
                className="relative z-10 shrink-0"
            >
                <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-slate-800/80 shadow-[0_0_40px_rgba(45,212,191,0.15)] relative group-hover:border-teal-500/40 group-hover:shadow-[0_0_40px_rgba(45,212,191,0.3)] transition-all duration-700">
                    <img src="https://ui-avatars.com/api/?name=Galih+Rizky&background=0f172a&color=2dd4bf&size=256&bold=true&font-size=0.33" alt="Galih Rizky Pradana" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
            </motion.div>
        </motion.header>
    );
};

export default Header;
