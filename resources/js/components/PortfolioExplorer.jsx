import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, Folder, File, Search, Moon, Sun } from 'lucide-react';

// Typing Animation Component
const TypingAnimation = ({ text, speed = 50 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(prev => prev + text[index]);
                setIndex(index + 1);
            }, speed);
            return () => clearTimeout(timer);
        }
    }, [index, text, speed]);

    return (
        <span>
            {displayedText}
            <span className="animate-pulse">_</span>
        </span>
    );
};

// Matrix Rain Background Component
const MatrixRain = () => {
    const columns = Math.floor(window.innerWidth / 20);
    const drops = Array.from({ length: columns }, (_, i) => i);

    return (
        <div className="fixed inset-0 pointer-events-none opacity-10 overflow-hidden">
            {drops.map(i => (
                <div
                    key={i}
                    className="absolute text-lime-400 font-mono text-xs"
                    style={{
                        left: `${i * 20}px`,
                        animation: `fall ${Math.random() * 10 + 10}s linear infinite`,
                        animationDelay: `${Math.random() * 5}s`,
                    }}
                >
                    {Math.random().toString(36).substr(2, 5)}
                </div>
            ))}
            <style>{`
                @keyframes fall {
                    to {
                        transform: translateY(100vh);
                    }
                }
            `}</style>
        </div>
    );
};

// Scanline Effect Component
const ScanlineEffect = () => {
    return (
        <div className="fixed inset-0 pointer-events-none opacity-5" 
            style={{
                backgroundImage: `repeating-linear-gradient(0deg, rgba(0, 0, 0, .15) 0px, rgba(0, 0, 0, .15) 1px, transparent 1px, transparent 2px)`,
                animation: 'scanlines 8s linear infinite'
            }}>
            <style>{`
                @keyframes scanlines {
                    0% {
                        transform: translateY(0);
                    }
                    100% {
                        transform: translateY(10px);
                    }
                }
            `}</style>
        </div>
    );
};

// Glitch Animation Component
const GlitchText = ({ children }) => {
    return (
        <div className="relative">
            <span>{children}</span>
            <span className="absolute top-0 left-0 text-lime-400 opacity-0"
                style={{
                    animation: 'glitch 0.3s infinite',
                    animationDelay: '0s',
                    textShadow: '2px 0 #ff00ff, -2px 0 #00ffff'
                }}>
                {children}
            </span>
            <style>{`
                @keyframes glitch {
                    0% {
                        opacity: 0;
                        clip-path: inset(40% 0 61% 0);
                    }
                    20% {
                        opacity: 1;
                        clip-path: inset(92% 0 1% 0);
                    }
                    40% {
                        opacity: 0;
                        clip-path: inset(43% 0 1% 0);
                    }
                    60% {
                        opacity: 1;
                        clip-path: inset(25% 0 58% 0);
                    }
                    80% {
                        opacity: 0;
                        clip-path: inset(54% 0 7% 0);
                    }
                    100% {
                        opacity: 1;
                        clip-path: inset(58% 0 43% 0);
                    }
                }
            `}</style>
        </div>
    );
};

// Bouncing Icon Component
const BouncingIcon = ({ icon, delay = 0 }) => {
    return (
        <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay }}
            className="inline-block"
        >
            {icon}
        </motion.div>
    );
};

const PixelPortfolioExplorer = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [expandedFolders, setExpandedFolders] = useState({
        root: true,
        projects: true,
    });
    const [selectedItem, setSelectedItem] = useState('about');
    const [searchQuery, setSearchQuery] = useState('');
    const [breadcrumb, setBreadcrumb] = useState(['Portfolio']);
    const [showHero, setShowHero] = useState(true);

    // Data struktur folder
    const folderStructure = {
        root: {
            name: 'Portfolio',
            type: 'folder',
            children: {
                about: { name: 'About Me', type: 'file', icon: '👤' },
                projects: {
                    name: 'Projects',
                    type: 'folder',
                    icon: '📁',
                    children: {
                        project1: { name: 'Project 1: Hajj & Umrah Management', type: 'file', icon: '📄' },
                        project2: { name: 'Project 2: Car Wash Mobile POS', type: 'file', icon: '📄' },
                        project3: { name: 'Project 3: Consignment E-Commerce', type: 'file', icon: '📄' },
                        project4: { name: 'Project 4: Inventory System', type: 'file', icon: '📄' },
                        project5: { name: 'Project 5: Booking Platform', type: 'file', icon: '📄' },
                    }
                },
                pendidikan: { name: 'Pendidikan', type: 'file', icon: '🎓' },
                pengalaman: { name: 'Pengalaman', type: 'file', icon: '💼' },
                keahlian: { name: 'Keahlian Teknis', type: 'file', icon: '⚙️' },
                contact: { name: 'Contact', type: 'file', icon: '✉️' },
            }
        }
    };

    // Content untuk setiap file
    const fileContents = {
        about: {
            title: 'About Me',
            content: `Halo! Saya adalah Galih Rizky Pradana, seorang full-stack developer passionate yang berbasis di Klaten, Jawa Tengah. Saya memiliki pengalaman dalam membangun website, aplikasi mobile, dan sistem custom yang membantu bisnis berkembang pesat.

Saya percaya bahwa development adalah seni yang menggabungkan kreativitas dengan teknologi. Setiap project yang saya tangani dikerjakan dengan dedikasi penuh dan attention to detail.

Keahlian saya mencakup modern web development, mobile app development, dan custom business systems yang scalable dan maintainable.`
        },
        project1: {
            title: 'Project 1: Hajj & Umrah Management',
            category: 'Custom Web Dashboard',
            description: 'Sistem manajemen perjalanan ibadah dengan fitur booking, tracking, dan reporting real-time.',
            technologies: ['Laravel', 'React', 'MySQL', 'Google Maps API'],
            features: ['User Dashboard', 'Admin Panel', 'Real-time Tracking', 'Payment Integration', 'Reporting System']
        },
        project2: {
            title: 'Project 2: Car Wash Mobile POS',
            category: 'Mobile App Development',
            description: 'Aplikasi POS untuk car wash dengan inventory management dan customer loyalty program.',
            technologies: ['React Native', 'Node.js', 'Firebase', 'Stripe'],
            features: ['Point of Sale', 'Inventory Tracking', 'Customer Management', 'Sales Reports', 'Offline Mode']
        },
        project3: {
            title: 'Project 3: Consignment E-Commerce',
            category: 'Full-Stack Web App',
            description: 'Platform e-commerce untuk sistem konsinyasi dengan commission tracking otomatis.',
            technologies: ['Next.js', 'PostgreSQL', 'Stripe', 'AWS'],
            features: ['Product Listing', 'Commission Tracking', 'Seller Dashboard', 'Analytics', 'Automated Payouts']
        },
        project4: {
            title: 'Project 4: Inventory System',
            category: 'Enterprise System',
            description: 'Sistem manajemen inventory komprehensif untuk retail dan wholesale.',
            technologies: ['Laravel', 'Vue.js', 'PostgreSQL', 'Redis'],
            features: ['Stock Management', 'Multi-warehouse', 'Barcode Scanning', 'Reporting', 'API Integration']
        },
        project5: {
            title: 'Project 5: Booking Platform',
            category: 'Full-Stack Web App',
            description: 'Platform booking multi-layanan dengan calendar dan payment processing.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            features: ['Service Booking', 'Calendar Integration', 'Payment Gateway', 'Notifications', 'Review System']
        },
        pendidikan: {
            title: 'Pendidikan',
            content: `📚 RIWAYAT PENDIDIKAN:

🎓 S1 TEKNIK INFORMATIKA
   Universitas Atma Jaya Yogyakarta
   (2022-2026)

📖 SERTIFIKASI:
   > Google Cloud Associate
   > AWS Solutions Architect
   > Certified React Developer
   > Laravel Expert Certification

💻 SELF-LEARNING:
   > Advanced JavaScript
   > Modern Web Architecture
   > Mobile Development
   > Cloud Infrastructure`
        },
        pengalaman: {
            title: 'Pengalaman Kerja',
            content: `💼 PENGALAMAN PROFESIONAL:

🚀 FREELANCE FULL-STACK DEVELOPER
   (2021 - Sekarang)
   > 30+ projects
   > Client satisfaction: 4.9/5
   > Specializing custom systems

💻 JUNIOR DEVELOPER
   PT XYZ (2021-2022)
   > 5+ web applications
   > Team collaboration
   > Code reviews

🌐 INTERNSHIP
   Digital Agency ABC (2020-2021)
   > React development
   > UI/UX implementation

🎯 ACHIEVEMENTS:
   > 50+ successful projects
   > 100k+ active users
   > 60% performance boost
   > Mentored 10+ junior devs`
        },
        keahlian: {
            title: 'Keahlian Teknis',
            skills: [
                {
                    category: 'FRONTEND',
                    items: ['React', 'Vue.js', 'Next.js', 'Tailwind CSS', 'TypeScript']
                },
                {
                    category: 'BACKEND',
                    items: ['Node.js', 'Laravel', 'Express.js', 'Python', 'REST API']
                },
                {
                    category: 'DATABASE',
                    items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'Redis']
                },
                {
                    category: 'MOBILE',
                    items: ['React Native', 'Flutter', 'Expo', 'Dart']
                },
                {
                    category: 'DEVOPS',
                    items: ['Docker', 'AWS', 'Google Cloud', 'CI/CD', 'Linux']
                },
                {
                    category: 'TOOLS',
                    items: ['Git', 'Figma', 'Postman', 'Webpack', 'Agile']
                }
            ]
        },
        contact: {
            title: 'Contact Me',
            content: `📧 EMAIL: galihrizky829@gmail.com
📱 WHATSAPP: +62 812-3456-7890
🔗 LINKEDIN: linkedin.com/in/galihrizkyp
🐙 GITHUB: github.com/glhrip
🌐 WEBSITE: galihdev.cloud

AVAILABLE FOR:
✓ Freelance projects
✓ Full-time opportunities
✓ Consulting & mentoring
✓ Partnership & collaboration

Mari kita ciptakan sesuatu yang amazing!`
        }
    };

    // Toggle folder
    const toggleFolder = (path) => {
        setExpandedFolders(prev => ({
            ...prev,
            [path]: !prev[path]
        }));
    };

    // Select item & update breadcrumb
    const selectItem = (itemKey, itemName, path = []) => {
        setSelectedItem(itemKey);
        setBreadcrumb(['Portfolio', ...path, itemName]);
        setShowHero(false);
    };

    // Search functionality
    const filteredItems = useMemo(() => {
        if (!searchQuery.trim()) return null;
        
        const results = [];
        const search = searchQuery.toLowerCase();

        const searchInObject = (obj, basePath = []) => {
            Object.entries(obj).forEach(([key, item]) => {
                if (item.name.toLowerCase().includes(search)) {
                    results.push({
                        key,
                        name: item.name,
                        type: item.type,
                        path: [...basePath, item.name]
                    });
                }
                if (item.type === 'folder' && item.children) {
                    searchInObject(item.children, [...basePath, item.name]);
                }
            });
        };

        searchInObject(folderStructure.root.children);
        return results;
    }, [searchQuery]);

    // Render folder tree item
    const renderItem = (itemKey, item, path = []) => {
        const isFolder = item.type === 'folder';
        const isExpanded = expandedFolders[itemKey];
        const isSelected = selectedItem === itemKey;

        return (
            <div key={itemKey} style={{ fontFamily: "'Courier New', monospace" }}>
                <motion.div
                    whileHover={{ x: 2 }}
                    onClick={() => {
                        if (isFolder) {
                            toggleFolder(itemKey);
                        } else {
                            selectItem(itemKey, item.name, path);
                        }
                    }}
                    className={`flex items-center gap-2 px-3 py-1 cursor-pointer transition-colors border-2 ${
                        isSelected 
                            ? darkMode ? 'border-lime-400 bg-lime-400/20 text-lime-300' : 'border-blue-600 bg-blue-100 text-blue-900'
                            : 'border-transparent'
                    }`}
                    style={{
                        backgroundColor: isSelected ? (darkMode ? 'rgba(132,204,22,0.2)' : 'rgb(219,234,254)') : 'transparent',
                    }}
                >
                    {isFolder && (
                        <ChevronRight
                            size={14}
                            className={`transition-transform flex-shrink-0 ${isExpanded ? 'rotate-90' : ''}`}
                            style={{ strokeWidth: 3 }}
                        />
                    )}
                    {!isFolder && <div className="w-4" />}
                    <span className="text-lg"><BouncingIcon icon={item.icon} delay={Math.random() * 0.5} /></span>
                    <span className="text-xs font-bold" style={{ letterSpacing: '0.05em' }}>
                        {item.name}
                    </span>
                </motion.div>

                {isFolder && isExpanded && item.children && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-2 border-l-2 pl-2"
                        style={{ borderColor: darkMode ? 'rgb(132,204,22)' : 'rgb(59,130,246)' }}
                    >
                        {Object.entries(item.children).map(([childKey, childItem]) =>
                            renderItem(childKey, childItem, [...path, item.name])
                        )}
                    </motion.div>
                )}
            </div>
        );
    };

    // Render content
    const renderContent = () => {
        const content = fileContents[selectedItem];
        if (!content) return null;

        return (
            <motion.div
                key={selectedItem}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
                style={{ fontFamily: "'Courier New', monospace" }}
            >
                <div className={`border-2 p-3 ${darkMode ? 'border-lime-400 bg-lime-400/10' : 'border-blue-600 bg-blue-50'}`}>
                    <h1 className={`text-sm font-bold ${darkMode ? 'text-lime-300' : 'text-blue-900'}`}
                        style={{ letterSpacing: '0.1em' }}>
                        <GlitchText>▸ {content.title}</GlitchText>
                    </h1>
                    {content.category && (
                        <p className={`text-xs mt-1 ${darkMode ? 'text-lime-200/70' : 'text-blue-700/70'}`}>
                            [{content.category}]
                        </p>
                    )}
                </div>

                {content.content && (
                    <div className={`border-2 p-3 whitespace-pre-wrap text-xs leading-relaxed ${
                        darkMode 
                            ? 'border-cyan-400 bg-cyan-400/5 text-cyan-200' 
                            : 'border-yellow-600 bg-yellow-50 text-yellow-900'
                    }`}
                        style={{ fontFamily: "'Courier New', monospace" }}>
                        {content.content}
                    </div>
                )}

                {content.description && (
                    <div className={`border-2 p-3 ${darkMode ? 'border-purple-400 bg-purple-400/5 text-purple-200' : 'border-purple-600 bg-purple-50 text-purple-900'}`}>
                        <p className="text-xs">{content.description}</p>
                    </div>
                )}

                {content.technologies && (
                    <div className={`border-2 p-3 ${darkMode ? 'border-orange-400 bg-orange-400/5' : 'border-orange-600 bg-orange-50'}`}>
                        <h3 className={`font-bold text-xs mb-2 ${darkMode ? 'text-orange-300' : 'text-orange-900'}`}
                            style={{ letterSpacing: '0.1em' }}>
                            [TECHNOLOGIES]
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {content.technologies.map((tech, idx) => (
                                <motion.span
                                    key={idx}
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
                                    className={`px-2 py-1 border text-xs font-bold ${
                                        darkMode
                                            ? 'border-orange-400 text-orange-300'
                                            : 'border-orange-600 text-orange-700'
                                    }`}
                                    style={{ letterSpacing: '0.05em' }}
                                >
                                    #{tech}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                )}

                {content.features && (
                    <div className={`border-2 p-3 ${darkMode ? 'border-pink-400 bg-pink-400/5' : 'border-pink-600 bg-pink-50'}`}>
                        <h3 className={`font-bold text-xs mb-2 ${darkMode ? 'text-pink-300' : 'text-pink-900'}`}
                            style={{ letterSpacing: '0.1em' }}>
                            [FEATURES]
                        </h3>
                        <ul className="space-y-1">
                            {content.features.map((feature, idx) => (
                                <motion.li 
                                    key={idx} 
                                    className="flex items-center gap-2 text-xs"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <span className={darkMode ? 'text-pink-400' : 'text-pink-600'}>▸</span>
                                    {feature}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                )}

                {content.skills && (
                    <div className="space-y-2">
                        {content.skills.map((skillGroup, idx) => (
                            <motion.div 
                                key={idx} 
                                className={`border-2 p-3 ${
                                    darkMode 
                                        ? 'border-teal-400 bg-teal-400/5 text-teal-200' 
                                        : 'border-green-600 bg-green-50 text-green-900'
                                }`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <h4 className={`font-bold text-xs mb-2 ${darkMode ? 'text-teal-300' : 'text-green-700'}`}
                                    style={{ letterSpacing: '0.1em' }}>
                                    [{skillGroup.category}]
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {skillGroup.items.map((skill, skillIdx) => (
                                        <motion.span
                                            key={skillIdx}
                                            animate={{ scale: [1, 1.05, 1] }}
                                            transition={{ duration: 1.5, repeat: Infinity, delay: skillIdx * 0.1 }}
                                            className={`px-2 py-1 border text-xs font-bold ${
                                                darkMode
                                                    ? 'border-teal-400 text-teal-300'
                                                    : 'border-green-600 text-green-700'
                                            }`}
                                            style={{ letterSpacing: '0.05em' }}
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        );
    };

    return (
        <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-slate-950' : 'bg-slate-100'}`}
            style={{ fontFamily: "'Courier New', monospace", backgroundImage: darkMode ? `repeating-linear-gradient(0deg, rgba(132,204,22,.03) 0px, rgba(132,204,22,.03) 1px, transparent 1px, transparent 2px)` : 'none' }}>
            
            <MatrixRain />
            <ScanlineEffect />
            
            {/* Header */}
            <div className={`border-b-4 ${darkMode ? 'border-lime-400 bg-slate-900' : 'border-blue-600 bg-slate-200'} px-4 py-3 flex items-center justify-between`}
                style={{ boxShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}>
                <h1 className={`text-lg font-black ${darkMode ? 'text-lime-400' : 'text-blue-900'}`}
                    style={{ letterSpacing: '0.15em' }}>
                    <BouncingIcon icon="▓▒░ PORTFOLIO.EXE ░▒▓" />
                </h1>
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`px-3 py-1 border-2 font-bold transition-all ${
                        darkMode 
                            ? 'border-yellow-400 text-yellow-400 hover:bg-yellow-400/20' 
                            : 'border-blue-900 text-blue-900 hover:bg-blue-100'
                    }`}
                    style={{ letterSpacing: '0.1em' }}
                >
                    {darkMode ? '☀' : '☾'}
                </button>
            </div>

            <div className="flex flex-1 overflow-hidden gap-0 border-t-4"
                style={{ borderColor: darkMode ? 'rgb(132,204,22)' : 'rgb(59,130,246)' }}>
                
                {/* Sidebar - File Explorer */}
                <div className={`w-72 border-r-4 ${darkMode ? 'border-lime-400 bg-slate-900' : 'border-blue-600 bg-blue-50'} overflow-y-auto p-3`}
                    style={{ boxShadow: 'inset -2px 0 0 rgba(0,0,0,0.5)' }}>
                    
                    {/* Search */}
                    <div className="mb-3 relative">
                        <input
                            type="text"
                            placeholder="SEARCH..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full px-2 py-1 border-2 text-xs font-bold ${
                                darkMode
                                    ? 'border-lime-400 bg-slate-800 text-lime-300 placeholder-lime-600'
                                    : 'border-blue-600 bg-blue-100 text-blue-900 placeholder-blue-400'
                            }`}
                            style={{ letterSpacing: '0.05em' }}
                        />
                    </div>

                    {/* Folder Tree */}
                    {!searchQuery ? (
                        <div className="space-y-1">
                            {Object.entries(folderStructure.root.children).map(([key, item]) =>
                                renderItem(key, item, [])
                            )}
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {filteredItems && filteredItems.length > 0 ? (
                                filteredItems.map((result, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ x: 2 }}
                                        onClick={() => selectItem(result.key, result.name, result.path.slice(0, -1))}
                                        className={`flex items-center gap-2 px-2 py-1 cursor-pointer border-2 text-xs font-bold ${
                                            darkMode ? 'border-lime-400 text-lime-300 hover:bg-lime-400/20' : 'border-blue-600 text-blue-900 hover:bg-blue-100'
                                        }`}
                                        style={{ letterSpacing: '0.05em' }}
                                    >
                                        <File size={12} />
                                        <span>{result.name}</span>
                                    </motion.div>
                                ))
                            ) : (
                                <p className={`text-xs ${darkMode ? 'text-lime-600' : 'text-blue-400'}`}
                                    style={{ letterSpacing: '0.05em' }}>
                                    NO RESULTS FOUND
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Main Content Area */}
                <div className={`flex-1 overflow-y-auto ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}
                    style={{ backgroundImage: darkMode ? `repeating-linear-gradient(0deg, rgba(132,204,22,.03) 0px, rgba(132,204,22,.03) 1px, transparent 1px, transparent 2px)` : 'none' }}>
                    
                    {/* Breadcrumb */}
                    <div className={`sticky top-0 border-b-2 ${darkMode ? 'border-lime-400 bg-slate-900' : 'border-blue-600 bg-slate-200'} px-4 py-2`}
                        style={{ boxShadow: '0 2px 0 rgba(0,0,0,0.3)' }}>
                        <div className="flex items-center gap-2 text-xs font-bold"
                            style={{ letterSpacing: '0.05em' }}>
                            <span className={darkMode ? 'text-lime-400' : 'text-blue-900'}>C:\</span>
                            {breadcrumb.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-1">
                                    {idx > 0 && <span className={darkMode ? 'text-lime-400' : 'text-blue-900'}>\</span>}
                                    <span className={darkMode ? 'text-lime-300' : 'text-blue-700'}>{item}</span>
                                </div>
                            ))}
                            <span className={`animate-pulse ${darkMode ? 'text-lime-400' : 'text-blue-900'}`}>█</span>
                        </div>
                    </div>

                    {/* Hero Section with Typing Animation */}
                    {showHero && (
                        <motion.div 
                            className="p-4 h-full flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className={`border-4 p-8 text-center max-w-2xl ${
                                darkMode 
                                    ? 'border-lime-400 bg-slate-900/80' 
                                    : 'border-blue-600 bg-blue-50/80'
                            }`}
                                style={{ boxShadow: '5px 5px 0px rgba(0,0,0,0.5)' }}>
                                <p className={`text-sm font-bold mb-4 ${darkMode ? 'text-lime-400' : 'text-blue-900'}`}
                                    style={{ letterSpacing: '0.1em' }}>
                                    SYSTEM INITIALIZING...
                                </p>
                                <h2 className={`text-lg font-black mb-4 ${darkMode ? 'text-lime-300' : 'text-blue-800'}`}
                                    style={{ letterSpacing: '0.15em' }}>
                                    <TypingAnimation 
                                        text="WELCOME TO MY PORTFOLIO SYSTEM" 
                                        speed={80}
                                    />
                                </h2>
                                <p className={`text-xs ${darkMode ? 'text-lime-200/70' : 'text-blue-700/70'}`}
                                    style={{ letterSpacing: '0.05em' }}>
                                    [ READY TO EXPLORE MY PROJECTS & EXPERIENCE ]
                                </p>
                                <p className={`text-xs mt-4 ${darkMode ? 'text-lime-400/50' : 'text-blue-900/50'}`}
                                    style={{ letterSpacing: '0.05em' }}>
                                    Click a file in the explorer to get started
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Content */}
                    {!showHero && (
                        <div className="p-4 max-w-5xl">
                            <AnimatePresence mode="wait">
                                {renderContent()}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className={`border-t-4 ${darkMode ? 'border-lime-400 bg-slate-900' : 'border-blue-600 bg-slate-200'} px-4 py-2 text-xs font-bold`}
                style={{ letterSpacing: '0.1em', boxShadow: '0 -2px 0 rgba(0,0,0,0.3)' }}>
                <motion.span 
                    className={darkMode ? 'text-lime-400' : 'text-blue-900'}
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                >
                    ▸ PORTFOLIO.EXE ▪ {new Date().toLocaleTimeString()} ▪ READY █
                </motion.span>
            </div>
        </div>
    );
};

export default PixelPortfolioExplorer;
