import { Reveal } from './Reveal'

type Props = {
  index: string
  eyebrow: string
  title: string
  description?: string
}

/** Consistent editorial section header: mono index + eyebrow, grotesk title. */
export function SectionHeading({ index, eyebrow, title, description }: Props) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-accent">{index}</span>
        <span className="eyebrow">{eyebrow}</span>
        <span className="h-px flex-1 bg-[var(--hairline)]" aria-hidden="true" />
      </div>
      <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-muted md:text-lg">{description}</p>
      )}
    </Reveal>
  )
}
