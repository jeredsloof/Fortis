# Fortis

Fortis is a web-based, interactive 3D map of human muscular anatomy.

## Core concept

A 3D human body model renders in the browser. Users can:
- **Hover** over a muscle to highlight it on the model.
- **Click** a muscle to open details about it (name, function, etc.).
- On that same click/detail view, see a **list of strength exercises** that train that muscle.

## Stack

- **Frontend**: React + Vite (client-side SPA, no server-rendering needed for v1)
- **3D rendering**: react-three-fiber + drei (React bindings for Three.js)
- **3D model**: `public/models/full-body-male-mobile.glb`, from
  [slfresh/fitmitwith-anatomy-atlas](https://github.com/slfresh/fitmitwith-anatomy-atlas)
  (CC BY-SA 4.0, adapted from Z-Anatomy/BodyParts3D) — 221 meshes, 218 of them
  individually selectable muscle regions, ~129k triangles. See
  `docs/anatomy-model/README.md` for provenance/license details.
- **Language**: TypeScript
- **Data layer**: none — muscle names/labels come directly from the model's mesh
  metadata at runtime (see below); exercise content is static data checked into the
  repo (`src/data/exercises.ts`, `src/data/muscleGroups.ts`). Revisit a real database
  only if the app grows to need user accounts, saved workouts, etc.

## Project structure

```
src/
  components/
    Scene.tsx        # <Canvas> setup: camera, lights, Bounds (auto-frames the
                       # model), OrbitControls, mounts BodyModel
    BodyModel.tsx      # loads the GLB via useGLTF, clones it + per-mesh materials,
                        # does imperative hover/select highlighting keyed off each
                        # mesh's userData.muscleId, calls onSelectMuscle on click
    MusclePanel.tsx     # side panel: selected muscle's label/group/side + exercise list
  data/
    exercises.ts         # exercise id -> name/description
    muscleGroups.ts        # model `group` value -> exercise ids (hand-curated)
  types/
    anatomy.ts              # MuscleSelection type shared across components
  App.tsx                   # layout: Scene + MusclePanel, holds selectedMuscle state
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
`MusclePanel.tsx` maps a muscle's `group` (e.g. "Chest", "Quadriceps" — 25 total)
to exercises via `muscleGroups.ts`.

## Current state

- Scaffolded with `create-vite react-ts`, then added `three`, `@react-three/fiber`,
  `@react-three/drei`.
- Real 3D model is wired up and confirmed rendering + interactive in-browser: hover
  highlights the muscle under the cursor (amber), click selects it (blue, persists
  until another muscle is clicked) and populates the side panel with its label and
  curated exercises.
- Exercise coverage: all 25 training groups in the model have at least one curated
  exercise in `muscleGroups.ts`, but this is a first pass, not exhaustive — expect to
  keep expanding it.
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

## Open questions / not yet decided

- Whether to add a female or alternate-view model (the source repo has an
  illustrative, anatomically-unverified female variant)
- Deeper exercise curation — currently one training-group -> exercise list is
  hand-picked and fairly shallow; could grow to multiple exercises per specific
  muscle rather than per group, with sets/reps/form notes, images, etc.
- Any future need for a backend (auth, saved workouts, progress tracking)
- Bundle size: the GLB (2.5MB) plus three.js pushes the JS bundle over Vite's 500kB
  chunk-size warning threshold — fine for now, but worth code-splitting
  (`React.lazy` around the Scene) if initial load time becomes a concern

## Working notes

- Keep muscle interaction logic (hover highlight, click -> select) generic over the
  model's mesh metadata rather than hardcoding specific muscle ids — this is what let
  the placeholder-to-real-model swap stay localized to `BodyModel.tsx`.
- If the model is ever swapped for a different export, re-check `muscleGroups.ts`
  against the new `group` values (see `docs/anatomy-model/README.md`).
