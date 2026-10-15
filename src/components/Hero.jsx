export default function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-screen flex-col items-center justify-center bg-[url(../images/hero.webp)] bg-cover bg-center bg-no-repeat text-center"
    >
      <h1 className="text-[5rem] font-bold [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]">
        FairFly
      </h1>
      <p className="mt-3 text-center text-[1.75rem] [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]">
        Unique journeys. Unforgettable experiences.
      </p>
      <a
        href="#trips"
        className="inline-block rounded bg-(--text) px-10 py-4 mt-5 text-[1.1rem] font-bold text-(--white) no-underline transition-[transform,box-shadow] duration-200 ease-[ease] hover:-translate-y-0.5 hover:text-(--white) hover:shadow-[0_6px_16px_rgba(0,0,0,0.25)]"
      >
        Explore our trips
      </a>
    </section>
  );
}
