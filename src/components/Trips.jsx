"use client";

import { useEffect, useState } from "react";
import { TravelerStepper } from "./TravelerStepper.jsx";
import Image from "next/image";

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [region, setRegion] = useState("All");
  const [counts, setCounts] = useState({});

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

  return (
    <section id="trips" className="px-8 py-20">
      {loading && <p className="text-center">Loading trips...</p>}

      {error && <p className="text-center">{error}</p>}
      <h2 className="mb-3 text-center text-[3rem] font-bold">Trips</h2>
      <p className="mb-12 text-center">
        All packages include flights, accommodation and selected activities.
      </p>

      <div className="mx-auto mb-8 flex max-w-[1600px] flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
        <label className="text-sm font-semibold" htmlFor="region-select">
          Choose a region:
        </label>
        <select
          className="rounded-md border border-(--text)/20 bg-(--white) px-3 py-2 text-sm font-medium text-(--text) shadow-sm outline-none transition focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/30"
          name="regions"
          id="region-select"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Africa">Africa</option>
          <option value="South America">South America</option>
        </select>
      </div>
      
         {!loading && !error && (
      <div className="mx-auto grid max-w-[1600px] grid-cols-3 gap-14 max-[1050px]:grid-cols-2 max-[750px]:grid-cols-1">
        {trips
          .filter((trip) => trip.region === region || region === "All")
          .map((trip) => {
            const travelerCount = counts[trip.id] ?? 1;
            const totalPrice = trip.price * travelerCount;

            return (
              <article
                key={trip.id}
                className="flex h-full flex-col overflow-hidden rounded-lg bg-(--white) shadow-[0_4px_18px_rgba(18,52,59,0.1)]"
              >
                <div className="relative h-56 sm:h-60">
                  <div className="relative h-56 sm:h-60">
                    <Image
                      src={trip.image}
                      alt={trip.title}
                      fill
                      sizes="(max-width: 750px) 100vw, (max-width: 1050px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-xl font-bold">{trip.title}</h3>
                  <p className="mt-2 text-sm leading-5">{trip.description}</p>

                  <div className="mt-auto border-t border-(--text)/15 pt-3">
                    <p className="text-sm font-semibold">
                      {trip.duration} days · €
                      {trip.price.toLocaleString("en-GB")} per person
                    </p>
                  </div>

                  <div className="mt-4 flex flex-col gap-3">
                    <TravelerStepper
                      value={travelerCount}
                      onChange={(newCount) =>
                        setCounts({
                          ...counts,
                          [trip.id]: newCount,
                        })
                      }
                    />
                    <p className="border-t border-(--text)/15 pt-3 text-sm font-bold">
                      Total price: €{totalPrice.toLocaleString("en-GB")}
                    </p>
                    <button
                      onClick={() => {
                        // Booking modal logic goes here later
                      }}
                      className="mt-1 ml-auto block rounded bg-(--text) px-4 py-2 text-sm font-bold text-(--white) transition-[transform,box-shadow] duration-200 ease-[ease] hover:-translate-y-0.5 hover:text-(--white) hover:shadow-[0_6px_16px_rgba(0,0,0,0.25)]"
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
    </section>
  );
}
