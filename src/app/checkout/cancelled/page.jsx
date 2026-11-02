
import Link from "next/link";

export default function CheckoutCancelled() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-linen px-5 py-16">
      <Link
        href="/"
        className="mb-10 font-display text-3xl font-semibold tracking-tight text-forest"
      >
        FairFly
      </Link>

      <section className="w-full max-w-lg rounded-3xl bg-paper p-8 text-center shadow-[0_16px_40px_rgba(23,36,31,0.08)] ring-1 ring-line/80 sm:p-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-clay">
          Booking not completed
        </p>

        <h1 className="font-display text-4xl font-medium tracking-tight text-forest">
          Checkout cancelled
        </h1>

        <p className="mt-3 text-muted">
          Your payment was not completed and you haven&apos;t been charged.
          Your next adventure still await&apos;s!
        </p>

        <Link
          href="/#trips"
          className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition hover:bg-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/60 focus-visible:ring-offset-2"
        >
          Explore our trips
        </Link>
      </section>
    </main>
  );
}
