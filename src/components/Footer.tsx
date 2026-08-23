import { ArrowUp } from "lucide-react";
import { profile } from "@/content/profile";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-mono text-sm text-ink-2">{profile.name}</p>
          <p className="mt-1 text-xs text-ink-3">
            {profile.currentTitle} · {profile.location} · {profile.availability}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="grid h-9 w-9 place-items-center rounded-md border border-line bg-surface text-ink-2 transition-colors hover:border-accent/50 hover:text-accent"
          >
            <GithubIcon size={15} aria-hidden />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="grid h-9 w-9 place-items-center rounded-md border border-line bg-surface text-ink-2 transition-colors hover:border-accent/50 hover:text-accent"
          >
            <LinkedinIcon size={15} aria-hidden />
          </a>
          <a
            href="#top"
            aria-label="Back to top"
            className="grid h-9 w-9 place-items-center rounded-md border border-line bg-surface text-ink-2 transition-colors hover:border-accent/50 hover:text-accent"
          >
            <ArrowUp size={15} aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}