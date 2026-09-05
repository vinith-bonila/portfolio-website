/**
 * Brand mark: a "V" drawn as a connected data-node graph — two glowing nodes
 * up top, a ring node at the vertex, on a charcoal tile. Matches favicon.svg.
 */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Vinith Bonila logo"
    >
      <rect width="64" height="64" rx="15" fill="#0B0D0E" />
      <rect
        x="0.75"
        y="0.75"
        width="62.5"
        height="62.5"
        rx="14.25"
        fill="none"
        stroke="#2DE2C5"
        strokeOpacity="0.3"
        strokeWidth="1.5"
      />
      <path
        d="M20 21 L32 43 L44 21"
        fill="none"
        stroke="#2DE2C5"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="21" r="4.5" fill="#2DE2C5" />
      <circle cx="44" cy="21" r="4.5" fill="#2DE2C5" />
      <circle
        cx="32"
        cy="43"
        r="4.5"
        fill="#0B0D0E"
        stroke="#2DE2C5"
        strokeWidth="3"
      />
    </svg>
  )
}
