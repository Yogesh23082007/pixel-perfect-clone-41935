import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { contact } from "@/lib/portfolio";

export const INTERESTS = [
  "Python Development",
  "AI & Machine Learning",
  "Data Science",
  "Web Development",
  "Something else",
] as const;

export const OPPORTUNITIES = [
  "Internship",
  "Full-time role",
  "Freelance project",
  "Collaboration",
  "Just saying hi",
] as const;

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name")
    .max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be under 255 characters"),
  interest: z.enum(INTERESTS),
  opportunity: z.enum(OPPORTUNITIES),
  message: z
    .string()
    .trim()
    .min(1, "Please write a short message")
    .max(2000, "Message must be under 2000 characters"),
  // Honeypot — must stay empty; real visitors never see it.
  website: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

function buildEmail(data: ContactFormData) {
  const subject = `Portfolio contact — ${data.opportunity} · ${data.interest}`;
  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Interest: ${data.interest}`,
    `Opportunity: ${data.opportunity}`,
    "",
    data.message,
  ].join("\n");
  return { subject, text };
}

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }): Promise<{ delivered: boolean }> => {
    // Honeypot filled → silently drop (pretend success so bots move on).
    if (data.website) return { delivered: true };

    const apiKey = process.env["RESEND_API_KEY"];
    if (!apiKey) {
      // No email sender configured yet — the visitor's mail app takes over.
      return { delivered: false };
    }

    try {
      const { subject, text } = buildEmail(data);
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "YOGESH.DEV <portfolio@resend.dev>",
          to: [contact.email],
          reply_to: data.email,
          subject,
          text,
        }),
      });
      return { delivered: res.ok };
    } catch {
      return { delivered: false };
    }
  });
