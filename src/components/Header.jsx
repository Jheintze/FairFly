"use client";

import { useState, useEffect } from "react";
import AuthModal from "./AuthModal";
import { authClient } from "@/lib/auth/client";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("SIGN_IN");

  const { data: session } = authClient.useSession();
 
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between bg-(--background) px-8 py-4">
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
          {session ? (
            <li>
              <button
                className="font-semibold text-(--text) hover:text-(--primary)"
                onClick={async () => {
                  await authClient.signOut();
                }}
              >
                Log out
              </button>
            </li>
          ) : (
            <>
              <li>
                <button
                  className="font-semibold text-(--text) hover:text-(--primary)"
                  onClick={() => {
                    setAuthMode("SIGN_IN");
                    setModalOpen(true);
                  }}
                >
                  Log in
                </button>
              </li>
              <li>
                <button
                  className="font-semibold text-(--text) hover:text-(--primary)"
                  onClick={() => {
                    setAuthMode("SIGN_UP");
                    setModalOpen(true);
                  }}
                >
                  Sign up
                </button>
              </li>
            </>
          )}
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
            {session ? (
              <li>
                <button
                  className="font-semibold text-(--text) hover:text-(--primary)"
                  onClick={async () => {
                    await authClient.signOut();
                    setMenuOpen(false);
                  }}
                >
                  Log out
                </button>
              </li>
            ) : (
              <>
                <li>
                  <button
                    className="font-semibold text-(--text) hover:text-(--primary)"
                    onClick={() => {
                      setAuthMode("SIGN_IN");
                      setModalOpen(true);
                      setMenuOpen(false);
                    }}
                  >
                    Log in
                  </button>
                </li>
                <li>
                  <button
                    className="font-semibold text-(--text) hover:text-(--primary)"
                    onClick={() => {
                      setAuthMode("SIGN_UP");
                      setModalOpen(true);
                      setMenuOpen(false);
                    }}
                  >
                    Sign up
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
      <AuthModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </header>
  );
}
