export function TravelerStepper({ value, onChange, min = 1, max = 7 }) {
    return (
      <div className="flex items-center justify-between gap-4">
      <span className="text-sm font-semibold">Travelers</span>
      <div className="flex items-center overflow-hidden rounded-md border border-(--text)/20 bg-(--background)">
        <button
          className="flex h-9 w-9 items-center justify-center text-lg text-(--text) transition hover:bg-(--white) disabled:cursor-not-allowed disabled:opacity-35"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="flex h-9 min-w-10 items-center justify-center border-x border-(--text)/20 bg-(--white) text-sm font-semibold">
          {value}
        </span>
        <button
          className="flex h-9 w-9 items-center justify-center text-lg text-(--text) transition hover:bg-(--white) disabled:cursor-not-allowed disabled:opacity-35"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      </div>
    );
}
