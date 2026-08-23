import { skillGroups } from "@/content/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Stack() {
  return (
    <Section
      id="stack"
      index="04 / STACK"
      title="Tools I reach for"
      lead="Grouped by the job they do rather than by vendor. Everything here has run in production, not just in a notebook."
    >
      <div className="grid gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line sm:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Reveal key={group.label} delay={i * 80}>
            <div className="h-full bg-surface p-6">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                {group.label}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line bg-surface-2 px-2.5 py-1.5 text-[13px] text-ink-2 transition-colors hover:border-accent/40 hover:text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}