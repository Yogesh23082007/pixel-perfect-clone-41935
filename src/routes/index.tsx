import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Download, ExternalLink, Github, GraduationCap, Award, MapPin } from "lucide-react";
import photo from "@/assets/yogesh.jpg.asset.json";
import { contact, projects, skills } from "@/lib/portfolio";
import { Navbar, Footer, Socials, useReveal, btnPrimary, btnGhost } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YOGESH.DEV — Yogesh Lingutla, Python & AI/ML Developer" },
      { name: "description", content: "Portfolio of Yogesh Lingutla, CS student and Python developer focused on AI, Machine Learning and Data Science." },
      { property: "og:title", content: "YOGESH.DEV — Yogesh Lingutla" },
      { property: "og:description", content: "Python, AI/ML and Data Science projects by Yogesh Lingutla." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Heading({ n, title }: { n: string; title: string }) {
  return (
    <div className="reveal mb-12">
      <p className="font-mono text-sm text-primary">{n} /</p>
      <h2 className="mt-2 text-3xl font-bold md:text-4xl">{title}</h2>
    </div>
  );
}

function Index() {
  useReveal();
  const resumeHref = `mailto:${contact.email}?subject=${encodeURIComponent("Resume request")}`;
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-16">
          <div className="dot-grid absolute inset-0" aria-hidden />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 py-16 md:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="rise glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs text-primary" style={{ animationDelay: "0ms" }}>
                <span className="h-2 w-2 rounded-full bg-primary" /> Open to first internship · 2026
              </p>
              <h1 className="rise mt-6 text-4xl font-bold leading-tight md:text-6xl" style={{ animationDelay: "120ms" }}>
                Hi, I'm <span className="text-primary">Yogesh Lingutla</span>
              </h1>
              <p className="rise mt-3 font-mono text-lg text-secondary" style={{ animationDelay: "240ms" }}>Python Developer · AI/ML Enthusiast</p>
              <p className="rise mt-6 max-w-xl leading-relaxed text-muted-foreground" style={{ animationDelay: "360ms" }}>
                Passionate about Python, Artificial Intelligence, Machine Learning, and building practical technology solutions.
                Currently seeking my first internship opportunity to gain real-world experience and contribute to innovative projects.
              </p>
              <div className="rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: "480ms" }}>
                <a href="#projects" className={btnPrimary}>View My Projects <ArrowRight size={16} /></a>
                <a href={resumeHref} className={btnGhost}><Download size={16} /> Download Resume</a>
                <a href="#contact" className={btnGhost}>Contact Me</a>
              </div>
            </div>
            <div className="rise flex flex-col items-center" style={{ animationDelay: "300ms" }}>
              <div className="animate-float aspect-square w-60 rounded-full p-1.5 glow-ring sm:w-72 md:w-80">
                <img src={photo.url} alt="Yogesh Lingutla" className="h-full w-full rounded-full object-cover" style={{ objectPosition: "50% 22%" }} />
              </div>
              <p className="mt-6 flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin size={14} /> Based in India</p>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="mx-auto max-w-6xl px-5 py-24">
          <Heading n="01" title="About Me" />
          <div className="grid gap-8 md:grid-cols-2">
            <div className="reveal">
              <p className="text-2xl font-semibold leading-snug">An ambitious student turning curiosity into practical technology.</p>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                I am Yogesh Lingutla, a Computer Science and Engineering student passionate about programming and technology. I enjoy learning new skills,
                solving problems, and building practical projects that turn ideas into useful technology. My goal is to become a skilled software developer
                and contribute to innovative solutions while continuously improving.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["CS Student", "AI/ML Enthusiast", "Python Developer", "Problem Solver"].map((t) => (
                  <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{t}</span>
                ))}
              </div>
            </div>
            <div className="reveal glass rounded-2xl p-7">
              <p className="font-mono text-xs text-primary">Currently seeking opportunities</p>
              <h3 className="mt-2 text-xl font-semibold">Ready to learn. Ready to contribute.</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                I am actively looking for my first internship where I can apply my programming, Python, AI/ML, and problem-solving skills, work on real-world
                projects, and learn from experienced professionals.
              </p>
              <ul className="mt-5 grid grid-cols-2 gap-2 text-sm">
                {["Python Development", "Artificial Intelligence", "Machine Learning", "Data Science", "Software Development"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />{t}</li>
                ))}
              </ul>
              <a href="#contact" className={`${btnGhost} mt-6`}>Contact Me</a>
            </div>
          </div>
        </section>

        {/* Education */}
        <section id="education" className="mx-auto max-w-6xl px-5 py-24">
          <Heading n="02" title="Education & Certification" />
          <div className="relative space-y-6 border-l border-border pl-8">
            {[
              { icon: GraduationCap, meta: "Education · Expected 2028", title: "B.Tech — Computer Science and Engineering", org: "Sri Venkateswara College of Engineering" },
              { icon: Award, meta: "Certification · 150 Hours", title: "AI / Machine Learning Engineer", org: "Skill India — Reliance Foundation Skilling Academy" },
            ].map(({ icon: Icon, ...e }) => (
              <div key={e.title} className="reveal glass relative rounded-2xl p-6">
                <span className="absolute -left-[46px] top-6 grid h-7 w-7 place-items-center rounded-full bg-background text-primary glow-ring"><Icon size={14} /></span>
                <p className="font-mono text-xs text-primary">{e.meta}</p>
                <h3 className="mt-2 text-lg font-semibold">{e.title}</h3>
                <p className="text-sm text-muted-foreground">{e.org}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mx-auto max-w-6xl px-5 py-24">
          <Heading n="03" title="Technical Skills" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((s, i) => (
              <div key={s.title} className="reveal glass rounded-2xl p-6 transition hover:-translate-y-1 hover:border-primary/50">
                <p className="font-mono text-xs text-primary">0{i + 1}</p>
                <h3 className="mt-1 font-semibold">{s.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <span key={it} className="rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground transition hover:text-primary">{it}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mx-auto max-w-6xl px-5 py-24">
          <Heading n="04" title="Selected Projects" />
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((p, i) => (
              <article key={p.slug} className="reveal glass group relative flex flex-col rounded-2xl p-6 transition hover:-translate-y-1 hover:glow-ring">
                <div className="mb-5 grid aspect-video place-items-center rounded-xl bg-muted font-mono text-3xl font-bold text-primary/70 dot-grid-static">
                  0{i + 1}
                </div>
                <p className="font-mono text-xs text-primary">{p.category}</p>
                <h3 className="mt-1 text-lg font-semibold">
                  <Link to="/projects/$slug" params={{ slug: p.slug }} className="after:absolute after:inset-0">{p.title}</Link>
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => <span key={t} className="font-mono text-[11px] text-secondary">#{t.replace(/\s/g, "")}</span>)}
                </div>
                <div className="relative z-10 mt-5 flex flex-wrap gap-2 text-xs">
                  <Link to="/projects/$slug" params={{ slug: p.slug }} className="rounded-full bg-primary px-3 py-1.5 font-semibold text-primary-foreground">View Details</Link>
                  <a href={p.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 hover:text-primary"><Github size={12} /> GitHub</a>
                  {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 hover:text-primary"><ExternalLink size={12} /> Live Demo</a>}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Career */}
        <section id="career" className="mx-auto max-w-6xl px-5 py-24">
          <Heading n="05" title="Career Direction" />
          <p className="reveal mb-10 max-w-2xl text-lg text-muted-foreground">I want to work on real-world projects, strengthen my technical skills, and continue growing with purpose.</p>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="grid grid-cols-2 gap-4">
              {["AI Engineer", "Machine Learning Engineer", "Data Scientist", "Python Developer"].map((r, i) => (
                <div key={r} className="reveal glass rounded-2xl p-5">
                  <p className="font-mono text-xs text-primary">0{i + 1}</p>
                  <p className="mt-2 font-semibold">{r}</p>
                </div>
              ))}
            </div>
            <div className="reveal glass rounded-2xl p-6">
              <h3 className="font-semibold">What I Bring</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {["Strong interest in technology", "Passion for continuous learning", "Python and programming skills", "AI/ML knowledge", "Problem-solving mindset", "Interest in real-world projects", "Willingness to learn from professionals", "Commitment to professional growth"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-6xl px-5 py-24">
          <Heading n="06" title="Let's Connect" />
          <div className="reveal glass rounded-3xl p-8 md:p-12">
            <div className="grid gap-10 md:grid-cols-[1fr_1.25fr]">
              <div>
                <p className="text-3xl font-bold">Let's build something together.</p>
                <p className="mt-4 text-muted-foreground">
                  I am currently looking for internship opportunities where I can learn, contribute,
                  and gain real-world experience. Fill in the form and I'll get back to you — or
                  reach me directly through any of these.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a href={`mailto:${contact.email}`} className={btnGhost}>{contact.email}</a>
                  <Socials />
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
