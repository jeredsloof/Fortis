// Animated demonstrations for the exercises that have one.
//
// MEDIA LICENCE — read before changing this file.
// The clips in public/exercises/ are © Gym visual (https://gymvisual.com/),
// obtained via github.com/hasaneyldrm/exercises-dataset. That repository's MIT
// licence covers its data and tooling but explicitly NOT this media, so the
// attribution below must stay rendered wherever a clip is shown.
//
// Swapping media source: change MEDIA_BASE and this map. Nothing else in the
// app reads the clip files directly.

export const MEDIA_ATTRIBUTION = "© Gym visual";
export const MEDIA_ATTRIBUTION_URL = "https://gymvisual.com/";
const MEDIA_BASE = "/exercises/";

/** Exercise id -> the movement the clip actually depicts, which is often a
 *  specific loaded variant of the more general exercise we name. */
export const clipSubjects: Record<string, string> = {
  "ab-wheel-rollout": "wheel rollerout",
  "back-extension": "lever back extension",
  "bench-press": "barbell bench press",
  "bent-over-row": "barbell bent over row",
  "bicep-curl": "barbell curl",
  "bulgarian-split-squat": "dumbbell single leg split squat",
  "cable-hip-adduction": "cable hip adduction",
  "calf-raise": "barbell standing calf raise",
  "chest-fly": "dumbbell fly",
  "chin-up": "chin-up",
  "close-grip-bench": "barbell close-grip bench press",
  "concentration-curl": "band concentration curl",
  "cossack-squat": "weighted cossack squats (male)",
  "crunch": "crunch (hands overhead)",
  "dead-bug": "dead bug",
  "deadlift": "barbell deadlift",
  "decline-press": "barbell decline bench press",
  "dip": "chest dip",
  "external-rotation": "cable standing shoulder external rotation",
  "farmers-carry": "farmers walk",
  "forearm-pronation": "dumbbell lying pronation",
  "forearm-supination": "dumbbell lying supination",
  "front-raise": "barbell front raise",
  "front-squat": "barbell front squat",
  "full-can-raise": "dumbbell full can lateral raise",
  "glute-bridge": "barbell glute bridge",
  "glute-ham-raise": "glute-ham raise",
  "good-morning": "barbell good morning",
  "hammer-curl": "dumbbell hammer curl",
  "hanging-knee-raise": "assisted hanging knee raise",
  "hanging-leg-raise": "hanging leg raise",
  "hip-abduction": "lever seated hip abduction",
  "incline-bench-press": "barbell incline bench press",
  "incline-curl": "dumbbell incline curl",
  "internal-rotation": "cable seated shoulder internal rotation",
  "lat-pulldown": "cable lat pulldown full range of motion",
  "lateral-raise": "dumbbell lateral raise",
  "leg-curl": "lever lying leg curl",
  "leg-extension": "lever leg extension",
  "leg-press": "sled 45° leg press (side pov)",
  "lunge": "barbell lunge",
  "overhead-press": "barbell seated overhead press",
  "overhead-tricep-extension": "cable high pulley overhead tricep extension",
  "pallof-press": "band horizontal pallof press",
  "plank": "weighted front plank",
  "preacher-curl": "barbell preacher curl",
  "pull-up": "pull-up",
  "push-up": "push-up",
  "push-up-plus": "push-up plus",
  "reverse-curl": "cable reverse curl",
  "reverse-fly": "band reverse fly",
  "reverse-wrist-curl": "barbell reverse wrist curl",
  "romanian-deadlift": "barbell romanian deadlift",
  "russian-twist": "russian twist",
  "seated-cable-row": "cable seated row",
  "seated-calf-raise": "barbell seated calf raise",
  "shrug": "barbell shrug",
  "side-bend": "45° side bend",
  "side-plank": "bodyweight incline side plank",
  "sissy-squat": "sissy squat",
  "skull-crusher": "barbell lying triceps extension skull crusher",
  "squat": "barbell full squat",
  "step-up": "dumbbell step-up",
  "straight-arm-pulldown": "cable straight arm pulldown",
  "sumo-squat": "barbell sumo deadlift",
  "tricep-pushdown": "cable pushdown",
  "upright-row": "cable upright row",
  "wrist-curl": "barbell wrist curl",
  "y-raise": "band y-raise",
};

export interface ExerciseClip {
  src: string;
  depicts: string;
}

export function clipFor(exerciseId: string): ExerciseClip | null {
  const depicts = clipSubjects[exerciseId];
  return depicts ? { src: `${MEDIA_BASE}${exerciseId}.gif`, depicts } : null;
}
