import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useSpring, AnimatePresence } from "framer-motion";
import pragatiAsset from "@/assets/pragati.png.asset.json";
import resumeAsset from "@/assets/resume.pdf.asset.json";
import {
  Github, Linkedin, Mail, Download, ArrowRight, ArrowUpRight,
  Rocket, Sparkles, Code2, Database, Cloud, Cpu, Briefcase,
  GraduationCap, Award, MapPin, Send, Menu, X,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pragati Patel — Founder, Developer & Data Analyst" },
      { name: "description", content: "Portfolio of Pragati Patel — Co-Founder & Director at Trinova Innovation LLP. Full-stack developer, data analyst, cloud builder." },
      { property: "og:title", content: "Pragati Patel — Founder & Developer" },
      { property: "og:description", content: "Building intelligent safety, security & monitoring products at Trinova Innovation LLP." },
      { property: "og:image", content: pragatiAsset.url },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Pragati Patel",
        jobTitle: "Co-Founder & Director, Software Developer",
        worksFor: { "@type": "Organization", name: "Trinova Innovation LLP" },
        email: "mailto:2k23.csai2311177@gmail.com",
        sameAs: ["https://www.linkedin.com/in/pragati-patel-2a3b54318"],
      }),
    }],
  }),
  component: Index,
});

const NAV = [
  { id: "about", label: "About" },
  { id: "startup", label: "Startup" },
  { id: "products", label: "Products" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certs", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

function Index() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return (
    <div className="bg-hero min-h-screen text-foreground overflow-x-hidden">
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-[var(--gradient-primary)] z-[60]" />
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Startup />
      <Products />
      <Projects />
      <Skills />
      <Certifications />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}

/* ---------- NAVBAR ---------- */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all ${scrolled ? "glass shadow-[var(--shadow-elegant)]" : ""}`}>
          <a href="#top" className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="size-8 rounded-lg bg-[var(--gradient-primary)] grid place-items-center text-primary-foreground"><Sparkles className="size-4" /></span>
            <span>Pragati<span className="text-primary">.</span></span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            {NAV.map(n => (
              <a key={n.id} href={`#${n.id}`} className="hover:text-foreground transition-colors">{n.label}</a>
            ))}
          </nav>
          <a href={resumeAsset.url} download className="hidden md:inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90 transition">
            <Download className="size-4" /> Resume
          </a>
          <button className="md:hidden p-2" onClick={() => setOpen(o => !o)} aria-label="menu">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="md:hidden mt-2 glass rounded-2xl p-4 flex flex-col gap-3">
              {NAV.map(n => (
                <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className="text-sm py-1">{n.label}</a>
              ))}
              <a href={resumeAsset.url} download className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">
                <Download className="size-4" /> Resume
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section id="top" className="relative pt-36 pb-20 sm:pt-44 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground mb-6">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            Open to opportunities · Based in India
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.05]">
            Hi, I'm <span className="text-gradient">Pragati Patel</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Final-year B.Tech student, software developer & data analyst.{" "}
            <span className="text-foreground">Co-Founder & Director at Trinova Innovation LLP</span> — building intelligent
            safety, security and monitoring products that solve real-world problems.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={resumeAsset.url} download className="inline-flex items-center gap-2 rounded-full bg-[var(--gradient-primary)] text-primary-foreground px-5 py-3 text-sm font-semibold shadow-[var(--shadow-glow)] hover:scale-[1.02] transition">
              <Download className="size-4" /> Download Resume
            </a>
            <a href="#products" className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-semibold hover:bg-card/70 transition">
              <Rocket className="size-4" /> View Projects
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold border border-border hover:border-primary/50 transition">
              <Mail className="size-4" /> Contact Me
            </a>
          </div>
          <div className="mt-10 flex items-center gap-5 text-muted-foreground">
            <SocialIcon href="https://www.linkedin.com/in/pragati-patel-2a3b54318" label="LinkedIn"><Linkedin className="size-4" /></SocialIcon>
            <SocialIcon href="https://github.com/" label="GitHub"><Github className="size-4" /></SocialIcon>
            <SocialIcon href="mailto:2k23.csai2311177@gmail.com" label="Email"><Mail className="size-4" /></SocialIcon>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }} className="relative">
          <div className="absolute -inset-6 bg-[var(--gradient-primary)] opacity-20 blur-3xl rounded-full" />
          <div className="relative glass rounded-[2rem] p-3 shadow-[var(--shadow-elegant)]">
            <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-secondary">
              <img src={pragatiAsset.url} alt="Pragati Patel — Co-Founder, Trinova Innovation LLP" className="size-full object-cover" />
            </div>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }}
              className="absolute -left-4 sm:-left-10 top-10 glass rounded-2xl px-4 py-3 text-sm shadow-[var(--shadow-elegant)]">
              <div className="flex items-center gap-2"><Briefcase className="size-4 text-primary" /><span className="font-semibold">Co-Founder</span></div>
              <div className="text-xs text-muted-foreground">Trinova Innovation LLP</div>
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }}
              className="absolute -right-3 sm:-right-8 bottom-10 glass rounded-2xl px-4 py-3 text-sm shadow-[var(--shadow-elegant)]">
              <div className="flex items-center gap-2"><Code2 className="size-4 text-accent" /><span className="font-semibold">Full-Stack + Cloud</span></div>
              <div className="text-xs text-muted-foreground">React · Node · AWS</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="size-10 grid place-items-center rounded-full glass hover:text-primary hover:border-primary/40 transition">
      {children}
    </a>
  );
}

/* ---------- STATS ---------- */
const STATS = [
  { v: 5, suffix: "+", l: "Major Projects" },
  { v: 2, suffix: "", l: "Products Shipped" },
  { v: 2, suffix: "", l: "IIT Pitches" },
  { v: 15, suffix: "+", l: "Technologies" },
];
function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 -mt-4 mb-20">
      <div className="glass rounded-3xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 shadow-[var(--shadow-elegant)]">
        {STATS.map((s, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-gradient">
              <Counter to={s.v} />{s.suffix}
            </div>
            <div className="mt-1 text-xs sm:text-sm text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1200; const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n}</span>;
}

/* ---------- SECTION HEADING ---------- */
function SectionHeading({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="max-w-2xl mb-12">
      <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">{kicker}</div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground leading-relaxed">{sub}</p>}
    </motion.div>
  );
}
function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  return <section id={id} className={`mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28 scroll-mt-20 ${className}`}>{children}</section>;
}

/* ---------- ABOUT ---------- */
function About() {
  return (
    <Section id="about">
      <SectionHeading kicker="About me" title="Engineer by training, founder by mindset." />
      <div className="grid lg:grid-cols-3 gap-6">
        {[
          { icon: <Code2 className="size-5" />, title: "Builder", text: "Passionate B.Tech student exploring full-stack development, data analytics, cloud and entrepreneurship." },
          { icon: <Rocket className="size-5" />, title: "Founder", text: "Through Trinova Innovation LLP I've gained hands-on experience in product development, business strategy and team leadership." },
          { icon: <Sparkles className="size-5" />, title: "Learner", text: "I love turning ideas into real-world solutions and continuously learning tools that create meaningful impact." },
        ].map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-6 hover:border-primary/40 transition">
            <div className="size-10 grid place-items-center rounded-xl bg-primary/15 text-primary mb-4">{c.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{c.text}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- STARTUP ---------- */
const STARTUP_RESP = ["Product Strategy & Planning","Business Development","Team Leadership","Technical Project Oversight","Startup Pitching & Networking","Innovation Management","Stakeholder Communication"];
const STARTUP_ACH = ["Represented startup in entrepreneurship and innovation events","Participated in pitching competitions at IIT Delhi and IIT Kanpur","Built and managed innovative software product initiatives","Led startup growth and product strategy activities"];
function Startup() {
  return (
    <Section id="startup">
      <SectionHeading kicker="The startup" title="Co-Founder & Director at Trinova Innovation LLP" sub="An innovation-driven technology startup building intelligent digital solutions for safety, security, monitoring and operational efficiency." />
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6">
        <div className="glass rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 size-64 rounded-full bg-[var(--gradient-primary)] opacity-15 blur-3xl" />
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-semibold mb-4"><Rocket className="size-3.5" /> Mission</div>
          <p className="text-foreground/90 leading-relaxed mb-6">
            We leverage modern software, cloud infrastructure and data-driven insights to solve practical
            challenges faced by individuals, organizations and institutions — focused on scalable products
            that improve security awareness, monitoring, incident management and smart decision-making.
          </p>
          <div className="mt-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Responsibilities</div>
            <div className="flex flex-wrap gap-2">
              {STARTUP_RESP.map(r => <span key={r} className="text-xs rounded-full px-3 py-1.5 border border-border bg-secondary/40">{r}</span>)}
            </div>
          </div>
        </div>
        <div className="glass rounded-3xl p-8">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent font-semibold mb-4"><Award className="size-3.5" /> Highlights</div>
          <ol className="relative border-l border-border/70 ml-2 space-y-6">
            {STARTUP_ACH.map((a, i) => (
              <li key={i} className="pl-6 relative">
                <span className="absolute -left-[7px] top-1.5 size-3 rounded-full bg-[var(--gradient-primary)] ring-4 ring-background" />
                <p className="text-sm leading-relaxed">{a}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}

/* ---------- PRODUCTS ---------- */
const PRODUCTS = [
  {
    name: "Safeguard+",
    category: "Smart Safety & Security Platform",
    desc: "Intelligent safety and security management platform for incident reporting, monitoring, emergency response and organizational safety.",
    features: ["User Authentication","Role-Based Access","Incident Reporting","Admin Dashboard","Real-Time Monitoring","Secure Data","Cloud Integration","Analytics"],
    stack: ["React.js","Node.js","Express.js","MongoDB","JWT","AWS"],
    icon: <Cpu className="size-5" />,
  },
  {
    name: "Nova Guard",
    category: "Intelligent Monitoring System",
    desc: "Smart monitoring and alert management platform to proactively monitor events, manage alerts and visualize security data.",
    features: ["Alert Management","Event Tracking","Dashboard Analytics","Monitoring","User Management","Reporting","Data Visualization"],
    stack: ["React.js","Node.js","MongoDB","AWS","Analytics"],
    icon: <Database className="size-5" />,
  },
];
function Products() {
  return (
    <Section id="products">
      <SectionHeading kicker="Featured products" title="Products built at Trinova" sub="Flagship platforms shipped under the Trinova Innovation LLP umbrella." />
      <div className="grid md:grid-cols-2 gap-6">
        {PRODUCTS.map((p, i) => (
          <motion.div key={p.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="group glass rounded-3xl p-7 hover:border-primary/40 transition relative overflow-hidden">
            <div className="absolute -top-24 -right-24 size-60 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition" />
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="size-12 grid place-items-center rounded-2xl bg-[var(--gradient-primary)] text-primary-foreground mb-4">{p.icon}</div>
                <h3 className="text-2xl font-bold">{p.name}</h3>
                <div className="text-sm text-primary font-medium">{p.category}</div>
              </div>
              <ArrowUpRight className="size-5 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            <div className="mt-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Key features</div>
              <div className="flex flex-wrap gap-1.5">
                {p.features.map(f => <span key={f} className="text-[11px] rounded-md px-2 py-1 bg-secondary/60 border border-border">{f}</span>)}
              </div>
            </div>
            <div className="mt-5 pt-5 border-t border-border/60">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Tech stack</div>
              <div className="flex flex-wrap gap-1.5">
                {p.stack.map(s => <span key={s} className="text-[11px] rounded-md px-2 py-1 bg-primary/10 text-primary border border-primary/20">{s}</span>)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- TECHNICAL PROJECTS ---------- */
const PROJECTS = [
  { name: "AWS Weather API", desc: "Serverless weather app using AWS Lambda, API Gateway, Python and OpenWeather API.", tags: ["Serverless","AWS Lambda","API Gateway","REST","Cloud"], icon: <Cloud className="size-5" /> },
  { name: "AI Chatbot · Sentiment Detection", desc: "AI-powered chatbot that analyzes user sentiment and generates intelligent responses.", tags: ["Python","NLP","Sentiment","AI"], icon: <Sparkles className="size-5" /> },
  { name: "E-Commerce Management System", desc: "Full-stack e-commerce app with authentication, order management and database integration.", tags: ["Auth","MongoDB","Orders","Full-Stack"], icon: <Database className="size-5" /> },
];
function Projects() {
  return (
    <Section id="projects">
      <SectionHeading kicker="Technical projects" title="Things I've built along the way" />
      <div className="grid md:grid-cols-3 gap-5">
        {PROJECTS.map((p, i) => (
          <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            className="glass rounded-2xl p-6 hover:border-accent/40 transition h-full flex flex-col">
            <div className="size-10 grid place-items-center rounded-xl bg-accent/15 text-accent mb-4">{p.icon}</div>
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{p.desc}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map(t => <span key={t} className="text-[11px] rounded-md px-2 py-1 bg-secondary/60 border border-border">{t}</span>)}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- SKILLS ---------- */
const SKILLS: { group: string; items: { name: string; level: number }[] }[] = [
  { group: "Programming", items: [{name:"Python",level:90},{name:"Java",level:75},{name:"JavaScript",level:88},{name:"C++",level:70},{name:"SQL",level:82}] },
  { group: "Frontend", items: [{name:"React.js",level:90},{name:"Tailwind CSS",level:88},{name:"HTML",level:95},{name:"CSS",level:92}] },
  { group: "Backend", items: [{name:"Node.js",level:82},{name:"Express.js",level:80}] },
  { group: "Database", items: [{name:"MongoDB",level:85},{name:"MySQL",level:78}] },
  { group: "Data Analytics", items: [{name:"Pandas",level:85},{name:"NumPy",level:82},{name:"Power BI",level:78},{name:"Excel",level:85}] },
  { group: "Cloud", items: [{name:"AWS",level:80},{name:"Lambda",level:78},{name:"API Gateway",level:75}] },
  { group: "Tools", items: [{name:"Git / GitHub",level:88},{name:"VS Code",level:92},{name:"Postman",level:85}] },
];
function Skills() {
  return (
    <Section id="skills">
      <SectionHeading kicker="Toolbox" title="Skills & technologies" sub="A practical stack across product, data and cloud." />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SKILLS.map((g, i) => (
          <motion.div key={g.group} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><span className="size-1.5 rounded-full bg-primary" />{g.group}</h3>
            <div className="space-y-3">
              {g.items.map(s => (
                <div key={s.name}>
                  <div className="flex justify-between text-xs mb-1.5"><span>{s.name}</span><span className="text-muted-foreground">{s.level}%</span></div>
                  <div className="h-1.5 rounded-full bg-secondary/70 overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-[var(--gradient-primary)]" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- CERTS ---------- */
const CERTS = [
  { title: "Deloitte Australia · Data Analytics Virtual Experience", desc: "Practical data analytics tasks: business problem solving, data interpretation, dashboard development and analytical reporting." },
  { title: "Data Science Certification · CodeWithHarry", desc: "Python, Data Analysis, ML fundamentals, Pandas, NumPy, Data Visualization and full Data Science workflows." },
  { title: "AWS Cloud Projects Experience", desc: "Hands-on serverless applications using AWS Lambda, API Gateway and cloud services." },
];
function Certifications() {
  return (
    <Section id="certs">
      <SectionHeading kicker="Credentials" title="Certifications & learning" />
      <div className="grid md:grid-cols-3 gap-5">
        {CERTS.map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            className="glass rounded-2xl p-6 hover:border-primary/40 transition">
            <Award className="size-6 text-primary mb-3" />
            <h3 className="font-semibold leading-snug">{c.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- EDUCATION ---------- */
const EDU = [
  { period: "Expected 2026", title: "B.Tech · Computer Science and Engineering", body: "Bachelor of Technology — focusing on full-stack development, data analytics and cloud computing." },
  { period: "PCM", title: "Intermediate · High School", body: "Physics, Chemistry, Mathematics — foundation for engineering." },
];
function Education() {
  return (
    <Section id="education">
      <SectionHeading kicker="Education" title="Academic background" />
      <div className="grid md:grid-cols-2 gap-5">
        {EDU.map((e, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-6 flex gap-4">
            <div className="size-11 shrink-0 grid place-items-center rounded-xl bg-primary/15 text-primary"><GraduationCap className="size-5" /></div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{e.period}</div>
              <h3 className="font-semibold mt-1">{e.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{e.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- CONTACT ---------- */
function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = encodeURIComponent(String(data.get("name") || ""));
    const msg = encodeURIComponent(String(data.get("message") || ""));
    const email = encodeURIComponent(String(data.get("email") || ""));
    window.location.href = `mailto:2k23.csai2311177@gmail.com?subject=Portfolio inquiry from ${name}&body=${msg}%0A%0AFrom: ${email}`;
    setSent(true);
  };
  return (
    <Section id="contact">
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8">
        <div>
          <SectionHeading kicker="Get in touch" title="Let's build something meaningful." sub="Open to collaborations, internships, startup conversations and product opportunities." />
          <div className="space-y-3">
            <ContactRow icon={<Mail className="size-4" />} label="Email" value="2k23.csai2311177@gmail.com" href="mailto:2k23.csai2311177@gmail.com" />
            <ContactRow icon={<Linkedin className="size-4" />} label="LinkedIn" value="pragati-patel-2a3b54318" href="https://www.linkedin.com/in/pragati-patel-2a3b54318" />
            <ContactRow icon={<Github className="size-4" />} label="GitHub" value="github.com" href="https://github.com/" />
            <ContactRow icon={<MapPin className="size-4" />} label="Based in" value="India" />
          </div>
        </div>
        <form onSubmit={onSubmit} className="glass rounded-3xl p-6 sm:p-8 space-y-4">
          <Field name="name" label="Your name" placeholder="Jane Doe" required />
          <Field name="email" type="email" label="Email" placeholder="jane@company.com" required />
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
            <textarea name="message" required rows={5} placeholder="Tell me about your idea, role or project…"
              className="mt-2 w-full rounded-xl bg-input/40 border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary/60 transition resize-none" />
          </div>
          <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gradient-primary)] text-primary-foreground px-5 py-3 text-sm font-semibold shadow-[var(--shadow-glow)] hover:scale-[1.01] transition">
            <Send className="size-4" /> {sent ? "Opening your email…" : "Send message"} <ArrowRight className="size-4" />
          </button>
        </form>
      </div>
    </Section>
  );
}
function Field({ name, label, type = "text", placeholder, required }: { name: string; label: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input name={name} type={type} placeholder={placeholder} required={required}
        className="mt-2 w-full rounded-xl bg-input/40 border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary/60 transition" />
    </div>
  );
}
function ContactRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const Inner = (
    <div className="glass rounded-2xl p-4 flex items-center gap-4 hover:border-primary/40 transition">
      <div className="size-10 grid place-items-center rounded-xl bg-primary/15 text-primary">{icon}</div>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} target="_blank" rel="noreferrer">{Inner}</a> : Inner;
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="border-t border-border/60 mt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="size-7 rounded-lg bg-[var(--gradient-primary)] grid place-items-center text-primary-foreground"><Sparkles className="size-3.5" /></span>
          <span className="font-semibold">Pragati Patel</span>
          <span className="text-muted-foreground">· © {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground">
          <a href="https://www.linkedin.com/in/pragati-patel-2a3b54318" target="_blank" rel="noreferrer" className="hover:text-primary"><Linkedin className="size-4" /></a>
          <a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:text-primary"><Github className="size-4" /></a>
          <a href="mailto:2k23.csai2311177@gmail.com" className="hover:text-primary"><Mail className="size-4" /></a>
        </div>
      </div>
    </footer>
  );
}
