import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useInView, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import {
    ArrowUpRight, BriefcaseBusiness, ChevronRight, Code2, Compass, Download,
    ExternalLink, FileCode2, FolderOpen, GraduationCap, Link, Mail, Menu, Moon, Search,
    Server, Sun, Terminal, UserRound, Wrench, X
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
    { id: 'approach', label: 'Approach', icon: Compass },
    { id: 'infrastructure', label: 'Infrastructure', icon: Server },
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
        domain: 'Travel Operations',
        year: '2025',
        accent: 'cyan',
        stack: ['Laravel', 'React', 'MySQL', 'Sanctum', 'Nginx'],
        spec: [
            ['Role', 'Full-stack + deployment'],
            ['Status', 'Live in production'],
            ['Shape', 'API + SPA, role-based access'],
            ['Deploy', 'VPS · Nginx · SSL'],
        ],
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
        domain: 'Point of Sale',
        year: '2024',
        accent: 'orange',
        stack: ['Flutter', 'Laravel', 'MySQL', 'REST API'],
        spec: [
            ['Role', 'Full-stack'],
            ['Status', 'Delivered'],
            ['Shape', 'Mobile client + REST API'],
            ['Deploy', 'Laravel backend on VPS'],
        ],
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
        domain: 'Point of Sale',
        year: '2024',
        accent: 'pink',
        stack: ['Flutter', 'Laravel', 'MySQL', 'Firebase Auth'],
        spec: [
            ['Role', 'Full-stack'],
            ['Status', 'Delivered'],
            ['Shape', 'Mobile POS + web admin'],
            ['Auth', 'Firebase Authentication'],
        ],
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
        domain: 'E-Commerce',
        year: '2024',
        accent: 'teal',
        stack: ['Laravel', 'React', 'TypeScript', 'MySQL'],
        spec: [
            ['Role', 'Full-stack'],
            ['Status', 'Delivered'],
            ['Shape', 'Marketplace + seller workflows'],
            ['Data', 'Commission and item tracking'],
        ],
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
        domain: 'Business Systems',
        year: '2023',
        accent: 'violet',
        stack: ['Laravel', 'MySQL', 'REST API', 'SQL'],
        spec: [
            ['Role', 'Full-stack'],
            ['Status', 'Delivered'],
            ['Shape', 'Recording + reporting'],
            ['Data', 'Relational schema, FK constraints'],
        ],
        problem: 'Stock records need a structured data model to remain accurate across goods and transactions.',
        built: [
            'Built inventory recording and tracking workflows with Laravel and MySQL.',
            'Designed relational schemas, foreign-key constraints, and APIs for goods and transaction data.',
            'Included reporting and data-integrity checks for operational visibility.'
        ],
    },
];

// Every accent needs a light-mode variant: pale 200/100 shades are unreadable on cream.
const accentMap = {
    cyan:   { text: 'text-cyan-200',   textLight: 'text-cyan-800',   border: 'border-cyan-300/60',   borderLight: 'border-cyan-700/60',   bgSoft: 'bg-cyan-300/10',   bgSoftLight: 'bg-cyan-700/10',   chip: 'border-cyan-300/50 text-cyan-100',   chipLight: 'border-cyan-700/60 text-cyan-900',   glowFrom: 'from-cyan-400/25' },
    orange: { text: 'text-orange-200', textLight: 'text-orange-800', border: 'border-orange-300/60', borderLight: 'border-orange-700/60', bgSoft: 'bg-orange-300/10', bgSoftLight: 'bg-orange-700/10', chip: 'border-orange-300/50 text-orange-100', chipLight: 'border-orange-700/60 text-orange-900', glowFrom: 'from-orange-400/25' },
    pink:   { text: 'text-pink-200',   textLight: 'text-pink-800',   border: 'border-pink-300/60',   borderLight: 'border-pink-700/60',   bgSoft: 'bg-pink-300/10',   bgSoftLight: 'bg-pink-700/10',   chip: 'border-pink-300/50 text-pink-100',   chipLight: 'border-pink-700/60 text-pink-900',   glowFrom: 'from-pink-400/25' },
    teal:   { text: 'text-teal-200',   textLight: 'text-teal-800',   border: 'border-teal-300/60',   borderLight: 'border-teal-700/60',   bgSoft: 'bg-teal-300/10',   bgSoftLight: 'bg-teal-700/10',   chip: 'border-teal-300/50 text-teal-100',   chipLight: 'border-teal-700/60 text-teal-900',   glowFrom: 'from-teal-400/25' },
    violet: { text: 'text-violet-200', textLight: 'text-violet-800', border: 'border-violet-300/60', borderLight: 'border-violet-700/60', bgSoft: 'bg-violet-300/10', bgSoftLight: 'bg-violet-700/10', chip: 'border-violet-300/50 text-violet-100', chipLight: 'border-violet-700/60 text-violet-900', glowFrom: 'from-violet-400/25' },
};

// Resolve accent classes for the active theme so pale accents stay readable in light mode.
const ac = (accent, dark) => {
    const a = accentMap[accent] || accentMap.cyan;
    return {
        text: dark ? a.text : a.textLight,
        border: dark ? a.border : a.borderLight,
        bgSoft: dark ? a.bgSoft : a.bgSoftLight,
        chip: dark ? a.chip : a.chipLight,
        glowFrom: a.glowFrom,
    };
};

// Full class strings (never template-built) so Tailwind can statically detect them.
const panelRule = (tone, dark) => ({
    cyan:   dark ? 'border-l-cyan-300/70'   : 'border-l-cyan-700',
    pink:   dark ? 'border-l-pink-300/70'   : 'border-l-pink-700',
    orange: dark ? 'border-l-orange-300/70' : 'border-l-orange-700',
    teal:   dark ? 'border-l-teal-300/70'   : 'border-l-teal-700',
    lime:   dark ? 'border-l-lime-300/70'   : 'border-l-[#1e40af]',
}[tone]);

const ruleTone = (tone, dark) => ({
    cyan:   dark ? 'text-cyan-200'   : 'text-cyan-800',
    pink:   dark ? 'text-pink-200'   : 'text-pink-800',
    orange: dark ? 'text-orange-200' : 'text-orange-800',
    teal:   dark ? 'text-teal-200'   : 'text-teal-800',
}[tone]);

// One place for every theme-dependent token. No component hardcodes a dark surface.
const palette = (dark) => ({
    shell: dark ? 'bg-slate-950 text-slate-100' : 'bg-[#f5efdf] text-stone-900',
    panel: dark ? 'border-lime-300 bg-slate-900' : 'border-[#1e40af] bg-[#fdf9ec]',
    card: dark ? 'border-slate-700 bg-slate-900/75' : 'border-stone-300 bg-white',
    hero: dark ? 'border-lime-300 bg-slate-900/90' : 'border-[#1e40af] bg-white',
    strong: dark ? 'text-white' : 'text-stone-900',
    muted: dark ? 'text-slate-300' : 'text-stone-700',
    soft: dark ? 'text-slate-400' : 'text-stone-600',
    accent: dark ? 'text-lime-300' : 'text-[#1e40af]',
    accentSoft: dark ? 'text-lime-200' : 'text-[#1e40af]',
    label: dark ? 'text-orange-200' : 'text-orange-700',
    rule: dark ? 'bg-slate-700' : 'bg-stone-300',
    divider: dark ? 'divide-slate-700' : 'divide-stone-300',
    border: dark ? 'border-slate-700' : 'border-stone-300',
    navIdle: dark ? 'border-transparent text-slate-100 hover:border-slate-600' : 'border-transparent text-stone-800 hover:border-stone-400',
    navActive: dark ? 'border-lime-300 text-lime-100' : 'border-[#1e40af] text-[#1e3a8a]',
    // Background lives on the sliding element (NavRow) so it can animate between rows.
    navHighlight: dark ? 'bg-lime-300/15' : 'bg-[#dbeafe]',
    input: dark
        ? 'border-lime-300 bg-slate-800 text-lime-100 placeholder:text-lime-200/80 focus:bg-slate-700'
        : 'border-[#1e40af] bg-white text-[#1e3a8a] placeholder:text-stone-600 focus:bg-[#dbeafe]',
    cta: dark
        ? 'border-lime-300 bg-lime-300 text-slate-950 hover:bg-lime-200 hover:shadow-[0_6px_0_rgba(132,204,22,.35)]'
        : 'border-[#1e40af] bg-[#1e40af] text-white hover:bg-[#1e3a8a] hover:shadow-[0_6px_0_rgba(30,64,175,.28)]',
    ctaGhost: dark
        ? 'border-slate-600 text-slate-100 hover:border-lime-300 hover:text-lime-200'
        : 'border-stone-400 text-stone-800 hover:border-[#1e40af] hover:text-[#1e40af]',
    shadow: dark ? 'shadow-[6px_6px_0_rgba(0,0,0,.45)]' : 'shadow-[6px_6px_0_rgba(30,64,175,.16)]',
});

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
    approach: {
        title: 'Approach',
        eyebrow: 'APPROACH.MD',
        quote: 'I like the unglamorous half of software: the records that must not be wrong, the workflow that must not break at 8 a.m.',
        columns: [
            'Most of the value in an internal system is invisible when it works. A payment record that reconciles, a document that cannot be lost, a role that cannot see what it should not — that is the job. I design the data model first, then the screens, because the schema outlives the UI.',
            'The rest is discipline around shipping: small reversible steps, a deploy script that can be re-run, a maintenance window that closes itself if something fails, and documentation that stays true after the enthusiasm fades.',
        ],
        practices: [
            ['Schema before screens', 'Relational constraints do the validation the UI cannot be trusted to do.'],
            ['Deploy as a repeatable script', 'git pull, composer, npm ci, vite build, cache — one command, no manual steps.'],
            ['Failure has a fallback', 'Maintenance mode is released automatically if any deploy step throws.'],
            ['Small reversible commits', 'Every change should be undoable without a rewrite.'],
        ],
    },
    infrastructure: {
        title: 'Infrastructure',
        eyebrow: 'INFRA.YML',
        intro: 'Everything here runs on infrastructure I provision and maintain myself — no managed platform hiding the failure modes.',
        cards: [
            {
                name: 'Application Host',
                rows: [
                    ['Server', 'Ubuntu VPS'],
                    ['Web server', 'Nginx 1.24'],
                    ['TLS', 'HTTPS with redirect from HTTP'],
                    ['Runtime', 'PHP 8.3 · Laravel 13'],
                ],
            },
            {
                name: 'Build & Release',
                rows: [
                    ['Frontend', 'Vite 8 · Tailwind 4 · React 19'],
                    ['Install', 'npm ci (lockfile-pinned)'],
                    ['Release', 'deploy.sh · idempotent'],
                    ['Rollback', 'Maintenance trap on failure'],
                ],
            },
        ],
        note: 'Verified from the live host: HTTP → HTTPS 301, Nginx 1.24.0 (Ubuntu), X-Frame-Options and X-Content-Type-Options present.',
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

const stats = [
    { key: '05', label: 'SYSTEMS SHIPPED' },
    { key: '03', label: 'YEARS BUILDING' },
    { key: '2026', label: 'LAST UPDATED' },
    { key: 'IDN', label: 'BASED IN INDONESIA' },
];

const pageTransition = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } };
const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
const slideNav = { initial: { x: -304 }, animate: { x: 0 }, exit: { x: -304 } };
const stagger = { animate: { transition: { staggerChildren: 0.07 } } };
const riseItem = { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 } };

// Shared easing: a short, decisive ease-out. Anything slower reads as decorative
// rather than responsive on a page a recruiter scrolls once.
const easeOut = [0.22, 0.61, 0.36, 1];

// Sections fade up as they enter the content pane. `once` keeps it from
// re-firing on every scroll pass, which would feel twitchy.
const revealSection = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.45, ease: easeOut },
};

// Typewriter eyebrow: the caret is a separate span so it can blink on its own.
function Typewriter({ text, className = '', caretClass = '', speed = 34 }) {
    const reduced = useReducedMotion();
    const [shown, setShown] = useState(reduced ? text.length : 0);

    useEffect(() => {
        if (reduced) { setShown(text.length); return; }
        setShown(0);
        let i = 0;
        const id = setInterval(() => {
            i += 1;
            setShown(i);
            if (i >= text.length) clearInterval(id);
        }, speed);
        return () => clearInterval(id);
    }, [text, speed, reduced]);

    return <span className={className}>
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">{text.slice(0, shown)}</span>
        {!reduced && <span className={`caret-blink ${caretClass}`} aria-hidden="true">▌</span>}
    </span>;
}

// Counts 0 -> value once, when the strip scrolls into view.
function CountUp({ value, className = '' }) {
    const reduced = useReducedMotion();
    const numeric = /^\d+$/.test(value);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.6 });
    const [n, setN] = useState(0);

    useEffect(() => {
        if (!numeric || reduced || !inView) return;
        const target = Number(value);
        const dur = 900;
        const t0 = performance.now();
        let raf = 0;
        const tick = (t) => {
            const p = Math.min(1, (t - t0) / dur);
            // ease-out so the number settles instead of stopping dead
            setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [inView, numeric, reduced, value]);

    if (!numeric) return <span className={className}>{value}</span>;

    // Reduced motion shows the final number immediately; otherwise the count
    // starts only once the strip is on screen.
    const display = reduced ? value : String(n).padStart(value.length, '0');
    return <span ref={ref} className={className}>{display}</span>;
}

function ActionLink({ href, children, primary = false, icon: Icon = ExternalLink, T }) {
    return <a href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer"
        className={`group inline-flex min-h-11 items-center justify-center gap-2 border-2 px-4 py-2 text-xs font-black tracking-wider transition-all duration-200 hover:-translate-y-0.5 ${primary ? T.cta : T.ctaGhost}`}>
        <Icon size={15} aria-hidden="true" className="transition-transform duration-200 group-hover:scale-110" />{children}
    </a>;
}

// Magnetic button: the element leans toward the cursor while it's hovering, then
// springs back when the pointer leaves. Disabled under reduced motion.
// Renders an <a> when `href` is present, otherwise a <button>.
function MagneticButton({ children, className = '', strength = 0.28, href, ...rest }) {
    const reduced = useReducedMotion();
    const ref = useRef(null);
    const x = useSpring(0, { stiffness: 320, damping: 18, mass: 0.4 });
    const y = useSpring(0, { stiffness: 320, damping: 18, mass: 0.4 });

    const onMove = (e) => {
        if (reduced || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const onLeave = () => { x.set(0); y.set(0); };

    const shared = {
        ref, onMouseMove: onMove, onMouseLeave: onLeave,
        style: { x: reduced ? 0 : x, y: reduced ? 0 : y },
        className,
        ...rest,
    };

    return href
        ? <motion.a href={href} {...shared}>{children}</motion.a>
        : <motion.button type="button" {...shared}>{children}</motion.button>;
}

// Horizontal skill ticker. The track is duplicated so the marquee loops seamlessly.
function TechMarquee({ dark }) {
    const T = palette(dark);
    const skills = content.skills.groups.flatMap(([, s]) => s);
    const row = [...skills, ...skills];
    const dot = dark ? 'text-lime-300' : 'text-[#1e40af]';
    return (
        <div className={`overflow-hidden border-2 ${T.card}`} aria-hidden="true">
            <div className="marquee-track py-2.5">
                {row.map((s, i) => (
                    <span key={`${s}-${i}`} className="inline-flex items-center gap-2 px-4 text-xs font-black tracking-wider">
                        <span className={dot} aria-hidden="true">▸</span>
                        <span className={T.strong}>{s}</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

// 3D tilt wrapper: tilts the card toward the cursor using rotateX/rotateY.
// Springs back to flat on leave. Disabled under reduced motion.
function TiltCard({ children, className = '', max = 6 }) {
    const reduced = useReducedMotion();
    const ref = useRef(null);
    const rx = useSpring(0, { stiffness: 260, damping: 18, mass: 0.5 });
    const ry = useSpring(0, { stiffness: 260, damping: 18, mass: 0.5 });

    const onMove = (e) => {
        if (reduced || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        rx.set(-py * max);
        ry.set(px * max);
    };
    const onLeave = () => { rx.set(0); ry.set(0); };

    return (
        <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
            style={{ rotateX: reduced ? 0 : rx, rotateY: reduced ? 0 : ry, transformPerspective: 800 }}
            className={className}>
            {children}
        </motion.div>
    );
}

// Interactive Project Card with Cyberpunk Tech-Stack Popup HUD on Hover
function ProjectCard({ project, dark, open, isFeatured = false }) {
    const [hovered, setHovered] = useState(false);
    const a = ac(project.accent, dark);
    const T = palette(dark);
    const initials = project.label.replace(/[^A-Za-z& ]/g, '').split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();

    return (
        <TiltCard className={isFeatured ? "col-span-1 sm:col-span-2 h-full" : "col-span-1 h-full"}>
            <div
                role="button"
                tabIndex={0}
                onClick={() => open(`project:${project.id}`)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(`project:${project.id}`); } }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className={`group relative flex flex-col justify-between h-full overflow-hidden border-2 p-5 text-left transition-colors duration-200 cursor-pointer ${a.border} ${dark ? 'bg-slate-900/80 hover:bg-slate-900' : 'bg-white hover:bg-[#fdf9ec]'} ${isFeatured ? 'min-h-[200px]' : 'min-h-[230px]'}`}
            >
                {/* Accent top gradient stripe */}
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${a.glowFrom} to-transparent`} aria-hidden="true" />
                <span className="sheen" aria-hidden="true" />

                {/* Base Card Content (Clean & perfectly aligned across all cards) */}
                <div className="flex-1">
                    {/* Header Row */}
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className={`grid h-10 w-10 shrink-0 place-items-center border-2 text-xs font-black ${a.border} ${a.text} ${a.bgSoft}`} aria-hidden="true">
                                {initials}
                            </div>
                            <div>
                                <p className={`text-[10px] font-black tracking-[0.16em] ${a.text}`}>
                                    {project.domain.toUpperCase()} · {project.year}
                                </p>
                                {isFeatured && (
                                    <span className={`inline-block text-[9px] font-black tracking-widest ${dark ? 'text-lime-300' : 'text-[#1e40af]'}`}>
                                        // FLAGSHIP_SYSTEM
                                    </span>
                                )}
                            </div>
                        </div>

                        {project.live ? (
                            <span className={`inline-flex items-center gap-1.5 border px-2 py-0.5 text-[10px] font-black tracking-wider ${dark ? 'border-lime-300/60 text-lime-200 bg-lime-300/10' : 'border-[#4d7c0f] text-[#3f6212] bg-lime-100/50'}`}>
                                <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                                LIVE
                            </span>
                        ) : (
                            <span className={`border px-2 py-0.5 text-[10px] font-bold tracking-wider ${T.soft} ${T.border}`}>
                                DELIVERED
                            </span>
                        )}
                    </div>

                    {/* Title & Subtitle with locked heights for visual symmetry */}
                    <div className="mt-4">
                        <h3 className={`text-base font-black tracking-wide ${T.strong}`}>
                            {project.label}
                        </h3>
                        <p className={`mt-2 text-xs leading-5 ${T.soft} line-clamp-2`}>
                            {project.subtitle}
                        </p>
                        {/* Tech stack chips visible directly for mobile and immediate scanning */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                            {project.stack.slice(0, 4).map((tech) => (
                                <span key={tech} className={`border px-1.5 py-0.5 text-[10px] font-bold ${a.chip}`}>
                                    {tech}
                                </span>
                            ))}
                            {project.stack.length > 4 && (
                                <span className={`px-1 py-0.5 text-[10px] font-bold ${T.soft}`}>
                                    +{project.stack.length - 4}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Row (Identical across all cards) */}
                <div className={`mt-5 pt-3 border-t border-dashed flex items-center justify-between ${T.border}`}>
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold ${T.soft} transition-colors group-hover:${a.text}`}>
                        <Code2 size={13} className={a.text} />
                        <span>{project.stack.length} Techs</span>
                        <span className="hidden sm:inline text-[10px] opacity-60">(Hover to inspect)</span>
                    </span>
                    <span className={`inline-flex items-center gap-1 text-xs font-black tracking-wider transition-transform duration-200 group-hover:translate-x-1 ${a.text}`}>
                        OPEN <ChevronRight size={14} />
                    </span>
                </div>

                {/* Cyberpunk Tech Stack Popup HUD (smooth scale + fade on hover) */}
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 6 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 6 }}
                            transition={{ duration: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
                            className={`absolute inset-0 z-20 flex flex-col justify-between p-5 border-2 ${a.border} backdrop-blur-xl shadow-2xl`}
                            style={{
                                background: dark ? 'rgba(3, 7, 18, 0.95)' : 'rgba(253, 249, 236, 0.97)'
                            }}
                            aria-hidden="true"
                        >
                            <div>
                                <div className={`flex items-center justify-between pb-2 border-b-2 ${a.border}`}>
                                    <span className={`text-[11px] font-black tracking-widest ${a.text}`}>
                                        // TECH_STACK_INSPECTOR
                                    </span>
                                    <span className={`text-[10px] font-bold ${T.soft}`}>
                                        {project.stack.length} MODULES
                                    </span>
                                </div>

                                <div className="mt-3.5 flex flex-wrap gap-2">
                                    {project.stack.map((tech, idx) => (
                                        <motion.span
                                            key={tech}
                                            initial={{ opacity: 0, scale: 0.6, y: 8 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            transition={{ delay: 0.02 + idx * 0.035, type: 'spring', stiffness: 500, damping: 22 }}
                                            className={`border px-2.5 py-1 text-xs font-black tracking-wide ${a.chip}`}
                                        >
                                            {tech}
                                        </motion.span>
                                    ))}
                                </div>

                                {project.spec && project.spec[0] && (
                                    <div className="mt-4 flex items-center gap-2 text-[11px]">
                                        <span className={`font-black tracking-wider ${T.soft}`}>{project.spec[0][0].toUpperCase()}:</span>
                                        <span className={`font-bold ${T.muted}`}>{project.spec[0][1]}</span>
                                    </div>
                                )}
                            </div>

                            <div className={`pt-3 border-t-2 ${a.border} flex items-center justify-between text-xs`}>
                                <span className={`text-[10px] font-bold tracking-wider ${T.soft}`}>
                                    CLICK TO VIEW FULL CASE STUDY
                                </span>
                                <span className={`inline-flex items-center gap-1 font-black ${a.text}`}>
                                    EXPLORE <ChevronRight size={14} />
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </TiltCard>
    );
}

function SectionLabel({ icon: Icon, children, right, T }) {
    return <div className="mb-4 flex items-center gap-3">
        <Icon size={16} className={T.label} aria-hidden="true" />
        <h2 className={`text-xs font-black tracking-[0.16em] ${T.label}`}>{children}</h2>
        <span className={`h-px flex-1 ${T.rule}`} aria-hidden="true" />
        {right && <span className={`text-xs font-bold ${T.soft}`}>{right}</span>}
    </div>;
}

// Module scope matters: a component declared inside the render body gets a new identity
// on every render, so React remounts the subtree and the search input loses focus.
// `scope` keeps the sliding highlight unique per sidebar instance (desktop vs drawer) —
// two mounted elements sharing one layoutId would fight over the same layout animation.
function NavRow({ active, T, scope = 'desktop', children, ...rest }) {
    return <button type="button" aria-current={active ? 'page' : undefined}
        className={`relative flex w-full items-center gap-2 border-2 px-3 py-2 text-left text-xs font-bold transition-colors ${active ? T.navActive : T.navIdle}`}
        {...rest}>
        {active && <motion.span layoutId={`nav-active-${scope}`} aria-hidden="true"
            className={`absolute inset-[2px] ${T.navHighlight}`}
            transition={{ type: 'spring', stiffness: 420, damping: 34, mass: 0.7 }} />}
        <span className="relative flex w-full items-center gap-2">{children}</span>
    </button>;
}

function ProjectBanner({ project, dark }) {
    const a = ac(project.accent, dark);
    const initials = project.label.replace(/[^A-Za-z& ]/g, '').split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
    return (
        <div className={`relative overflow-hidden border-2 ${a.border} ${dark ? 'bg-slate-900' : 'bg-white'}`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${a.glowFrom} to-transparent`} aria-hidden="true" />
            <div className="pointer-events-none absolute inset-0 opacity-[.07]" aria-hidden="true"
                style={{ backgroundImage: 'repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 1px, transparent 10px)' }} />
            <div className="relative flex items-center justify-between gap-4 px-5 py-6">
                <div className={`grid h-16 w-16 shrink-0 place-items-center border-2 text-2xl font-black ${a.border} ${a.text} ${a.bgSoft}`} aria-hidden="true">{initials}</div>
                <div className="min-w-0 flex-1">
                    <p className={`text-[10px] font-black tracking-[0.18em] ${a.text}`}>{project.domain} · {project.year}</p>
                    <p className={`mt-1 truncate text-sm font-bold ${dark ? 'text-slate-200' : 'text-stone-700'}`}>{project.subtitle}</p>
                </div>
                <FolderOpen size={28} className={`shrink-0 ${a.text}`} aria-hidden="true" />
            </div>
        </div>
    );
}

function ProjectView({ project, dark }) {
    const a = ac(project.accent, dark);
    const T = palette(dark);
    return <motion.article className="space-y-5" variants={stagger} initial="initial" animate="animate">
        <motion.div variants={riseItem}><ProjectBanner project={project} dark={dark} /></motion.div>

        <motion.header variants={riseItem} className={`border-2 border-l-4 ${a.border} ${T.card} p-4`}>
            <p className={`mb-2 text-[11px] font-bold tracking-[0.16em] ${a.text}`}>PROJECT.CASE_STUDY</p>
            <h1 className={`text-xl font-black tracking-wide sm:text-2xl ${T.strong}`}>{project.title}</h1>
            <p className={`mt-2 text-sm leading-6 ${T.muted}`}>{project.subtitle}</p>
        </motion.header>

        <div className="grid gap-5 lg:grid-cols-[1.55fr_.85fr]">
            <div className="space-y-5">
                <motion.section variants={riseItem} className={`border-2 border-l-4 ${panelRule('cyan', dark)} ${T.card} p-4`}>
                    <h3 className={`text-xs font-black tracking-widest ${ruleTone('cyan', dark)}`}>THE PROBLEM</h3>
                    <p className={`mt-3 text-sm leading-7 ${T.muted}`}>{project.problem}</p>
                </motion.section>
                <motion.section variants={riseItem} className={`border-2 border-l-4 ${panelRule('pink', dark)} ${T.card} p-4`}>
                    <h3 className={`text-xs font-black tracking-widest ${ruleTone('pink', dark)}`}>WHAT I BUILT</h3>
                    <ul className={`mt-3 space-y-3 text-sm leading-6 ${T.muted}`}>
                        {project.built.map((item) => <li key={item} className="flex gap-3"><span className={ruleTone('pink', dark)} aria-hidden="true">▸</span><span>{item}</span></li>)}
                    </ul>
                </motion.section>
                <motion.section variants={riseItem} className={`border-2 border-l-4 ${panelRule('orange', dark)} ${T.card} p-4`}>
                    <h3 className={`text-xs font-black tracking-widest ${ruleTone('orange', dark)}`}>STACK</h3>
                    <div className="mt-3 flex flex-wrap gap-2">{project.stack.map((tech) => <span key={tech} className={`border px-2 py-1 text-xs font-bold ${a.chip}`}>{tech}</span>)}</div>
                </motion.section>
            </div>

            <motion.aside variants={riseItem} className={`h-fit border-2 ${T.card} p-4`} aria-label={`${project.label} specification`}>
                <p className={`text-[11px] font-black tracking-[0.16em] ${a.text}`}>SPEC.SHEET</p>
                <dl className={`mt-3 divide-y ${T.divider}`}>
                    {project.spec.map(([label, value]) => <div key={label} className="grid grid-cols-[5.5rem_1fr] gap-2 py-2.5 text-xs">
                        <dt className={`font-black tracking-wider ${T.soft}`}>{label.toUpperCase()}</dt>
                        <dd className={`font-bold ${T.muted}`}>{value}</dd>
                    </div>)}
                </dl>
                {project.live && <div className="mt-4"><ActionLink href={project.live} primary icon={ArrowUpRight} T={T}>OPEN LIVE SYSTEM</ActionLink></div>}
            </motion.aside>
        </div>
    </motion.article>;
}

function StandardView({ selected, dark }) {
    const item = content[selected];
    const T = palette(dark);

    if (selected === 'experience') return <section className="space-y-4" aria-label="Work experience">
        {item.entries.map((entry) => <article key={entry.company} className={`border-2 ${T.card} p-4`}>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div><h2 className={`font-black ${T.strong}`}>{entry.company}</h2><p className={`mt-1 text-sm ${T.accentSoft}`}>{entry.role}</p></div>
                <p className={`text-xs ${T.soft}`}>{entry.period}</p>
            </div>
            <ul className={`mt-4 space-y-2 text-sm leading-6 ${T.muted}`}>{entry.bullets.map(b => <li key={b} className="flex gap-3"><span className={T.accent} aria-hidden="true">▸</span>{b}</li>)}</ul>
        </article>)}
    </section>;

    if (selected === 'skills') return <section className="space-y-4" aria-label="Technical skills">
        {item.groups.map(([name, skills]) => <article key={name} className={`border-2 ${T.card} p-4`}>
            <h2 className={`text-xs font-black tracking-widest ${ruleTone('teal', dark)}`}>{name.toUpperCase()}</h2>
            <div className="mt-3 flex flex-wrap gap-2">{skills.map(skill => <span key={skill} className={`border px-2 py-1 text-xs font-bold ${ac('teal', dark).chip}`}>{skill}</span>)}</div>
        </article>)}
    </section>;

    if (selected === 'contact') return <section className={`border-2 ${T.card} p-4`} aria-label="Contact">
        <p className={`text-sm leading-7 ${T.muted}`}>{item.body}</p>
        <div className="mt-5 flex flex-wrap gap-3">
            <ActionLink href={`mailto:${CONTACT.email}`} primary icon={Mail} T={T}>EMAIL ME</ActionLink>
            <ActionLink href={CONTACT.linkedin} icon={Link} T={T}>LINKEDIN</ActionLink>
            <ActionLink href={CONTACT.github} icon={Code2} T={T}>GITHUB</ActionLink>
        </div>
    </section>;

    if (selected === 'education') return <section className={`border-2 ${T.card} p-4`} aria-label="Education">
        <h2 className={`font-black ${T.strong}`}>{item.institution}</h2>
        <div className="mt-2 flex flex-col justify-between gap-1 text-sm sm:flex-row">
            <p className={T.accentSoft}>{item.role}</p><p className={T.soft}>{item.period}</p>
        </div>
        <p className={`mt-4 text-sm leading-7 ${T.muted}`}>{item.body}</p>
    </section>;

    if (selected === 'approach') return <section className="space-y-4" aria-label="Approach">
        <blockquote className={`border-2 border-l-4 ${panelRule('lime', dark)} ${T.card} p-5`}>
            <p className={`text-lg font-black leading-snug tracking-wide sm:text-xl ${T.strong}`}>&ldquo;{item.quote}&rdquo;</p>
        </blockquote>
        <div className="grid gap-4 md:grid-cols-2">
            {item.columns.map((para) => <article key={para.slice(0, 24)} className={`border-2 ${T.card} p-4`}><p className={`text-sm leading-7 ${T.muted}`}>{para}</p></article>)}
        </div>
        <article className={`border-2 ${T.card} p-4`}>
            <h2 className={`text-xs font-black tracking-widest ${T.accentSoft}`}>HOW I WORK</h2>
            <dl className={`mt-3 divide-y ${T.divider}`}>
                {item.practices.map(([k, v]) => <div key={k} className="grid gap-1 py-3 sm:grid-cols-[13rem_1fr]">
                    <dt className={`text-sm font-black ${T.strong}`}>{k}</dt>
                    <dd className={`text-sm leading-6 ${T.muted}`}>{v}</dd>
                </div>)}
            </dl>
        </article>
    </section>;

    if (selected === 'infrastructure') return <section className="space-y-4" aria-label="Infrastructure">
        <p className={`border-2 border-l-4 ${panelRule('cyan', dark)} ${T.card} p-4 text-sm leading-7 ${T.muted}`}>{item.intro}</p>
        <div className="grid gap-4 md:grid-cols-2">
            {item.cards.map((card) => <article key={card.name} className={`border-2 ${T.card} p-4`}>
                <h2 className={`text-xs font-black tracking-widest ${T.accentSoft}`}>{card.name.toUpperCase()}</h2>
                <dl className={`mt-3 divide-y ${T.divider}`}>
                    {card.rows.map(([k, v]) => <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-2 py-2.5 text-xs">
                        <dt className={`font-black tracking-wider ${T.soft}`}>{k.toUpperCase()}</dt>
                        <dd className={`font-bold ${T.muted}`}>{v}</dd>
                    </div>)}
                </dl>
            </article>)}
        </div>
        <p className={`border-2 border-dashed ${dark ? 'border-slate-700' : 'border-stone-400'} p-3 text-xs font-bold leading-6 ${T.soft}`}>{item.note}</p>
    </section>;

    return <section className={`border-2 ${T.card} p-4`}>
        <p className={`text-sm leading-7 ${T.muted}`}>{item.body}</p>
        {item.facts && <dl className={`mt-5 divide-y border-y ${T.divider} ${T.border}`}>
            {item.facts.map(([label, value]) => <div key={label} className="grid gap-1 py-3 text-sm sm:grid-cols-[10rem_1fr]">
                <dt className={`font-bold ${T.accentSoft}`}>{label}</dt><dd className={T.muted}>{value}</dd>
            </div>)}
        </dl>}
        {item.highlights && <ul className={`mt-5 space-y-2 text-sm leading-6 ${T.muted}`}>
            {item.highlights.map(x => <li key={x} className="flex gap-3"><span className={T.accent} aria-hidden="true">▸</span>{x}</li>)}
        </ul>}
    </section>;
}

function StatsStrip({ dark }) {
    const T = palette(dark);
    const divider = dark ? 'border-slate-700' : 'border-stone-300';
    const edges = [
        '',
        `border-l-2 ${divider}`,
        `border-t-2 sm:border-t-0 sm:border-l-2 ${divider}`,
        `border-t-2 border-l-2 sm:border-t-0 ${divider}`,
    ];
    return <section className={`grid grid-cols-2 border-2 sm:grid-cols-4 ${T.card}`} aria-label="At a glance">
        {stats.map((s, i) => <div key={s.label} className={`p-4 ${edges[i]}`}>
            <CountUp value={s.key} className={`block text-2xl font-black tracking-tight sm:text-3xl ${T.strong}`} />
            <p className={`mt-1 text-[10px] font-black tracking-[0.14em] ${T.soft}`}>{s.label}</p>
        </div>)}
    </section>;
}

function HomeView({ open, dark }) {
    const T = palette(dark);
    const featured = projects[0];
    return <div className="mx-auto max-w-6xl space-y-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
            <motion.section
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                className={`relative overflow-hidden border-4 p-5 sm:p-8 landscape-compact-hero ${T.hero} ${T.shadow}`}>
                <div className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl ${dark ? 'bg-lime-300/10' : 'bg-[#1e40af]/10'}`} aria-hidden="true" />
                <p className={`relative inline-flex items-center gap-2 text-xs font-black tracking-[0.16em] ${T.accentSoft}`}>
                    <span className="relative grid h-2 w-2 place-items-center" aria-hidden="true">
                        <span className={`absolute inset-0 rounded-full ${dark ? 'bg-lime-300' : 'bg-[#1e40af]'} ping-ring`} />
                        <span className={`h-2 w-2 rounded-full ${dark ? 'bg-lime-300' : 'bg-[#1e40af]'}`} />
                    </span>
                    <Typewriter text="// AVAILABLE FOR IT ENGINEER & FULL-STACK ROLES" caretClass="ml-0.5" />
                </p>
                <h1 className={`relative mt-5 max-w-3xl text-3xl font-black leading-tight tracking-wide sm:text-5xl landscape-compact-title ${T.strong}`}>
                    <span className="shimmer-text bg-clip-text text-transparent"
                        style={{ '--shimmer-from': dark ? '#bef264' : '#1e40af', '--shimmer-to': dark ? '#f7fee7' : '#60a5fa' }}>
                        I BUILD SYSTEMS THAT KEEP OPERATIONS MOVING.
                    </span>
                </h1>
                <p className={`relative mt-5 max-w-2xl text-sm leading-7 sm:text-base landscape-compact-bio ${T.muted}`}>Galih Rizky Pradana. Informatics graduate building Laravel and React applications, practical REST APIs, and deployment-ready systems for real business workflows.</p>
                <div className="relative mt-7 flex flex-wrap gap-3 landscape-compact-cta">
                    <MagneticButton type="button" onClick={() => open('project:umrah')} className={`group inline-flex min-h-11 items-center gap-2 border-2 px-4 py-2 text-xs font-black tracking-wider transition-colors ${T.cta}`}>
                        <FolderOpen size={15} aria-hidden="true" className="transition-transform duration-200 group-hover:scale-110" />VIEW FEATURED PROJECT
                    </MagneticButton>
                    <MagneticButton href="/Galih_Rizky_IT_Engineer.pdf" className={`group inline-flex min-h-11 items-center gap-2 border-2 px-4 py-2 text-xs font-black tracking-wider transition-colors ${T.ctaGhost}`}>
                        <Download size={15} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-y-0.5" />DOWNLOAD CV
                    </MagneticButton>
                </div>
                <div className={`relative mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-bold landscape-compact-links ${T.muted}`}>
                    <a className={`inline-flex items-center gap-2 transition-colors ${dark ? 'hover:text-lime-200' : 'hover:text-[#1e40af]'}`} href={CONTACT.github} target="_blank" rel="noreferrer"><Code2 size={15} aria-hidden="true" />github.com/glhrip</a>
                    <a className={`inline-flex items-center gap-2 transition-colors ${dark ? 'hover:text-lime-200' : 'hover:text-[#1e40af]'}`} href={CONTACT.linkedin} target="_blank" rel="noreferrer"><Link size={15} aria-hidden="true" />LinkedIn</a>
                    <a className={`inline-flex items-center gap-2 transition-colors ${dark ? 'hover:text-lime-200' : 'hover:text-[#1e40af]'}`} href={`mailto:${CONTACT.email}`}><Mail size={15} aria-hidden="true" />Email</a>
                </div>
            </motion.section>

            <motion.aside
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
                className={`bob border-2 p-5 ${T.card} ${dark ? 'border-cyan-300/70 glow-lime' : 'border-cyan-700/60'}`} aria-labelledby="featured-heading">
                <p className={`text-xs font-black tracking-widest ${ruleTone('cyan', dark)}`}>FEATURED_PROJECT.EXE</p>
                <h2 id="featured-heading" className={`mt-4 text-xl font-black ${T.strong}`}>{featured.label}</h2>
                <p className={`mt-3 text-sm leading-7 ${T.muted}`}>A full-stack operating system for travel agencies: pilgrim records, document workflow, payments, departure schedules, and RBAC.</p>
                <dl className={`mt-4 divide-y ${T.divider}`}>
                    {featured.spec.map(([k, v]) => <div key={k} className="grid grid-cols-[5rem_1fr] gap-2 py-2 text-[11px]">
                        <dt className={`font-black tracking-wider ${T.soft}`}>{k.toUpperCase()}</dt>
                        <dd className={`font-bold ${T.muted}`}>{v}</dd>
                    </div>)}
                </dl>
                <div className="mt-4 flex flex-wrap gap-2">{featured.stack.map(x => <span className={`border px-2 py-1 text-xs font-bold ${ac('cyan', dark).chip}`} key={x}>{x}</span>)}</div>
                <button type="button" onClick={() => open('project:umrah')} className={`group mt-5 inline-flex items-center gap-2 text-xs font-black tracking-wider transition-colors ${T.accentSoft}`}>
                    OPEN CASE STUDY <ChevronRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </button>
            </motion.aside>
        </div>

        <StatsStrip dark={dark} />

        <TechMarquee dark={dark} />

        <motion.section aria-labelledby="all-projects-heading" {...revealSection}>
            <div className="mb-4 flex items-center gap-3">
                <FolderOpen size={16} className={T.label} aria-hidden="true" />
                <h2 id="all-projects-heading" className={`text-xs font-black tracking-[0.16em] ${T.label}`}>ALL_PROJECTS/</h2>
                <span className={`h-px flex-1 ${T.rule}`} aria-hidden="true" />
                <span className={`text-xs font-bold ${T.soft}`}>{projects.length} entries</span>
            </div>
            <motion.div variants={stagger} initial="initial" animate="animate" className="grid gap-4 sm:grid-cols-2">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        dark={dark}
                        open={open}
                        isFeatured={index === 0}
                    />
                ))}
            </motion.div>
        </motion.section>

        <motion.section aria-labelledby="approach-quote-heading" {...revealSection}>
            <SectionLabel icon={Compass} T={T} right="APPROACH.MD">HOW I WORK</SectionLabel>
            <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
                <blockquote className={`border-2 border-l-4 p-5 ${panelRule('lime', dark)} ${T.card}`}>
                    <p id="approach-quote-heading" className={`text-base font-black leading-snug tracking-wide sm:text-lg ${T.strong}`}>&ldquo;{content.approach.quote}&rdquo;</p>
                    <button type="button" onClick={() => open('approach')} className={`group mt-4 inline-flex items-center gap-2 text-xs font-black tracking-wider ${T.accentSoft}`}>
                        READ THE FULL APPROACH <ChevronRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                    </button>
                </blockquote>
                <div className={`border-2 p-4 ${T.card}`}>
                    <p className={`text-sm leading-7 ${T.muted}`}>{content.approach.columns[0]}</p>
                </div>
            </div>
        </motion.section>
    </div>;
}

function Sidebar({ dark, query, setQuery, selected, open, results, innerRef, inDrawer = false }) {
    const T = palette(dark);
    const scope = inDrawer ? 'drawer' : 'desktop';
    return <aside ref={innerRef}
        className={`scroll-term scroll-pane h-full w-72 shrink-0 border-r-4 p-3 ${T.panel}`}
        {...(inDrawer ? { role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Portfolio navigation menu' } : { 'aria-label': 'Portfolio navigation' })}>
        <label className="relative block">
            <span className="sr-only">Search portfolio</span>
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${T.accent}`} size={15} aria-hidden="true" />
            <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="SEARCH PORTFOLIO..." aria-label="Search portfolio"
                className={`w-full border-2 py-2 pl-9 pr-3 text-xs font-bold outline-none ${T.input}`} />
        </label>
        <p aria-live="polite" className="sr-only">{results ? `${results.length} result${results.length === 1 ? '' : 's'}` : ''}</p>
        <nav className="mt-4 space-y-1" aria-label="Portfolio sections">
            {results ? (results.length
                ? results.map(item => <NavRow key={item.id} T={T} scope={scope} active={selected === item.id} onClick={() => open(item.id)}>
                    <item.icon size={15} aria-hidden="true" />{item.label}
                </NavRow>)
                : <div className={`border-2 border-dashed px-3 py-6 text-center text-xs font-bold ${dark ? 'border-slate-700 text-slate-400' : 'border-[#1e40af]/40 text-stone-600'}`}>No results for &ldquo;{query}&rdquo;</div>)
                : <>
                    <NavRow T={T} scope={scope} active={selected === 'home'} onClick={() => open('home')}><Terminal size={15} aria-hidden="true" />HOME</NavRow>
                    {navItems.map(item => <React.Fragment key={item.id}>
                        {item.folder ? <>
                            <div className={`mt-2 flex items-center gap-2 px-3 py-2 text-xs font-black tracking-wider ${T.label}`}><FolderOpen size={15} aria-hidden="true" />PROJECTS</div>
                            <div className={`ml-4 border-l-2 pl-2 ${dark ? 'border-lime-300/70' : 'border-[#1e40af]/60'}`}>
                                {projects.map(project => <NavRow key={project.id} T={T} scope={scope} active={selected === `project:${project.id}`} onClick={() => open(`project:${project.id}`)}>
                                    <FileCode2 size={14} aria-hidden="true" />{project.label}
                                </NavRow>)}
                            </div>
                        </> : <NavRow T={T} scope={scope} active={selected === item.id} onClick={() => open(item.id)}>
                            <item.icon size={15} aria-hidden="true" />{item.label}
                        </NavRow>}
                    </React.Fragment>)}
                </>}
        </nav>
        <div className={`mt-7 border-t pt-4 text-xs leading-6 ${T.border} ${T.muted}`}>
            <p className={`font-black ${T.accentSoft}`}>STATUS</p>
            <p>Open to IT Engineer &amp; Full-Stack roles.</p>
        </div>
    </aside>;
}

// One-time terminal boot overlay. Plays once per browser session so a recruiter
// reloading the tab mid-read isn't forced to sit through it again.
function BootSequence({ dark }) {
    const lines = [
        '> GALIH.PORTFOLIO v2.6.0',
        '> booting portfolio module...',
        '> mounting React 19 runtime... OK',
        '> loading project index... 5 entries',
        '> establishing secure link... OK',
        '> READY.',
    ];

    return (
        <motion.div className="fixed inset-0 z-[100] grid place-items-center"
            style={{ backgroundColor: dark ? '#020617' : '#f5efdf' }}
            initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: easeOut }}>
            <motion.pre className={`px-6 font-mono text-xs font-bold leading-6 sm:text-sm ${dark ? 'text-lime-300' : 'text-[#1e40af]'}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                {lines.map((line, i) => (
                    <motion.div key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.18, duration: 0.25, ease: easeOut }}>
                        {line}
                    </motion.div>
                ))}
                <motion.span className="caret-blink inline-block" aria-hidden="true">█</motion.span>
            </motion.pre>
        </motion.div>
    );
}

export default function PortfolioExplorer() {
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('darkMode');
            return saved !== null ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return true;
    });
    const [selected, setSelected] = useState('home');
    const [query, setQuery] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const reducedMotion = useReducedMotion();
    const [bootDone, setBootDone] = useState(() => {
        if (typeof sessionStorage === 'undefined') return true;
        return sessionStorage.getItem('boot-seen') === '1';
    });
    const drawerRef = useRef(null);
    const menuButtonRef = useRef(null);
    const mainRef = useRef(null);

    // Scroll progress for the content pane (the window itself never scrolls).
    const { scrollYProgress } = useScroll({ container: mainRef });
    const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

    useEffect(() => {
        if (typeof window === 'undefined') return;
        localStorage.setItem('darkMode', darkMode);
        // Keep native widgets (scrollbars, form controls, caret) in step with the toggle;
        // the inline head script only covers the first paint.
        document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light';
        document.documentElement.style.backgroundColor = darkMode ? '#020617' : '#f5efdf';
    }, [darkMode]);

    // The content pane is the scroll container now, so reset it when the section changes;
    // otherwise opening a new section leaves you mid-page.
    useEffect(() => {
        mainRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [selected]);

    // Boot overlay: mark seen after the boot lines finish, once per session.
    useEffect(() => {
        if (bootDone || reducedMotion) return;
        const t = setTimeout(() => {
            setBootDone(true);
            try { sessionStorage.setItem('boot-seen', '1'); } catch { /* ignore */ }
        }, 1900);
        return () => clearTimeout(t);
    }, [bootDone, reducedMotion]);

    // Drawer: scroll lock, Esc, focus move-in, focus trap, focus restore.
    useEffect(() => {
        if (!menuOpen) return;
        const onKey = (e) => {
            if (e.key === 'Escape') { setMenuOpen(false); return; }
            if (e.key !== 'Tab' || !drawerRef.current) return;
            const focusables = drawerRef.current.querySelectorAll('a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])');
            if (!focusables.length) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        };
        document.addEventListener('keydown', onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const focusTimer = setTimeout(() => drawerRef.current?.querySelector('input, button')?.focus(), 60);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = prev;
            clearTimeout(focusTimer);
            menuButtonRef.current?.focus();
        };
    }, [menuOpen]);

    const isProject = selected.startsWith('project:');
    const activeProject = isProject ? projects.find(p => p.id === selected.split(':')[1]) : null;
    const allItems = useMemo(() => [
        { id: 'home', label: 'Home', icon: Terminal },
        ...navItems.filter(n => !n.folder),
        ...projects.map(p => ({ id: `project:${p.id}`, label: p.label, icon: FileCode2 })),
    ], []);
    const results = query.trim() ? allItems.filter(x => x.label.toLowerCase().includes(query.trim().toLowerCase())) : null;
    const open = (id) => { setSelected(id); setMenuOpen(false); setQuery(''); };
    const activeLabel = activeProject ? activeProject.label : selected === 'home' ? 'HOME' : navItems.find(x => x.id === selected)?.label || 'PORTFOLIO';
    const T = palette(darkMode);
    const sidebarProps = { dark: darkMode, query, setQuery, selected, open, results };

    return <MotionConfig reducedMotion="user">
    <AnimatePresence>
        {!bootDone && !reducedMotion && <BootSequence dark={darkMode} key="boot" />}
    </AnimatePresence>
    <div className={`app-frame flex flex-col overflow-hidden ${T.shell}`}
        style={{
            fontFamily: "'JetBrains Mono', ui-monospace, 'SF Mono', 'Courier New', monospace",
            '--focus-ring': darkMode ? '#bef264' : '#1e40af',
            '--focus-halo': darkMode ? '#020617' : '#f5efdf',
            // Terminal scrollbar colours for both themes (see .scroll-term in app.css)
            '--scroll-track': darkMode ? '#0f172a' : '#f5efdf',
            '--scroll-thumb': darkMode ? '#3f6212' : '#1e40af',
            '--scroll-thumb-hover': darkMode ? '#65a30d' : '#1d4ed8',
            '--sheen-color': darkMode ? 'rgba(190,242,100,.10)' : 'rgba(30,64,175,.07)',
        }}>

        {/* CRT scanline texture. In dark mode it drifts slowly; in light mode it stays a
            static dot grid so the page keeps its paper feel. */}
        <div className={`pointer-events-none fixed inset-0 overflow-hidden opacity-[.035]`} aria-hidden="true">
            <div className={darkMode ? 'scanline-drift absolute inset-x-0 top-0 h-[calc(100%+30px)]' : 'absolute inset-0'}
                style={{
                    backgroundImage: darkMode ? 'repeating-linear-gradient(0deg, #bef264 0, #bef264 1px, transparent 1px, transparent 3px)' : 'radial-gradient(#1e40af 1px, transparent 1px)',
                    backgroundSize: darkMode ? 'auto' : '14px 14px',
                }} />
        </div>

        {/* Ambient floating gradient orbs — constant slow motion behind everything. */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
            <div className={`orb absolute -left-24 top-10 h-72 w-72 rounded-full blur-3xl ${darkMode ? 'bg-lime-500/10' : 'bg-[#1e40af]/10'}`} />
            <div className={`orb-b absolute right-[-6rem] top-1/3 h-80 w-80 rounded-full blur-3xl ${darkMode ? 'bg-cyan-500/10' : 'bg-cyan-600/10'}`} />
            <div className={`orb absolute bottom-0 left-1/3 h-64 w-64 rounded-full blur-3xl ${darkMode ? 'bg-violet-500/10' : 'bg-violet-700/10'}`} />
        </div>

        <a href="#portfolio-content"
            onClick={(e) => { e.preventDefault(); mainRef.current?.focus(); }}
            className={`sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:border-2 focus:px-3 focus:py-2 focus:text-xs focus:font-black focus:tracking-wider ${T.panel} ${T.accent}`}>
            SKIP TO CONTENT
        </a>

        <header className={`relative z-20 flex min-h-16 shrink-0 items-center justify-between border-b-4 px-4 landscape-compact-header ${T.panel}`} style={{ paddingTop: 'max(0.5rem, env(safe-area-inset-top))' }}>
            <a href="/" className={`text-xs font-black tracking-tight whitespace-nowrap sm:text-lg sm:tracking-[0.12em] ${T.accent}`}>▓▒░ GALIH.PORTFOLIO ░▒▓</a>
            <div className="flex items-center gap-2">
                <a href="/Galih_Rizky_IT_Engineer.pdf" className={`hidden min-h-10 items-center gap-2 border-2 px-3 text-xs font-black sm:inline-flex ${darkMode ? 'border-slate-600 hover:border-lime-300' : 'border-stone-400 hover:border-[#1e40af]'}`}>
                    <Download size={14} aria-hidden="true" />CV
                </a>
                <button type="button" onClick={() => setDarkMode(!darkMode)} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={!darkMode}
                    title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    className={`group grid min-h-10 min-w-10 place-items-center overflow-hidden border-2 transition-colors ${darkMode ? 'border-yellow-300 text-yellow-200 hover:bg-yellow-300/10' : 'border-[#b45309] text-[#92400e] hover:bg-amber-100'}`}>
                    {/* The two icons swap with a small rotation instead of popping. */}
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span key={darkMode ? 'sun' : 'moon'} className="grid place-items-center"
                            initial={{ opacity: 0, rotate: -70, scale: 0.6 }}
                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                            exit={{ opacity: 0, rotate: 70, scale: 0.6 }}
                            transition={{ duration: 0.25, ease: easeOut }}>
                            {darkMode ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
                        </motion.span>
                    </AnimatePresence>
                </button>
                <button type="button" ref={menuButtonRef} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle portfolio menu" aria-expanded={menuOpen} aria-controls="portfolio-drawer"
                    className={`grid min-h-10 min-w-10 place-items-center border-2 lg:hidden ${menuOpen ? 'invisible' : ''} ${darkMode ? 'border-lime-300 text-lime-200' : 'border-[#1e40af] text-[#1e40af]'}`}>
                    <Menu size={18} aria-hidden="true" />
                </button>
            </div>
        </header>

        <div className="relative z-10 flex min-h-0 flex-1">
            <div className="hidden shrink-0 lg:block"><Sidebar {...sidebarProps} /></div>
            <main ref={mainRef} id="portfolio-content" tabIndex={-1} className="scroll-term scroll-pane min-w-0 flex-1 outline-none" aria-label="Portfolio content">
                <div className={`sticky top-0 z-10 border-b-2 landscape-hide-breadcrumb ${T.panel}`}>
                    <div className="flex items-center gap-2 px-4 py-3">
                        <span className={`shrink-0 font-black ${T.accent}`}>C:\</span>
                        <span className="min-w-0 flex-1 truncate">
                            {/* Keyed so the breadcrumb crossfades instead of snapping when the section changes. */}
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span key={activeLabel} className={`inline-block ${T.muted}`}
                                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.18, ease: easeOut }}>
                                    Portfolio\{activeLabel}
                                </motion.span>
                            </AnimatePresence>
                        </span>
                        <span className={`shrink-0 animate-pulse ${T.accent}`} aria-hidden="true">█</span>
                    </div>
                    {/* Reading progress for the content pane. */}
                    <motion.div aria-hidden="true"
                        className={`h-[3px] origin-left ${darkMode ? 'bg-lime-300' : 'bg-[#1e40af]'}`}
                        style={{ scaleX: progress }} />
                </div>
                <div className="p-4 sm:p-6">
                    <AnimatePresence mode="wait">
                        <motion.div key={selected} {...(reducedMotion ? {} : pageTransition)}>
                            {selected === 'home'
                                ? <HomeView open={open} dark={darkMode} />
                                : activeProject
                                    ? <ProjectView project={activeProject} dark={darkMode} />
                                    : <>
                                        <div className={`mb-5 border-2 p-4 ${darkMode ? 'border-lime-300 bg-lime-300/10' : 'border-[#1e40af] bg-[#dbeafe]'}`}>
                                            <p className={`text-[11px] font-black tracking-[0.16em] ${T.accentSoft}`}>{content[selected].eyebrow}</p>
                                            <h1 className={`mt-2 text-2xl font-black tracking-wide ${T.strong}`}>{content[selected].title}</h1>
                                        </div>
                                        <StandardView selected={selected} dark={darkMode} />
                                    </>}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>

        <footer className={`relative z-20 shrink-0 border-t-4 px-4 py-2 text-[10px] sm:text-xs font-bold tracking-wider flex items-center justify-between gap-2 overflow-hidden landscape-compact-footer ${T.panel}`}
            style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}>
            <span className={`truncate ${T.accent}`}>▸ GALIH.PORTFOLIO</span>
            <span className={`hidden sm:inline ${T.soft}`} aria-hidden="true">▪</span>
            <span className={`truncate text-right ${T.muted}`}>READY FOR THE NEXT BUILD</span>
        </footer>

        <AnimatePresence>{menuOpen && <React.Fragment>
            <motion.div key="backdrop" {...(reducedMotion ? {} : fade)} onClick={() => setMenuOpen(false)}
                className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm lg:hidden" aria-hidden="true" />
            <motion.div key="drawer" id="portfolio-drawer" {...(reducedMotion ? {} : slideNav)}
                className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col overflow-hidden border-r-4 lg:hidden ${T.panel}`}>
                <div className={`flex shrink-0 items-center justify-between border-b-2 px-3 py-2 ${T.border}`}>
                    <span className={`font-black tracking-[0.14em] ${T.accent}`}>▓▒░ NAV ░▒▓</span>
                    <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close portfolio menu" title="Close menu"
                        className={`grid min-h-9 min-w-9 place-items-center border-2 ${darkMode ? 'border-slate-600 text-slate-200 hover:border-lime-300' : 'border-stone-400 text-stone-700 hover:border-[#1e40af]'}`}>
                        <X size={16} aria-hidden="true" />
                    </button>
                </div>
                <div className="min-h-0 flex-1"><Sidebar {...sidebarProps} innerRef={drawerRef} inDrawer /></div>
            </motion.div>
        </React.Fragment>}</AnimatePresence>
    </div>
    </MotionConfig>;
}
