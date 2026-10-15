import trips from "../data/trips.js";
import { useState } from "react";
import { TravelerStepper } from "./TravelerStepper.jsx";

export default function Trips() {
  const [region, setRegion] = useState("All");
  const [counts, setCounts] = useState({});

  return (
    <section id="trips" className="px-8 py-20">
      <h2 className="text-center text-[3rem] font-bold">Trips</h2>
      <p className="mb-12 text-center">
        All packages include flights, accommodation and selected activities.
      </p>

      <label htmlFor="region-select">Choose a region:</label>
      <select
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

      <div className="mx-auto grid max-w-[1600px] grid-cols-3 gap-20 max-[1050px]:grid-cols-2 max-[750px]:grid-cols-1">
        {trips
          .filter((trip) => trip.region === region || region === "All")
          .map((trip) => (
            <article
              key={trip.id}
              className="overflow-hidden rounded-lg bg-(--white) shadow-[0_4px_18px_rgba(18,52,59,0.1)]"
            >
              <img
                src={trip.image}
                alt={trip.title}
                className="h-50 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="mb-2 font-bold">{trip.title}</h3>
                <p>{trip.description}</p>
                <p>
                  {trip.duration} days · €{trip.price.toLocaleString("en-GB")}
                </p>
                <TravelerStepper
                  value={counts[trip.id] ?? 1}
                  onChange={(newCount) =>
                    setCounts({
                      ...counts,
                      [trip.id]: newCount,
                    })
                  }
                />
                <p className="mt-2 font-bold">
                  Total price: € {trip.price * (counts[trip.id] ?? 1).toLocaleString("en-GB")}
                </p>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}
