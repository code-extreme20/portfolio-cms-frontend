import { ArrowUp, Mail } from "lucide-react";

function Footer({ about }) {
  const name = about?.name || "Your Name";
  const email = about?.email || "";
  const github = about?.socialLinks?.github || "";
  const linkedin = about?.socialLinks?.linkedin || "";
  const instagram = about?.socialLinks?.instagram || "";
  const twitter = about?.socialLinks?.twitter || "";

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      url: github,
    },
    {
      name: "LinkedIn",
      url: linkedin,
    },
    {
      name: "Instagram",
      url: instagram,
    },
    {
      name: "Twitter",
      url: twitter,
    },
  ].filter((social) => social.url);

  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-slate-950">
      {/* Decorative Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-600/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Main Footer */}
        <div className="grid gap-12 py-14 md:grid-cols-[1.3fr_0.7fr_0.8fr] md:py-16">
          {/* Brand */}
          <div>
            <a
              href="#home"
              className="inline-block text-2xl font-black tracking-tight text-white"
            >
              {name}
              <span className="text-blue-400">.</span>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-500">
              Building modern, responsive and user-focused digital
              experiences with clean code and thoughtful design.
            </p>

            {email && (
              <a
                href={`mailto:${email}`}
                className="mt-6 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-blue-400"
              >
                <Mail size={15} />
                {email}
              </a>
            )}
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
              Navigation
            </p>

            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
              <a
                href="#home"
                className="text-sm text-slate-500 hover:text-blue-400"
              >
                Home
              </a>

              <a
                href="#about"
                className="text-sm text-slate-500 hover:text-blue-400"
              >
                About
              </a>

              <a
                href="#skills"
                className="text-sm text-slate-500 hover:text-blue-400"
              >
                Skills
              </a>

              <a
                href="#projects"
                className="text-sm text-slate-500 hover:text-blue-400"
              >
                Projects
              </a>

              <a
                href="#experience"
                className="text-sm text-slate-500 hover:text-blue-400"
              >
                Experience
              </a>

              <a
                href="#services"
                className="text-sm text-slate-500 hover:text-blue-400"
              >
                Services
              </a>

              <a
                href="#blog"
                className="text-sm text-slate-500 hover:text-blue-400"
              >
                Blog
              </a>

              <a
                href="#contact"
                className="text-sm text-slate-500 hover:text-blue-400"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
              Connect
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {socialLinks.length > 0 ? (
                socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-slate-800 px-3.5 py-2.5 text-xs font-semibold text-slate-500 hover:border-blue-500/40 hover:text-blue-400"
                  >
                    {social.name}
                  </a>
                ))
              ) : (
                <span className="text-sm text-slate-600">
                  Social links coming soon.
                </span>
              )}
            </div>

            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Let's Work Together
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-5 border-t border-slate-800 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-600">
            © {currentYear} {name}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="hidden text-xs text-slate-700 sm:block">
              Designed & developed with care
            </span>

            <a
              href="#home"
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 text-slate-500 hover:border-blue-500/40 hover:text-blue-400"
            >
              <ArrowUp size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;