import { Activity, Bot, Search, ShieldCheck, type LucideIcon } from "lucide-react";
import { pillars } from "@/content/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const icons: Record<string, LucideIcon> = {
  activity: Activity,
  bot: Bot,
  shield: ShieldCheck,
  search: Search,
};

export function Focus() {
  return (
    <Section
      id="focus"
      index="01 / FOCUS"
      title="What I build"
      lead="Four capability areas, each one shipped in production rather than prototyped. The through-line is data that is streaming, unlabeled, and too large to fit anywhere convenient."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {pillars.map((p, i) => {
          const Icon = icons[p.icon] ?? Activity;
          return (
            <Reveal key={p.id} delay={i * 90}>
              <article className="card group h-full p-6">
                <div className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-accent/25 bg-accent/[0.07] text-accent transition-colors group-hover:border-accent/50">
                    <Icon size={18} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold leading-snug text-ink">
                      {p.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-2">{p.body}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
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
          );
        })}
      </div>
    </Section>
  );
}