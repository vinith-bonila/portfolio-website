# Project screenshots

Drop your screenshot files here with **exactly these names**. The site wires
them into the project cards (first image = cover thumbnail) and the modal
gallery (all images). Until a file exists, that slot shows a "Preview"
placeholder — nothing breaks.

| File name             | Project            | What to use                                            |
| --------------------- | ------------------ | ------------------------------------------------------ |
| `docmind.png`         | DocMind            | The DocMind app screenshot (chat UI)                   |
| `autobi-dashboard.png`| AutoBI             | The generated **dashboard** screenshot (cover)         |
| `autobi-landing.png`  | AutoBI             | The AutoBI **landing / upload** page                   |
| `autobi-analysis.png` | AutoBI             | The "Analysing your dataset…" **progress** screen      |
| `vini.png`            | VINI AI            | The VINI AI app screenshot (voice assistant UI)        |
| `namma-yatri-1.png`   | Namma Yatri        | The Power BI **Trip Dashboard** (cover)                |
| `namma-yatri-2.png`   | Namma Yatri        | The Namma Yatri banner / branding image                |
| `zomato-1.png`        | Zomato             | Power BI **sales overview** dashboard (cover)          |
| `zomato-2.png`        | Zomato             | Power BI **user performance** dashboard                |
| `zomato-3.png`        | Zomato             | Power BI **city performance** dashboard                |

Tips:
- `.png` or `.jpg` both work — just keep the name (extension included) matching
  what's referenced in `src/data/portfolio.ts` under each project's `images`.
- Landscape screenshots look best. Card covers crop to 16:10; the modal gallery
  shows the full image uncropped.
- Keep each file under ~500 KB if you can (they lazy-load, but smaller = faster).
