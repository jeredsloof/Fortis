export interface Exercise {
  id: string;
  name: string;
  description: string;
}

export const exercises: Record<string, Exercise> = {
  "bench-press": {
    id: "bench-press",
    name: "Bench Press",
    description: "Barbell or dumbbell press performed lying on a flat bench.",
  },
  "push-up": {
    id: "push-up",
    name: "Push-Up",
    description: "Bodyweight press from a plank position.",
  },
  "bicep-curl": {
    id: "bicep-curl",
    name: "Bicep Curl",
    description: "Elbow flexion against resistance, e.g. dumbbell or barbell curl.",
  },
  "chin-up": {
    id: "chin-up",
    name: "Chin-Up",
    description: "Underhand-grip pull-up, emphasizing the biceps and lats.",
  },
  squat: {
    id: "squat",
    name: "Squat",
    description: "Hip and knee flexion/extension under load, e.g. barbell back squat.",
  },
  lunge: {
    id: "lunge",
    name: "Lunge",
    description: "Single-leg stepping movement that loads the quads and glutes.",
  },
};
