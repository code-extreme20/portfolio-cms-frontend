import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Code2,
  Layers3,
  Palette,
  Rocket,
  Server,
  Smartphone,
  Sparkles,
} from "lucide-react";
import api from "../services/api";

const defaultIcons = [
  Code2,
  Palette,
  Smartphone,
  Server,
  Rocket,
  Layers3,
];

function ServicesSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await api.get("/services");

        if (response.data.success) {
          const data = response.data.data || [];

          const sortedData = [...data].sort((a, b) => {
            return (a.order || 0) - (b.order || 0);
          });

          setServices(sortedData);
        }
      } catch (error) {
        console.error("Failed to load services:", error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-slate-950 px-5 py-24 sm:py-28 lg:px-8 lg:py-32"
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-20 h-80 w-80 rounded-full bg-blue-600/5 blur-3xl" />

        <div className="absolute bottom-0 right-[-120px] h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-blue-400">
            What I Do
          </p>

          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Services<span className="text-blue-400">.</span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            From interface design to development, I create digital experiences
            that are modern, responsive and built around real user needs.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-72 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/50"
              />
            ))}
          </div>
        )}

        {/* Services */}
        {!loading && services.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = defaultIcons[index % defaultIcons.length];

              return (
                <article
                  key={service._id || index}
                  className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition duration-500 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-slate-900/70 sm:p-7"
                >
                  {/* Top Glow */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-blue-500/10 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

                  {/* Number */}
                  <div className="absolute right-6 top-6 text-4xl font-black text-white/[0.035]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Icon */}
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-blue-400 transition duration-300 group-hover:border-blue-500/30 group-hover:bg-blue-500/10">
                    {service.icon ? (
                      <span className="text-lg">{service.icon}</span>
                    ) : (
                      <Icon size={22} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="relative mt-7">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-bold text-white">
                        {service.title || "Service"}
                      </h3>

                      <ArrowUpRight
                        size={18}
                        className="mt-1 shrink-0 text-slate-700 transition duration-300 group-hover:text-blue-400"
                      />
                    </div>

                    <p className="mt-4 text-sm leading-7 text-slate-400">
                      {service.description ||
                        "A professional digital service focused on quality, usability and performance."}
                    </p>
                  </div>

                  {/* Features */}
                  {service.features?.length > 0 && (
                    <div className="relative mt-6 border-t border-slate-800 pt-5">
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                        Includes
                      </p>

                      <div className="space-y-2.5">
                        {service.features.map((feature, featureIndex) => (
                          <div
                            key={`${feature}-${featureIndex}`}
                            className="flex items-start gap-2.5"
                          >
                            <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                              <Check size={10} strokeWidth={3} />
                            </div>

                            <span className="text-xs leading-5 text-slate-400">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price */}
                  {service.price && (
                    <div className="relative mt-6 flex items-end justify-between border-t border-slate-800 pt-5">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                          Starting From
                        </p>

                        <p className="mt-1 text-lg font-bold text-white">
                          {service.price}
                        </p>
                      </div>

                      <Sparkles
                        size={16}
                        className="text-slate-700 transition group-hover:text-blue-400"
                      />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && services.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 px-6 py-14 text-center">
            <Layers3 size={30} className="mx-auto text-slate-600" />

            <p className="mt-4 text-sm text-slate-500">
              Services will appear here once they are added from the CMS.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ServicesSection;