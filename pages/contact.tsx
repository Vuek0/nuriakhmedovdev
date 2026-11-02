import { useState, type FormEvent } from "react";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import { SectionIntro } from "@/components/Blocks";
import { SITE, SOCIALS } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const EMPTY = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  const field = (key: keyof typeof EMPTY) => ({
    value: form[key],
    onChange: (e: { target: { value: string } }) => setForm({ ...form, [key]: e.target.value }),
  });

  return (
    <>
      <Seo
        title="Contact"
        description="Open to logistics and operations engagements. Write by email or Telegram."
        path="/contact"
      />
      <SectionIntro title="Let’s talk" eyebrow="Contact" className="intro--page">
        Open to logistics and operations engagements. Tell me how your team works today and what
        has stopped scaling.
      </SectionIntro>

      <section className="contact container">
        <dl className="facts">
          <div><dt>Email</dt><dd><a href={`mailto:${SITE.email}`} className="link">{SITE.email}</a></dd></div>
          <div>
            <dt>Telegram</dt>
            <dd>
              <a href={SITE.telegram.href} target="_blank" rel="noopener noreferrer" className="link">
                {SITE.telegram.handle}
              </a>
            </dd>
          </div>
          <div>
            <dt>Studio</dt>
            <dd>
              <a href={SITE.studio.href} target="_blank" rel="noopener noreferrer" className="link">
                {SITE.studio.host} ↗
              </a>
            </dd>
          </div>
          <div><dt>Based in</dt><dd>{SITE.location}</dd></div>
          <div>
            <dt>Elsewhere</dt>
            <dd>
              {SOCIALS.filter((s) => s.label !== "Telegram").map((s, i) => (
                <span key={s.label}>
                  {i > 0 && " · "}
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link">
                    {s.label}
                  </a>
                </span>
              ))}
            </dd>
          </div>
        </dl>

        <form className="form" onSubmit={submit}>
          <label className="sr-only" htmlFor="name">Name</label>
          <input id="name" name="name" placeholder="Name" autoComplete="name" required {...field("name")} />
          <label className="sr-only" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="Email" autoComplete="email" required {...field("email")} />
          <label className="sr-only" htmlFor="message">Message</label>
          <textarea id="message" name="message" placeholder="About the project, timeline and team" rows={6} required {...field("message")} />
          <div className="form-foot">
            <button type="submit" className="btn" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
            <span className={`form-note ${status === "error" ? "is-error" : ""}`} role="status">
              {status === "sent" && "Thanks — message sent. I’ll get back to you soon."}
              {status === "error" && `Something went wrong. Please email ${SITE.email} directly.`}
            </span>
          </div>
        </form>
      </section>

      <Footer />
    </>
  );
}
