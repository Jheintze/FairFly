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
    </section>
  );
}
