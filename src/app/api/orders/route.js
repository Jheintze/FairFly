
import { auth } from "@/lib/auth/server";
import { sql } from "@/lib/db";

export async function POST(request) {
  try {
    // 1. Verify the logged-in user on the server.
    const { data: session } = await auth.getSession();

    if (!session?.user) {
      return Response.json(
        { error: "You must be logged in to book a trip." },
        { status: 401 },
      );
    }

    // 2. Read and validate the booking details.
    const body = await request.json();

    const tripId = Number(body.tripId);
    const quantity = Number(body.quantity);
    const departureDate = body.departureDate;

    if (!Number.isInteger(tripId) || tripId <= 0) {
      return Response.json(
        { error: "Invalid trip." },
        { status: 400 },
      );
    }

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 7) {
      return Response.json(
        { error: "Traveler count must be between 1 and 7." },
        { status: 400 },
      );
    }

    
    const parsedDate = new Date(`${departureDate}T00:00:00.000Z`);

    if (
      typeof departureDate !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(departureDate) ||
      Number.isNaN(parsedDate.getTime()) ||
      parsedDate.toISOString().slice(0, 10) !== departureDate
    ) {
      return Response.json(
        { error: "Invalid departure date." },
        { status: 400 },
      );
    }


    // 3. Get the real trip price from Neon.
    const trips = await sql`
      SELECT id, price
      FROM trips
      WHERE id = ${tripId}
      LIMIT 1
    `;

    if (trips.length === 0) {
      return Response.json(
        { error: "Trip not found." },
        { status: 404 },
      );
    }

    const tripPrice = Number(trips[0].price);

    if (!Number.isFinite(tripPrice) || tripPrice <= 0) {
      return Response.json(
        { error: "Trip price is invalid." },
        { status: 500 },
      );
    }

    // The existing trip price is in euros.
    // Store order amounts in integer cents.
    const priceInCents = Math.round(tripPrice * 100);
    const totalInCents = priceInCents * quantity;

    // 4. Create the order and its item together.
    const result = await sql`
      WITH new_order AS (
        INSERT INTO orders (
          user_id,
          total_amount,
          status
        )
        VALUES (
          ${session.user.id},
          ${totalInCents},
          'pending'
        )
        RETURNING id
      ),
      new_item AS (
        INSERT INTO order_items (
          order_id,
          trip_id,
          price,
          quantity,
          departure_date
        )
        SELECT
          new_order.id,
          ${tripId},
          ${priceInCents},
          ${quantity},
          ${departureDate}
        FROM new_order
        RETURNING order_id
      )
      SELECT orders.id, orders.status
      FROM orders
      JOIN new_item ON orders.id = new_item.order_id
    `;

    // 5. Return the new order details.
    return Response.json(
      {
        orderId: result[0].id,
        status: result[0].status,
        totalAmount: totalInCents,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create order:", error);

    return Response.json(
      { error: "Failed to create order." },
      { status: 500 },
    );
  }
}
