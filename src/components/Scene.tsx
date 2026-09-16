import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { BodyModel } from "./BodyModel";

interface SceneProps {
  onSelectMuscle: (muscleId: string) => void;
}

export function Scene({ onSelectMuscle }: SceneProps) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={1} />
      <BodyModel onSelectMuscle={onSelectMuscle} />
      <OrbitControls enablePan={false} minDistance={2.5} maxDistance={8} />
    </Canvas>
  );
}
