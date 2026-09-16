import { useState } from "react";
import type { ThreeEvent } from "@react-three/fiber";

interface BodyModelProps {
  onSelectMuscle: (muscleId: string) => void;
}

interface MuscleMeshProps {
  muscleId: string;
  position: [number, number, number];
  args: [number, number, number];
  color: string;
  onSelect: (muscleId: string) => void;
}

// Placeholder geometry standing in for muscle-specific meshes until a
// licensed 3D anatomy model (with muscles as named meshes) is dropped in.
function MuscleMesh({ muscleId, position, args, color, onSelect }: MuscleMeshProps) {
  const [hovered, setHovered] = useState(false);

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(false);
    document.body.style.cursor = "auto";
  };

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelect(muscleId);
  };

  return (
    <mesh
      name={muscleId}
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <boxGeometry args={args} />
      <meshStandardMaterial color={hovered ? "#ffb020" : color} />
    </mesh>
  );
}

export function BodyModel({ onSelectMuscle }: BodyModelProps) {
  return (
    <group>
      {/* Torso, stands in for the rest of the body until the real model exists */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 1.6, 0.6]} />
        <meshStandardMaterial color="#d8d8d8" />
      </mesh>

      <MuscleMesh
        muscleId="chest"
        position={[0, 0.4, 0.35]}
        args={[1, 0.5, 0.2]}
        color="#c94f4f"
        onSelect={onSelectMuscle}
      />
      <MuscleMesh
        muscleId="bicep"
        position={[-0.85, 0.2, 0]}
        args={[0.3, 0.6, 0.3]}
        color="#4f8dc9"
        onSelect={onSelectMuscle}
      />
      <MuscleMesh
        muscleId="quad"
        position={[0.3, -1.3, 0.15]}
        args={[0.4, 1, 0.4]}
        color="#4fc97a"
        onSelect={onSelectMuscle}
      />
    </group>
  );
}
