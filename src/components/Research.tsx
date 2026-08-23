import { FlaskConical } from "lucide-react";
import { research } from "@/content/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Research() {
  return (
    <Section
      id="research"
      index="03 / RESEARCH"
      title="Self-supervision, applied"
      lead="Two projects on the same idea from opposite ends: learning useful structure from sequences nobody has labeled — once for course topics, once for network intrusions."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {research.map((r, i) => (
          <Reveal key={r.title} delay={i * 110}>
            <article className="card flex h-full flex-col p-6">
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-accent/25 bg-accent/[0.07] text-accent">
                  <FlaskConical size={16} aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold leading-snug text-ink">{r.title}</h3>
                  {"subtitle" in r && r.subtitle ? (
                    <p className="mt-1 text-sm leading-snug text-ink-2">{r.subtitle}</p>
                  ) : null}
                </div>
              </div>

              <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-ink-3">
                {r.venue} · {r.period}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-ink-2">{r.body}</p>

              {r.results.length ? (
                <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line">
                  {r.results.map((res) => (
                    <div key={res.label} className="bg-surface-2 p-3.5">
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-3">
                        {res.label}
                      </dt>
                      <dd className="mt-1 text-xl font-semibold text-accent">+{res.value}</dd>
                      <p className="mt-1 text-[11px] leading-snug text-ink-3">{res.note}</p>
                    </div>
                  ))}
                </dl>
              ) : null}

              <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
                {r.tags.map((t) => (
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
        ))}
      </div>
    </Section>
  );
}