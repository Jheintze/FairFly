"use client";

import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 flex items-center justify-between bg-(--background) px-8 py-4">
      <a
        className="text-[1.75rem] font-extrabold tracking-[-0.03em] text-(--text) no-underline hover:text-(--primary)"
        href="#hero"
      >
        FairFly
      </a>
      <nav className="hidden md:block">
        <ul className="flex list-none justify-between gap-8">
          <li>
            <a
              className="font-semibold text-(--text) no-underline hover:text-(--primary)"
              href="#trips"
            >
              Trips
            </a>
          </li>
          <li>
            <a
              className="font-semibold text-(--text) no-underline hover:text-(--primary)"
              href="#plan-your-trip"
            >
              Plan your trip
            </a>
          </li>
          <li>
            <a
              className="font-semibold text-(--text) no-underline hover:text-(--primary)"
              href="#testimonials"
            >
              Testimonials
            </a>
          </li>
        </ul>
      </nav>
      <button
        className="md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>
      {menuOpen && (
        <nav className="absolute left-0 top-full w-full bg-(--background) p-6 md:hidden">
          <ul className="flex list-none flex-col gap-6 items-center ">
            <li>
              <a href="#trips" onClick={() => setMenuOpen(false)}>
                Trips
              </a>
            </li>
            <li>
              <a href="#plan-your-trip" onClick={() => setMenuOpen(false)}>
                Plan your trip
              </a>
            </li>
            <li>
              <a href="#testimonials" onClick={() => setMenuOpen(false)}>
                Testimonials
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
