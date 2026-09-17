import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { exercises } from "../data/exercises";
import { exercisesForMuscle } from "../data/muscleGroups";
import type { ScreenAnchor } from "./BodyModel";
import type { MuscleSelection } from "../types/anatomy";

interface MuscleCalloutProps {
  muscle: MuscleSelection;
  anchor: ScreenAnchor | null;
  onOpenDetails: () => void;
  onClose: () => void;
}

const WIDTH = 252;
const LEADER_GAP = 84;
const EDGE = 12;
const PREVIEW_COUNT = 4;

/** Z-Anatomy suffixes its source names with a side marker we don't need twice. */
function cleanSourceName(sourceName: string | undefined): string | null {
  if (!sourceName) return null;
  const trimmed = sourceName.replace(/\.(l|r)$/i, "").trim();
  return trimmed.length > 0 ? trimmed : null;
}

function useParentSize(element: HTMLElement | null) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const parent = element?.parentElement;
    if (!parent) return;

    const measure = () => setSize({ width: parent.clientWidth, height: parent.clientHeight });
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(parent);
    return () => observer.disconnect();
  }, [element]);

  return size;
}

export function MuscleCallout({ muscle, anchor, onOpenDetails, onClose }: MuscleCalloutProps) {
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = useState(0);
  const parent = useParentSize(node);

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const observer = new ResizeObserver(() => setCardHeight(card.offsetHeight));
    observer.observe(card);
    setCardHeight(card.offsetHeight);
    return () => observer.disconnect();
  }, [muscle.muscleId]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const exerciseIds = exercisesForMuscle(muscle.key, muscle.group);
  const preview = exerciseIds.slice(0, PREVIEW_COUNT);
  const remaining = exerciseIds.length - preview.length;
  const latin = cleanSourceName(muscle.sourceName);

  const ready = anchor !== null && parent.width > 0 && cardHeight > 0;
  const onRight = anchor ? anchor.x < parent.width / 2 : true;

  let cardX = 0;
  let cardY = 0;
  if (ready && anchor) {
    cardX = onRight ? anchor.x + LEADER_GAP : anchor.x - LEADER_GAP - WIDTH;
    cardX = Math.min(Math.max(cardX, EDGE), Math.max(EDGE, parent.width - WIDTH - EDGE));
    cardY = anchor.y - cardHeight / 2;
    cardY = Math.min(Math.max(cardY, EDGE), Math.max(EDGE, parent.height - cardHeight - EDGE));
  }

  const midY = cardY + cardHeight / 2;
  const edgeX = onRight ? cardX : cardX + WIDTH;
  const elbowX = onRight ? cardX - 22 : cardX + WIDTH + 22;

  return (
    <div className="callout-layer" ref={setNode}>
      {ready && anchor && (
        <svg className="callout-leader" aria-hidden="true">
          <circle className="callout-leader__origin" cx={anchor.x} cy={anchor.y} r="3.5" />
          <polyline
            className="callout-leader__line"
            pathLength="1"
            points={`${anchor.x},${anchor.y} ${elbowX},${midY} ${edgeX},${midY}`}
          />
        </svg>
      )}

      <div
        ref={cardRef}
        className="callout"
        role="dialog"
        aria-label={`${muscle.label} summary`}
        style={
          ready
            ? { transform: `translate(${Math.round(cardX)}px, ${Math.round(cardY)}px)` }
            : { opacity: 0 }
        }
      >
        <button type="button" className="callout__close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <h2 className="callout__name">{muscle.label}</h2>
        {latin && <p className="callout__latin">{latin}</p>}

        <dl className="callout__facts">
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

        <ul className="callout__exercises">
          {preview.map((id) => {
            const exercise = exercises[id];
            return exercise ? <li key={id}>{exercise.name}</li> : null;
          })}
          {remaining > 0 && <li className="callout__more">and {remaining} more</li>}
        </ul>

        <button type="button" className="callout__action" onClick={onOpenDetails}>
          See how to train it
        </button>
      </div>
    </div>
  );
}
