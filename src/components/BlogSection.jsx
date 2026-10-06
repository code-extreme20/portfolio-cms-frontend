import { useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import api from "../services/api";

function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const response = await api.get("/blogs");

        if (response.data.success) {
          const data = response.data.data || [];

          const sortedData = [...data].sort((a, b) => {
            return (a.order || 0) - (b.order || 0);
          });

          setBlogs(sortedData);
        }
      } catch (error) {
        console.error("Failed to load blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  const formatDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getReadingTime = (content) => {
    if (!content) return "1 min read";

    const words = content.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));

    return `${minutes} min read`;
  };

  return (
    <section
      id="blog"
      className="relative overflow-hidden bg-slate-950 px-5 py-24 sm:py-28 lg:px-8 lg:py-32"
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-20 h-80 w-80 rounded-full bg-blue-600/5 blur-3xl" />

        <div className="absolute bottom-0 right-[-120px] h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-blue-400">
              Thoughts & Insights
            </p>

            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Blog<span className="text-blue-400">.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Ideas, tutorials and lessons from my journey through design,
              development and technology.
            </p>
          </div>

          {blogs.length > 0 && !loading && (
            <span className="w-fit rounded-full border border-slate-800 bg-slate-900/50 px-4 py-2 text-xs font-medium text-slate-500">
              {blogs.length}{" "}
              {blogs.length === 1 ? "article" : "articles"}
            </span>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[440px] animate-pulse rounded-2xl border border-slate-800 bg-slate-900/50"
              />
            ))}
          </div>
        )}

        {/* Blog Posts */}
        {!loading && blogs.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog, index) => (
              <article
                key={blog._id || blog.slug || index}
                className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 transition duration-500 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-slate-900/70"
              >
                {/* Cover Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  {blog.coverImage ? (
                    <img
                      src={blog.coverImage}
                      alt={blog.title || "Blog post"}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/30">
                      <span className="text-6xl font-black text-slate-800">
                        {blog.title?.charAt(0)?.toUpperCase() || "B"}
                      </span>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Category */}
                  {blog.category && (
                    <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-blue-300 backdrop-blur-md">
                      {blog.category}
                    </span>
                  )}

                  {/* Number */}
                  <span className="absolute bottom-4 right-5 text-4xl font-black text-white/10">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-slate-500">
                    {blog.publishedAt && (
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={13} />
                        {formatDate(blog.publishedAt)}
                      </span>
                    )}

                    <span className="flex items-center gap-1.5">
                      <Clock3 size={13} />
                      {getReadingTime(blog.content)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 text-xl font-bold leading-snug text-white transition group-hover:text-blue-400">
                    {blog.title || "Untitled Article"}
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-400">
                    {blog.excerpt ||
                      blog.content ||
                      "Read more about this topic and explore the ideas behind the project."}
                  </p>

                  {/* Tags */}
                  {blog.tags?.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {blog.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={`${tag}-${tagIndex}`}
                          className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-[10px] font-medium text-slate-500"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read Link */}
                  <div className="mt-6 border-t border-slate-800 pt-5">
                    <a
                      href={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-400 transition hover:text-blue-400"
                    >
                      Read Article
                      <ArrowUpRight size={15} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && blogs.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 px-6 py-14 text-center">
            <p className="text-sm text-slate-500">
              Blog posts will appear here once they are added from the CMS.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default BlogSection;