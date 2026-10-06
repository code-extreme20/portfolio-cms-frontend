import { useEffect, useState } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import api from "../services/api";

function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await api.get("/projects");

        if (response.data.success) {
          setProjects(response.data.data || []);
        }
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-slate-950 px-5 py-24 sm:py-28 lg:px-8 lg:py-32"
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[-120px] top-20 h-80 w-80 rounded-full bg-blue-600/5 blur-3xl" />

        <div className="absolute bottom-10 left-[-120px] h-72 w-72 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-blue-400">
            Selected Work
          </p>

          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Projects<span className="text-blue-400">.</span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            A selection of projects I have designed and developed with a focus
            on clean interfaces, responsive experiences and useful products.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="h-[420px] animate-pulse rounded-2xl border border-slate-800 bg-slate-900/50"
              />
            ))}
          </div>
        )}

        {/* Projects */}
        {!loading && projects.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <article
                key={project._id || project.slug || index}
                className={`group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 transition duration-500 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-slate-900/70 ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
              >
                {/* Project Image */}
                <div
                  className={`relative overflow-hidden bg-slate-900 ${
                    index === 0 ? "aspect-[16/8]" : "aspect-[16/10]"
                  }`}
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title || "Project"}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/30">
                      <span className="text-6xl font-black text-slate-800">
                        {project.title?.charAt(0)?.toUpperCase() || "P"}
                      </span>
                    </div>
                  )}

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-70" />

                  {/* Featured Badge */}
                  {project.featured && (
                    <span className="absolute left-5 top-5 rounded-full border border-blue-400/30 bg-blue-500/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-300 backdrop-blur-md">
                      Featured
                    </span>
                  )}

                  {/* Project Number */}
                  <span className="absolute bottom-5 right-5 text-4xl font-black text-white/10">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Project Content */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      {project.category && (
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
                          {project.category}
                        </p>
                      )}

                      <h3 className="text-xl font-bold text-white sm:text-2xl">
                        {project.title || "Untitled Project"}
                      </h3>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-800 text-slate-500 transition group-hover:border-blue-500/40 group-hover:text-blue-400">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    {project.shortDescription ||
                      project.description ||
                      "A modern digital project built with attention to usability and performance."}
                  </p>

                  {/* Technologies */}
                  {project.technologies?.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.map((technology, techIndex) => (
                        <span
                          key={`${technology}-${techIndex}`}
                          className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-[11px] font-medium text-slate-400"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Project Links */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:-translate-y-0.5 hover:bg-blue-500"
                      >
                        Live Project
                        <ExternalLink size={14} />
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-400"
                      >
                        <span className="text-xs font-bold">GH</span>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 px-6 py-14 text-center">
            <p className="text-sm text-slate-500">
              Projects will appear here once they are added from the CMS.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;