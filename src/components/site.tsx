import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Menu, X, ArrowUp } from "lucide-react";
import { contact } from "@/lib/portfolio";

export function Wordmark() {
  return (
    <span className="font-mono text-lg font-bold tracking-tight">
      YOGESH<span className="text-primary">.DEV</span>
    </span>
  );
}

const nav = ["home", "about", "education", "skills", "projects", "contact"];

export function Navbar({ onHome = true }: { onHome?: boolean }) {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!onHome) return;
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [onHome]);
  const links = nav.map((id) => (
    <Link
      key={id}
      to="/"
      hash={id}
      onClick={() => setOpen(false)}
      className={`text-sm capitalize transition-colors hover:text-primary ${
        onHome && active === id ? "text-primary" : "text-muted-foreground"
      }`}
    >
      {id}
    </Link>
  ));
  return (
    <header className="glass fixed inset-x-0 top-0 z-50 border-x-0 border-t-0">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" hash="home" aria-label="YOGESH.DEV home">
          <Wordmark />
        </Link>
        <nav className="hidden gap-7 md:flex">{links}</nav>
        <button className="md:hidden" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && <nav className="flex flex-col gap-4 border-t border-border px-5 py-5 md:hidden">{links}</nav>}
    </header>
  );
}

export function Socials() {
  const c = "grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-primary hover:text-primary";
  return (
    <div className="flex gap-3">
      <a className={c} href={`mailto:${contact.email}`} aria-label="Email"><Mail size={18} /></a>
      <a className={c} href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
      <a className={c} href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 md:flex-row">
        <div className="text-center md:text-left">
          <Wordmark />
          <p className="mt-1 text-sm text-muted-foreground">© {new Date().getFullYear()} Yogesh Lingutla. All rights reserved.</p>
        </div>
        <Socials />
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          Back to top <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}

export function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), obs.unobserve(e.target))),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export const btnPrimary =
  "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:glow-ring hover:-translate-y-0.5";
export const btnGhost =
  "inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition hover:border-primary hover:text-primary";
