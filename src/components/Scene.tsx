import { memo } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, OrbitControls } from "@react-three/drei";
import { BodyModel } from "./BodyModel";
import type { ScreenAnchor } from "./BodyModel";
import type { MuscleSelection } from "../types/anatomy";

interface SceneProps {
  selectedMuscleId: string | null;
  onSelectMuscle: (muscle: MuscleSelection) => void;
  onIndexReady: (muscles: MuscleSelection[]) => void;
  onAnchorChange: (anchor: ScreenAnchor | null) => void;
  onDeselect: () => void;
  autoRotate: boolean;
}

// Memoised so the leader line's per-frame anchor updates re-render only the
// callout, never the canvas.
export const Scene = memo(function Scene({
  selectedMuscleId,
  onSelectMuscle,
  onIndexReady,
  onAnchorChange,
  onDeselect,
  autoRotate,
}: SceneProps) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} onPointerMissed={onDeselect}>
      <ambientLight intensity={0.4} />
      <hemisphereLight args={["#dce8e6", "#2a1a17", 0.5]} />
      <directionalLight position={[3, 4, 5]} intensity={1.15} />
      {/* Cool back light in the ground's own hue, separating the silhouette
          from the dark teal without greying the tissue. */}
      <directionalLight position={[-4, 2, -4]} intensity={0.6} color="#7fd4d0" />
      {/* Bounds auto-frames the camera to the model regardless of its native
          scale/origin — and refits when the viewport narrows, which is what
          re-centres the body when the details panel opens. */}
      <Bounds fit clip observe margin={1.2}>
        <BodyModel
          selectedMuscleId={selectedMuscleId}
          onSelectMuscle={onSelectMuscle}
          onIndexReady={onIndexReady}
          onAnchorChange={onAnchorChange}
        />
      </Bounds>
      <OrbitControls makeDefault enablePan autoRotate={autoRotate} autoRotateSpeed={0.8} />
    </Canvas>
  );
});

export default Scene;
