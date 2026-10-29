
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

function getLocalDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getReturnDate(departureDate, duration) {
  if (!departureDate || !duration) return "";

  // The departure day counts as day one of the trip.
  const date = new Date(`${departureDate}T12:00:00`);
  date.setDate(date.getDate() + Math.max(0, Number(duration) - 1));

  return getLocalDateString(date);
}

function formatDate(dateString) {
  if (!dateString) return "Choose a departure date";

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${dateString}T12:00:00Z`));
}

export default function BookingModal({
  isOpen,
  onClose,
  trip,
  travelerCount,
  totalPrice,
}) {
  const [departureDate, setDepartureDate] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !trip) return null;

  const today = getLocalDateString(new Date());
  const returnDate = getReturnDate(departureDate, trip.duration);

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tripId: trip.id,
          quantity: travelerCount,
          departureDate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not start checkout.");
      }

      if (!data.checkoutUrl) {
        throw new Error("No checkout URL was returned.");
      }

      window.location.assign(data.checkoutUrl);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-70 flex items-center justify-center overflow-y-auto bg-ink/55 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative my-auto max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-paper p-5 shadow-[0_24px_60px_rgba(23,36,31,0.28)] ring-1 ring-line sm:p-7"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close booking modal"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-paper/90 text-2xl leading-none text-muted transition hover:bg-sand hover:text-ink"
        >
          ×
        </button>

        <div className="pr-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-clay">
            Your next adventure
          </p>
          <h2
            id="booking-title"
            className="font-display text-3xl font-medium tracking-[-0.03em] text-ink"
          >
            Plan your trip
          </h2>
          <p className="mt-2 text-sm text-muted">
            Review your trip details and choose when you&apos;d like to travel.
          </p>
        </div>

        <div className="mt-6 flex items-center gap-4 rounded-2xl bg-sand/60 p-3">
          <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
            <Image
              src={trip.image}
              alt={trip.title}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-display text-xl font-medium text-ink">
              {trip.title}
            </p>
            <p className="mt-1 text-sm text-muted">
              {trip.duration} days · {trip.region}
            </p>
            <p className="mt-1 text-sm font-semibold text-ink">
              €{trip.price.toLocaleString("en-GB")} per person
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="booking-departure"
                className="mb-2 block text-sm font-semibold text-ink"
              >
                Departure date
              </label>
              <input
                id="booking-departure"
                type="date"
                required
                min={today}
                value={departureDate}
                onChange={(event) => {
                  setDepartureDate(event.target.value);
                  setMessage("");
                }}
                className="w-full min-w-0 rounded-xl border border-line bg-paper px-3 py-3 text-sm text-ink outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/20"
              />
            </div>

            <div>
              <label
                htmlFor="booking-return"
                className="mb-2 block text-sm font-semibold text-ink"
              >
                Return date
              </label>
              <input
                id="booking-return"
                type="text"
                readOnly
                value={formatDate(returnDate)}
                aria-describedby="return-date-note"
                className="w-full rounded-xl border border-line bg-sand/60 px-3 py-3 text-sm text-ink"
              />
            </div>
          </div>

          <p id="return-date-note" className="-mt-3 text-xs text-muted">
            Calculated automatically from your trip duration.
          </p>

          <div className="rounded-2xl border border-line p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-ink">Travelers</p>
                <p className="mt-1 text-xs text-muted">
                  Change the number on the trip card.
                </p>
              </div>
              <p className="text-sm font-semibold text-ink">
                {travelerCount} {travelerCount === 1 ? "person" : "people"}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
              <div>
                <p className="text-sm text-muted">Total trip price</p>
                <p className="mt-1 text-xs text-muted">
                  {travelerCount} × €{trip.price.toLocaleString("en-GB")}
                </p>
              </div>
              <p className="text-2xl font-semibold tabular-nums text-ink">
                €{totalPrice.toLocaleString("en-GB")}
              </p>
            </div>
          </div>

          {message && (
            <p
              role="alert"
              className="rounded-xl border border-line bg-sand/60 p-3 text-sm leading-relaxed text-ink"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer rounded-full bg-clay px-5 py-3.5 text-sm font-semibold text-paper transition hover:bg-clay-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/60 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60"
          >
            {isSubmitting ? "Preparing checkout..." : "Continue to payment"}
          </button>

          <p className="text-center text-xs leading-relaxed text-muted">
            You&apos;ll complete payment securely through Stripe. Your order
            will be confirmed after successful payment.
          </p>
        </form>
      </div>
    </div>
  );
}
