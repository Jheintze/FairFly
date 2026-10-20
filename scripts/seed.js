import { neon } from "@neondatabase/serverless";
import trips from "../src/data/trips.js";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not configured.");
}

const sql = neon(databaseUrl);

for (const trip of trips) {
  await sql`
    INSERT INTO trips (
      id, image, title, description, duration, price, region
    )
    VALUES (
      ${trip.id},
      ${trip.image},
      ${trip.title},
      ${trip.description},
      ${trip.duration},
      ${trip.price},
      ${trip.region}
    )
    ON CONFLICT (id) DO UPDATE SET
      image = EXCLUDED.image,
      title = EXCLUDED.title,
      description = EXCLUDED.description,
      duration = EXCLUDED.duration,
      price = EXCLUDED.price,
      region = EXCLUDED.region
  `;
}

console.log(`Successfully seeded ${trips.length} trips.`);
