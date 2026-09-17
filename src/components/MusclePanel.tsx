import { useEffect } from "react";
import { exercises } from "../data/exercises";
import { exercisesByGroup } from "../data/muscleGroups";
import type { MuscleSelection } from "../types/anatomy";

interface MusclePanelProps {
  muscle: MuscleSelection | null;
  onClose: () => void;
}

export function MusclePanel({ muscle, onClose }: MusclePanelProps) {
  useEffect(() => {
    if (!muscle) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [muscle, onClose]);

  if (!muscle) return null;

  const exerciseIds = exercisesByGroup[muscle.group] ?? [];

  return (
    <div className="muscle-modal" onClick={onClose}>
      <div
        className="muscle-modal__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="muscle-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="muscle-modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <h2 id="muscle-modal-title">{muscle.label}</h2>
        <p className="muscle-modal__meta">
          {muscle.group}
          {muscle.side ? ` · ${muscle.side}` : ""}
        </p>

        <h3>Exercises</h3>
        {exerciseIds.length === 0 ? (
          <p>No exercises catalogued for this muscle group yet.</p>
        ) : (
          <ul>
            {exerciseIds.map((exerciseId) => {
              const exercise = exercises[exerciseId];
              if (!exercise) return null;
              return (
                <li key={exercise.id}>
                  <strong>{exercise.name}</strong>
                  <p>{exercise.description}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
