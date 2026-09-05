# Photography

Drop your photos here with these **exact names** (they're referenced in
`src/data/portfolio.ts` under `photography.photos`):

| File         | Photo                                              |
| ------------ | -------------------------------------------------- |
| `egret.jpg`  | The white egret perched in front of the fishing boats |
| `moon.jpg`   | The full moon                                        |
| `sails.jpg`  | The sailboat triptych on turquoise water             |

## Adding more photos
1. Drop the file in this folder, e.g. `sunset.jpg`
2. Add one line to `photography.photos` in `src/data/portfolio.ts`:

```ts
{ src: 'photography/sunset.jpg', alt: 'Describe the shot for screen readers' },
```

Tips:
- The gallery is masonry, so **mixed portrait / square / landscape all work** —
  no cropping needed.
- Export around 1200–1600px on the long edge and keep files under ~400 KB;
  they lazy-load, but smaller is faster.
- The `alt` text shows as the caption on hover, so write it like a caption.
