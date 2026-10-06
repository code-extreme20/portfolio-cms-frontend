import { useEffect, useState } from "react";
import { ArrowUpRight, BriefcaseBusiness, CalendarDays } from "lucide-react";
import api from "../services/api";

function ExperienceSection() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExperience = async () => {
      try {
        const response = await api.get("/experience");

        if (response.data.success) {
          const data = response.data.data || [];

          const sortedData = [...data].sort((a, b) => {
            return (a.order || 0) - (b.order || 0);
          });

          setExperiences(sortedData);
        }
      } catch (error) {
        console.error("Failed to load experience:", error);
      } finally {
        setLoading(false);
      }
    };

    loadExperience();
  }, []);

  const formatDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const getDateRange = (experience) => {
    const start = formatDate(experience.startDate);

    if (experience.current) {
      return `${start} — Present`;
    }

    const end = formatDate(experience.endDate);

    if (!end) {
      return start;
    }

    return `${start} — ${end}`;
  };

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-slate-950 px-5 py-24 sm:py-28 lg:px-8 lg:py-32"
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-140px] top-24 h-80 w-80 rounded-full bg-blue-600/5 blur-3xl" />

        <div className="absolute bottom-0 right-[-120px] h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-blue-400">
            My Journey
          </p>

          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Experience<span className="text-blue-400">.</span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            A timeline of my professional journey, the teams I've worked
            with, and the experiences that have shaped my skills.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-52 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/50"
              />
            ))}
          </div>
        )}

        {/* Experience Timeline */}
        {!loading && experiences.length > 0 && (
          <div className="relative">
            {/* Desktop Timeline Line */}
            <div className="absolute bottom-0 left-6 top-0 hidden w-px bg-gradient-to-b from-blue-500/60 via-slate-800 to-transparent md:block" />

            <div className="space-y-6 md:space-y-8">
              {experiences.map((experience, index) => (
                <article
                  key={experience._id || index}
                  className="relative md:pl-16"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-[18px] top-8 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-slate-950 bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.12)] md:block" />

                  {/* Card */}
                  <div className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition duration-500 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-slate-900/70 sm:p-7">
                    {/* Top */}
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex gap-4">
                        {/* Icon */}
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-blue-400 transition group-hover:border-blue-500/30 group-hover:bg-blue-500/10">
                          <BriefcaseBusiness size={20} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-400">
                            {experience.position || "Position"}
                          </p>

                          <h3 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                            {experience.company || "Company"}
                          </h3>

                          {experience.location && (
                            <p className="mt-1 text-sm text-slate-500">
                              {experience.location}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Date */}
                      <div className="flex shrink-0 items-center gap-2 text-xs font-medium text-slate-500 sm:pt-1">
                        <CalendarDays size={14} />
                        <span>{getDateRange(experience)}</span>
                      </div>
                    </div>

                    {/* Description */}
                    {experience.description && (
                      <div className="mt-6 border-t border-slate-800 pt-5">
                        <p className="text-sm leading-7 text-slate-400">
                          {experience.description}
                        </p>
                      </div>
                    )}

                    {/* Technologies */}
                    {experience.technologies?.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {experience.technologies.map(
                          (technology, technologyIndex) => (
                            <span
                              key={`${technology}-${technologyIndex}`}
                              className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-[11px] font-medium text-slate-400 transition group-hover:border-slate-700"
                            >
                              {technology}
                            </span>
                          )
                        )}
                      </div>
                    )}

                    {/* Number */}
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-700">
                        Experience {String(index + 1).padStart(2, "0")}
                      </span>

                      <ArrowUpRight
                        size={17}
                        className="text-slate-700 transition group-hover:text-blue-400"
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && experiences.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 px-6 py-14 text-center">
            <BriefcaseBusiness
              size={30}
              className="mx-auto text-slate-600"
            />

            <p className="mt-4 text-sm text-slate-500">
              Experience will appear here once it is added from the CMS.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ExperienceSection;