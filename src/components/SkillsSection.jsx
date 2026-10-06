import { useEffect, useMemo, useState } from "react";
import {
  Code2,
  Database,
  Globe,
  Layers3,
  Palette,
  Server,
  Sparkles,
  Terminal,
} from "lucide-react";
import api from "../services/api";

const categoryIcons = {
  Frontend: Code2,
  Backend: Server,
  Database: Database,
  Tools: Terminal,
  Design: Palette,
  Other: Layers3,
};

function SkillsSection() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const response = await api.get("/skills");

        if (response.data.success) {
          setSkills(response.data.data || []);
        }
      } catch (error) {
        console.error("Failed to load skills:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  const groupedSkills = useMemo(() => {
    return skills.reduce((groups, skill) => {
      const category = skill.category || "Other";

      if (!groups[category]) {
        groups[category] = [];
      }

      groups[category].push(skill);

      return groups;
    }, {});
  }, [skills]);

  const categories = Object.entries(groupedSkills);
  console.log("SKILLS:", skills);
  console.log("GROUPED SKILLS:", groupedSkills);
  console.log("CATEGORIES:", categories);

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-slate-950 px-5 py-24 sm:py-28 lg:px-8 lg:py-32"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-blue-600/5 blur-3xl" />
        <div className="absolute bottom-0 right-[-100px] h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-blue-400">
            My Expertise
          </p>

          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Skills<span className="text-blue-400">.</span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Technologies and tools I use to build modern, responsive and
            user-focused digital experiences.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-48 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/50"
              />
            ))}
          </div>
        )}

        {/* Skills */}
        {!loading && categories.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map(([category, categorySkills], index) => {
              const Icon = categoryIcons[category] || Globe;

              return (
                <div
                  key={category}
                  className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-slate-900/70"
                >
                  {/* Category */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-blue-400 transition group-hover:border-blue-500/30 group-hover:bg-blue-500/10">
                        <Icon size={21} />
                      </div>

                      <div>
                        <p className="text-base font-bold text-white">
                          {category}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          {categorySkills.length}{" "}
                          {categorySkills.length === 1
                            ? "technology"
                            : "technologies"}
                        </p>
                      </div>
                    </div>

                    <Sparkles
                      size={15}
                      className="text-slate-700 transition group-hover:text-blue-400"
                    />
                  </div>

                  {/* Skill list */}
                  <div className="mt-7 space-y-5">
                    {categorySkills.map((skill) => {
                      const level = Math.min(
                        100,
                        Math.max(0, Number(skill.level) || 0)
                      );

                      return (
                        <div key={skill._id || skill.name}>
                          <div className="mb-2 flex items-center justify-between">
                            <div className="flex min-w-0 items-center gap-2">
                              {skill.icon && (
                                <span className="text-xs text-slate-500">
                                  {skill.icon}
                                </span>
                              )}

                              <span className="truncate text-sm font-medium text-slate-200">
                                {skill.name}
                              </span>
                            </div>

                            <span className="ml-3 text-xs font-semibold text-slate-500">
                              {level}%
                            </span>
                          </div>

                          <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                            <div
                              className="h-full rounded-full bg-blue-500 transition-all duration-1000"
                              style={{ width: `${level}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {!loading && categories.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 px-6 py-12 text-center">
            <Code2
              size={30}
              className="mx-auto text-slate-600"
            />

            <p className="mt-4 text-sm text-slate-500">
              Skills will appear here once they are added from the CMS.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default SkillsSection;