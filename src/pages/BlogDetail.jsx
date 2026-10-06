import { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays, Clock3, Tag } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

const API_BASE_URL = "http://localhost:5000";

function BlogDetail() {
    const { slug } = useParams();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadBlog = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(`/blogs/slug/${slug}`);

                if (response.data.success) {
                    setBlog(response.data.data);
                } else {
                    setError("Blog post not found.");
                }
            } catch (err) {
                console.error("Failed to load blog:", err);

                setError(
                    err.response?.data?.message || "Blog post not found."
                );
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            loadBlog();
        }
    }, [slug]);

    const getImageUrl = (url) => {
        if (!url) return "";

        if (url.startsWith("http://") || url.startsWith("https://")) {
            return url;
        }

        return `${API_BASE_URL}${url}`;
    };

    const formatDate = (date) => {
        if (!date) return "";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const calculateReadingTime = (content = "") => {
        const words = content.trim().split(/\s+/).filter(Boolean).length;

        return Math.max(1, Math.ceil(words / 200));
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-950 px-5 pb-20 pt-32 text-white">
                <div className="mx-auto max-w-4xl">
                    <div className="animate-pulse">
                        <div className="h-4 w-32 rounded bg-slate-800" />

                        <div className="mt-8 h-14 max-w-3xl rounded bg-slate-800" />

                        <div className="mt-4 h-14 max-w-2xl rounded bg-slate-800" />

                        <div className="mt-8 aspect-video rounded-2xl bg-slate-900" />

                        <div className="mt-10 space-y-4">
                            <div className="h-4 rounded bg-slate-900" />
                            <div className="h-4 rounded bg-slate-900" />
                            <div className="h-4 w-4/5 rounded bg-slate-900" />
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (error || !blog) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 text-white">
                <div className="w-full max-w-xl text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900">
                        <Tag size={28} className="text-slate-600" />
                    </div>

                    <h1 className="mt-6 text-3xl font-bold">
                        Blog post not found
                    </h1>

                    <p className="mt-3 text-slate-500">
                        The article you're looking for doesn't exist or is no
                        longer available.
                    </p>

                    <Link
                        to="/#blog"
                        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500"
                    >
                        <ArrowLeft size={17} />
                        Back to Blog
                    </Link>
                </div>
            </main>
        );
    }

    const imageUrl = getImageUrl(blog.coverImage);

    const readingTime = calculateReadingTime(blog.content);

    return (
        <main className="min-h-screen bg-slate-950 px-5 pb-24 pt-28 text-white lg:px-8">
            <article className="mx-auto max-w-4xl">
                {/* Back */}
                <Link
                    to="/#blog"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-blue-400"
                >
                    <ArrowLeft size={17} />
                    Back to Blog
                </Link>

                {/* Header */}
                <header className="mt-10">
                    {blog.category && (
                        <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400">
                            {blog.category}
                        </span>
                    )}

                    <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                        {blog.title}
                    </h1>

                    {blog.excerpt && (
                        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400 sm:text-xl">
                            {blog.excerpt}
                        </p>
                    )}

                    {/* Meta */}
                    <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500">
                        {blog.publishedAt && (
                            <span className="flex items-center gap-2">
                                <CalendarDays size={16} />
                                {formatDate(blog.publishedAt)}
                            </span>
                        )}

                        <span className="flex items-center gap-2">
                            <Clock3 size={16} />
                            {readingTime} min read
                        </span>

                        {blog.author && (
                            <span>
                                By{" "}
                                <span className="text-slate-300">
                                    {blog.author}
                                </span>
                            </span>
                        )}
                    </div>
                </header>

                {/* Cover */}
                {imageUrl && (
                    <div className="mt-10 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
                        <img
                            src={imageUrl}
                            alt={blog.title}
                            className="max-h-[600px] w-full object-cover"
                        />
                    </div>
                )}

                {/* Content */}
                <div className="mt-12">
                    <div className="whitespace-pre-wrap text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
                        {blog.content}
                    </div>
                </div>

                {/* Tags */}
                {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                    <div className="mt-12 border-t border-slate-800 pt-8">
                        <div className="flex flex-wrap gap-2">
                            {blog.tags.map((tag, index) => (
                                <span
                                    key={`${tag}-${index}`}
                                    className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-400"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Bottom */}
                <div className="mt-12 border-t border-slate-800 pt-8">
                    <Link
                        to="/#blog"
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
                    >
                        <ArrowLeft size={17} />
                        Back to all articles
                    </Link>
                </div>
            </article>
        </main>
    );
}

export default BlogDetail;