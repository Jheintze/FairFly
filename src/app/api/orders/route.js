
import { auth } from "@/lib/auth/server";
import { sql } from "@/lib/db";
import { stripe } from "@/lib/stripe";

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

    const parsedDate =
      typeof departureDate === "string"
        ? new Date(`${departureDate}T00:00:00.000Z`)
        : new Date(NaN);

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

    // 3. Get the real trip price and title from Neon.
    const trips = await sql`
      SELECT id, title, price
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

    const trip = trips[0];
    const tripPrice = Number(trip.price);

    if (!Number.isFinite(tripPrice) || tripPrice <= 0) {
      return Response.json(
        { error: "Trip price is invalid." },
        { status: 500 },
      );
    }

    // Prices in trips are stored in euros.
    // Stripe and our order tables use integer cents.
    const priceInCents = Math.round(tripPrice * 100);
    const totalInCents = priceInCents * quantity;

    // 4. Create the pending order and its item.
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
        RETURNING id, status
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
      SELECT new_order.id, new_order.status
      FROM new_order
      JOIN new_item ON new_item.order_id = new_order.id
    `;

    if (result.length === 0) {
      throw new Error("Order was not created.");
    }

    const order = result[0];

    // 5. Create a Stripe-hosted Checkout Session.
    const origin = new URL(request.url).origin;

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: priceInCents,
            product_data: {
              name: trip.title,
            },
          },
          quantity,
        },
      ],

      metadata: {
        orderId: String(order.id),
        userId: session.user.id,
      },

      success_url:
        `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}` +
        `&order_id=${order.id}`,

      cancel_url: `${origin}/?checkout=cancelled`,
    });

    // 6. Link the Stripe session to our database order.
    await sql`
      UPDATE orders
      SET stripe_session_id = ${checkoutSession.id}
      WHERE id = ${order.id}
        AND user_id = ${session.user.id}
    `;

    // 7. Return the Checkout URL to the frontend.
    return Response.json(
      {
        orderId: order.id,
        status: order.status,
        checkoutUrl: checkoutSession.url,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create checkout:", error);

    return Response.json(
      { error: "Failed to create checkout." },
      { status: 500 },
    );
  }
}
