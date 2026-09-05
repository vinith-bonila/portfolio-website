import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { projects, type Project } from '../data/portfolio'
import { SectionHeading } from './ui/SectionHeading'
import { staggerParent, staggerItem } from './ui/Reveal'
import { Screenshot } from './ui/Screenshot'
import { ProjectModal } from './ProjectModal'

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      Live
    </span>
  )
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen: () => void
}) {
  const hasRealLive = project.live && !project.livePlaceholder
  return (
    <motion.article
      variants={staggerItem}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--bg-raise)] p-6 transition-colors hover:border-accent/50"
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-accent/[0.06] to-transparent" />
      </div>

      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open details for ${project.title}`}
        data-cursor="view"
        className="absolute inset-0 z-10"
      />

      {/* Cover screenshot */}
      {project.images && project.images.length > 0 && (
        <div className="relative mb-5 flex aspect-[16/10] overflow-hidden rounded-lg border border-[var(--hairline)]">
          <Screenshot
            src={project.images[0]}
            alt={`${project.title} — screenshot`}
            cover
          />
        </div>
      )}

      <div className="relative flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-muted">{project.year}</span>
        {hasRealLive && <LiveBadge />}
      </div>

      <h3 className="relative mt-4 text-xl font-semibold tracking-tight">
        {project.title}
      </h3>
      <p className="relative mt-1 font-mono text-sm text-accent">
        {project.subtitle}
      </p>
      <p className="relative mt-3 text-sm text-muted">{project.summary}</p>

      {/* Key metrics — scannable at a glance */}
      {project.highlights && project.highlights.length > 0 && (
        <div className="relative mt-4 flex flex-1 flex-wrap items-start gap-2">
          {project.highlights.map((h) => (
            <span
              key={h}
              className="rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[11px] font-medium text-accent"
            >
              {h}
            </span>
          ))}
        </div>
      )}

      {/* Stack pills (truncated) */}
      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((s) => (
          <span
            key={s}
            className="rounded-md border border-[var(--hairline)] bg-[var(--bg)] px-2 py-0.5 font-mono text-[11px] text-muted"
          >
            {s}
          </span>
        ))}
        {project.stack.length > 4 && (
          <span className="rounded-md px-2 py-0.5 font-mono text-[11px] text-muted">
            +{project.stack.length - 4}
          </span>
        )}
      </div>

      <div className="relative mt-6 flex items-center justify-between border-t border-[var(--hairline)] pt-4">
        <span className="font-mono text-xs text-muted transition-colors group-hover:text-accent">
          View details
        </span>
        <span className="flex items-center gap-2">
          {hasRealLive && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer noopener"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Open ${project.title} live demo in a new tab`}
              className="relative z-20 grid h-7 w-7 place-items-center rounded-full border border-[var(--hairline)] text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <ExternalLink size={13} />
            </a>
          )}
          <ArrowUpRight
            size={18}
            className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </span>
      </div>
    </motion.article>
  )
}

export function Projects() {
  const [openId, setOpenId] = useState<string | null>(null)
  const openProject = projects.find((p) => p.id === openId) ?? null

  return (
    <section id="projects" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <SectionHeading
          index="01"
          eyebrow="Selected Work"
          title="Projects that ship — from retrieval pipelines to reservoirs."
          description="Two live LLM systems and analytics/simulation work. Click any card for the full breakdown and metrics."
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-5 sm:grid-cols-2"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={() => setOpenId(project.id)}
            />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {openProject && (
          <ProjectModal
            project={openProject}
            onClose={() => setOpenId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
