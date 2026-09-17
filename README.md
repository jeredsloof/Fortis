# Fortis

An interactive 3D map of human muscular anatomy, in the browser. Hover a muscle to
name it, click it to see the exercises that train it.

## What it does

- **Explore** a full anatomical model — 218 individually selectable muscle regions.
- **Hover** any muscle to highlight it and read its name on a floating tag.
- **Click** to open its details: name, training group, side, and a curated list of
  strength exercises, each with a form cue.
- **Search** by muscle or group name when you would rather not hunt for it.
- **Auto-rotate** the model, with a toggle to pause it and full orbit/zoom/pan
  controls via mouse or touch.

Exercise lists are curated per muscle where the distinction matters — a wrist curl
is offered for the forearm flexors, a reverse wrist curl for the extensors, and
forearm pronation for the pronators, rather than one list shared across all 24
forearm muscles. All 109 distinct muscles have their own list; the broader
per-training-group lists remain as a fallback.

## Running it

Requires Node 20+.

```bash
npm install
npm run dev
```

| Script | Does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm test` | Run the data-integrity test suite |
| `npm run lint` | Run oxlint |
| `npm run preview` | Serve the production build locally |

## How it is built

React + TypeScript on Vite, with [react-three-fiber](https://github.com/pmndrs/react-three-fiber)
and [drei](https://github.com/pmndrs/drei) rendering the model through Three.js.

There is no backend and no database. Muscle names, groups and sides are read
straight off the model's glTF `extras` at runtime, so there is no id-to-label table
to keep in sync with the asset. Exercise content is static data in `src/data/`, keyed
by the same values the model carries; `src/data/exerciseData.test.ts` parses the GLB
directly and fails if the curation and the model ever drift apart.

The 3D scene is lazy-loaded, keeping Three.js and drei out of the entry chunk so the
page can paint before the model arrives.

## Exercise animations

Animated demonstrations are shown for 69 of the 101 exercises, in
`public/exercises/`. The clips are **© [Gym visual](https://gymvisual.com/)**,
obtained via [hasaneyldrm/exercises-dataset](https://github.com/hasaneyldrm/exercises-dataset).

That repository's MIT licence covers its data and tooling but **explicitly not
this media** — its use is governed by
[Gym visual's terms](https://gymvisual.com/content/3-terms-and-conditions-of-use),
and cloning does not grant a licence to it. If you fork or deploy this project,
obtain your own licence from Gym visual or replace the clips: the media source is
isolated to `src/data/exerciseMedia.ts`, and nothing else reads those files.

## The anatomy model

`public/models/full-body-male-mobile.glb` comes from
[slfresh/fitmitwith-anatomy-atlas](https://github.com/slfresh/fitmitwith-anatomy-atlas),
adapted from [Z-Anatomy](https://www.z-anatomy.com/) / BodyParts3D and licensed
**CC BY-SA 4.0**. Full provenance, attribution and license texts are in
[`docs/anatomy-model/`](docs/anatomy-model/) — if you reuse the model, those terms
come with it.

## Note

Fortis is an anatomy reference and training aid, not medical advice. The exercise
suggestions describe which muscles a movement loads; they are not a prescription,
and nothing here accounts for your injury history or individual circumstances.
