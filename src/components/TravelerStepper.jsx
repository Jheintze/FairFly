export function TravelerStepper({ value, onChange, min = 1, max = 7 }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm font-semibold text-ink">Travelers</span>
      <div className="flex items-center overflow-hidden rounded-full border border-line bg-linen">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center text-lg text-ink transition hover:bg-paper disabled:cursor-not-allowed disabled:opacity-35"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="flex h-9 min-w-10 items-center justify-center border-x border-line bg-paper text-sm font-semibold tabular-nums">
          {value}
        </span>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center text-lg text-ink transition hover:bg-paper disabled:cursor-not-allowed disabled:opacity-35"
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
