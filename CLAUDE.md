# Fortis

Fortis is a web-based, interactive 3D map of human muscular anatomy.

## Core concept

A 3D human body model renders in the browser. Users can:
- **Hover** over a muscle to highlight it and see its name on a floating tag.
- **Click** a muscle to open a small callout beside it, connected to the muscle by
  a leader line: name, Latin name, region/layer/side, and the exercise names.
- From the callout, open the **docked detail panel** for the full exercise list,
  each with a description and a form cue.
- **Search** for a muscle by name instead of hunting for it on the model.
- On touch devices, the first tap names a muscle and a second tap opens it,
  since there is no hover to carry the naming step.

## Stack

- **Frontend**: React + Vite (client-side SPA, no server-rendering needed for v1)
- **3D rendering**: react-three-fiber + drei (React bindings for Three.js)
- **3D model**: `public/models/full-body-male-mobile.glb`, from
  [slfresh/fitmitwith-anatomy-atlas](https://github.com/slfresh/fitmitwith-anatomy-atlas)
  (CC BY-SA 4.0, adapted from Z-Anatomy/BodyParts3D) — 221 meshes, 218 of them
  individually selectable muscle regions, ~129k triangles. See
  `docs/anatomy-model/README.md` for provenance/license details.
- **Language**: TypeScript
- **Tests**: Vitest (`npm test`) — currently data-integrity only, no component tests
- **Data layer**: none — muscle names/labels come directly from the model's mesh
  metadata at runtime (see below); exercise content is static data checked into the
  repo (`src/data/exercises.ts`, `src/data/muscleGroups.ts`). Revisit a real database
  only if the app grows to need user accounts, saved workouts, etc.

## Project structure

```
src/
  components/
    Scene.tsx        # <Canvas> setup: camera, lights, Bounds (auto-frames the
                       # model), OrbitControls (auto-rotate), mounts BodyModel.
                       # Lazy-loaded by App so three.js stays out of the entry chunk
    BodyModel.tsx      # loads the GLB via useGLTF, clones it + per-mesh materials,
                        # paints hover/select colors keyed off userData.muscleId,
                        # renders the hover name tag, publishes the muscle index
    MuscleCallout.tsx   # tier 1: anchored summary + SVG leader line to the muscle
    MusclePanel.tsx      # tier 2: docked detail panel, full exercise list
    MuscleSearch.tsx      # name/group filter over the muscle index, keyboard navigable
  data/
    exercises.ts         # exercise id -> name/description/formNote
    muscleGroups.ts        # exercisesByGroup (26 groups) + exercisesByMuscle (by `key`)
                            # + exercisesForMuscle() resolver, per-muscle first
    exerciseData.test.ts     # validates curation against the real GLB metadata
  types/
    anatomy.ts              # MuscleSelection type shared across components
  App.tsx                   # holds selection/rotation state, loading overlay,
                             # search + rotation controls, mounts Scene + MusclePanel
public/
  models/full-body-male-mobile.glb   # the anatomy model, fetched at runtime by useGLTF
docs/
  anatomy-model/            # model provenance: README, LICENSE, ATTRIBUTION,
                             # upstream Z-Anatomy license, and a copy of the source
                             # repo's muscle-map.json (reference only, not imported
                             # at runtime — used to curate muscleGroups.ts)
```

Every muscle mesh in the GLB carries glTF `extras` — `muscleId`, `key`, `label`,
`side`, `region`, `group`, `layer`, `sourceName`, `assetLicense` — which three.js
exposes as `mesh.userData`. `BodyModel.tsx` reads this directly off the loaded
model; there's no separate muscle-id-to-label lookup table to keep in sync.

Two of those fields drive exercise lookup: `key` is the side-independent muscle
slug (109 distinct values, e.g. `soleus`, `deltoid_anterior`) and `group` is the
training group (26 distinct values, e.g. "Chest", "Quadriceps").
`exercisesForMuscle(key, group)` prefers the per-muscle list and falls back to the
group list. Selection itself is **controlled**: `App` owns `selectedMuscle`, and
`BodyModel` paints whatever `selectedMuscleId` it is handed — which is what lets a
search result and a click on the model take the same path.

### Why details are split across two tiers

A single centred modal carried everything and therefore covered the body you had
just clicked. Selection details are now progressive: the callout is small enough
to sit beside a muscle without hiding it, and the detail panel docks as a flex
sibling of the viewport rather than overlaying it. Because the viewport *shrinks*
when the panel opens, `Bounds observe` refits and the body re-centres in the space
that's left — that's why the panel is a sibling rather than an absolutely
positioned overlay, and why no camera math is needed.

The callout's leader line needs the selected muscle's screen position, so
`BodyModel` projects its bounding-box centre every frame and reports it up
(skipping the update when it moves less than a pixel). `Scene` is wrapped in
`memo` so those updates re-render the callout and not the canvas.

## Visual design

- **One dark look, painted explicitly.** Tokens live in `src/index.css`. The ground
  is a desaturated teal (`--ground: #0e1a1c`) rather than a tinted near-black —
  operating theatres use teal drapes because it's the complement of blood red, and
  the same contrast is what makes the tissue read here.
- **Red is tissue, amber is interaction.** `--live: #f0a830` is the only interface
  accent; the muscle red lives solely in the 3D material and never appears as UI
  chrome. Hover paints amber, selection paints a paler gold.
- **Two typefaces with distinct jobs.** IBM Plex Sans is the instrument (controls,
  metadata); Newsreader is the text (muscle names, form cues). Latin
  anatomical names set in Newsreader *italic*, following the convention in medical
  writing — that's the only place italic is used.
- **Radius encodes role**: callouts and dropdowns are 4px with a border (specimen
  label tags), controls are pills, the docked panel is square on its docked edge.
- **One piece of motion**: the leader line draws over 200ms when a muscle is
  selected. Everything else is static, and reduced motion disables it.
- Avoid re-introducing uppercase labels, `A · B · C` meta strings, or a single
  radius on everything — those were removed deliberately.

## Current state

- Scaffolded with `create-vite react-ts`, then added `three`, `@react-three/fiber`,
  `@react-three/drei`, and `vitest`.
- Fully interactive: hover highlights the muscle under the cursor (amber) and names
  it, click selects it (gold) and opens the anchored callout, the callout opens the
  docked detail panel, clicking empty space deselects, and the model auto-rotates
  slowly with a pause/resume toggle (paused while a muscle is selected).
- Exercise coverage: all 109 distinct muscle keys have their own curated list, so
  every one of the 218 regions resolves to at least one exercise (both asserted in
  `exerciseData.test.ts`). The 26 group lists are now a fallback safety net, used
  only if a future model export introduces a key the curation hasn't caught up to.
- `.npmrc` sets `legacy-peer-deps=true` — `@react-three/fiber` lists `expo`/
  `react-native` as optional peers for its React Native renderer path, which
  otherwise causes an npm `ERESOLVE` conflict on install even though this project
  only uses the web (react-dom) path.

### Gotcha: pin React to `<19.3`

`@react-three/fiber@9.7.0` requires `react@">=19 <19.3"`. `package.json` pins
`react`/`react-dom` to the exact version `19.2.8` (not `^19.2.8`) — a caret range
lets npm resolve to `19.3.0`, which installs "successfully" (no error, `--legacy-peer-deps`
hides the conflict) but silently breaks `react-use-measure`, the hook R3F's `<Canvas>`
uses to size itself from its parent container. Symptom: the canvas element stays
stuck at the browser default 300×150 and the 3D view renders black, with **no console
error** — easy to mistake for a lighting/camera/model problem. If upgrading
react-three-fiber later, check its peer range before bumping React past it.

### Gotcha: keep drei out of the entry chunk

`App.tsx` lazy-loads `Scene`, which is what keeps three.js and drei in a separate
chunk (entry ~227 kB vs ~1.2 MB unsplit). Importing anything from
`@react-three/drei` or `three` directly in `App.tsx` — including a hook as small as
`useProgress` — pulls the whole 3D bundle back into the entry chunk and undoes it.
That's why the loading overlay is driven by `BodyModel`'s index callback rather than
drei's own progress hook, and why there is no percentage in the loading UI.

## Open questions / not yet decided

- Whether to add a female or alternate-view model (the source repo has an
  illustrative, anatomically-unverified female variant)
- Search selects a muscle but does not move the camera to it — if the match is on
  the far side of the body there's no visual feedback until you rotate
- Exercise content has breadth (every muscle) but not depth — one list per muscle,
  no images and no progressions — deliberately no sets/reps, since prescribing
  volume is programming advice this app doesn't have the context to give
- The GLB is 2.5 MB uncompressed; Draco or meshopt compression is the remaining
  load-time win now that the JS is split
- No component/interaction tests — only the data layer is covered
- Any future need for a backend (auth, saved workouts, progress tracking)

## Working notes

- Keep muscle interaction logic (hover highlight, click -> select) generic over the
  model's mesh metadata rather than hardcoding specific muscle ids — this is what let
  the placeholder-to-real-model swap stay localized to `BodyModel.tsx`. The curation
  data in `muscleGroups.ts` is the deliberate exception: it's content keyed by the
  model's own `key`/`group` values, and `exerciseData.test.ts` asserts it stays in sync.
- If the model is ever swapped for a different export, run `npm test` first — the
  coverage tests read the GLB directly and will name any group or key that drifted.
