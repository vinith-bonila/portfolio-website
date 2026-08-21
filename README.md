# Vinith Bonila — Portfolio

A single-page, animated portfolio built with **React + Vite + TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Lucide** icons. Dark-mode-first, fully responsive, deploy-ready with no backend.

Technical / editorial aesthetic — charcoal base (`#0B0D0E`), a single electric-teal accent, a grotesk for headings and a monospace for labels & metrics, over a subtle grid + noise texture.

---

## Features

- **Single-page scroll** with a sticky top nav (Home · Projects · Skills · Experience · Contact) and active-section highlighting (scroll-spy via `IntersectionObserver`).
- **Dark mode by default** with a light/dark toggle persisted to `localStorage`.
- **Animations** (all ≤ 500ms, and disabled under `prefers-reduced-motion`):
  - Fade-and-rise on scroll with staggered children
  - Typewriter effect on the hero, rotating through the three roles
  - Magnetic hover on primary buttons
  - Animated underline on nav links
  - Count-up on project metrics
  - Timeline line that draws in as you scroll
- **Projects** open an accessible modal (scale + fade, backdrop blur, **Esc to close**, focus trap, focus restore).
- **Accessibility**: semantic HTML, alt/aria labels, keyboard-navigable modal, skip link, visible focus rings.
- **Performance**: below-the-fold sections are lazy-loaded (code-split); no layout shift.

---

## Edit your content

**All copy lives in one file — [`src/data/portfolio.ts`](src/data/portfolio.ts).**
Change text, links, projects, skills, timeline entries, and certifications there. You never need to touch a component to update wording.

- Swap the VINI AI live URL by replacing `'[LIVE_URL_PLACEHOLDER]'` and setting `livePlaceholder: false` on that project.
- Replace the resume by dropping a new `public/resume.pdf`.

### Change the accent color

The single accent is defined in [`tailwind.config.js`](tailwind.config.js) under `colors.accent`, with a couple of raw `rgba` mirrors in [`src/index.css`](src/index.css) (selection color, glow, hover shadows). Update those to re-skin the whole site (e.g. to amber).

---

## Local development

Requires **Node 18+**.

```bash
npm install
npm run dev
```

Then open the printed URL (default `http://localhost:5173`).

Other scripts:

```bash
npm run build     # type-check + production build to dist/
npm run preview   # serve the production build locally
```

---

## Deploy to Vercel

This is a static Vite build — no server, no environment variables.

**Option A — Dashboard**
1. Push this folder to a Git repo (GitHub/GitLab/Bitbucket).
2. In Vercel, **New Project → Import** the repo.
3. Vercel auto-detects Vite. Confirm:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. **Deploy.** A [`vercel.json`](vercel.json) is included so these settings are picked up automatically.

**Option B — CLI**

```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # production deploy
```

The site also deploys as-is to Netlify, Cloudflare Pages, or GitHub Pages (build command `npm run build`, publish directory `dist`).

### After deploying: set your domain

A few files use `https://your-domain.com` as a placeholder. Once you know your real domain (e.g. `https://vinithbonila.com`), do a find-and-replace across:

- [`index.html`](index.html) — the `og:image` / `twitter:image` paths and the JSON-LD `url` / `image` (LinkedIn and Twitter/X require **absolute** URLs; Slack/Discord/Telegram work with the relative paths already)
- [`public/robots.txt`](public/robots.txt) — the `Sitemap:` line
- [`public/sitemap.xml`](public/sitemap.xml) — the `<loc>` URL

The site includes Schema.org `Person` structured data (helps Google / recruiter tools), a `robots.txt`, and a `sitemap.xml` out of the box.

### Project screenshots

Card covers and modal galleries read image files from `public/images/`. See [`public/images/README.md`](public/images/README.md) for the exact file names to drop in. Missing files show a "Preview" placeholder — nothing breaks.

---

## Project structure

```
public/
  favicon.svg
  og-image.png              # social share / link-preview card
  resume.pdf                # served at /resume.pdf
src/
  data/portfolio.ts         # ← ALL content lives here
  hooks/
    useTheme.ts             # dark/light toggle + persistence
    useActiveSection.ts     # scroll-spy for nav highlighting
    useReducedMotion.ts     # prefers-reduced-motion tracking
  components/
    Nav.tsx
    Hero.tsx
    Projects.tsx
    ProjectModal.tsx
    Skills.tsx
    Experience.tsx
    Contact.tsx
    ui/                     # Reveal, CountUp, Typewriter, MagneticButton, SectionHeading
  App.tsx
  main.tsx
  index.css                 # theme tokens + texture background
```

> The previous static HTML site was moved to `_old/` (git-ignored) and is not part of the build.
