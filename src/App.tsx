import { useState } from "react";
import { Scene } from "./components/Scene";
import { MusclePanel } from "./components/MusclePanel";
import "./App.css";

function App() {
  const [selectedMuscleId, setSelectedMuscleId] = useState<string | null>(null);

  return (
    <div className="app">
      <div className="app__viewport">
        <Scene onSelectMuscle={setSelectedMuscleId} />
      </div>
      <MusclePanel muscleId={selectedMuscleId} />
    </div>
  );
}

export default App;
