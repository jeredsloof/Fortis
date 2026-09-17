import { useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { MuscleSelection } from "../types/anatomy";

interface MuscleSearchProps {
  muscles: MuscleSelection[];
  onSelect: (muscle: MuscleSelection) => void;
}

const MAX_RESULTS = 8;

export function MuscleSearch({ muscles, onSelect }: MuscleSearchProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];
    return muscles
      .filter(
        (muscle) =>
          muscle.label.toLowerCase().includes(trimmed) ||
          muscle.group.toLowerCase().includes(trimmed),
      )
      .slice(0, MAX_RESULTS);
  }, [muscles, query]);

  const choose = (muscle: MuscleSelection) => {
    onSelect(muscle);
    setQuery("");
    setActiveIndex(0);
    inputRef.current?.blur();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setQuery("");
      inputRef.current?.blur();
      return;
    }
    if (results.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => (current - 1 + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      choose(results[activeIndex] ?? results[0]);
    }
  };

  return (
    <div className="muscle-search">
      <input
        ref={inputRef}
        type="search"
        className="muscle-search__input"
        placeholder="Search muscles…"
        aria-label="Search muscles by name"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setActiveIndex(0);
        }}
        onKeyDown={handleKeyDown}
      />

      {results.length > 0 && (
        <ul className="muscle-search__results" role="listbox" aria-label="Search results">
          {results.map((muscle, position) => (
            <li key={muscle.muscleId}>
              <button
                type="button"
                role="option"
                aria-selected={position === activeIndex}
                className={
                  position === activeIndex
                    ? "muscle-search__result muscle-search__result--active"
                    : "muscle-search__result"
                }
                onMouseEnter={() => setActiveIndex(position)}
                onClick={() => choose(muscle)}
              >
                <span>{muscle.label}</span>
                <span className="muscle-search__group">
                  {muscle.group}
                  {muscle.side ? ` · ${muscle.side}` : ""}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {query.trim() && results.length === 0 && (
        <p className="muscle-search__empty">No muscle matches “{query.trim()}”.</p>
      )}
    </div>
  );
}
