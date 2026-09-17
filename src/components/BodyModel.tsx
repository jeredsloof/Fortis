import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Html, useGLTF } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import type { MuscleSelection } from "../types/anatomy";

const MODEL_URL = "/models/full-body-male-mobile.glb";

const HOVER_COLOR = new THREE.Color("#ffb020");
const SELECT_COLOR = new THREE.Color("#3ba7ff");
// Muted anatomical tones: desaturated enough that the amber hover and blue
// select colors still read clearly on top of them.
const MUSCLE_COLOR = new THREE.Color("#a85c50");
const TISSUE_COLOR = new THREE.Color("#d9cfbd");

interface BodyModelProps {
  onSelectMuscle: (muscle: MuscleSelection) => void;
}

// Only meshes tagged with a muscleId (see docs/anatomy-model/README.md) are
// interactive; skeleton/connective-tissue meshes in the model are inert.
function isMuscleMesh(object: THREE.Object3D): object is THREE.Mesh {
  return (object as THREE.Mesh).isMesh === true && Boolean(object.userData?.muscleId);
}

function getColor(mesh: THREE.Mesh): THREE.Color | undefined {
  const material = mesh.material as THREE.MeshStandardMaterial;
  return material?.color;
}

interface HoverLabel {
  text: string;
  position: [number, number, number];
}

export function BodyModel({ onSelectMuscle }: BodyModelProps) {
  const { scene } = useGLTF(MODEL_URL);
  const [hoverLabel, setHoverLabel] = useState<HoverLabel | null>(null);

  // Clone the scene and each mesh's material so painting one muscle on
  // hover/click can't bleed into other meshes that share a material.
  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const material = (mesh.material as THREE.MeshStandardMaterial).clone();
        material.color.copy(isMuscleMesh(mesh) ? MUSCLE_COLOR : TISSUE_COLOR);
        material.roughness = 0.7;
        material.metalness = 0;
        mesh.material = material;
        mesh.userData.baseColor = material.color.clone();
      }
    });
    return clone;
  }, [scene]);

  const hoveredMesh = useRef<THREE.Mesh | null>(null);
  const selectedMesh = useRef<THREE.Mesh | null>(null);

  const paint = (mesh: THREE.Mesh, color: THREE.Color) => getColor(mesh)?.copy(color);
  const restore = (mesh: THREE.Mesh) => {
    const base = mesh.userData.baseColor as THREE.Color | undefined;
    if (base) getColor(mesh)?.copy(base);
  };

  const showLabel = (mesh: THREE.Mesh, point: THREE.Vector3) =>
    setHoverLabel({
      text: String(mesh.userData.label ?? mesh.userData.muscleId),
      position: [point.x, point.y, point.z],
    });

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    const mesh = event.object;
    if (!isMuscleMesh(mesh)) return;
    event.stopPropagation();
    hoveredMesh.current = mesh;
    if (mesh !== selectedMesh.current) paint(mesh, HOVER_COLOR);
    showLabel(mesh, event.point);
    document.body.style.cursor = "pointer";
  };

  // Keeps the name tag tracking the cursor across the muscle's surface.
  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    const mesh = event.object;
    if (!isMuscleMesh(mesh) || hoveredMesh.current !== mesh) return;
    event.stopPropagation();
    showLabel(mesh, event.point);
  };

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    const mesh = event.object;
    if (!isMuscleMesh(mesh)) return;
    event.stopPropagation();
    if (hoveredMesh.current === mesh) {
      hoveredMesh.current = null;
      setHoverLabel(null);
    }
    if (mesh === selectedMesh.current) {
      paint(mesh, SELECT_COLOR);
    } else {
      restore(mesh);
    }
    document.body.style.cursor = "auto";
  };

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    const mesh = event.object;
    if (!isMuscleMesh(mesh)) return;
    event.stopPropagation();

    if (selectedMesh.current && selectedMesh.current !== mesh) {
      restore(selectedMesh.current);
    }
    selectedMesh.current = mesh;
    paint(mesh, SELECT_COLOR);

    const { muscleId, label, group, side } = mesh.userData as MuscleSelection;
    onSelectMuscle({ muscleId, label, group, side });
  };

  return (
    <>
      <primitive
        object={model}
        onPointerOver={handlePointerOver}
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      />
      {hoverLabel && (
        <Html position={hoverLabel.position} style={{ pointerEvents: "none" }} zIndexRange={[20, 0]}>
          <span className="muscle-tag">{hoverLabel.text}</span>
        </Html>
      )}
    </>
  );
}

useGLTF.preload(MODEL_URL);
