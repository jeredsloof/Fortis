export interface Muscle {
  id: string;
  name: string;
  description: string;
  exerciseIds: string[];
}

// `id` must match the mesh/node name on the 3D model so hover/click
// raycasting can look up muscle data by the mesh that was hit.
export const muscles: Record<string, Muscle> = {
  chest: {
    id: "chest",
    name: "Pectoralis Major",
    description: "Large fan-shaped chest muscle that adducts and rotates the arm.",
    exerciseIds: ["bench-press", "push-up"],
  },
  bicep: {
    id: "bicep",
    name: "Biceps Brachii",
    description: "Front-of-upper-arm muscle responsible for elbow flexion and forearm supination.",
    exerciseIds: ["bicep-curl", "chin-up"],
  },
  quad: {
    id: "quad",
    name: "Quadriceps",
    description: "Group of four muscles on the front of the thigh that extend the knee.",
    exerciseIds: ["squat", "lunge"],
  },
};
