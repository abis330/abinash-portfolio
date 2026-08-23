import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  id: string;
  index: string;
  title: string;
  lead?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, index, title, lead, children, className = "" }: Props) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="mb-3 flex items-center gap-3">
            <span className="font-mono text-xs tracking-[0.2em] text-accent">{index}</span>
            <span className="h-px flex-1 bg-line" />
          </div>
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {title}
          </h2>
          {lead ? (
            <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-ink-2 sm:text-base">
              {lead}
            </p>
          ) : null}
        </Reveal>
        <div className="mt-10 sm:mt-12">{children}</div>
      </div>
    </section>
  );
}