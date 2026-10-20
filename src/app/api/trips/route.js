import { sql } from "@/lib/db";

export async function GET() {
  try {
    const trips = await sql`
      SELECT id, image, title, description, duration, price, region
      FROM trips
      ORDER BY id
    `;

    return Response.json(trips);
  } catch (error) {
    console.error("Failed to fetch trips:", error);

    return Response.json({ error: "Failed to fetch trips." }, { status: 500 });
  }
}
