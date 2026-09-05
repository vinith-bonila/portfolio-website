import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as const

type Photo = { src: string; alt: string }

/**
 * Full-size photo viewer. Esc closes, ← / → step through the gallery, the
 * backdrop is click-to-close, focus is trapped, and Lenis is told to keep its
 * hands off so the page behind never scrolls.
 */
export function PhotoLightbox({
  photos,
  index,
  onClose,
  onStep,
}: {
  photos: Photo[]
  index: number
  onClose: () => void
  onStep: (delta: number) => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const photo = photos[index]

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      previous?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
      } else if (e.key === 'ArrowRight') {
        onStep(1)
      } else if (e.key === 'ArrowLeft') {
        onStep(-1)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, onStep])

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center p-4 sm:p-8"
      data-lenis-prevent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${photos.length}`}
    >
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Close */}
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close photo"
        data-cursor="open"
        className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-accent hover:text-accent sm:right-8 sm:top-8"
      >
        <X size={18} />
      </button>

      {/* Prev / next */}
      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => onStep(-1)}
            aria-label="Previous photo"
            data-cursor="open"
            className="absolute left-2 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-accent hover:text-accent sm:left-6"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => onStep(1)}
            aria-label="Next photo"
            data-cursor="open"
            className="absolute right-2 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-accent hover:text-accent sm:right-6"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      <motion.figure
        key={photo.src}
        className="relative z-10 flex max-h-full flex-col items-center gap-4"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.28, ease: EASE }}
      >
        <img
          src={`/images/${photo.src}`}
          alt={photo.alt}
          className="max-h-[76vh] max-w-full rounded-lg object-contain shadow-2xl"
        />
        <figcaption className="max-w-2xl text-center font-mono text-xs text-white/70">
          {photo.alt}
          <span className="ml-3 text-accent">
            {index + 1} / {photos.length}
          </span>
        </figcaption>
      </motion.figure>
    </motion.div>
  )
}
