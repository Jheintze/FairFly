# FairFly ✈️

FairFly is a travel discovery and booking website developed as part of a web development practicum. The project combines a responsive frontend with a PostgreSQL database, user authentication, and an integrated payment flow using Stripe.

**Current stage:** Completed – Week 4

## Features

- Explore trips and travel destinations
- Responsive design for desktop and mobile
- Dynamic trip data retrieved from a PostgreSQL database
- User registration, login, and logout
- Persistent authentication sessions
- Mobile-friendly navigation
- Book trips with a selected departure date and number of travelers
- Secure checkout through Stripe
- Automatic order confirmation via Stripe webhooks
- Order records and booking details stored in the database
- Dedicated payment success and cancellation pages

## Tech Stack

- **Next.js 16** — React framework and API routes
- **React** — UI components
- **JavaScript** — Application logic
- **Tailwind CSS v4** — Styling
- **Neon PostgreSQL** — Database
- **Neon Auth** — User authentication
- **Stripe** — Payment processing and Checkout
- **Vercel** — Deployment

## Getting Started

Clone the repository and install the dependencies:

```bash
git clone https://github.com/Jheintze/FairFly.git
cd FairFly
npm install
```

Configure the required environment variables in a `.env.local` file:

```env
DATABASE_URL=
NEON_AUTH_BASE_URL=
NEON_AUTH_COOKIE_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

To create a production build:

```bash
npm run build
```

## Project Structure

```text
src/
├── app/          # Pages, layouts, and API routes
│   ├── api/      # Authentication, orders, and Stripe webhook endpoints
│   └── checkout/ # Payment success and cancellation pages
├── components/   # Reusable UI components
└── lib/          # Database, authentication, and Stripe setup
```

## Payment Flow

1. A logged-in user selects a trip, departure date, and number of travelers.
2. The server retrieves the trip price from the database and creates a pending order.
3. The user is redirected to Stripe Checkout to complete the payment.
4. Stripe sends a webhook event after successful payment.
5. The webhook verifies the event and updates the order status to `paid`.
6. The user is redirected to the success page, where the confirmed order is displayed.

**Note:** Payments are currently configured using Stripe test mode.