import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Camera, ArrowUpRight } from 'lucide-react'
import { photography } from '../data/portfolio'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { staggerParent, staggerItem } from '../lib/animations'
import { Screenshot } from './ui/Screenshot'
import { PhotoLightbox } from './PhotoLightbox'

/**
 * Photography — the human counterweight to the engineering sections. A masonry
 * gallery (mixed portrait/square frames flow naturally) linking out to VSCO.
 */
export function Photography() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const photos = photography.photos
  const step = (delta: number) =>
    setOpenIndex((i) =>
      i === null ? i : (i + delta + photos.length) % photos.length,
    )

  return (
    <section id="photography" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <SectionHeading
          index="03"
          eyebrow="Beyond Data"
          title="Photography"
          description="Seeing stories beyond the numbers."
        />

        <Reveal className="-mt-4 mb-8 max-w-2xl text-muted md:text-lg">
          {photography.note}
        </Reveal>

        {/* Club stats + VSCO link */}
        <Reveal className="mb-8 flex flex-wrap items-center gap-3">
          {photography.stats.map((s) => (
            <span
              key={s.label}
              className="rounded-full border border-[var(--hairline)] bg-[var(--bg-raise)] px-4 py-1.5 font-mono text-xs text-muted"
            >
              {s.label}
              <span className="ml-2 text-accent">{s.value}</span>
            </span>
          ))}
          <a
            href={photography.vsco}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="open"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 font-mono text-xs font-medium text-ink-950 transition-shadow hover:shadow-[0_0_26px_-6px_rgba(45,226,197,0.6)]"
          >
            <Camera size={14} />
            {photography.vscoHandle}
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </Reveal>

        {/* Masonry gallery */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {photos.map((p, i) => (
            <motion.figure
              key={p.src}
              variants={staggerItem}
              className="group relative block aspect-[2/3] overflow-hidden rounded-xl border border-[var(--hairline)] bg-[var(--bg-raise)]"
            >
              <div className="h-full w-full [&_img]:transition-transform [&_img]:duration-[700ms] group-hover:[&_img]:scale-[1.06]">
                <Screenshot src={p.src} alt={p.alt} cover />
              </div>
              <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/20 bg-black/45 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/85 backdrop-blur-sm">
                {p.tag}
              </span>
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/75 to-transparent p-3 font-mono text-[10px] text-white/90 transition-transform duration-300 group-hover:translate-y-0">
                {p.alt}
              </figcaption>
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={`View photo: ${p.alt}`}
                data-cursor="view"
                className="absolute inset-0 z-10"
              />
            </motion.figure>
          ))}
        </motion.div>

        <Reveal className="mt-8">
          <a
            href={photography.vsco}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="open"
            className="inline-flex min-h-[44px] items-center gap-2 py-2 font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            See the full gallery on VSCO
            <ArrowUpRight size={15} />
          </a>
        </Reveal>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <PhotoLightbox
            photos={photos}
            index={openIndex}
            onClose={() => setOpenIndex(null)}
            onStep={step}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
