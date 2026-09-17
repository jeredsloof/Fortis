import { useState } from "react";
import { Scene } from "./components/Scene";
import { MusclePanel } from "./components/MusclePanel";
import type { MuscleSelection } from "./types/anatomy";
import "./App.css";

function App() {
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleSelection | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <div className="app">
      <Scene onSelectMuscle={setSelectedMuscle} autoRotate={autoRotate} />

      <button
        type="button"
        className="app__rotate-toggle"
        aria-pressed={autoRotate}
        onClick={() => setAutoRotate((rotating) => !rotating)}
      >
        {autoRotate ? "Pause rotation" : "Resume rotation"}
      </button>

      {!selectedMuscle && (
        <p className="app__hint">Click a highlighted muscle to see details and exercises.</p>
      )}

      <MusclePanel muscle={selectedMuscle} onClose={() => setSelectedMuscle(null)} />
    </div>
  );
}

export default App;
