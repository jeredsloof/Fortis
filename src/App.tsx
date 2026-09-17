import { Suspense, lazy, useCallback, useState } from "react";
import { MuscleCallout } from "./components/MuscleCallout";
import { MusclePanel } from "./components/MusclePanel";
import { MuscleSearch } from "./components/MuscleSearch";
import type { ScreenAnchor } from "./components/BodyModel";
import type { MuscleSelection } from "./types/anatomy";
import "./App.css";

// Kept out of the entry chunk: three.js + drei + the scene are only needed
// once the viewer itself renders.
const Scene = lazy(() => import("./components/Scene"));

const isCoarsePointer =
  typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)").matches;

function App() {
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleSelection | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [anchor, setAnchor] = useState<ScreenAnchor | null>(null);
  const [muscles, setMuscles] = useState<MuscleSelection[]>([]);
  const [autoRotate, setAutoRotate] = useState(true);

  const modelReady = muscles.length > 0;

  const handleIndexReady = useCallback((index: MuscleSelection[]) => setMuscles(index), []);
  const handleAnchorChange = useCallback((next: ScreenAnchor | null) => setAnchor(next), []);
  const handleSelect = useCallback((muscle: MuscleSelection) => {
    setSelectedMuscle(muscle);
    setDetailsOpen(false);
  }, []);
  const handleDeselect = useCallback(() => {
    setSelectedMuscle(null);
    setDetailsOpen(false);
  }, []);
  const handleOpenDetails = useCallback(() => setDetailsOpen(true), []);
  const handleCloseDetails = useCallback(() => setDetailsOpen(false), []);

  return (
    <div className="app">
      <div className="app__viewport">
        <Suspense fallback={null}>
          <Scene
            selectedMuscleId={selectedMuscle?.muscleId ?? null}
            onSelectMuscle={handleSelect}
            onIndexReady={handleIndexReady}
            onAnchorChange={handleAnchorChange}
            onDeselect={handleDeselect}
            autoRotate={autoRotate && !selectedMuscle}
          />
        </Suspense>

        {!modelReady && (
          <div className="app__loading" role="status" aria-live="polite">
            <span className="app__pulse" aria-hidden="true" />
            <p>Loading the atlas</p>
          </div>
        )}

        {modelReady && (
          <>
            <MuscleSearch muscles={muscles} onSelect={handleSelect} />

            <button
              type="button"
              className="app__control"
              aria-pressed={autoRotate}
              onClick={() => setAutoRotate((rotating) => !rotating)}
            >
              {autoRotate ? "Pause rotation" : "Resume rotation"}
            </button>

            {!selectedMuscle && (
              <p className="app__hint">
                {isCoarsePointer
                  ? "Tap a muscle to name it, tap again for exercises."
                  : "Hover a muscle to name it, click for exercises."}
              </p>
            )}

            {selectedMuscle && !detailsOpen && (
              <MuscleCallout
                key={selectedMuscle.muscleId}
                muscle={selectedMuscle}
                anchor={anchor}
                onOpenDetails={handleOpenDetails}
                onClose={handleDeselect}
              />
            )}
          </>
        )}
      </div>

      {selectedMuscle && detailsOpen && (
        <MusclePanel
          key={selectedMuscle.muscleId}
          muscle={selectedMuscle}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
}

export default App;
