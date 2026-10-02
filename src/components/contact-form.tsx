import { useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import {
  sendContactMessage,
  INTERESTS,
  OPPORTUNITIES,
  type ContactFormData,
} from "@/lib/contact.functions";
import { contact } from "@/lib/portfolio";
import { btnPrimary } from "@/components/site";

const field =
  "w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:glow-ring [&_option]:bg-card [&_option]:text-foreground";

function mailtoHref(f: Omit<ContactFormData, "website">) {
  const subject = `Portfolio contact — ${f.opportunity} · ${f.interest}`;
  const body = [
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    `Interest: ${f.interest}`,
    `Opportunity: ${f.opportunity}`,
    "",
    f.message,
  ].join("\n");
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const emptyForm = {
  name: "",
  email: "",
  interest: INTERESTS[0] as string,
  opportunity: OPPORTUNITIES[0] as string,
  message: "",
  website: "",
};

export function ContactForm() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "fallback" | "error">("idle");
  const [error, setError] = useState("");

  const set =
    (key: keyof typeof emptyForm) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (form.website) return; // bot trap

    if (!form.name.trim()) return setError("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      return setError("Please enter a valid email address.");
    if (!form.message.trim()) return setError("Please write a short message.");
    if (form.message.length > 2000) return setError("Please keep the message under 2000 characters.");
    setError("");

    setStatus("sending");
    try {
      const res = await sendContactMessage({ data: { ...form, website: form.website || undefined } });
      if (res.delivered) {
        setStatus("sent");
      } else {
        window.location.href = mailtoHref(form);
        setStatus("fallback");
      }
      setForm(emptyForm);
    } catch {
      setError("Something went wrong. Please try again, or email me directly.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-10 text-center">
        <CheckCircle2 className="text-primary" size={40} />
        <p className="text-xl font-semibold">Message sent!</p>
        <p className="text-sm text-muted-foreground">
          Thanks for reaching out — I'll get back to you soon.
        </p>
      </div>
    );
  }

  if (status === "fallback") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-10 text-center">
        <CheckCircle2 className="text-primary" size={40} />
        <p className="text-xl font-semibold">Almost there!</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Your email app just opened with your message ready to go — hit send and it will land in my
          inbox. You can also email me directly at {contact.email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Name
          </label>
          <input
            id="cf-name"
            className={field}
            placeholder="Your name"
            value={form.name}
            onChange={set("name")}
            maxLength={100}
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Email
          </label>
          <input
            id="cf-email"
            type="email"
            className={field}
            placeholder="you@example.com"
            value={form.email}
            onChange={set("email")}
            maxLength={255}
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="cf-interest" className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Interest
          </label>
          <select id="cf-interest" className={field} value={form.interest} onChange={set("interest")}>
            {INTERESTS.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cf-opportunity" className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Opportunity
          </label>
          <select
            id="cf-opportunity"
            className={field}
            value={form.opportunity}
            onChange={set("opportunity")}
          >
            {OPPORTUNITIES.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-xs font-medium text-muted-foreground">
          Message
        </label>
        <textarea
          id="cf-message"
          rows={5}
          className={`${field} resize-none`}
          placeholder="Tell me about the opportunity…"
          value={form.message}
          onChange={set("message")}
          maxLength={2000}
        />
      </div>

      {/* Honeypot — hidden from humans, catches bots */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={set("website")}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button type="submit" className={`${btnPrimary} justify-center`} disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send size={16} /> Send Message
          </>
        )}
      </button>
    </form>
  );
}
