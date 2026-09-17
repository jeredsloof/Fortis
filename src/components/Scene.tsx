import { Canvas } from "@react-three/fiber";
import { Bounds, OrbitControls } from "@react-three/drei";
import { BodyModel } from "./BodyModel";
import type { MuscleSelection } from "../types/anatomy";

interface SceneProps {
  onSelectMuscle: (muscle: MuscleSelection) => void;
  autoRotate: boolean;
}

export function Scene({ onSelectMuscle, autoRotate }: SceneProps) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.35} />
      <hemisphereLight args={["#cfd9ff", "#4a332c", 0.55]} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      {/* Cool back light to separate the silhouette from the dark ground. */}
      <directionalLight position={[-4, 2, -4]} intensity={0.55} color="#9fb6ff" />
      {/* Bounds auto-frames the camera to the model regardless of its
          native scale/origin, so we don't have to hand-guess coordinates. */}
      <Bounds fit clip observe margin={1.2}>
        <BodyModel onSelectMuscle={onSelectMuscle} />
      </Bounds>
      <OrbitControls makeDefault enablePan autoRotate={autoRotate} autoRotateSpeed={0.8} />
    </Canvas>
  );
}
