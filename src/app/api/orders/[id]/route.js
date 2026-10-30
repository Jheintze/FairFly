import { auth } from "@/lib/auth/server";
import { sql } from "@/lib/db";

export async function GET(_request, { params }) {
  // 1. Check whether the user is logged in.
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    return Response.json({ error: "You must be logged in." }, { status: 401 });
  }

  // 2. Get the order ID from the URL.
  const { id } = await params;
  const orderId = Number(id);

  if (!Number.isInteger(orderId) || orderId <= 0) {
    return Response.json({ error: "Invalid order ID." }, { status: 400 });
  }
  try {
    // 3. Retrieve the order belonging to this user.
    const orders = await sql`
      SELECT id, total_amount, status, created_at
      FROM orders
      WHERE id = ${orderId}
        AND user_id = ${session.user.id}
      LIMIT 1
    `;

    // 4. Handle missing orders.
    if (orders.length === 0) {
      return Response.json({ error: "Order not found." }, { status: 404 });
    }

    //5. Return the order.
    return Response.json(orders[0]);
  } catch (error) {
    console.error("Failed to fetch order:", error);

    return Response.json({ error: "Failed to fetch order." }, { status: 500 });
  }
}
