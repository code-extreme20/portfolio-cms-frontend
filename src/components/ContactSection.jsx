import { useState } from "react";
import { CheckCircle2, Mail, MapPin, Send } from "lucide-react";
import api from "../services/api";

function ContactSection({ about }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [sending, setSending] = useState(false);

  const email = about?.email || "";
  const phone = about?.phone || "";
  const location = about?.location || "";
  const github = about?.socialLinks?.github || "";
  const linkedin = about?.socialLinks?.linkedin || "";
  const instagram = about?.socialLinks?.instagram || "";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus({
      type: "",
      message: "",
    });

    if (!form.name.trim()) {
      setStatus({
        type: "error",
        message: "Please enter your name.",
      });
      return;
    }

    if (!form.email.trim()) {
      setStatus({
        type: "error",
        message: "Please enter your email.",
      });
      return;
    }

    if (!form.subject.trim()) {
      setStatus({
        type: "error",
        message: "Please enter a subject.",
      });
      return;
    }

    if (!form.message.trim()) {
      setStatus({
        type: "error",
        message: "Please enter your message.",
      });
      return;
    }

    try {
      setSending(true);

      const response = await api.post("/contact", form);

      if (response.data.success) {
        setStatus({
          type: "success",
          message: "Your message has been sent successfully.",
        });

        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          message:
            response.data.message ||
            "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Failed to send message:", error);

      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Unable to send your message. Please try again.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-slate-950 px-5 py-24 sm:py-28 lg:px-8 lg:py-32"
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/5 blur-3xl" />

        <div className="absolute bottom-0 right-[-120px] h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-blue-400">
            Let's Connect
          </p>

          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl">
            Let's talk<span className="text-blue-400">.</span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Have a project, idea or opportunity in mind? Send me a message and
            let's start a conversation.
          </p>
        </div>

        {/* Main Contact Layout */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          {/* Contact Information */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-blue-400">
              <Mail size={21} />
            </div>

            <h3 className="mt-7 text-2xl font-bold text-white">
              Get in touch
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              I'm always open to discussing new projects, creative ideas or
              opportunities.
            </p>

            <div className="mt-8 space-y-5">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="group flex items-start gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-slate-500 transition group-hover:border-blue-500/30 group-hover:text-blue-400">
                    <Mail size={17} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
                      Email
                    </p>

                    <p className="mt-1 break-all text-sm text-slate-300 transition group-hover:text-blue-400">
                      {email}
                    </p>
                  </div>
                </a>
              )}

              {location && (
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-slate-500">
                    <MapPin size={17} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
                      Location
                    </p>

                    <p className="mt-1 text-sm text-slate-300">
                      {location}
                    </p>
                  </div>
                </div>
              )}

              {phone && (
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-slate-500">
                    <span className="text-sm">☎</span>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
                      Phone
                    </p>

                    <p className="mt-1 text-sm text-slate-300">
                      {phone}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Social Links */}
            {(github || linkedin || instagram) && (
              <div className="mt-8 border-t border-slate-800 pt-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
                  Find me online
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {github && (
                    <a
                      href={github}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-400 hover:border-blue-500/40 hover:text-blue-400"
                    >
                      GitHub
                    </a>
                  )}

                  {linkedin && (
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-400 hover:border-blue-500/40 hover:text-blue-400"
                    >
                      LinkedIn
                    </a>
                  )}

                  {instagram && (
                    <a
                      href={instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-400 hover:border-blue-500/40 hover:text-blue-400"
                    >
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-xs font-semibold text-slate-400"
                  >
                    Your Name
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-700 transition focus:border-blue-500/60"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-xs font-semibold text-slate-400"
                  >
                    Email Address
                  </label>

                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-700 transition focus:border-blue-500/60"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="mt-5">
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-xs font-semibold text-slate-400"
                >
                  Subject
                </label>

                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What would you like to discuss?"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-700 transition focus:border-blue-500/60"
                />
              </div>

              {/* Message */}
              <div className="mt-5">
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-xs font-semibold text-slate-400"
                >
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell me a little about your project..."
                  className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950 px-4 py-3.5 text-sm leading-7 text-white outline-none placeholder:text-slate-700 transition focus:border-blue-500/60"
                />
              </div>

              {/* Status */}
              {status.message && (
                <div
                  className={`mt-5 flex items-start gap-2 rounded-xl border px-4 py-3 text-xs ${
                    status.type === "success"
                      ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
                      : "border-red-500/20 bg-red-500/5 text-red-400"
                  }`}
                >
                  {status.type === "success" && (
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0" />
                  )}

                  <span>{status.message}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={sending}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {sending ? "Sending..." : "Send Message"}

                {!sending && <Send size={16} />}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Email CTA */}
        {email && (
          <div className="mt-10 border-t border-slate-800 pt-8">
            <a
              href={`mailto:${email}`}
              className="group inline-flex max-w-full items-center gap-3 text-sm text-slate-500 hover:text-blue-400"
            >
              <Mail size={16} className="shrink-0" />

              <span className="truncate">
                Prefer email? {email}
              </span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

export default ContactSection;