import { useEffect, useRef } from "react";
import { exercises } from "../data/exercises";
import { exercisesForMuscle } from "../data/muscleGroups";
import type { MuscleSelection } from "../types/anatomy";

interface MusclePanelProps {
  muscle: MuscleSelection;
  onClose: () => void;
}

function cleanSourceName(sourceName: string | undefined): string | null {
  if (!sourceName) return null;
  const trimmed = sourceName.replace(/\.(l|r)$/i, "").trim();
  return trimmed.length > 0 ? trimmed : null;
}

// Docked rather than modal: the body stays visible and interactive beside it,
// so focus moves in and Escape closes, but focus is deliberately not trapped.
export function MusclePanel({ muscle, onClose }: MusclePanelProps) {
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const returnFocusTo = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      returnFocusTo?.focus();
    };
  }, [onClose]);

  const exerciseIds = exercisesForMuscle(muscle.key, muscle.group);
  const latin = cleanSourceName(muscle.sourceName);

  return (
    <aside
      ref={panelRef}
      tabIndex={-1}
      className="detail"
      aria-label={`${muscle.label} detail`}
    >
      <header className="detail__head">
        <div>
          <h2 className="detail__name">{muscle.label}</h2>
          {latin && <p className="detail__latin">{latin}</p>}
        </div>
        <button type="button" className="detail__close" onClick={onClose} aria-label="Close">
          ×
        </button>
      </header>

      <dl className="detail__facts">
        {muscle.region && (
          <>
            <dt>Region</dt>
            <dd>{muscle.region}</dd>
          </>
        )}
        {muscle.layer && (
          <>
            <dt>Layer</dt>
            <dd>{muscle.layer}</dd>
          </>
        )}
        {muscle.side && (
          <>
            <dt>Side</dt>
            <dd>{muscle.side}</dd>
          </>
        )}
        <dt>Trains as</dt>
        <dd>{muscle.group}</dd>
      </dl>

      {exerciseIds.length === 0 ? (
        <p className="detail__empty">No exercises catalogued for this muscle yet.</p>
      ) : (
        <ul className="detail__exercises">
          {exerciseIds.map((exerciseId) => {
            const exercise = exercises[exerciseId];
            if (!exercise) return null;
            return (
              <li key={exercise.id}>
                <h3 className="detail__exercise-name">{exercise.name}</h3>
                <p className="detail__description">{exercise.description}</p>
                <p className="detail__cue">{exercise.formNote}</p>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
}
