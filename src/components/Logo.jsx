export default function Logo({ inverted = false }) {
  return (
    <a
      href="#hero"
      className={`group flex items-center gap-2.5 no-underline transition-opacity hover:opacity-80 ${
        inverted ? "text-paper" : "text-ink"
      }`}
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-full bg-clay text-paper shadow-[0_6px_16px_rgba(194,78,29,0.28)]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
          <path d="M3.2 11.1 21 4.4c.55-.2 1.08.32.88.87L15.2 21.2c-.22.58-1.04.6-1.3.04l-2.6-5.7-5.7-2.55c-.57-.25-.56-1.07.06-1.3zM10.2 13.4l2.05 1.15 1.1-3.15-3.15 2z" />
        </svg>
      </span>
      <span className="font-display text-[1.45rem] font-semibold leading-none tracking-[-0.03em]">
        FairFly
      </span>
    </a>
  );
}
