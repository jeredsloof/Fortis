# Anatomy model source

`public/models/full-body-male-mobile.glb` comes from
[slfresh/fitmitwith-anatomy-atlas](https://github.com/slfresh/fitmitwith-anatomy-atlas)
(CC BY-SA 4.0), itself adapted from [Z-Anatomy](https://github.com/Z-Anatomy/Models-of-human-anatomy)
/ BodyParts3D. See `LICENSE.txt` and `ATTRIBUTION.txt` in this folder for the required
credits — keep them intact if this model is redistributed or adapted further.

- 221 meshes: 218 individually selectable muscle regions + skeleton/connective tissue,
  ~129k triangles.
- Every muscle mesh carries glTF `extras` (`muscleId`, `key`, `label`, `side`, `region`,
  `group`, `layer`, `sourceName`, `assetLicense`), which three.js exposes as
  `mesh.userData`. The app reads this directly off the loaded model at runtime — it does
  **not** need `muscle-map.json` to run.
- `muscle-map.json` (copied here from the source repo's `maps/full-body-map.json`) is kept
  for reference/provenance and was used to look up the 25 training `group` values
  (Chest, Biceps, Quadriceps, etc.) when curating `src/data/muscleGroups.ts`.

## Regenerating the exercise mapping

`src/data/muscleGroups.ts` maps each model `group` value to a list of exercise ids from
`src/data/exercises.ts`. If the model is swapped for a different export with different
group names, that file needs to be updated to match.
