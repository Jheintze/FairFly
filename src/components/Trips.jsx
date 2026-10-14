import trips from "../data/trips.js";
import { useState } from "react";
import { TravelerStepper } from "./TravelerStepper.jsx";

export default function Trips() {
  const [region, setRegion] = useState("All");
  const [counts, setCounts] = useState({});

  return (
    <section id="trips">
      <h2>Trips</h2>
      <p className="trips-intro">
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

      <div className="trips-grid">
        {trips
          .filter((trip) => trip.region === region || region === "All")
          .map((trip) => (
            <article key={trip.id}>
              <img src={trip.image} alt={trip.title} />
              <div className="card-content">
                <h3>{trip.title}</h3>
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
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}
