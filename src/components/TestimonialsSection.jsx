import { useEffect, useState } from "react";
import { ArrowUpRight, Quote, Star } from "lucide-react";
import api from "../services/api";

function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const response = await api.get("/testimonials");

        if (response.data.success) {
          const data = response.data.data || [];

          const sortedData = [...data].sort((a, b) => {
            return (a.order || 0) - (b.order || 0);
          });

          setTestimonials(sortedData);
        }
      } catch (error) {
        console.error("Failed to load testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-slate-950 px-5 py-24 sm:py-28 lg:px-8 lg:py-32"
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[-140px] top-20 h-80 w-80 rounded-full bg-blue-600/5 blur-3xl" />

        <div className="absolute bottom-0 left-[-120px] h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-blue-400">
            Kind Words
          </p>

          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Testimonials<span className="text-blue-400">.</span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            A few words from people I've had the opportunity to work with.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-72 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/50"
              />
            ))}
          </div>
        )}

        {/* Testimonials */}
        {!loading && testimonials.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => {
              const rating = Math.min(
                5,
                Math.max(0, Number(testimonial.rating) || 0)
              );

              return (
                <article
                  key={testimonial._id || index}
                  className={`group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition duration-500 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-slate-900/70 sm:p-7 ${
                    index === 0 ? "lg:row-span-1" : ""
                  }`}
                >
                  {/* Quote Icon */}
                  <div className="absolute right-6 top-6 text-blue-500/10 transition duration-300 group-hover:text-blue-500/20">
                    <Quote size={54} fill="currentColor" />
                  </div>

                  {/* Rating */}
                  <div className="relative flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        size={14}
                        fill={
                          starIndex < rating ? "currentColor" : "transparent"
                        }
                        className={
                          starIndex < rating
                            ? "text-blue-400"
                            : "text-slate-700"
                        }
                      />
                    ))}
                  </div>

                  {/* Message */}
                  <blockquote className="relative mt-7 flex-1 text-sm leading-7 text-slate-300">
                    “
                    {testimonial.message ||
                      "Working together was a great experience. The attention to detail and commitment to quality really stood out."}
                    ”
                  </blockquote>

                  {/* Person */}
                  <div className="mt-7 flex items-center gap-3 border-t border-slate-800 pt-5">
                    {/* Image */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-800 bg-slate-950">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt={testimonial.name || "Client"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-bold text-blue-400">
                          {testimonial.name?.charAt(0)?.toUpperCase() || "C"}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-white">
                        {testimonial.name || "Client"}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {testimonial.role || "Client"}
                        {testimonial.company
                          ? ` · ${testimonial.company}`
                          : ""}
                      </p>
                    </div>

                    <ArrowUpRight
                      size={16}
                      className="ml-auto shrink-0 text-slate-700 transition group-hover:text-blue-400"
                    />
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && testimonials.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 px-6 py-14 text-center">
            <Quote size={30} className="mx-auto text-slate-600" />

            <p className="mt-4 text-sm text-slate-500">
              Testimonials will appear here once they are added from the CMS.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default TestimonialsSection;