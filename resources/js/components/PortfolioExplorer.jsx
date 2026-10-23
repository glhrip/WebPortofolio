import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
    ArrowUpRight, BriefcaseBusiness, Check, ChevronRight, Code2, Compass, Copy, Download,
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
    navActive: dark ? 'border-lime-300 bg-lime-300/15 text-lime-100' : 'border-[#1e40af] bg-[#dbeafe] text-[#1e3a8a]',
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

function ActionLink({ href, children, primary = false, icon: Icon = ExternalLink, T }) {
    return <a href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer"
        className={`group inline-flex min-h-11 items-center justify-center gap-2 border-2 px-4 py-2 text-xs font-black tracking-wider transition-all duration-200 hover:-translate-y-0.5 ${primary ? T.cta : T.ctaGhost}`}>
        <Icon size={15} aria-hidden="true" className="transition-transform duration-200 group-hover:scale-110" />{children}
    </a>;
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
function NavRow({ active, T, children, ...rest }) {
    return <button type="button" aria-current={active ? 'page' : undefined}
        className={`flex w-full items-center gap-2 border-2 px-3 py-2 text-left text-xs font-bold transition-colors ${active ? T.navActive : T.navIdle}`}
        {...rest}>{children}</button>;
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
            <p className={`text-2xl font-black tracking-tight sm:text-3xl ${T.strong}`}>{s.key}</p>
            <p className={`mt-1 text-[10px] font-black tracking-[0.14em] ${T.soft}`}>{s.label}</p>
        </div>)}
    </section>;
}

function ContactForm({ dark }) {
    const T = palette(dark);
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [copied, setCopied] = useState(false);
    const valid = Boolean(form.name.trim() && form.message.trim());

    const submit = (e) => {
        e.preventDefault();
        if (!valid) return;
        const body = `${form.message.trim()}\n\n— ${form.name.trim()}${form.email.trim() ? ` (${form.email.trim()})` : ''}`;
        const subject = `Portfolio enquiry — ${form.name.trim() || 'new message'}`;
        window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(CONTACT.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            setCopied(false);
        }
    };

    return <form onSubmit={submit} className={`border-2 ${T.card} p-4`} aria-labelledby="contact-form-heading">
        <h3 id="contact-form-heading" className={`text-xs font-black tracking-widest ${T.accentSoft}`}>SEND A MESSAGE</h3>
        <div className="mt-3 space-y-3">
            <label className="block">
                <span className={`text-[11px] font-black tracking-wider ${T.soft}`}>NAME</span>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required autoComplete="name"
                    className={`mt-1 w-full border-2 px-3 py-2 text-sm font-bold outline-none ${T.input}`} placeholder="Your name" />
            </label>
            <label className="block">
                <span className={`text-[11px] font-black tracking-wider ${T.soft}`}>EMAIL</span>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} autoComplete="email"
                    className={`mt-1 w-full border-2 px-3 py-2 text-sm font-bold outline-none ${T.input}`} placeholder="you@example.com" />
            </label>
            <label className="block">
                <span className={`text-[11px] font-black tracking-wider ${T.soft}`}>MESSAGE</span>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required rows={4}
                    className={`mt-1 w-full resize-y border-2 px-3 py-2 text-sm font-bold outline-none ${T.input}`} placeholder="What needs to keep running?" />
            </label>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
            <button type="submit" disabled={!valid}
                className={`inline-flex min-h-11 items-center gap-2 border-2 px-4 py-2 text-xs font-black tracking-wider transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 ${T.cta}`}>
                <Mail size={15} aria-hidden="true" />OPEN IN MAIL APP
            </button>
            <button type="button" onClick={copy}
                className={`inline-flex min-h-11 items-center gap-2 border-2 px-3 py-2 text-xs font-black tracking-wider transition-colors ${T.ctaGhost}`}>
                {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}{copied ? 'COPIED' : 'COPY EMAIL'}
            </button>
        </div>
        <p className={`mt-3 text-[11px] font-bold leading-5 ${T.soft}`}>This form composes a mail draft locally — nothing is sent to a server, so your message never sits in a database I own.</p>
    </form>;
}

function HomeView({ open, dark }) {
    const T = palette(dark);
    const featured = projects[0];
    return <div className="mx-auto max-w-6xl space-y-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
            <motion.section
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                className={`relative overflow-hidden border-4 p-5 sm:p-8 ${T.hero} ${T.shadow}`}>
                <div className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl ${dark ? 'bg-lime-300/10' : 'bg-[#1e40af]/10'}`} aria-hidden="true" />
                <p className={`relative inline-flex items-center gap-2 text-xs font-black tracking-[0.16em] ${T.accentSoft}`}>
                    <span className={`h-2 w-2 animate-pulse rounded-full ${dark ? 'bg-lime-300' : 'bg-[#1e40af]'}`} aria-hidden="true" />
                    // AVAILABLE FOR IT ENGINEER &amp; FULL-STACK ROLES
                </p>
                <h1 className={`relative mt-5 max-w-3xl text-3xl font-black leading-tight tracking-wide sm:text-5xl ${T.strong}`}>I BUILD SYSTEMS THAT KEEP OPERATIONS MOVING.</h1>
                <p className={`relative mt-5 max-w-2xl text-sm leading-7 sm:text-base ${T.muted}`}>Galih Rizky Pradana. Informatics graduate building Laravel and React applications, practical REST APIs, and deployment-ready systems for real business workflows.</p>
                <div className="relative mt-7 flex flex-wrap gap-3">
                    <button type="button" onClick={() => open('project:umrah')} className={`group inline-flex min-h-11 items-center gap-2 border-2 px-4 py-2 text-xs font-black tracking-wider transition-all duration-200 hover:-translate-y-0.5 ${T.cta}`}>
                        <FolderOpen size={15} className="transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />VIEW FEATURED PROJECT
                    </button>
                    <a href="/Galih_Rizky_IT_Engineer.pdf" className={`group inline-flex min-h-11 items-center gap-2 border-2 px-4 py-2 text-xs font-black tracking-wider transition-all duration-200 hover:-translate-y-0.5 ${T.ctaGhost}`}>
                        <Download size={15} className="transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true" />DOWNLOAD CV
                    </a>
                </div>
                <div className={`relative mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs font-bold ${T.muted}`}>
                    <a className={`inline-flex items-center gap-2 transition-colors ${dark ? 'hover:text-lime-200' : 'hover:text-[#1e40af]'}`} href={CONTACT.github} target="_blank" rel="noreferrer"><Code2 size={15} aria-hidden="true" />github.com/glhrip</a>
                    <a className={`inline-flex items-center gap-2 transition-colors ${dark ? 'hover:text-lime-200' : 'hover:text-[#1e40af]'}`} href={CONTACT.linkedin} target="_blank" rel="noreferrer"><Link size={15} aria-hidden="true" />LinkedIn</a>
                    <a className={`inline-flex items-center gap-2 transition-colors ${dark ? 'hover:text-lime-200' : 'hover:text-[#1e40af]'}`} href={`mailto:${CONTACT.email}`}><Mail size={15} aria-hidden="true" />Email</a>
                </div>
            </motion.section>

            <motion.aside
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
                className={`border-2 p-5 ${T.card} ${dark ? 'border-cyan-300/70 glow-lime' : 'border-cyan-700/60'}`} aria-labelledby="featured-heading">
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

        <section aria-labelledby="all-projects-heading">
            <div className="mb-4 flex items-center gap-3">
                <FolderOpen size={16} className={T.label} aria-hidden="true" />
                <h2 id="all-projects-heading" className={`text-xs font-black tracking-[0.16em] ${T.label}`}>ALL_PROJECTS/</h2>
                <span className={`h-px flex-1 ${T.rule}`} aria-hidden="true" />
                <span className={`text-xs font-bold ${T.soft}`}>{projects.length} entries</span>
            </div>
            <motion.div variants={stagger} initial="initial" animate="animate" className="grid gap-4 sm:grid-cols-2">
                {projects.map((project) => {
                    const a = ac(project.accent, dark);
                    const initials = project.label.replace(/[^A-Za-z& ]/g, '').split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
                    return (
                        <motion.button type="button" key={project.id} variants={riseItem} onClick={() => open(`project:${project.id}`)}
                            className={`group relative overflow-hidden border-2 p-4 text-left transition-all duration-200 hover:-translate-y-1 ${a.border} ${dark ? 'bg-slate-900/75 hover:bg-slate-900' : 'bg-white hover:bg-[#fdf9ec]'}`}>
                            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${a.glowFrom} to-transparent`} aria-hidden="true" />
                            <div className="flex items-start justify-between gap-3">
                                <div className={`grid h-11 w-11 shrink-0 place-items-center border-2 text-sm font-black ${a.border} ${a.text} ${a.bgSoft}`} aria-hidden="true">{initials}</div>
                                {project.live && <span className={`inline-flex items-center gap-1 border px-2 py-0.5 text-[10px] font-black tracking-wider ${dark ? 'border-lime-300/60 text-lime-200' : 'border-[#4d7c0f] text-[#3f6212]'}`}>● LIVE</span>}
                            </div>
                            <h3 className={`mt-3 text-sm font-black ${T.strong}`}>{project.label}</h3>
                            <p className={`mt-1 text-[10px] font-black tracking-[0.14em] ${a.text}`}>{project.domain} · {project.year}</p>
                            <p className={`mt-2 line-clamp-2 text-xs leading-5 ${T.soft}`}>{project.subtitle}</p>
                            <div className="mt-3 flex flex-wrap gap-1.5">{project.stack.slice(0, 4).map(x => <span key={x} className={`border px-1.5 py-0.5 text-[10px] font-bold ${a.chip}`}>{x}</span>)}</div>
                            <span className={`mt-3 inline-flex items-center gap-1 text-[11px] font-black tracking-wider transition-colors ${T.soft} ${dark ? 'group-hover:text-lime-200' : 'group-hover:text-[#1e40af]'}`}>OPEN <ChevronRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" /></span>
                        </motion.button>
                    );
                })}
            </motion.div>
        </section>

        <section aria-labelledby="approach-quote-heading">
            <SectionLabel icon={Compass} T={T} right="APPROACH.MD">HOW I WORK</SectionLabel>
            <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
                <blockquote className={`border-2 border-l-4 p-5 ${panelRule('lime', dark)} ${T.card}`}>
                    <p id="approach-quote-heading" className={`text-base font-black leading-snug tracking-wide sm:text-lg ${T.strong}`}>&ldquo;{content.approach.quote}&rdquo;</p>
                    <button type="button" onClick={() => open('approach')} className={`mt-4 inline-flex items-center gap-2 text-xs font-black tracking-wider ${T.accentSoft}`}>
                        READ THE FULL APPROACH <ChevronRight size={14} aria-hidden="true" />
                    </button>
                </blockquote>
                <div className={`border-2 p-4 ${T.card}`}>
                    <p className={`text-sm leading-7 ${T.muted}`}>{content.approach.columns[0]}</p>
                </div>
            </div>
        </section>

        <section aria-labelledby="contact-heading">
            <SectionLabel icon={Mail} T={T} right="CONTACT.ME">GET IN TOUCH</SectionLabel>
            <div className={`border-4 p-5 ${dark ? 'border-lime-300 bg-slate-900/90' : 'border-[#1e40af] bg-white'}`}>
                <div className="grid gap-5 lg:grid-cols-[1fr_.85fr]">
                    <div>
                        <h2 id="contact-heading" className={`text-xl font-black leading-tight sm:text-2xl ${T.strong}`}>Got a system that needs to keep running?</h2>
                        <p className={`mt-3 text-sm leading-7 ${T.muted}`}>{content.contact.body}</p>
                        <div className="mt-5 flex flex-wrap gap-3">
                            <ActionLink href={`mailto:${CONTACT.email}`} primary icon={Mail} T={T}>SEND ME A MESSAGE</ActionLink>
                            <ActionLink href={CONTACT.github} icon={Code2} T={T}>GITHUB</ActionLink>
                            <ActionLink href={CONTACT.linkedin} icon={Link} T={T}>LINKEDIN</ActionLink>
                        </div>
                        <p className={`mt-3 text-[11px] font-bold ${T.soft}`}>Reply in 1–2 business days · {CONTACT.email}</p>
                    </div>
                    <ContactForm dark={dark} />
                </div>
            </div>
        </section>
    </div>;
}

function Sidebar({ dark, query, setQuery, selected, open, results, innerRef, inDrawer = false }) {
    const T = palette(dark);
    return <aside ref={innerRef}
        className={`h-full w-72 shrink-0 border-r-4 p-3 ${T.panel}`}
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
                ? results.map(item => <NavRow key={item.id} T={T} active={selected === item.id} onClick={() => open(item.id)}>
                    <item.icon size={15} aria-hidden="true" />{item.label}
                </NavRow>)
                : <div className={`border-2 border-dashed px-3 py-6 text-center text-xs font-bold ${dark ? 'border-slate-700 text-slate-400' : 'border-[#1e40af]/40 text-stone-600'}`}>No results for &ldquo;{query}&rdquo;</div>)
                : <>
                    <NavRow T={T} active={selected === 'home'} onClick={() => open('home')}><Terminal size={15} aria-hidden="true" />HOME</NavRow>
                    {navItems.map(item => <React.Fragment key={item.id}>
                        {item.folder ? <>
                            <div className={`mt-2 flex items-center gap-2 px-3 py-2 text-xs font-black tracking-wider ${T.label}`}><FolderOpen size={15} aria-hidden="true" />PROJECTS</div>
                            <div className={`ml-4 border-l-2 pl-2 ${dark ? 'border-lime-300/70' : 'border-[#1e40af]/60'}`}>
                                {projects.map(project => <NavRow key={project.id} T={T} active={selected === `project:${project.id}`} onClick={() => open(`project:${project.id}`)}>
                                    <FileCode2 size={14} aria-hidden="true" />{project.label}
                                </NavRow>)}
                            </div>
                        </> : <NavRow T={T} active={selected === item.id} onClick={() => open(item.id)}>
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
    const drawerRef = useRef(null);
    const menuButtonRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        localStorage.setItem('darkMode', darkMode);
        // Keep native widgets (scrollbars, form controls, caret) in step with the toggle;
        // the inline head script only covers the first paint.
        document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light';
        document.documentElement.style.backgroundColor = darkMode ? '#020617' : '#f5efdf';
    }, [darkMode]);

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

    return <div className={`min-h-screen ${T.shell}`}
        style={{
            fontFamily: "'JetBrains Mono', ui-monospace, 'SF Mono', 'Courier New', monospace",
            '--focus-ring': darkMode ? '#bef264' : '#1e40af',
            '--focus-halo': darkMode ? '#020617' : '#f5efdf',
        }}>

        <div className="pointer-events-none fixed inset-0 opacity-[.035]" aria-hidden="true"
            style={{
                backgroundImage: darkMode ? 'repeating-linear-gradient(0deg, #bef264 0, #bef264 1px, transparent 1px, transparent 3px)' : 'radial-gradient(#1e40af 1px, transparent 1px)',
                backgroundSize: darkMode ? 'auto' : '14px 14px',
            }} />

        <header className={`relative z-20 flex min-h-16 items-center justify-between border-b-4 px-4 ${T.panel}`}>
            <a href="/" className={`text-sm font-black tracking-[0.12em] sm:text-lg ${T.accent}`}>▓▒░ GALIH.PORTFOLIO ░▒▓</a>
            <div className="flex items-center gap-2">
                <a href="/Galih_Rizky_IT_Engineer.pdf" className={`hidden min-h-10 items-center gap-2 border-2 px-3 text-xs font-black sm:inline-flex ${darkMode ? 'border-slate-600 hover:border-lime-300' : 'border-stone-400 hover:border-[#1e40af]'}`}>
                    <Download size={14} aria-hidden="true" />CV
                </a>
                <button type="button" onClick={() => setDarkMode(!darkMode)} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={!darkMode}
                    title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    className={`grid min-h-10 min-w-10 place-items-center border-2 ${darkMode ? 'border-yellow-300 text-yellow-200 hover:bg-yellow-300/10' : 'border-[#b45309] text-[#92400e] hover:bg-amber-100'}`}>
                    {darkMode ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
                </button>
                <button type="button" ref={menuButtonRef} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle portfolio menu" aria-expanded={menuOpen} aria-controls="portfolio-drawer"
                    className={`grid min-h-10 min-w-10 place-items-center border-2 lg:hidden ${darkMode ? 'border-lime-300 text-lime-200' : 'border-[#1e40af] text-[#1e40af]'}`}>
                    {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
                </button>
            </div>
        </header>

        <div className="relative z-10 flex min-h-[calc(100vh-7.5rem)]">
            <div className="hidden lg:block"><Sidebar {...sidebarProps} /></div>
            <main className="min-w-0 flex-1" aria-label="Portfolio content">
                <div className={`sticky top-0 z-10 flex items-center gap-2 border-b-2 px-4 py-3 ${T.panel}`}>
                    <span className={`shrink-0 font-black ${T.accent}`}>C:\</span>
                    <span className={`min-w-0 flex-1 truncate ${T.muted}`}>Portfolio\{activeLabel}</span>
                    <span className={`shrink-0 animate-pulse ${T.accent}`} aria-hidden="true">█</span>
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

        <footer className={`relative z-20 border-t-4 px-4 py-2 text-xs font-bold tracking-wider ${T.panel}`}>
            <span className={T.accent}>▸ GALIH.PORTFOLIO</span>
            <span className={`mx-2 ${T.soft}`} aria-hidden="true">▪</span>
            <span className={T.muted}>READY FOR THE NEXT BUILD</span>
        </footer>

        <AnimatePresence>{menuOpen && <React.Fragment>
            <motion.div key="backdrop" {...(reducedMotion ? {} : fade)} onClick={() => setMenuOpen(false)}
                className="fixed inset-0 z-40 bg-black/60 lg:hidden" aria-hidden="true" />
            <motion.div key="drawer" id="portfolio-drawer" {...(reducedMotion ? {} : slideNav)}
                className={`fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto border-r-4 scroll-term lg:hidden ${T.panel}`}>
                <div className={`flex items-center justify-between border-b-2 px-3 py-2 ${T.border}`}>
                    <span className={`font-black tracking-[0.14em] ${T.accent}`}>▓▒░ NAV ░▒▓</span>
                    <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close portfolio menu" title="Close menu"
                        className={`grid min-h-9 min-w-9 place-items-center border-2 ${darkMode ? 'border-slate-600 text-slate-200 hover:border-lime-300' : 'border-stone-400 text-stone-700 hover:border-[#1e40af]'}`}>
                        <X size={16} aria-hidden="true" />
                    </button>
                </div>
                <div className="h-[calc(100%-3rem)]"><Sidebar {...sidebarProps} innerRef={drawerRef} inDrawer /></div>
            </motion.div>
        </React.Fragment>}</AnimatePresence>
    </div>;
}
