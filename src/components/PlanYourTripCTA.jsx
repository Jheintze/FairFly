export default function PlanYourTripCTA() {
  return (
    <section
      id="plan-your-trip"
      className="relative flex min-h-112 scroll-mt-24 flex-col items-center justify-center overflow-hidden bg-[url('/images/CTA.webp')] bg-cover bg-center bg-no-repeat px-5 py-24 text-center sm:min-h-136 sm:px-8"
    >
      <div className="absolute inset-0 bg-ink/55" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-linear-to-t from-ink/50 via-transparent to-ink/20"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl text-paper">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-paper/75">
          Your next chapter
        </p>
        <h2 className="font-display text-4xl font-medium leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
          Ready for your next adventure?
        </h2>
        <a
          href="#trips"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-clay px-8 py-3.5 text-base font-semibold text-paper no-underline shadow-[0_12px_28px_rgba(194,78,29,0.35)] transition hover:bg-clay-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper/80 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          Explore our trips
        </a>
      </div>
    </section>
  );
}
