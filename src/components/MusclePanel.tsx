import { exercises } from "../data/exercises";
import { muscles } from "../data/muscles";

interface MusclePanelProps {
  muscleId: string | null;
}

export function MusclePanel({ muscleId }: MusclePanelProps) {
  if (!muscleId) {
    return (
      <aside className="muscle-panel muscle-panel--empty">
        <p>Click a highlighted muscle to see details and exercises.</p>
      </aside>
    );
  }

  const muscle = muscles[muscleId];
  if (!muscle) {
    return (
      <aside className="muscle-panel muscle-panel--empty">
        <p>No data found for "{muscleId}" yet.</p>
      </aside>
    );
  }

  return (
    <aside className="muscle-panel">
      <h2>{muscle.name}</h2>
      <p>{muscle.description}</p>

      <h3>Exercises</h3>
      <ul>
        {muscle.exerciseIds.map((exerciseId) => {
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
    </aside>
  );
}
