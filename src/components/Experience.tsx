import { experience } from "@/content/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section
      id="experience"
      index="02 / EXPERIENCE"
      title="Eight years, shipped"
      lead="Telecom, banking, and retail — detection systems, NLP pipelines, and the governance work that keeps models in production once they get there."
    >
      <ol className="relative">
        {/* spine */}
        <span
          className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/40 via-line to-transparent"
          aria-hidden
        />

        {experience.map((role, i) => (
          <li key={`${role.company}-${role.start}`} className="relative pl-8 pb-10 last:pb-0 sm:pl-10">
            <span
              className={`absolute left-0 top-1.5 grid h-[15px] w-[15px] place-items-center rounded-full border-2 ${
                role.current
                  ? "border-accent bg-accent pulse-dot"
                  : "border-line bg-surface-2"
              }`}
              aria-hidden
            />

            <Reveal delay={Math.min(i * 60, 240)}>
              <article className="card p-5 sm:p-6">
                <header className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-ink sm:text-lg">
                      {role.title}
                    </h3>
                    <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-2">
                      <span>{role.company}</span>
                      {role.client ? (
                        <span className="rounded border border-accent/25 bg-accent/[0.07] px-1.5 py-0.5 font-mono text-[11px] text-accent">
                          client · {role.client}
                        </span>
                      ) : null}
                      <span className="text-ink-3">· {role.location}</span>
                    </p>
                  </div>
                  <p className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-ink-3">
                    {role.period}
                  </p>
                </header>

                <p className="mt-4 text-sm leading-relaxed text-ink-2">{role.summary}</p>

                <ul className="mt-4 space-y-3">
                  {role.highlights.map((h, hi) => (
                    <li key={hi} className="flex gap-3 text-sm leading-relaxed text-ink-2">
                      <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent/70" aria-hidden />
                      <span className="min-w-0">
                        {h.text}
                        {h.metric ? (
                          <span className="mt-1.5 block font-mono text-xs text-accent">
                            → {h.metric}
                          </span>
                        ) : null}
                      </span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {role.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded border border-line bg-surface-2 px-2 py-1 font-mono text-[11px] text-ink-3"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}