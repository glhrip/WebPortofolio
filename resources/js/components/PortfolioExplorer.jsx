import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
    BriefcaseBusiness, ChevronRight, Code2, Download, ExternalLink, FileCode2,
    FolderOpen, GraduationCap, Link, Mail, Menu, Moon, Search, Sun,
    Terminal, UserRound, Wrench, X
} from 'lucide-react';

const CONTACT = {
    email: 'galihrizky829@gmail.com',
    github: 'https://github.com/glhrip',
    linkedin: 'https://www.linkedin.com/in/galihrizkyp',
    portfolio: 'https://portofolio.galihdev.cloud',
    umrah: 'https://umrah.galihdev.cloud',
};

const navItems = [
    { id: 'about', label: 'About Me', icon: UserRound },
    { id: 'summary', label: 'Professional Summary', icon: Terminal },
    { id: 'projects', label: 'Projects', icon: FolderOpen, folder: true },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: BriefcaseBusiness },
    { id: 'skills', label: 'Technical Skills', icon: Wrench },
    { id: 'contact', label: 'Contact', icon: Mail },
];

const projects = [
    {
        id: 'umrah',
        label: 'Hajj & Umrah System',
        title: 'Hajj & Umrah Travel Management System',
        subtitle: 'Operational platform for travel-agency administration',
        stack: ['Laravel', 'React', 'MySQL', 'Sanctum', 'Nginx'],
        problem: 'Travel operations need one controlled place for pilgrim data, documents, payments, departures, and role-specific daily work.',
        built: [
            'Built a Laravel API and React SPA for pilgrim profiles, document handling, payment tracking, and departure scheduling.',
            'Implemented role-based access control and operational dashboards for different staff responsibilities.',
            'Deployed the application to a VPS behind Nginx with SSL and performed a security review of the production codebase.'
        ],
        live: CONTACT.umrah,
        featured: true,
    },
    {
        id: 'carwash',
        label: 'Car Wash POS',
        title: 'Mobile Point of Sale — Car Wash',
        subtitle: 'Cross-platform transaction workflow for a car-wash business',
        stack: ['Flutter', 'Laravel', 'MySQL', 'REST API'],
        problem: 'Manual bookkeeping slows transactions and makes customer and sales history difficult to track.',
        built: [
            'Developed a Flutter POS client connected to a Laravel backend through REST APIs.',
            'Implemented service catalogs, membership tiers, transaction recording, and sales reporting.',
            'Designed API flows for consistent mobile-to-server data synchronization.'
        ],
    },
    {
        id: 'fnb',
        label: 'F&B POS + Admin',
        title: 'Full-Stack F&B POS System & Web Admin',
        subtitle: 'Mobile POS paired with a web administration console',
        stack: ['Flutter', 'Laravel', 'MySQL', 'Firebase Auth'],
        problem: 'A local F&B operation needs faster cashier flow and one place to manage products and reports.',
        built: [
            'Built a cross-platform POS application and companion web admin dashboard.',
            'Added catalog management, sales monitoring, reporting, and staff access control.',
            'Used Firebase Authentication and Google Sign-In for protected access.'
        ],
    },
    {
        id: 'consignment',
        label: 'Consignment Platform',
        title: 'Consignment E-Commerce Platform',
        subtitle: 'Marketplace workflow for second-hand goods',
        stack: ['Laravel', 'React', 'TypeScript', 'MySQL'],
        problem: 'Consignment sales need clear item tracking, seller workflows, and commission handling.',
        built: [
            'Developed a full-stack marketplace for consignment and second-hand goods.',
            'Designed seller-facing workflows and backend data structures for tracking and commission management.',
            'Built responsive React interfaces on top of Laravel application logic.'
        ],
    },
    {
        id: 'inventory',
        label: 'Inventory App',
        title: 'Inventory Management Web Application',
        subtitle: 'Inventory recording and transaction integrity controls',
        stack: ['Laravel', 'MySQL', 'REST API', 'SQL'],
        problem: 'Stock records need a structured data model to remain accurate across goods and transactions.',
        built: [
            'Built inventory recording and tracking workflows with Laravel and MySQL.',
            'Designed relational schemas, foreign-key constraints, and APIs for goods and transaction data.',
            'Included reporting and data-integrity checks for operational visibility.'
        ],
    },
];

const content = {
    about: {
        title: 'About Me',
        eyebrow: 'PROFILE.TXT',
        body: 'Galih Rizky Pradana is an Informatics graduate focused on building reliable operational web applications. His work sits where product workflows, backend architecture, and deployment meet — from travel operations to POS and inventory systems.',
        facts: [
            ['Location', 'Klaten, Central Java, Indonesia'],
            ['Target role', 'IT Engineer / Full-Stack Developer'],
            ['Availability', 'Full-time opportunities · Jakarta relocation ready'],
            ['Focus', 'Laravel · React · REST APIs · VPS deployment'],
        ],
    },
    summary: {
        title: 'Professional Summary',
        eyebrow: 'SUMMARY.MD',
        body: 'Full-Stack Developer with hands-on experience building Laravel and React applications, designing relational databases, and delivering REST APIs for operational systems. Brings practical IT support experience across LAN/WLAN, endpoint troubleshooting, and day-to-day business operations.',
        highlights: ['Laravel and React application delivery', 'Relational database design and REST API development', 'Linux, Nginx, SSL, and VPS deployment', 'IT support troubleshooting for hardware, software, and networks'],
    },
    education: {
        title: 'Education',
        eyebrow: 'EDUCATION.LOG',
        institution: 'Universitas Atma Jaya Yogyakarta',
        role: "Bachelor's Degree in Informatics — Yogyakarta",
        period: 'August 2022 – August 2026',
        body: 'Relevant coursework: Software Engineering, Web Development, Relational Database Design, RESTful API Design, and Network Engineering.',
    },
    experience: {
        title: 'Experience',
        eyebrow: 'EXPERIENCE.LOG',
        entries: [
            {
                company: 'Hotel Khas Malioboro Yogyakarta', role: 'IT Support Intern', period: 'December 2025 – February 2026',
                bullets: [
                    'Configured and deployed Android TV systems across guest rooms.',
                    'Maintained and troubleshot UPS units to reduce operational disruption.',
                    'Set up and supported LAN/WLAN connectivity for hotel staff and guests.',
                    'Resolved daily hardware and software issues for operational teams.'
                ]
            },
            {
                company: 'KOPMA UAJY', role: 'Operational Coordinator', period: 'July 2024 – May 2025',
                bullets: [
                    'Coordinated day-to-day student cooperative operations and programs.',
                    'Worked with cross-functional teams to plan, organize, and evaluate activities.',
                    'Supported process efficiency and member engagement through structured coordination.'
                ]
            }
        ]
    },
    skills: {
        title: 'Technical Skills', eyebrow: 'STACK.JSON', groups: [
            ['Application Development', ['Laravel', 'React.js', 'JavaScript', 'PHP', 'TypeScript', 'REST APIs']],
            ['Data & Mobile', ['MySQL', 'SQL', 'Relational Database Design', 'Flutter', 'Dart', 'Firebase']],
            ['Delivery & Infrastructure', ['Git/GitHub', 'Linux', 'Nginx', 'VPS Deployment', 'Docker', 'Postman', 'Composer', 'npm']],
        ]
    },
    contact: { title: 'Contact', eyebrow: 'CONTACT.ME', body: 'Open to full-time IT Engineer and Full-Stack Developer roles, especially work that improves real operational workflows.' },
};

const pageTransition = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } };

function ActionLink({ href, children, primary = false, icon: Icon = ExternalLink }) {
    return <a href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer"
        className={`inline-flex min-h-11 items-center justify-center gap-2 border-2 px-4 py-2 text-xs font-black tracking-wider transition-colors ${primary ? 'border-lime-300 bg-lime-300 text-slate-950 hover:bg-lime-200' : 'border-slate-600 text-slate-100 hover:border-lime-300 hover:text-lime-200'}`}>
        <Icon size={15} aria-hidden="true" />{children}
    </a>;
}

function ProjectView({ project }) {
    return <article className="space-y-5">
        <header className="border-2 border-lime-300 bg-lime-300/10 p-4">
            <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-lime-200">PROJECT.CASE_STUDY</p>
            <h2 className="text-xl font-black tracking-wide text-white sm:text-2xl">{project.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{project.subtitle}</p>
        </header>
        <section className="border-2 border-slate-700 bg-slate-900/75 p-4">
            <h3 className="text-xs font-black tracking-widest text-cyan-200">THE PROBLEM</h3>
            <p className="mt-3 text-sm leading-7 text-slate-200">{project.problem}</p>
        </section>
        <section className="border-2 border-slate-700 bg-slate-900/75 p-4">
            <h3 className="text-xs font-black tracking-widest text-pink-200">WHAT I BUILT</h3>
            <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-200">
                {project.built.map((item) => <li key={item} className="flex gap-3"><span className="text-pink-300">▸</span><span>{item}</span></li>)}
            </ul>
        </section>
        <section className="border-2 border-slate-700 bg-slate-900/75 p-4">
            <h3 className="text-xs font-black tracking-widest text-orange-200">STACK</h3>
            <div className="mt-3 flex flex-wrap gap-2">{project.stack.map((tech) => <span key={tech} className="border border-orange-300/60 px-2 py-1 text-xs font-bold text-orange-100">{tech}</span>)}</div>
        </section>
        {project.live && <ActionLink href={project.live} primary>OPEN LIVE SYSTEM</ActionLink>}
    </article>;
}

function StandardView({ selected }) {
    const item = content[selected];
    if (selected === 'experience') return <section className="space-y-4">{item.entries.map((entry) => <article key={entry.company} className="border-2 border-slate-700 bg-slate-900/75 p-4"><div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"><div><h2 className="font-black text-white">{entry.company}</h2><p className="mt-1 text-sm text-lime-200">{entry.role}</p></div><p className="text-xs text-slate-400">{entry.period}</p></div><ul className="mt-4 space-y-2 text-sm leading-6 text-slate-200">{entry.bullets.map(b => <li key={b} className="flex gap-3"><span className="text-lime-300">▸</span>{b}</li>)}</ul></article>)}</section>;
    if (selected === 'skills') return <section className="space-y-4">{item.groups.map(([name, skills]) => <article key={name} className="border-2 border-slate-700 bg-slate-900/75 p-4"><h2 className="text-xs font-black tracking-widest text-teal-200">{name.toUpperCase()}</h2><div className="mt-3 flex flex-wrap gap-2">{skills.map(skill => <span key={skill} className="border border-teal-300/60 px-2 py-1 text-xs font-bold text-teal-100">{skill}</span>)}</div></article>)}</section>;
    if (selected === 'contact') return <section className="border-2 border-slate-700 bg-slate-900/75 p-4"><p className="text-sm leading-7 text-slate-200">{item.body}</p><div className="mt-5 flex flex-wrap gap-3"><ActionLink href={`mailto:${CONTACT.email}`} primary icon={Mail}>EMAIL ME</ActionLink><ActionLink href={CONTACT.linkedin} icon={Link}>LINKEDIN</ActionLink><ActionLink href={CONTACT.github} icon={Code2}>GITHUB</ActionLink></div></section>;
    if (selected === 'education') return <section className="border-2 border-slate-700 bg-slate-900/75 p-4"><h2 className="font-black text-white">{item.institution}</h2><div className="mt-2 flex flex-col justify-between gap-1 text-sm sm:flex-row"><p className="text-lime-200">{item.role}</p><p className="text-slate-400">{item.period}</p></div><p className="mt-4 text-sm leading-7 text-slate-200">{item.body}</p></section>;
    return <section className="border-2 border-slate-700 bg-slate-900/75 p-4"><p className="text-sm leading-7 text-slate-200">{item.body}</p>{item.facts && <dl className="mt-5 divide-y divide-slate-700 border-y border-slate-700">{item.facts.map(([label, value]) => <div key={label} className="grid gap-1 py-3 text-sm sm:grid-cols-[10rem_1fr]"><dt className="font-bold text-lime-200">{label}</dt><dd className="text-slate-200">{value}</dd></div>)}</dl>}{item.highlights && <ul className="mt-5 space-y-2 text-sm leading-6 text-slate-200">{item.highlights.map(x => <li key={x} className="flex gap-3"><span className="text-lime-300">▸</span>{x}</li>)}</ul>}</section>;
}

function HomeView({ open }) {
    return <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <section className="border-4 border-lime-300 bg-slate-900/90 p-5 shadow-[6px_6px_0_rgba(0,0,0,.45)] sm:p-8">
            <p className="text-xs font-black tracking-[0.16em] text-lime-200">// AVAILABLE FOR IT ENGINEER & FULL-STACK ROLES</p>
            <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight tracking-wide text-white sm:text-5xl">I BUILD SYSTEMS THAT KEEP OPERATIONS MOVING.</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">Galih Rizky Pradana. Informatics graduate building Laravel and React applications, practical REST APIs, and deployment-ready systems for real business workflows.</p>
            <div className="mt-7 flex flex-wrap gap-3"><button onClick={() => open('project:umrah')} className="inline-flex min-h-11 items-center gap-2 border-2 border-lime-300 bg-lime-300 px-4 py-2 text-xs font-black tracking-wider text-slate-950 hover:bg-lime-200"><FolderOpen size={15} />VIEW FEATURED PROJECT</button><a href="/Galih_Rizky_IT_Engineer.pdf" className="inline-flex min-h-11 items-center gap-2 border-2 border-slate-600 px-4 py-2 text-xs font-black tracking-wider text-white hover:border-lime-300 hover:text-lime-200"><Download size={15} />DOWNLOAD CV</a></div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs font-bold text-slate-300"><a className="inline-flex items-center gap-2 hover:text-lime-200" href={CONTACT.github} target="_blank" rel="noreferrer"><Code2 size={15} />github.com/glhrip</a><a className="inline-flex items-center gap-2 hover:text-lime-200" href={CONTACT.linkedin} target="_blank" rel="noreferrer"><Link size={15} />LinkedIn</a><a className="inline-flex items-center gap-2 hover:text-lime-200" href={`mailto:${CONTACT.email}`}><Mail size={15} />Email</a></div>
        </section>
        <aside className="border-2 border-cyan-300/70 bg-slate-900/80 p-5"><p className="text-xs font-black tracking-widest text-cyan-200">FEATURED_PROJECT.EXE</p><h3 className="mt-4 text-xl font-black text-white">Hajj & Umrah System</h3><p className="mt-3 text-sm leading-7 text-slate-300">A full-stack operating system for travel agencies: pilgrim records, document workflow, payments, departure schedules, and RBAC.</p><div className="mt-5 flex flex-wrap gap-2">{projects[0].stack.map(x => <span className="border border-cyan-300/50 px-2 py-1 text-xs text-cyan-100" key={x}>{x}</span>)}</div><button onClick={() => open('project:umrah')} className="mt-6 inline-flex items-center gap-2 text-xs font-black tracking-wider text-lime-200 hover:text-lime-100">OPEN CASE STUDY <ChevronRight size={15} /></button></aside>
    </div>;
}

export default function PortfolioExplorer() {
    const [darkMode, setDarkMode] = useState(true);
    const [selected, setSelected] = useState('home');
    const [query, setQuery] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const reducedMotion = useReducedMotion();
    const isProject = selected.startsWith('project:');
    const activeProject = isProject ? projects.find(p => p.id === selected.split(':')[1]) : null;
    const allItems = useMemo(() => [...navItems.filter(n => !n.folder), ...projects.map(p => ({ id: `project:${p.id}`, label: p.label, icon: FileCode2 }))], []);
    const results = query.trim() ? allItems.filter(x => x.label.toLowerCase().includes(query.toLowerCase())) : null;
    const open = (id) => { setSelected(id); setMenuOpen(false); setQuery(''); };
    const activeLabel = activeProject ? activeProject.label : selected === 'home' ? 'HOME' : navItems.find(x => x.id === selected)?.label || 'PORTFOLIO';
    const shell = darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-950';
    const panel = darkMode ? 'border-lime-300 bg-slate-900' : 'border-blue-700 bg-white';
    const muted = darkMode ? 'text-slate-300' : 'text-slate-700';

    const Sidebar = () => <aside className={`h-full w-72 shrink-0 border-r-4 p-3 ${panel}`} aria-label="Portfolio navigation">
        <label className="relative block"><span className="sr-only">Search portfolio</span><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-lime-300" size={15} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="SEARCH PORTFOLIO..." className={`w-full border-2 py-2 pl-9 pr-3 text-xs font-bold outline-none ${darkMode ? 'border-lime-300 bg-slate-800 text-lime-100 placeholder:text-lime-300/60 focus:bg-slate-700' : 'border-blue-700 bg-blue-50 text-blue-950'}`} /></label>
        <nav className="mt-4 space-y-1">{results ? results.map(item => <button key={item.id} onClick={() => open(item.id)} className={`flex w-full items-center gap-2 border-2 px-3 py-2 text-left text-xs font-bold ${selected === item.id ? (darkMode ? 'border-lime-300 bg-lime-300/15 text-lime-100' : 'border-blue-700 bg-blue-100') : 'border-transparent hover:border-slate-600'}`}><item.icon size={15} />{item.label}</button>) : <><button onClick={() => open('home')} className={`flex w-full items-center gap-2 border-2 px-3 py-2 text-left text-xs font-bold ${selected === 'home' ? (darkMode ? 'border-lime-300 bg-lime-300/15 text-lime-100' : 'border-blue-700 bg-blue-100') : 'border-transparent hover:border-slate-600'}`}><Terminal size={15} />HOME</button>{navItems.map(item => <React.Fragment key={item.id}>{item.folder ? <><div className="mt-2 flex items-center gap-2 px-3 py-2 text-xs font-black tracking-wider text-orange-200"><FolderOpen size={15} />PROJECTS</div><div className="ml-4 border-l-2 border-lime-300/70 pl-2">{projects.map(project => <button key={project.id} onClick={() => open(`project:${project.id}`)} className={`flex w-full items-center gap-2 border-2 px-2 py-2 text-left text-xs font-bold ${selected === `project:${project.id}` ? 'border-lime-300 bg-lime-300/15 text-lime-100' : 'border-transparent hover:border-slate-600'}`}><FileCode2 size={14} />{project.label}</button>)}</div></> : <button onClick={() => open(item.id)} className={`flex w-full items-center gap-2 border-2 px-3 py-2 text-left text-xs font-bold ${selected === item.id ? (darkMode ? 'border-lime-300 bg-lime-300/15 text-lime-100' : 'border-blue-700 bg-blue-100') : 'border-transparent hover:border-slate-600'}`}><item.icon size={15} />{item.label}</button>}</React.Fragment>)}</>}</nav>
        <div className="mt-7 border-t border-slate-700 pt-4 text-xs leading-6 text-slate-400"><p className="font-black text-lime-200">STATUS</p><p>Open to IT Engineer & Full-Stack roles.</p></div>
    </aside>;

    return <div className={`min-h-screen ${shell}`} style={{ fontFamily: "'Courier New', ui-monospace, monospace" }}>
        <div className="pointer-events-none fixed inset-0 opacity-[.035]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, #bef264 0, #bef264 1px, transparent 1px, transparent 3px)' }} />
        <header className={`relative z-20 flex min-h-16 items-center justify-between border-b-4 px-4 ${panel}`}><a href="/" className="text-sm font-black tracking-[0.12em] text-lime-300 sm:text-lg">▓▒░ GALIH.PORTFOLIO ░▒▓</a><div className="flex items-center gap-2"><a href="/Galih_Rizky_IT_Engineer.pdf" className="hidden min-h-10 items-center gap-2 border-2 border-slate-600 px-3 text-xs font-black hover:border-lime-300 sm:inline-flex"><Download size={14} />CV</a><button onClick={() => setDarkMode(!darkMode)} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} className="grid min-h-10 min-w-10 place-items-center border-2 border-yellow-300 text-yellow-200 hover:bg-yellow-300/10">{darkMode ? <Sun size={17} /> : <Moon size={17} />}</button><button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle portfolio menu" className="grid min-h-10 min-w-10 place-items-center border-2 border-lime-300 text-lime-200 lg:hidden">{menuOpen ? <X size={18} /> : <Menu size={18} />}</button></div></header>
        <div className="relative z-10 flex min-h-[calc(100vh-7.5rem)]"> <div className="hidden lg:block"><Sidebar /></div><AnimatePresence>{menuOpen && <motion.div {...(reducedMotion ? {} : pageTransition)} className="absolute inset-x-0 top-0 z-30 h-[calc(100vh-4rem)] lg:hidden"><Sidebar /></motion.div>}</AnimatePresence><main className="min-w-0 flex-1"><div className={`sticky top-0 z-10 flex items-center gap-2 border-b-2 px-4 py-3 ${panel}`}><span className="font-black text-lime-300">C:\</span><span className={muted}>Portfolio\{activeLabel}</span><span className="animate-pulse text-lime-300">█</span></div><div className="p-4 sm:p-6"><AnimatePresence mode="wait"><motion.div key={selected} {...(reducedMotion ? {} : pageTransition)}>{selected === 'home' ? <HomeView open={open} /> : activeProject ? <ProjectView project={activeProject} /> : <><div className="mb-5 border-2 border-lime-300 bg-lime-300/10 p-4"><p className="text-[11px] font-black tracking-[0.16em] text-lime-200">{content[selected].eyebrow}</p><h1 className="mt-2 text-2xl font-black tracking-wide text-white">{content[selected].title}</h1></div><StandardView selected={selected} /></>}</motion.div></AnimatePresence></div></main></div>
        <footer className={`relative z-20 border-t-4 px-4 py-2 text-xs font-bold tracking-wider ${panel}`}><span className="text-lime-300">▸ GALIH.PORTFOLIO</span><span className="mx-2 text-slate-500">▪</span><span className="text-slate-300">READY FOR THE NEXT BUILD</span></footer>
    </div>;
}
