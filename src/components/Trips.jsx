"use client";

import { useEffect, useState } from "react";
import { TravelerStepper } from "./TravelerStepper.jsx";
import Image from "next/image";
import BookingModal from "./BookingModal.jsx";

const REGIONS = ["All", "Asia", "Europe", "Africa", "South America"];

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [region, setRegion] = useState("All");
  const [counts, setCounts] = useState({});
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    async function fetchTrips() {
      try {
        const response = await fetch("/api/trips");

        if (!response.ok) {
          throw new Error("Failed to load trips.");
        }

        const data = await response.json();
        setTrips(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTrips();
  }, []);

  const visibleTrips = trips.filter(
    (trip) => trip.region === region || region === "All",
  );

  return (
    <section id="trips" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto mb-12 max-w-6xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-clay">
          Destinations
        </p>
        <h2 className="font-display text-4xl font-medium tracking-[-0.03em] text-ink sm:text-5xl">
          Trips
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted">
          All packages include flights, accommodation and selected activities.
        </p>
      </div>

      <div className="mx-auto mb-10 flex max-w-6xl flex-col items-center gap-3">
        <p id="region-label" className="text-sm font-semibold text-ink">
          Choose a region
        </p>
        <div
          className="flex flex-wrap justify-center gap-2"
          role="group"
          aria-labelledby="region-label"
        >
          {REGIONS.map((item) => {
            const selected = region === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setRegion(item)}
                aria-pressed={selected}
                className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition ${
                  selected
                    ? "bg-ink text-paper"
                    : "border border-line bg-paper text-ink hover:border-ink/30"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {loading && (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-112 animate-pulse rounded-3xl bg-sand"
            />
          ))}
        </div>
      )}

      {error && (
        <p className="mx-auto max-w-6xl rounded-2xl border border-line bg-paper px-5 py-4 text-center text-sm font-medium text-ink">
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visibleTrips.map((trip) => {
            const travelerCount = counts[trip.id] ?? 1;
            const totalPrice = trip.price * travelerCount;

            return (
              <article
                key={trip.id}
                className="group flex h-full flex-col overflow-hidden rounded-3xl bg-paper shadow-[0_16px_40px_rgba(23,36,31,0.08)] ring-1 ring-line/80 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(23,36,31,0.14)]"
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={trip.image}
                    alt={trip.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-ink/55 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-paper/92 px-3 py-1 text-xs font-semibold tracking-wide text-ink backdrop-blur-sm">
                    {trip.region}
                  </span>
                  <h3 className="absolute bottom-4 left-4 right-4 font-display text-3xl font-medium tracking-[-0.03em] text-paper [text-shadow:0_2px_16px_rgba(0,0,0,0.45)]">
                    {trip.title}
                  </h3>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="text-sm leading-relaxed text-muted">
                    {trip.description}
                  </p>

                  <div className="mt-5 border-t border-line pt-4">
                    <p className="text-sm font-semibold text-ink">
                      {trip.duration} days · €
                      {trip.price.toLocaleString("en-GB")} per person
                    </p>
                  </div>

                  <div className="mt-4 flex flex-col gap-4">
                    <TravelerStepper
                      value={travelerCount}
                      onChange={(newCount) =>
                        setCounts({
                          ...counts,
                          [trip.id]: newCount,
                        })
                      }
                    />
                    <p className="border-t border-line pt-4 text-sm font-bold tabular-nums text-ink">
                      Total price: €{totalPrice.toLocaleString("en-GB")}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSelectedTrip(trip)}
                      className="mt-1 w-full cursor-pointer rounded-full bg-ink px-4 py-3 text-sm font-semibold text-paper transition hover:bg-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/60 focus-visible:ring-offset-2"
                    >
                      Book this trip
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
      <BookingModal
        key={selectedTrip?.id ?? "closed"}
        isOpen={selectedTrip !== null}
        onClose={() => setSelectedTrip(null)}
        trip={selectedTrip}
        travelerCount={selectedTrip ? (counts[selectedTrip.id] ?? 1) : 1}
        totalPrice={
          selectedTrip ? selectedTrip.price * (counts[selectedTrip.id] ?? 1) : 0
        }
      />
    </section>
  );
}
