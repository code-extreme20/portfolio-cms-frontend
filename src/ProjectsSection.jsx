import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
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
            className="border-t border-slate-900 px-5 py-24 lg:px-8"
        >
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="mb-12">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
                        Projects
                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
                        Things I've built
                    </h2>

                    <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500">
                        A selection of projects showcasing my development skills,
                        creativity and experience.
                    </p>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-500">
                        Loading projects...
                    </div>
                )}

                {/* Empty */}
                {!loading && projects.length === 0 && (
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-500">
                        No projects available yet.
                    </div>
                )}

                {/* Projects */}
                {!loading && projects.length > 0 && (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project) => (
                            <article
                                key={project._id}
                                className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 transition duration-300 hover:-translate-y-2 hover:border-blue-500/40"
                            >
                                {/* Image */}
                                <div className="relative aspect-video overflow-hidden bg-slate-900">
                                    {project.image ? (
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
                                            <span className="text-4xl font-black text-slate-700">
                                                {project.title?.charAt(0)?.toUpperCase() || "P"}
                                            </span>
                                        </div>
                                    )}

                                    {project.category && (
                                        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-slate-950/80 px-3 py-1 text-xs font-medium text-blue-400 backdrop-blur">
                                            {project.category}
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-white">
                                        {project.title}
                                    </h3>

                                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                                        {project.shortDescription ||
                                            project.description ||
                                            "Project description"}
                                    </p>

                                    {/* Technologies */}
                                    {project.technologies?.length > 0 && (
                                        <div className="mt-5 flex flex-wrap gap-2">
                                            {project.technologies.map((technology, index) => (
                                                <span
                                                    key={`${technology}-${index}`}
                                                    className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs text-slate-400"
                                                >
                                                    {technology}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Links */}
                                    <div className="mt-6 flex flex-wrap gap-3">
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
                                            >
                                                Live Demo
                                                <ArrowUpRight size={16} />
                                            </a>
                                        )}

                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
                                            >
                                                GitHub
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default ProjectsSection;