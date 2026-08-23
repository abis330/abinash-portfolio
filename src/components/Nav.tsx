"use client";

import { useEffect, useState } from "react";
import { FileText, Menu, X } from "lucide-react";
import { navItems, profile } from "@/content/profile";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navItems.map((n) => n.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.6] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-canvas/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#top"
          className="group flex items-center gap-2.5"
          aria-label={`${profile.name} — back to top`}
        >
          <span className="grid h-8 w-8 place-items-center rounded-md border border-line bg-surface font-mono text-xs font-semibold text-accent transition-colors group-hover:border-accent/50">
            AS
          </span>
          <span className="hidden font-mono text-sm text-ink-2 transition-colors group-hover:text-ink sm:inline">
            abinash sinha
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm transition-colors ${
                  active === item.href
                    ? "text-accent"
                    : "text-ink-2 hover:text-ink"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={profile.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink-2 transition-colors hover:border-accent/50 hover:text-ink sm:flex"
          >
            <FileText size={14} aria-hidden />
            Résumé
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-9 w-9 place-items-center rounded-md border border-line bg-surface text-ink-2 transition-colors hover:text-ink md:hidden"
          >
            {open ? <X size={16} aria-hidden /> : <Menu size={16} aria-hidden />}
          </button>
        </div>
      </nav>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-line bg-canvas/95 backdrop-blur-xl md:hidden"
        >
          <ul className="mx-auto flex w-full max-w-6xl flex-col px-5 py-2 sm:px-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line-soft py-3.5 text-sm text-ink-2 transition-colors hover:text-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block py-3.5 text-sm text-ink-2 transition-colors hover:text-accent"
              >
                Résumé
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}