import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Services", href: "#services" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
];

function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
                <a
                    href="#home"
                    className="text-xl font-bold tracking-tight text-white"
                    onClick={() => setOpen(false)}
                >
                    Portfolio<span className="text-blue-400">.</span>
                </a>

                {/* Desktop */}
                <div className="hidden items-center gap-7 md:flex">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-sm text-slate-300 transition hover:text-blue-400"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>

                {/* Mobile button */}
                <button
                    onClick={() => setOpen((value) => !value)}
                    className="rounded-lg p-2 text-slate-300 md:hidden"
                    aria-label="Toggle navigation"
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile */}
            {open && (
                <div className="border-t border-white/5 bg-slate-950 px-5 py-4 md:hidden">
                    <div className="flex flex-col gap-1">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="rounded-lg px-3 py-3 text-sm text-slate-300 transition hover:bg-slate-900 hover:text-blue-400"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;