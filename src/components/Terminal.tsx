"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { education, experience, profile, research, skillGroups } from "@/content/profile";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

type Line = { kind: "sys" | "cmd" | "out" | "accent" | "err"; text: string };

const PROMPT = "abinash@portfolio:~$";

const COMMANDS = [
  "whoami",
  "experience",
  "research",
  "stack",
  "education",
  "contact",
  "help",
  "clear",
] as const;

const BOOT: Line[] = [
  { kind: "sys", text: "portfolio shell v1.0 — session established" },
  { kind: "sys", text: `resolving profile: ${profile.name.toLowerCase().replace(" ", ".")}` },
  { kind: "accent", text: "✓ ready. type `help` for commands, or click one below." },
];

function run(raw: string): Line[] {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return [];

  switch (cmd) {
    case "help":
      return [
        { kind: "out", text: "available commands:" },
        ...COMMANDS.map((c) => ({ kind: "accent" as const, text: `  ${c}` })),
      ];

    case "whoami":
      return [
        { kind: "accent", text: profile.name },
        { kind: "out", text: `${profile.currentTitle} · ${profile.location}` },
        { kind: "out", text: "" },
        { kind: "out", text: profile.summary },
      ];

    case "experience":
      return [
        { kind: "out", text: `${experience.length} roles · 8+ years` },
        { kind: "out", text: "" },
        ...experience.flatMap((r) => [
          {
            kind: "accent" as const,
            text: `${r.period.padEnd(22)} ${r.title}`,
          },
          {
            kind: "out" as const,
            text: `${" ".repeat(23)}${r.company}${r.client ? ` (client: ${r.client})` : ""}`,
          },
        ]),
      ];

    case "research":
      return research.flatMap((r) => [
        { kind: "accent" as const, text: r.title },
        { kind: "out" as const, text: `  ${r.venue} · ${r.period}` },
        { kind: "out" as const, text: `  ${r.tags.join(", ")}` },
        { kind: "out" as const, text: "" },
      ]);

    case "stack":
      return skillGroups.flatMap((g) => [
        { kind: "accent" as const, text: g.label },
        { kind: "out" as const, text: `  ${g.items.join(" · ")}` },
      ]);

    case "education":
      return education.flatMap((e) => [
        { kind: "accent" as const, text: `${e.abbr} — ${e.degree}` },
        {
          kind: "out" as const,
          text: `  ${e.school} · ${e.period}${e.detail ? ` · ${e.detail}` : ""}`,
        },
      ]);

    case "contact":
      return [
        { kind: "out", text: "open to Principal Data Scientist conversations." },
        { kind: "out", text: "" },
        ...(profile.emailIsPlaceholder
          ? []
          : [{ kind: "accent" as const, text: `email     ${profile.email}` }]),
        { kind: "accent", text: `linkedin  ${profile.linkedin}` },
        { kind: "accent", text: `github    ${profile.github}` },
      ];

    case "resume":
      return [{ kind: "out", text: "opening résumé…" }];

    case "clear":
      return [];

    case "sudo":
    case "sudo su":
      return [{ kind: "err", text: "nice try." }];

    default:
      return [
        { kind: "err", text: `command not found: ${cmd}` },
        { kind: "out", text: "type `help` to see what's available." },
      ];
  }
}

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // staggered boot
  useEffect(() => {
    const timers = BOOT.map((line, i) =>
      setTimeout(() => setLines((prev) => [...prev, line]), 260 * (i + 1)),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const raw = value;
    const cmd = raw.trim().toLowerCase();
    setValue("");
    if (!cmd) return;

    setHistory((h) => [...h, raw]);
    setHistIdx(-1);

    if (cmd === "clear") {
      setLines([]);
      return;
    }

    setLines((prev) => [...prev, { kind: "cmd", text: raw }, ...run(raw)]);

    if (cmd === "resume") {
      window.open(profile.resumeHref, "_blank", "noopener,noreferrer");
    }
  };

  const runChip = (cmd: string) => {
    setLines((prev) => [...prev, { kind: "cmd", text: cmd }, ...run(cmd)]);
    if (cmd === "clear") setLines([]);
    inputRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(next);
      setValue(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const next = histIdx + 1;
      if (next >= history.length) {
        setHistIdx(-1);
        setValue("");
      } else {
        setHistIdx(next);
        setValue(history[next]);
      }
    }
  };

  const color = (kind: Line["kind"]) =>
    kind === "accent"
      ? "text-accent"
      : kind === "err"
        ? "text-[var(--viz-anomaly)]"
        : kind === "sys"
          ? "text-ink-3"
          : "text-ink-2";

  return (
    <Section
      id="terminal"
      index="06 / CONTACT"
      title="Let's talk"
      lead="I'm open to Principal Data Scientist roles working on telemetry, detection, and security-adjacent data at scale. Use the terminal, or just take the links."
    >
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        {/* interactive terminal */}
        <Reveal>
          <div
            className="card overflow-hidden p-0"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <span className="flex gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a42]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a42]" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
              </span>
              <span className="ml-2 font-mono text-[11px] text-ink-3">
                {PROMPT.replace("$", "")}
              </span>
            </div>

            <div
              ref={logRef}
              className="h-[360px] overflow-y-auto px-4 py-4 font-mono text-[12.5px] leading-relaxed sm:h-[420px] sm:text-[13px]"
            >
              {lines.map((l, i) => (
                <p
                  key={i}
                  className={`whitespace-pre-wrap break-words ${color(l.kind)}`}
                >
                  {l.kind === "cmd" ? (
                    <>
                      <span className="text-accent">{PROMPT}</span>{" "}
                      <span className="text-ink">{l.text}</span>
                    </>
                  ) : (
                    l.text || " "
                  )}
                </p>
              ))}

              <form onSubmit={submit} className="mt-1 flex items-center gap-2">
                <label htmlFor="term-input" className="sr-only">
                  Terminal command input
                </label>
                <span className="shrink-0 text-accent">{PROMPT}</span>
                <input
                  id="term-input"
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKeyDown}
                  autoComplete="off"
                  spellCheck={false}
                  className="min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-ink-3"
                  placeholder="type a command…"
                />
                <span className="caret h-4 w-2 shrink-0 bg-accent" aria-hidden />
              </form>
            </div>

            <div className="flex flex-wrap gap-1.5 border-t border-line px-4 py-3">
              {COMMANDS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => runChip(c)}
                  className="rounded border border-line bg-surface-2 px-2 py-1 font-mono text-[11px] text-ink-3 transition-colors hover:border-accent/50 hover:text-accent"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* plain links — no terminal literacy required */}
        <Reveal delay={110}>
          <div className="card flex h-full flex-col p-6">
            <h3 className="text-base font-semibold text-ink">Direct</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">
              Fastest route is LinkedIn — I read everything there.
            </p>

            <div className="mt-6 flex flex-col gap-2">
              {!profile.emailIsPlaceholder ? (
                <a
                  href={`mailto:${profile.email}`}
                  className="group flex items-center justify-between gap-3 rounded-md border border-line bg-surface-2 px-4 py-3 text-sm text-ink-2 transition-colors hover:border-accent/50 hover:text-ink"
                >
                  <span className="flex items-center gap-2.5">
                    <Mail size={15} className="text-accent" aria-hidden />
                    Email
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-ink-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              ) : null}

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 rounded-md border border-line bg-surface-2 px-4 py-3 text-sm text-ink-2 transition-colors hover:border-accent/50 hover:text-ink"
              >
                <span className="flex items-center gap-2.5">
                  <LinkedinIcon size={15} className="text-accent" aria-hidden />
                  /in/{profile.linkedinHandle}
                </span>
                <ArrowUpRight
                  size={14}
                  className="text-ink-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 rounded-md border border-line bg-surface-2 px-4 py-3 text-sm text-ink-2 transition-colors hover:border-accent/50 hover:text-ink"
              >
                <span className="flex items-center gap-2.5">
                  <GithubIcon size={15} className="text-accent" aria-hidden />
                  @{profile.githubHandle}
                </span>
                <ArrowUpRight
                  size={14}
                  className="text-ink-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>

              <a
                href={profile.resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 rounded-md border border-line bg-surface-2 px-4 py-3 text-sm text-ink-2 transition-colors hover:border-accent/50 hover:text-ink"
              >
                <span className="flex items-center gap-2.5">
                  <FileText size={15} className="text-accent" aria-hidden />
                  Résumé (PDF)
                </span>
                <ArrowUpRight
                  size={14}
                  className="text-ink-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </div>

            <p className="mt-auto pt-6 font-mono text-[11px] leading-relaxed text-ink-3">
              Based in {profile.location}. Open to remote and hybrid.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}