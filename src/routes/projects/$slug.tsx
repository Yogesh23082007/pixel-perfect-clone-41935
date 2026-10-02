import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Github, Home } from "lucide-react";
import { projects } from "@/lib/portfolio";
import { Navbar, Footer, btnPrimary, btnGhost } from "@/components/site";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const title = p ? `${p.title} — YOGESH.DEV` : "Project — YOGESH.DEV";
    return {
      meta: [
        { title },
        { name: "description", content: p?.description ?? "" },
        { property: "og:title", content: title },
        { property: "og:description", content: p?.description ?? "" },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center px-5 text-center">
      <div>
        <h1 className="text-3xl font-bold">Project not found</h1>
        <Link to="/" hash="projects" className={`${btnPrimary} mt-6`}>Back to Projects</Link>
      </div>
    </div>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { project: p } = Route.useLoaderData();
  return (
    <div className="min-h-screen">
      <Navbar onHome={false} />
      <main className="relative mx-auto max-w-4xl px-5 pb-24 pt-32">
        <div className="flex flex-wrap gap-3 text-sm">
          <Link to="/" hash="projects" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary"><ArrowLeft size={16} /> Back to Projects</Link>
          <span className="text-border">|</span>
          <Link to="/" hash="home" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary"><Home size={16} /> Home</Link>
        </div>
        <p className="rise mt-10 font-mono text-sm text-primary">{p.category}</p>
        <h1 className="rise mt-2 text-4xl font-bold md:text-5xl" style={{ animationDelay: "100ms" }}>{p.title}</h1>
        <p className="rise mt-6 text-lg leading-relaxed text-muted-foreground" style={{ animationDelay: "200ms" }}>{p.description}</p>
        <div className="rise glass mt-10 rounded-2xl p-6" style={{ animationDelay: "300ms" }}>
          <h2 className="font-semibold">Technologies</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((t) => <span key={t} className="rounded-md bg-muted px-3 py-1 text-sm text-muted-foreground">{t}</span>)}
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={p.github} target="_blank" rel="noreferrer" className={btnPrimary}><Github size={16} /> View on GitHub</a>
          {p.live && <a href={p.live} target="_blank" rel="noreferrer" className={btnGhost}><ExternalLink size={16} /> Live Demo</a>}
        </div>
      </main>
      <Footer />
    </div>
  );
}
