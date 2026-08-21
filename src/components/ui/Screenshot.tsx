import { useState } from 'react'
import { ImageOff } from 'lucide-react'

type Props = {
  /** File name inside /public/images/ */
  src: string
  alt: string
  /** true = crop-to-fill (card thumbnail); false = show full image (gallery) */
  cover?: boolean
}

/**
 * Lazy-loaded screenshot that degrades to a labelled placeholder if the file
 * isn't present yet — so the layout never breaks before images are dropped in.
 */
export function Screenshot({ src, alt, cover = false }: Props) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="flex min-h-[140px] w-full flex-1 items-center justify-center bg-[var(--bg)]">
        <div className="flex flex-col items-center gap-1.5 text-muted">
          <ImageOff size={20} aria-hidden="true" />
          <span className="font-mono text-[10px] uppercase tracking-wider">
            Preview
          </span>
        </div>
      </div>
    )
  }

  return (
    <img
      src={`/images/${src}`}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cover ? 'h-full w-full object-cover' : 'block h-auto w-full'}
    />
  )
}
