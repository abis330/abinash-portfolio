import { education } from "@/content/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Education() {
  return (
    <Section
      id="education"
      index="05 / EDUCATION"
      title="Where the theory came from"
      lead="A cybersecurity master's on top of a CS master's on top of an engineering degree — the security coursework is recent and deliberate."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {education.map((e, i) => (
          <Reveal key={e.school} delay={i * 90}>
            <article className="card flex h-full flex-col p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded border border-line bg-surface-2 px-2 py-1 font-mono text-[11px] font-semibold tracking-wider text-accent">
                  {e.abbr}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-ink-3">
                  {e.period}
                </span>
              </div>

              <h3 className="mt-4 text-base font-semibold leading-snug text-ink">{e.school}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{e.degree}</p>

              {e.detail ? (
                <p className="mt-3 font-mono text-xs text-accent">{e.detail}</p>
              ) : null}
              {e.note ? (
                <p className="mt-auto pt-4 text-xs leading-relaxed text-ink-3">{e.note}</p>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
