import { ArrowUpRight, Terminal as TerminalIcon } from "lucide-react";
import { metrics, profile } from "@/content/profile";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { Reveal } from "./Reveal";
import { TelemetryStream } from "./TelemetryStream";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-field" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] accent-bloom" aria-hidden />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.07] px-3 py-1.5 font-mono text-[11px] tracking-wide text-accent">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            {profile.availability}
          </span>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-ink-3">
            {profile.currentTitle} · {profile.location}
          </p>
          <h1 className="mt-3 text-balance text-5xl font-semibold tracking-tight text-ink sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 max-w-3xl text-balance text-2xl font-medium leading-tight tracking-tight text-ink-2 sm:text-3xl">
            Anomaly detection at{" "}
            <span className="text-accent" style={{ textShadow: "var(--glow)" }}>
              petabyte scale
            </span>
            .
          </p>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-ink-2">
            {profile.intro}
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#terminal"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-canvas transition-all hover:bg-accent-bright hover:shadow-[var(--glow-strong)]"
            >
              <TerminalIcon size={15} aria-hidden />
              Get in touch
            </a>
            <a
              href={profile.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-4 py-2.5 text-sm text-ink transition-colors hover:border-accent/50"
            >
              Résumé
              <ArrowUpRight size={15} aria-hidden />
            </a>
            <div className="flex items-center gap-1">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="grid h-10 w-10 place-items-center rounded-md border border-line bg-surface text-ink-2 transition-colors hover:border-accent/50 hover:text-accent"
              >
                <GithubIcon size={16} aria-hidden />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="grid h-10 w-10 place-items-center rounded-md border border-line bg-surface text-ink-2 transition-colors hover:border-accent/50 hover:text-accent"
              >
                <LinkedinIcon size={16} aria-hidden />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={320} className="mt-16">
          <TelemetryStream />
        </Reveal>

        {/* headline figures */}
        <Reveal delay={120} className="mt-16 sm:mt-20">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line lg:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.label} className="bg-surface p-5 sm:p-6">
                <dd className="flex items-baseline gap-0.5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  {m.value}
                  <span className="text-lg text-accent sm:text-xl">{m.unit}</span>
                </dd>
                <dt className="mt-2 text-sm font-medium text-ink">{m.label}</dt>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-3">{m.detail}</p>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}