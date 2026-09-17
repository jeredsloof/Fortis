import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { exercises } from "./exercises";
import { exercisesByGroup, exercisesByMuscle, exercisesForMuscle } from "./muscleGroups";

// The GLB's metadata is the source of truth for group and key values, so the
// curated data is checked against the real asset rather than a copied list.
// If the model is ever swapped, these tests are what catch the drift.
function readModelMetadata() {
  const buffer = readFileSync("public/models/full-body-male-mobile.glb");
  const jsonLength = buffer.readUInt32LE(12);
  const gltf = JSON.parse(buffer.subarray(20, 20 + jsonLength).toString("utf8"));

  const entries: { key: string; group: string }[] = [];
  for (const container of [gltf.nodes ?? [], gltf.meshes ?? []]) {
    for (const item of container) {
      if (item.extras?.muscleId) {
        entries.push({ key: item.extras.key, group: item.extras.group });
      }
    }
  }
  return entries;
}

const model = readModelMetadata();
const modelGroups = new Set(model.map((entry) => entry.group));
const modelKeys = new Set(model.map((entry) => entry.key));

describe("model metadata", () => {
  it("contains tagged muscle regions", () => {
    expect(model.length).toBeGreaterThan(0);
  });
});

describe("exercise catalogue", () => {
  it("keys every entry by its own id", () => {
    for (const [id, exercise] of Object.entries(exercises)) {
      expect(exercise.id).toBe(id);
    }
  });

  it("gives every exercise a name, description and form cue", () => {
    for (const exercise of Object.values(exercises)) {
      expect(exercise.name.length, exercise.id).toBeGreaterThan(0);
      expect(exercise.description.length, exercise.id).toBeGreaterThan(0);
      expect(exercise.formNote.length, exercise.id).toBeGreaterThan(0);
    }
  });
});

describe("curation references", () => {
  // MusclePanel silently renders nothing for an unknown id, so a typo here
  // would otherwise disappear without any visible error.
  it("resolves every exercise id used by a training group", () => {
    for (const [group, ids] of Object.entries(exercisesByGroup)) {
      for (const id of ids) {
        expect(exercises[id], `${group} -> ${id}`).toBeDefined();
      }
    }
  });

  it("resolves every exercise id used by a specific muscle", () => {
    for (const [key, ids] of Object.entries(exercisesByMuscle)) {
      for (const id of ids) {
        expect(exercises[id], `${key} -> ${id}`).toBeDefined();
      }
    }
  });

  it("lists no duplicate exercise ids within one entry", () => {
    for (const [key, ids] of Object.entries({ ...exercisesByGroup, ...exercisesByMuscle })) {
      expect(new Set(ids).size, key).toBe(ids.length);
    }
  });
});

describe("model coverage", () => {
  it("covers every training group in the model", () => {
    for (const group of modelGroups) {
      expect(exercisesByGroup[group], group).toBeDefined();
    }
  });

  it("defines no training group the model does not use", () => {
    for (const group of Object.keys(exercisesByGroup)) {
      expect(modelGroups.has(group), group).toBe(true);
    }
  });

  it("defines no per-muscle entry for a key the model does not use", () => {
    for (const key of Object.keys(exercisesByMuscle)) {
      expect(modelKeys.has(key), key).toBe(true);
    }
  });

  it("returns at least one exercise for every muscle in the model", () => {
    for (const entry of model) {
      expect(exercisesForMuscle(entry.key, entry.group).length, entry.key).toBeGreaterThan(0);
    }
  });
});

describe("exercisesForMuscle", () => {
  it("prefers the per-muscle list when one exists", () => {
    expect(exercisesForMuscle("soleus", "Calves")).toEqual(exercisesByMuscle.soleus);
  });

  it("falls back to the training group when the muscle has no entry", () => {
    expect(exercisesForMuscle("not_a_real_muscle", "Calves")).toEqual(exercisesByGroup.Calves);
  });

  it("falls back to the group when no key is supplied", () => {
    expect(exercisesForMuscle(undefined, "Chest")).toEqual(exercisesByGroup.Chest);
  });

  it("returns an empty list for an unknown group", () => {
    expect(exercisesForMuscle(undefined, "Not A Group")).toEqual([]);
  });
});
