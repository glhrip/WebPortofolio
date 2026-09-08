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
                summary: { name: 'Professional Summary', type: 'file', icon: '📋' },
                projects: {
                    name: 'Projects',
                    type: 'folder',
                    icon: '📁',
                    children: {
                        project1: { name: 'Hajj & Umrah Travel Management', type: 'file', icon: '📄' },
                        project2: { name: 'Mobile POS System - Car Wash', type: 'file', icon: '📄' },
                        project3: { name: 'F&B POS System & Web Admin', type: 'file', icon: '📄' },
                        project4: { name: 'Consignment E-Commerce Platform', type: 'file', icon: '📄' },
                        project5: { name: 'Inventory Management Web App', type: 'file', icon: '📄' },
                    }
                },
                pendidikan: { name: 'Education', type: 'file', icon: '🎓' },
                pengalaman: { name: 'Experience', type: 'file', icon: '💼' },
                keahlian: { name: 'Technical Skills', type: 'file', icon: '⚙️' },
                contact: { name: 'Contact', type: 'file', icon: '✉️' },
            }
        }
    };

    // Content untuk setiap file
    const fileContents = {
        about: {
            title: 'About Me',
            content: `Galih Rizky Pradana
📍 Klaten, Central Java, Indonesia
📱 +6281328562495
📧 galihrizky829@gmail.com
🔗 linkedin.com/in/galihrizkyp
🐙 github.com/glhrip

Full-Stack Developer | Recent Informatics Graduate
Passionate about building scalable web applications and solving complex business problems through technology.`
        },
        summary: {
            title: 'Professional Summary',
            content: `Dedicated Full-Stack Developer and recent Informatics graduate with strong expertise in building scalable web applications using Laravel, React, and TypeScript.

Experienced in designing robust relational databases and RESTful APIs to support end-to-end business solutions, including e-commerce platforms and inventory management systems.

Complemented by cross-platform mobile development skills (Flutter), organizational leadership experience, and practical IT support expertise, ensuring smooth technical workflows and collaborative problem-solving.`
        },
        project1: {
            title: 'Hajj & Umrah Travel Management System',
            technologies: ['React.js', 'Laravel', 'MySQL', 'Bootstrap', 'JWT/Sanctum'],
            features: [
                'Comprehensive full-stack web application for travel agencies',
                'Automated payment tracking system',
                'Pilgrim profile & document management',
                'Departure scheduling module',
                'Role-Based Access Control (RBAC)',
                'Real-time operational dashboards',
                'Single Page Application (SPA) architecture'
            ]
        },
        project2: {
            title: 'Mobile Point of Sale (POS) System - Car Wash',
            technologies: ['Flutter', 'Dart', 'Laravel', 'MySQL', 'REST API'],
            features: [
                'Cross-platform mobile POS application',
                'Dynamic service catalogs',
                'Customer membership tier management',
                'Real-time sales reporting analytics',
                'Scalable RESTful APIs',
                'Seamless data synchronization',
                'Replaced manual bookkeeping with digital interface'
            ]
        },
        project3: {
            title: 'Full-Stack F&B POS System & Web Admin',
            technologies: ['Flutter', 'Laravel', 'MySQL', 'REST API', 'Firebase Auth', 'Google Sign-In'],
            features: [
                'Cross-platform mobile POS application',
                'Comprehensive web-based admin dashboard',
                'Product catalog management',
                'Real-time sales monitoring',
                'Business report generation',
                'Secure user authentication',
                'Staff access control'
            ]
        },
        project4: {
            title: 'Consignment E-Commerce Platform',
            technologies: ['Laravel', 'React', 'JavaScript', 'TypeScript', 'Database Design'],
            features: [
                'Full-stack e-commerce application',
                'Second-hand goods marketplace',
                'Robust backend architecture',
                'Dynamic, interactive user interfaces',
                'Consignment tracking system',
                'Seller dashboard',
                'Commission management'
            ]
        },
        project5: {
            title: 'Inventory Management Web Application',
            technologies: ['Laravel', 'MySQL', 'RESTful APIs', 'SQL', 'Database Schema'],
            features: [
                'Real-time inventory recording & tracking',
                'Relational database with foreign keys',
                'Comprehensive data integrity checks',
                'Goods & transaction management',
                'Advanced reporting',
                'API integration',
                'Multi-warehouse support'
            ]
        },
        pendidikan: {
            title: 'Education',
            content: `🎓 UNIVERSITAS ATMA JAYA YOGYAKARTA
Bachelor's Degree in Informatics
August 2022 – August 2026
Status: Passed final academic evaluation (Yudisium); awaiting formal graduation

📚 RELEVANT COURSEWORK:
> Software Engineering
> Web Development
> Relational Database Design
> RESTful API Design
> Network Engineering

💻 KEY LEARNING AREAS:
> Full-Stack Web Development
> Database Architecture
> API Design & Implementation
> Mobile Development
> System Design`
        },
        pengalaman: {
            title: 'Professional & Organizational Experience',
            content: `💼 IT SUPPORT INTERN
Hotel Khas Malioboro Yogyakarta
December 2025 - February 2026

RESPONSIBILITIES:
> Configured and deployed Android TV systems across guest rooms
> Conducted regular maintenance and troubleshooting of UPS units
> Set up, configured, and maintained LAN/WLAN networks
> Provided daily technical support for hardware/software issues
> Ensured operational efficiency for hotel management

🤝 OPERATIONAL COORDINATOR
KOPMA UAJY (Koperasi Mahasiswa)
July 2024 – May 2025

RESPONSIBILITIES:
> Coordinated day-to-day operational activities
> Oversaw organizational programs and initiatives
> Collaborated with cross-functional teams
> Planned and organized cooperative operations
> Contributed to improved efficiency and member engagement

🎯 KEY SKILLS DEMONSTRATED:
> Technical troubleshooting
> Team coordination
> Project management
> Problem-solving
> Leadership & collaboration`
        },
        keahlian: {
            title: 'Technical Skills',
            skills: [
                {
                    category: 'WEB TECHNOLOGIES & FRAMEWORKS',
                    items: ['Laravel', 'React.js', 'RESTful APIs', 'Vite', 'JWT/Sanctum', 'Bootstrap']
                },
                {
                    category: 'PROGRAMMING LANGUAGES',
                    items: ['JavaScript', 'TypeScript', 'PHP', 'SQL', 'T-SQL', 'Dart', 'C/C++']
                },
                {
                    category: 'MOBILE DEVELOPMENT',
                    items: ['Flutter', 'Dart', 'Cross-Platform Apps', 'Firebase']
                },
                {
                    category: 'DATABASES',
                    items: ['Relational Database Design', 'MySQL', 'SQL Server', 'Firebase', 'Schema Design']
                },
                {
                    category: 'TOOLS & INFRASTRUCTURE',
                    items: ['Git/GitHub', 'Docker', 'Linux', 'VPS Deployment', 'Nginx/Apache', 'Postman', 'Composer', 'npm']
                },
                {
                    category: 'CONCEPTS & METHODOLOGIES',
                    items: ['Full-Stack Development', 'IT Support', 'Technical Documentation', 'Team Coordination', 'RBAC']
                }
            ]
        },
        contact: {
            title: 'Contact & Connect',
            content: `📧 EMAIL
galihrizky829@gmail.com

📱 WHATSAPP
+6281328562495

🔗 LINKEDIN
linkedin.com/in/galihrizkyp

🐙 GITHUB
github.com/glhrip

📍 LOCATION
Klaten, Central Java, Indonesia

AVAILABLE FOR:
✓ Full-time opportunities
✓ Freelance projects
✓ Consulting & mentoring
✓ Contract-based work
✓ Partnership & collaboration

Let's build something amazing together!`
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
                            [FEATURES & HIGHLIGHTS]
                        </h3>
                        <ul className="space-y-1">
                            {content.features.map((feature, idx) => (
                                <motion.li 
                                    key={idx} 
                                    className="flex items-start gap-2 text-xs"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <span className={`flex-shrink-0 ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}>▸</span>
                                    <span>{feature}</span>
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
                    <BouncingIcon icon="▓▒░ GALIH.PORTFOLIO ░▒▓" />
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
                                        text="GALIH RIZKY PRADANA" 
                                        speed={80}
                                    />
                                </h2>
                                <p className={`text-xs ${darkMode ? 'text-lime-200/70' : 'text-blue-700/70'}`}
                                    style={{ letterSpacing: '0.05em' }}>
                                    [ FULL-STACK DEVELOPER | INFORMATICS GRADUATE ]
                                </p>
                                <p className={`text-xs mt-4 ${darkMode ? 'text-lime-400/50' : 'text-blue-900/50'}`}
                                    style={{ letterSpacing: '0.05em' }}>
                                    Click a file in the explorer to explore my portfolio
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
                    ▸ GALIH.PORTFOLIO ▪ {new Date().toLocaleTimeString()} ▪ READY █
                </motion.span>
            </div>
        </div>
    );
};

export default PixelPortfolioExplorer;
