"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CheckoutSuccess() {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("order_id");

    let attempts = 0;
    let checking = false;
    let interval;

    async function checkOrder() {
      if (checking) return;
      checking = true;

      try {
        const response = await fetch(`/api/orders/${orderId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Could not retrieve your order.");
        }

        setOrder(data);
        setError("");

        if (data.status === "paid") {
          clearInterval(interval);
        } else {
          attempts += 1;

          if (attempts >= 10) {
            clearInterval(interval);
            setTimedOut(true);
          }
        }
      } catch (error) {
        clearInterval(interval);
        setError(error.message || "Something went wrong.");
      } finally {
        setLoading(false);
        checking = false;
      }
    }

    checkOrder();
    interval = setInterval(checkOrder, 2000);

    return () => clearInterval(interval);
  }, []);

  const isPaid = order?.status === "paid";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-linen px-5 py-16">
      <Link
        href="/"
        className="mb-10 font-display text-3xl font-semibold tracking-tight text-forest"
      >
        FairFly
      </Link>

      <section className="w-full max-w-lg rounded-3xl bg-paper p-8 text-center shadow-[0_16px_40px_rgba(23,36,31,0.08)] ring-1 ring-line/80 sm:p-10">
        {loading ? (
          <>
            <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-sand border-t-clay" />
            <h1 className="font-display text-3xl font-medium text-ink">
              Checking your booking
            </h1>
            <p className="mt-3 text-muted">
              Please wait while we confirm your payment.
            </p>
          </>
        ) : error ? (
          <>
            <h1 className="font-display text-3xl font-medium text-ink">
              Something went wrong
            </h1>
            <p className="mt-3 text-muted">{error}</p>
          </>
        ) : isPaid ? (
          <>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-clay">
              Booking confirmed
            </p>
            <h1 className="font-display text-4xl font-medium tracking-tight text-forest">
              Payment successful!
            </h1>
            <p className="mt-3 text-muted">
              Thank you for booking with FairFly. Your next adventure awaits!
            </p>
          </>
        ) : (
          <>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-clay">
              Payment status
            </p>
            <h1 className="font-display text-4xl font-medium tracking-tight text-forest">
              Payment pending
            </h1>
            <p className="mt-3 text-muted">
              Your payment is still being processed. Please check again later.
            </p>

            {timedOut && (
              <p className="mt-3 text-sm text-muted">
                We haven&apos;t received confirmation yet. You can return to
                this page later to check your order status.
              </p>
            )}
          </>
        )}

        {order && (
          <div className="mt-8 border-t border-line pt-6 text-left">
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-muted">Order number</span>
              <span className="font-semibold text-ink">#{order.id}</span>
            </div>

            <div className="mt-3 flex justify-between gap-4 text-sm">
              <span className="text-muted">Total</span>
              <span className="font-semibold text-ink">
                €
                {(order.total_amount / 100).toLocaleString("en-GB", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="mt-3 flex justify-between gap-4 text-sm">
              <span className="text-muted">Status</span>
              <span
                className={`font-semibold ${
                  isPaid ? "text-pine" : "text-clay"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        )}

        <Link
          href="/"
          className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition hover:bg-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/60 focus-visible:ring-offset-2"
        >
          Return to FairFly
        </Link>
      </section>
    </main>
  );
}
