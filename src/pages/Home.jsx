import { ArrowDown, ArrowRight } from "lucide-react";

function Home({ about }) {
  const name = about?.name || "Harsh Sharma";
  const shortBio = about?.shortBio || "Frontend Developer";
  const bio =
    about?.bio ||
    "I build modern, responsive and user-focused web experiences.";

  const profileImage = about?.profileImage || "";
  const github = about?.socialLinks?.github || "";
  const linkedin = about?.socialLinks?.linkedin || "";

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-5 pt-24 lg:px-8"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[5%] top-[15%] h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="absolute bottom-[5%] right-[5%] h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">

        {/* Content */}
        <div className="animate-fade-up">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
            Hello, I'm
          </p>

          <h1 className="max-w-5xl text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-8xl">
            {name}
            <span className="text-blue-400">.</span>
          </h1>

          <h2 className="mt-6 text-2xl font-semibold text-slate-300 sm:text-3xl">
            {shortBio}
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            {bio}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-blue-500"
            >
              View Projects
              <ArrowRight size={18} />
            </a>

            <a
              href="#contact"
              className="rounded-xl border border-slate-700 px-6 py-3.5 text-sm font-semibold text-slate-200 transition duration-300 hover:-translate-y-1 hover:border-blue-500 hover:text-blue-400"
            >
              Contact Me
            </a>
          </div>

          {(github || linkedin) && (
            <div className="mt-9 flex items-center gap-3">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-slate-800 px-4 py-3 text-sm text-slate-400 hover:border-blue-500 hover:text-blue-400"
                >
                  GitHub
                </a>
              )}

              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-slate-800 px-4 py-3 text-sm text-slate-400 hover:border-blue-500 hover:text-blue-400"
                >
                  LinkedIn
                </a>
              )}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="hidden justify-center lg:flex">
          <div className="relative">

            <div className="absolute -inset-8 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="animate-float relative flex h-96 w-96 items-center justify-center rounded-full border border-slate-800 bg-slate-900/70 shadow-2xl">

              {profileImage ? (
                <img
                  src={profileImage}
                  alt={name}
                  className="h-[350px] w-[350px] rounded-full object-cover"
                />
              ) : (
                <div className="flex h-[350px] w-[350px] items-center justify-center rounded-full bg-slate-900">
                  <span className="text-8xl font-black text-slate-700">
                    {name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 hover:text-blue-400"
      >
        <ArrowDown size={24} className="animate-bounce" />
      </a>
    </section>
  );
}

export default Home;