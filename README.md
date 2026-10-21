# FairFly ✈️

FairFly is a travel discovery website developed as part of a web development assignment. The project focuses on building a responsive frontend and integrating a real backend, database, and user authentication.

**Current stage:** Week 3

## Features

- Explore trips and travel destinations
- Responsive design for desktop and mobile
- Dynamic trip data retrieved from a PostgreSQL database
- User registration, login, and logout
- Persistent authentication sessions
- Mobile-friendly navigation

## Tech Stack

- **Next.js** — React framework and API routes
- **JavaScript** — Application logic
- **Tailwind CSS v4** — Styling
- **Neon PostgreSQL** — Database
- **Neon Auth** — User authentication
- **Vercel** — Deployment

## Getting Started

Clone the repository and install the dependencies:

```bash
git clone https://github.com/Jheintze/FairFly.git
cd FairFly
npm install
```

Configure the required environment variables in a `.env.local` file, then start the development server:

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
├── components/   # Reusable UI components
└── lib/           # Database and authentication setup
```

