"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import type { Project } from "@/content/projects";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const ALL = "All";

/** Filterable portfolio grid. Filters are reflected in the URL so views are shareable. */
export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const developments = [ALL, ...new Set(projects.map((p) => p.development))];
  const configurations = [ALL, ...new Set(projects.map((p) => p.configuration))];
  const development = developments.includes(params.get("development") ?? "") ? params.get("development")! : ALL;
  const configuration = configurations.includes(params.get("type") ?? "") ? params.get("type")! : ALL;

  const set = (key: "development" | "type", value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value === ALL) next.delete(key);
    else next.set(key, value);
    const qs = next.toString();
    router.replace(qs ? `/projects?${qs}` : "/projects", { scroll: false });
  };

  const results = projects.filter(
    (p) => (development === ALL || p.development === development) && (configuration === ALL || p.configuration === configuration),
  );

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="flex flex-col gap-6 border-b border-line pb-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-5 sm:flex-row sm:gap-10">
          <FilterGroup label="Community" options={developments} value={development} onChange={(v) => set("development", v)} />
          <FilterGroup label="Configuration" options={configurations} value={configuration} onChange={(v) => set("type", v)} />
        </div>
        <p className="text-sm text-muted" aria-live="polite">
          Showing {results.length} of {projects.length} homes
        </p>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={`${development}-${configuration}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12"
        >
          {results.length ? (
            <ProjectGrid projects={results} />
          ) : (
            <EmptyState
              title="No homes match these filters"
              body="Try another community or configuration — or clear the filters to see the full portfolio."
              action={
                <Button variant="secondary" onClick={() => router.replace("/projects", { scroll: false })}>
                  Clear filters
                </Button>
              }
            />
          )}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <li key={p.id}>
          <ProjectCard project={p} headingLevel="h2" />
        </li>
      ))}
    </ul>
  );
}

function FilterGroup({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset className="flex flex-wrap items-center gap-2">
      <legend className="eyebrow mb-3 w-full text-muted sm:mb-0 sm:mr-2 sm:w-auto sm:float-left">{label}</legend>
      {options.map((o) => {
        const active = o === value;
        return (
          <button
            key={o}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o)}
            className={cn(
              "h-10 rounded-full border px-4 text-sm transition-colors duration-300",
              active ? "border-ink bg-ink text-ivory" : "border-line-strong text-ink-soft hover:border-ink hover:text-ink",
            )}
          >
            {o}
          </button>
        );
      })}
    </fieldset>
  );
}
