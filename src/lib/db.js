import "server-only";

import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not configured.");
}

// This client is server-only. Database access will be added with the first
// explicitly approved query or repository layer.
export const sql = neon(databaseUrl);
