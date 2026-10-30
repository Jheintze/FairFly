import { stripe } from "@/lib/stripe";
import { sql } from "@/lib/db";

export async function POST(request) {
  // 1. Read the original request body.
  const body = await request.text();

  // 2. Get the signature Stripe sends in the request headers.
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return Response.json(
      { error: "Missing Stripe signature." },
      { status: 400 },
    );
  }

  // 3. Verify the webhook signature.
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not configured.");

    return Response.json(
      { error: "Webhook configuration error." },
      { status: 500 },
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret,
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error.message);

    return Response.json(
      { error: "Invalid webhook signature." },
      { status: 400 },
    );
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    if (session.payment_status === "paid") {
      const orderId = Number(session.metadata?.orderId);
      const userId = session.metadata?.userId;

      if (!Number.isInteger(orderId) || orderId <= 0 || !userId) {
        return Response.json(
          { error: "Invalid order metadata." },
          { status: 400 },
        );
      }
      try {
        const updatedOrders = await sql`
  UPDATE orders
  SET status = 'paid'
  WHERE id = ${orderId}
    AND user_id = ${userId}
    AND stripe_session_id = ${session.id}
    AND total_amount = ${session.amount_total}
  RETURNING id, status
`;

        if (updatedOrders.length === 0) {
          console.error(
            "No matching order found for Stripe session:",
            session.id,
          );

          return Response.json(
            { error: "Order could not be updated." },
            { status: 500 },
          );
        }
      } catch (error) {
        console.error("Failed to update order:", error);

        return Response.json(
          { error: "Database update failed." },
          { status: 500 },
        );
      }
    }
  }
  return Response.json({ received: true });
}
