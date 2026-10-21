export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-end overflow-hidden bg-[url('/images/hero.webp')] bg-cover bg-center bg-no-repeat pb-16 pt-32 sm:items-center sm:pb-24 sm:pt-28"
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/45 to-ink/15"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/25"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-paper/80">
          Curated travel
        </p>
        <h1 className="font-display max-w-3xl text-5xl font-medium leading-[1.05] tracking-[-0.03em] text-paper sm:text-6xl lg:text-7xl">
          See the world, unhurried.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/88 sm:text-xl">
          Unique journeys. Unforgettable experiences.
        </p>
        <a
          href="#trips"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-clay px-8 py-3.5 text-base font-semibold text-paper no-underline shadow-[0_12px_28px_rgba(194,78,29,0.35)] transition hover:bg-clay-dark hover:shadow-[0_14px_32px_rgba(194,78,29,0.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper/80 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          Explore our trips
        </a>
      </div>
    </section>
  );
}
