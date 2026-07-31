import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
};

const ExperienceTimeline = () => {
    return (
        <>
            {/* Pendidikan */}
            <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                variants={fadeInUp}
                className="glass rounded-[2rem] p-8 border-t border-t-white/10 relative overflow-hidden group mb-8"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-bl-[100px] -z-10 group-hover:bg-teal-500/10 transition-colors duration-500"></div>
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-500/5 flex items-center justify-center text-teal-400 border border-teal-500/20 shadow-lg shadow-teal-500/5">
                        <i className="fas fa-graduation-cap text-xl"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-wide">Pendidikan</h2>
                </div>
                
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-[2px] before:bg-gradient-to-b before:from-teal-500/50 before:via-slate-700 before:to-transparent">
                    
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="relative pl-10 group/item transition-transform"
                    >
                        <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-slate-950 border-[3px] border-teal-500 z-10 shadow-[0_0_10px_rgba(45,212,191,0.4)] group-hover/item:scale-110 transition-transform"></div>
                        <h3 className="text-white font-semibold text-lg">S1 Teknik Informatika</h3>
                        <p className="text-teal-400 text-sm mb-2">Universitas Atma Jaya Yogyakarta, Yogyakarta</p>
                        <p className="text-slate-400 text-sm mb-3 leading-relaxed">Mata Kuliah Relevan: Rekayasa Perangkat Lunak, Pemrograman Web, Desain Basis Data Relasional, Desain RESTful API, & Rekayasa Jaringan.</p>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900/80 text-xs font-medium rounded-full border border-slate-700 text-slate-300">
                            <i className="far fa-calendar-alt text-slate-500"></i> Agustus 2022 - Agustus 2026
                        </span>
                    </motion.div>
                </div>
            </motion.section>

            {/* Pengalaman */}
            <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                variants={fadeInUp}
                className="glass rounded-[2rem] p-8 border-t border-t-white/10 relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-[100px] -z-10 group-hover:bg-blue-500/10 transition-colors duration-500"></div>
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/5">
                        <i className="fas fa-briefcase text-xl"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-wide">Pengalaman</h2>
                </div>
                
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-[2px] before:bg-gradient-to-b before:from-blue-500/50 before:via-slate-700 before:to-transparent">
                    
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="relative pl-10 group/item transition-transform"
                    >
                        <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-slate-950 border-[3px] border-blue-500 z-10 shadow-[0_0_10px_rgba(59,130,246,0.4)] group-hover/item:scale-110 transition-transform"></div>
                        <h3 className="text-white font-semibold text-lg">IT Support Intern</h3>
                        <p className="text-blue-400 text-sm mb-2">KHAS Hotel Malioboro Yogyakarta, Yogyakarta</p>
                        <ul className="list-disc list-outside ml-4 text-slate-400 text-sm mb-3 space-y-1">
                            <li>Mendeploy sistem Android TV dan mengatur jaringan lokal (LAN/WLAN) hotel.</li>
                            <li>Melakukan pemeliharaan rutin UPS dan troubleshooting harian software/hardware.</li>
                        </ul>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900/80 text-xs font-medium rounded-full border border-slate-700 text-slate-300">
                            <i className="far fa-calendar-alt text-slate-500"></i> Des 2025 - Feb 2026
                        </span>
                    </motion.div>
                    
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="relative pl-10 group/item transition-transform"
                    >
                        <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-slate-950 border-[3px] border-slate-600 z-10 group-hover/item:border-blue-500/50 group-hover/item:scale-110 transition-all"></div>
                        <h3 className="text-white font-semibold text-lg">Koordinator Operasional</h3>
                        <p className="text-slate-400 text-sm mb-2">KOPMA UAJY, Yogyakarta</p>
                        <ul className="list-disc list-outside ml-4 text-slate-400 text-sm mb-3 space-y-1">
                            <li>Mengawasi kegiatan operasional harian koperasi mahasiswa.</li>
                            <li>Berkolaborasi dengan tim lintas divisi untuk mengevaluasi operasi koperasi.</li>
                        </ul>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900/80 text-xs font-medium rounded-full border border-slate-700 text-slate-400">
                            <i className="far fa-calendar-alt text-slate-500"></i> Jul 2024 - Mei 2025
                        </span>
                    </motion.div>
                    
                </div>
            </motion.section>
        </>
    );
};

export default ExperienceTimeline;
