export function TravelerStepper({value, onChange, min = 1, max = 7}){
    return (
      <div>
      <span>Number of people: </span>
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span> {value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    );
}