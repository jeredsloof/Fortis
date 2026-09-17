// Exercise curation has two layers, both keyed off values the anatomy model
// already carries in its mesh metadata (see docs/anatomy-model/README.md):
//
//   exercisesByMuscle — keyed by `key`, the model's side-independent muscle slug
//   exercisesByGroup  — keyed by `group`, the 26 training groups, used as fallback
//
// The per-muscle layer exists because group-level lists are often misleading:
// 24 distinct forearm muscles share one group, and a wrist curl does nothing
// for the extensors or the pronators.

export const exercisesByGroup: Record<string, string[]> = {
  Abdominals: ["crunch", "plank", "hanging-leg-raise"],
  Adductors: ["cable-hip-adduction", "sumo-squat", "copenhagen-plank"],
  Biceps: ["bicep-curl", "chin-up"],
  Calves: ["calf-raise", "seated-calf-raise"],
  Chest: ["bench-press", "push-up", "chest-fly"],
  Deltoids: ["overhead-press", "lateral-raise"],
  Forearms: ["wrist-curl", "reverse-wrist-curl", "farmers-carry"],
  Glutes: ["hip-thrust", "glute-bridge"],
  Hamstrings: ["romanian-deadlift", "leg-curl"],
  "Hip flexors": ["hanging-knee-raise", "standing-knee-raise"],
  "Hip rotators": ["clamshell", "seated-hip-external-rotation"],
  Lats: ["pull-up", "lat-pulldown", "straight-arm-pulldown"],
  "Lower back": ["side-bend", "suitcase-carry", "back-extension"],
  "Lower legs": ["tibialis-raise", "ankle-eversion"],
  Neck: ["neck-curl", "neck-extension", "neck-lateral-flexion"],
  Obliques: ["russian-twist", "side-plank", "cable-woodchop"],
  Quadriceps: ["squat", "leg-extension", "lunge"],
  "Rotator cuff": ["external-rotation", "internal-rotation"],
  Sartorius: ["cossack-squat", "standing-knee-raise"],
  Serratus: ["push-up-plus", "landmine-press"],
  "Spinal extensors": ["back-extension", "deadlift", "superman"],
  "Teres major": ["pull-up", "straight-arm-pulldown"],
  Trapezius: ["shrug", "face-pull", "y-raise"],
  Triceps: ["tricep-pushdown", "overhead-tricep-extension", "dip"],
  "Upper arms": ["hammer-curl", "reverse-curl"],
  "Upper back": ["bent-over-row", "seated-cable-row", "face-pull"],
};

export const exercisesByMuscle: Record<string, string[]> = {
  // Abdominals
  rectus_abdominis: ["crunch", "hanging-leg-raise", "ab-wheel-rollout"],
  transversus_abdominis: ["plank", "dead-bug", "stomach-vacuum", "pallof-press"],

  // Obliques
  external_oblique: ["russian-twist", "cable-woodchop", "side-plank"],
  internal_oblique: ["cable-woodchop", "pallof-press", "side-plank"],

  // Chest
  pectoralis_major_clavicular: ["incline-bench-press", "landmine-press", "front-raise"],
  pectoralis_major_sternocostal: ["bench-press", "push-up", "chest-fly"],
  pectoralis_major_abdominal: ["decline-press", "dip"],
  pectoralis_minor: ["push-up-plus", "dip", "scapular-wall-slide"],
  serratus_anterior: ["push-up-plus", "landmine-press", "scapular-wall-slide"],

  // Deltoids and rotator cuff
  deltoid_anterior: ["overhead-press", "front-raise", "incline-bench-press"],
  deltoid_lateral: ["lateral-raise", "overhead-press", "upright-row"],
  deltoid_posterior: ["reverse-fly", "face-pull", "chest-supported-row"],
  supraspinatus: ["full-can-raise", "lateral-raise"],
  infraspinatus: ["external-rotation", "face-pull"],
  teres_minor: ["external-rotation", "face-pull"],
  subscapularis: ["internal-rotation"],

  // Back
  latissimus_dorsi: ["pull-up", "lat-pulldown", "straight-arm-pulldown"],
  teres_major: ["pull-up", "straight-arm-pulldown", "lat-pulldown"],
  rhomboid_major: ["chest-supported-row", "seated-cable-row", "face-pull"],
  rhomboid_minor: ["chest-supported-row", "seated-cable-row", "face-pull"],
  levator_scapulae: ["shrug", "upright-row", "neck-lateral-flexion"],
  serratus_posterior_superior: ["bent-over-row", "bird-dog"],
  serratus_posterior_inferior: ["back-extension", "bird-dog"],
  trapezius_upper: ["shrug", "upright-row", "farmers-carry"],
  trapezius_middle: ["face-pull", "chest-supported-row", "seated-cable-row"],
  trapezius_lower: ["y-raise", "face-pull", "scapular-wall-slide"],

  // Spinal extensors and lower back
  iliocostalis_lumborum: ["back-extension", "deadlift", "good-morning"],
  iliocostalis_thoracis: ["back-extension", "deadlift", "good-morning"],
  longissimus_thoracis: ["back-extension", "deadlift", "good-morning"],
  spinalis_thoracis: ["back-extension", "superman", "good-morning"],
  multifidus_lumborum: ["bird-dog", "back-extension", "superman"],
  quadratus_lumborum: ["side-bend", "suitcase-carry", "side-plank"],

  // Biceps, triceps and upper arms
  biceps_brachii_long: ["incline-curl", "chin-up", "bicep-curl"],
  biceps_brachii_short: ["preacher-curl", "concentration-curl", "bicep-curl"],
  brachialis: ["hammer-curl", "reverse-curl"],
  coracobrachialis: ["front-raise", "chin-up"],
  triceps_long: ["overhead-tricep-extension", "skull-crusher", "close-grip-bench"],
  triceps_lateral: ["tricep-pushdown", "close-grip-bench", "dip"],
  triceps_medial: ["tricep-pushdown", "close-grip-bench"],
  anconeus_muscle: ["tricep-pushdown", "close-grip-bench"],

  // Forearm flexors and grip
  flexor_carpi_radialis: ["wrist-curl", "farmers-carry", "dead-hang"],
  palmaris_longus_muscle: ["wrist-curl", "dead-hang"],
  humeral_head_of_flexor_carpi_ulnaris: ["wrist-curl", "farmers-carry"],
  ulnar_head_of_flexor_carpi_ulnaris: ["wrist-curl", "farmers-carry"],
  humero_ulnar_head_of_flexor_digitorum_superficialis: ["towel-grip-hold", "dead-hang", "wrist-curl"],
  radial_head_of_flexor_digitorum_superficialis: ["towel-grip-hold", "dead-hang", "wrist-curl"],
  flexor_digitorum_profundus: ["towel-grip-hold", "dead-hang", "farmers-carry"],
  flexor_pollicis_longus: ["plate-pinch", "towel-grip-hold"],

  // Forearm extensors
  extensor_digitorum: ["reverse-wrist-curl", "finger-extension-band"],
  extensor_digiti_minimi: ["finger-extension-band", "reverse-wrist-curl"],
  extensor_indicis: ["finger-extension-band", "reverse-wrist-curl"],
  extensor_carpi_radialis_longus: ["reverse-wrist-curl", "reverse-curl"],
  extensor_carpi_radialis_brevis: ["reverse-wrist-curl", "reverse-curl"],
  humeral_head_of_extensor_carpi_ulnaris: ["reverse-wrist-curl", "reverse-curl"],
  ulnar_head_of_extensor_carpi_ulnaris: ["reverse-wrist-curl", "reverse-curl"],
  extensor_pollicis_longus: ["finger-extension-band", "plate-pinch"],
  extensor_pollicis_brevis: ["finger-extension-band", "plate-pinch"],
  abductor_pollicis_longus: ["plate-pinch", "finger-extension-band"],

  // Forearm rotators
  superficial_head_of_pronator_teres: ["forearm-pronation", "hammer-curl"],
  deep_head_of_pronator_teres: ["forearm-pronation"],
  pronator_quadratus: ["forearm-pronation"],
  supinator: ["forearm-supination", "reverse-curl"],
  brachioradialis_muscle: ["hammer-curl", "reverse-curl"],

  // Neck
  sternocleidomastoid: ["neck-curl", "neck-lateral-flexion"],
  scalenus_anterior: ["neck-curl", "neck-lateral-flexion"],
  scalenus_medius: ["neck-lateral-flexion", "neck-curl"],
  scalenus_posterior: ["neck-lateral-flexion", "neck-curl"],
  splenius_capitis: ["neck-extension"],
  splenius_colli: ["neck-extension"],

  // Quadriceps
  rectus_femoris: ["sissy-squat", "leg-extension", "standing-knee-raise"],
  vastus_lateralis: ["squat", "leg-press", "leg-extension"],
  vastus_medialis: ["front-squat", "terminal-knee-extension", "leg-extension"],
  vastus_intermedius: ["leg-extension", "front-squat", "leg-press"],

  // Hamstrings
  biceps_femoris_long: ["romanian-deadlift", "leg-curl", "nordic-curl"],
  biceps_femoris_short: ["leg-curl", "nordic-curl"],
  semitendinosus: ["romanian-deadlift", "leg-curl", "glute-ham-raise"],
  semimembranosus: ["romanian-deadlift", "leg-curl", "glute-ham-raise"],

  // Glutes
  gluteus_maximus: ["hip-thrust", "squat", "romanian-deadlift"],
  gluteus_medius: ["hip-abduction", "banded-lateral-walk", "clamshell"],
  gluteus_minimus: ["hip-abduction", "banded-lateral-walk"],

  // Hip flexors
  iliacus: ["hanging-knee-raise", "psoas-march", "standing-knee-raise"],
  psoas_major: ["standing-knee-raise", "psoas-march", "hanging-knee-raise"],
  tensor_fasciae_latae: ["banded-lateral-walk", "hip-abduction", "standing-knee-raise"],
  sartorius: ["cossack-squat", "standing-knee-raise", "90-90-hip-switch"],

  // Deep hip rotators
  piriformis: ["seated-hip-external-rotation", "clamshell", "90-90-hip-switch"],
  quadratus_femoris: ["seated-hip-external-rotation", "90-90-hip-switch"],
  obturator_internus: ["seated-hip-external-rotation", "clamshell"],
  obturator_externus: ["seated-hip-external-rotation", "90-90-hip-switch"],
  gemellus_superior: ["seated-hip-external-rotation", "fire-hydrant"],
  gemellus_inferior: ["seated-hip-external-rotation", "fire-hydrant"],

  // Adductors
  adductor_magnus: ["cable-hip-adduction", "sumo-squat", "cossack-squat"],
  adductor_longus: ["cable-hip-adduction", "copenhagen-plank"],
  adductor_brevis: ["cable-hip-adduction", "copenhagen-plank"],
  gracilis: ["cable-hip-adduction", "copenhagen-plank", "leg-curl"],
  pectineus: ["cable-hip-adduction", "standing-knee-raise"],

  // Calves
  gastrocnemius_lateral: ["calf-raise"],
  gastrocnemius_medial: ["calf-raise"],
  soleus: ["seated-calf-raise"],
  plantaris: ["calf-raise", "seated-calf-raise"],

  // Lower leg
  tibialis_anterior: ["tibialis-raise", "toe-raise-walk"],
  tibialis_posterior: ["ankle-inversion", "calf-raise"],
  fibularis_longus: ["ankle-eversion"],
  fibularis_brevis: ["ankle-eversion"],
  fibularis_tertius: ["ankle-eversion", "toe-raise-walk"],
  extensor_digitorum_longus: ["toe-raise-walk", "tibialis-raise"],
  extensor_hallucis_longus: ["toe-raise-walk", "tibialis-raise"],
  flexor_digitorum_longus: ["toe-curl", "calf-raise"],
  flexor_hallucis_longus: ["toe-curl", "calf-raise"],
  popliteus: ["leg-curl", "squat"],
};

/** Per-muscle list where one exists, otherwise the muscle's training group. */
export function exercisesForMuscle(key: string | undefined, group: string): string[] {
  const specific = key ? exercisesByMuscle[key] : undefined;
  return specific ?? exercisesByGroup[group] ?? [];
}
