import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Html, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import type { MuscleSelection } from "../types/anatomy";

const MODEL_URL = "/models/full-body-male-mobile.glb";

// Interaction is amber; tissue is red. The two never swap roles, so a warm
// highlight always means "you are doing something to this".
const HOVER_COLOR = new THREE.Color("#f0a830");
const SELECT_COLOR = new THREE.Color("#ffd27a");
const MUSCLE_COLOR = new THREE.Color("#b5544a");
const TISSUE_COLOR = new THREE.Color("#c9c2b0");

export interface ScreenAnchor {
  x: number;
  y: number;
}

interface BodyModelProps {
  selectedMuscleId: string | null;
  onSelectMuscle: (muscle: MuscleSelection) => void;
  onIndexReady: (muscles: MuscleSelection[]) => void;
  onAnchorChange: (anchor: ScreenAnchor | null) => void;
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

function toSelection(mesh: THREE.Mesh): MuscleSelection {
  const { muscleId, key, label, group, side, region, layer, sourceName } =
    mesh.userData as MuscleSelection;
  return { muscleId, key, label, group, side, region, layer, sourceName };
}

interface HoverLabel {
  text: string;
  position: [number, number, number];
}

export function BodyModel({
  selectedMuscleId,
  onSelectMuscle,
  onIndexReady,
  onAnchorChange,
}: BodyModelProps) {
  const { scene } = useGLTF(MODEL_URL);
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const [hoverLabel, setHoverLabel] = useState<HoverLabel | null>(null);

  // Clone the scene and each mesh's material so painting one muscle on
  // hover/click can't bleed into other meshes that share a material.
  const { model, index } = useMemo(() => {
    const clone = scene.clone(true);
    const muscles: MuscleSelection[] = [];
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const material = (mesh.material as THREE.MeshStandardMaterial).clone();
        material.color.copy(isMuscleMesh(mesh) ? MUSCLE_COLOR : TISSUE_COLOR);
        material.roughness = 0.7;
        material.metalness = 0;
        mesh.material = material;
        mesh.userData.baseColor = material.color.clone();
        if (isMuscleMesh(mesh)) muscles.push(toSelection(mesh));
      }
    });
    muscles.sort((a, b) => a.label.localeCompare(b.label));
    return { model: clone, index: muscles };
  }, [scene]);

  const hoveredMesh = useRef<THREE.Mesh | null>(null);
  const selectedMesh = useRef<THREE.Mesh | null>(null);
  // Touch has no hover, so the first tap only names a muscle — that tap's
  // target is held here until a second tap opens it.
  const pendingMesh = useRef<THREE.Mesh | null>(null);
  const lastPointerType = useRef<string>("mouse");
  // World-space centre of the selected muscle, projected each frame so the
  // callout's leader line keeps pointing at it while the model is orbited.
  const anchorWorld = useRef<THREE.Vector3 | null>(null);
  const lastAnchor = useRef<ScreenAnchor | null>(null);

  const paint = (mesh: THREE.Mesh, color: THREE.Color) => getColor(mesh)?.copy(color);
  const restore = (mesh: THREE.Mesh) => {
    const base = mesh.userData.baseColor as THREE.Color | undefined;
    if (base) getColor(mesh)?.copy(base);
  };

  useEffect(() => {
    onIndexReady(index);
  }, [index, onIndexReady]);

  // Selection is driven by the prop so that clicking the model and picking a
  // result out of the search box both land in the same place.
  useEffect(() => {
    const previous = selectedMesh.current;
    if (previous && previous.userData.muscleId !== selectedMuscleId) {
      if (hoveredMesh.current === previous) paint(previous, HOVER_COLOR);
      else restore(previous);
      selectedMesh.current = null;
    }

    if (!selectedMuscleId) {
      anchorWorld.current = null;
      lastAnchor.current = null;
      onAnchorChange(null);
      if (pendingMesh.current) {
        restore(pendingMesh.current);
        pendingMesh.current = null;
        setHoverLabel(null);
      }
      return;
    }

    const matches: THREE.Mesh[] = [];
    model.traverse((child) => {
      if (isMuscleMesh(child) && child.userData.muscleId === selectedMuscleId) {
        matches.push(child);
      }
    });

    const match = matches[0];
    if (match) {
      selectedMesh.current = match;
      paint(match, SELECT_COLOR);
      if (pendingMesh.current && pendingMesh.current !== match) restore(pendingMesh.current);
      pendingMesh.current = null;

      match.geometry.computeBoundingBox();
      const centre = match.geometry.boundingBox?.getCenter(new THREE.Vector3());
      anchorWorld.current = centre ? match.localToWorld(centre) : null;
      lastAnchor.current = null;
    }
  }, [selectedMuscleId, model, onAnchorChange]);

  useFrame(() => {
    const world = anchorWorld.current;
    if (!world) return;

    const projected = world.clone().project(camera);
    const next = {
      x: (projected.x * 0.5 + 0.5) * size.width,
      y: (-projected.y * 0.5 + 0.5) * size.height,
    };

    const previous = lastAnchor.current;
    const moved =
      !previous || Math.abs(previous.x - next.x) > 1 || Math.abs(previous.y - next.y) > 1;
    if (!moved) return;

    lastAnchor.current = next;
    onAnchorChange(next);
  });

  const showLabel = (mesh: THREE.Mesh, point: THREE.Vector3) =>
    setHoverLabel({
      text: String(mesh.userData.label ?? mesh.userData.muscleId),
      position: [point.x, point.y, point.z],
    });

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    const mesh = event.object;
    if (!isMuscleMesh(mesh)) return;
    event.stopPropagation();
    lastPointerType.current = event.nativeEvent.pointerType;
    hoveredMesh.current = mesh;
    if (mesh !== selectedMesh.current) paint(mesh, HOVER_COLOR);
    showLabel(mesh, event.point);
    if (event.nativeEvent.pointerType !== "touch") document.body.style.cursor = "pointer";
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
    // On touch the tag stays pinned after the finger lifts — clearing it here
    // would make the first tap flash the name and immediately lose it.
    if (event.nativeEvent.pointerType === "touch") return;

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

    const isTouch = lastPointerType.current === "touch";
    const alreadyShowing = pendingMesh.current === mesh || selectedMesh.current === mesh;
    if (isTouch && !alreadyShowing) {
      if (pendingMesh.current && pendingMesh.current !== selectedMesh.current) {
        restore(pendingMesh.current);
      }
      pendingMesh.current = mesh;
      paint(mesh, HOVER_COLOR);
      showLabel(mesh, event.point);
      return;
    }

    onSelectMuscle(toSelection(mesh));
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
