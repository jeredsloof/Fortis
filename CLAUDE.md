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
- **3D model**: a licensed/purchased anatomy model (e.g. Sketchfab, TurboSquid, or a medical asset store), with individual muscles as separately named meshes so they can be targeted for hover/click highlighting and raycasting
- **Language**: TypeScript
- **Data layer**: none yet — muscle metadata and exercise lists are static data files checked into the repo (`src/data/muscles.ts`, `src/data/exercises.ts`); revisit a real database only if the app grows to need user accounts, saved workouts, etc.

## Project structure

```
src/
  components/
    Scene.tsx        # <Canvas> setup: camera, lights, OrbitControls, mounts BodyModel
    BodyModel.tsx     # the 3D body — currently placeholder boxes per muscle, to be
                       # replaced by the licensed model (GLTF/GLB loaded via drei's useGLTF)
    MusclePanel.tsx    # side panel showing selected muscle's details + exercise list
  data/
    muscles.ts         # muscle id -> name/description/exerciseIds
    exercises.ts        # exercise id -> name/description
  App.tsx               # layout: Scene + MusclePanel, holds selectedMuscleId state
```

Muscle `id`s in `src/data/muscles.ts` are meant to match mesh/node names on the 3D
model, so a raycast hit's mesh name can be used directly as the lookup key.

## Current state

- Scaffolded with `create-vite react-ts`, then added `three`, `@react-three/fiber`,
  `@react-three/drei`.
- **Placeholder body**: `BodyModel.tsx` renders a box torso plus three labeled boxes
  (`chest`, `bicep`, `quad`) that hover-highlight and are clickable, wired end-to-end
  to `MusclePanel.tsx`. This proves out the full interaction loop before the real
  3D model exists — swap the placeholder meshes for the licensed model's named
  meshes without changing the hover/click/panel logic.
- `.npmrc` sets `legacy-peer-deps=true` — `@react-three/fiber` lists `expo`/
  `react-native` as optional peers for its React Native renderer path, which
  otherwise causes an npm `ERESOLVE` conflict on install even though this project
  only uses the web (react-dom) path.

## Open questions / not yet decided

- Exact source/license for the 3D anatomy model, and its file format (likely
  GLTF/GLB) and mesh-naming convention
- Full shape of the muscle-detail and exercise data (e.g. images, muscle group
  categorization, many-to-many exercise mapping)
- Whether front/back/rotatable full-body view, or per-region models
- Any future need for a backend (auth, saved workouts, progress tracking)

## Working notes

- Prioritize replacing the placeholder body with the real model next: load it via
  `useGLTF`, iterate its meshes, and reuse the existing hover/click handlers keyed
  by mesh name.
- Keep muscle interaction logic (hover highlight, click -> select) decoupled from
  the geometry itself, so swapping placeholder boxes for the real model stays a
  localized change in `BodyModel.tsx`.
