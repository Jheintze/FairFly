"use client";

import { useEffect, useState } from "react";
import AuthModal from "./AuthModal";
import Logo from "./Logo";
import { authClient } from "@/lib/auth/client";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("SIGN_IN");
  const [scrolled, setScrolled] = useState(false);

  const { data: session } = authClient.useSession();
  const solid = scrolled || menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinkClass = solid
    ? "text-sm font-semibold tracking-wide text-ink/80 no-underline transition-colors hover:text-clay"
    : "text-sm font-semibold tracking-wide text-paper/90 no-underline transition-colors hover:text-paper";

  const openAuth = (mode) => {
    setAuthMode(mode);
    setModalOpen(true);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        solid
          ? "bg-linen/90 shadow-[0_8px_30px_rgba(23,36,31,0.08)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Logo inverted={!solid} />

        <nav className="hidden md:block" aria-label="Primary">
          <ul className="flex list-none items-center gap-8">
            <li>
              <a className={navLinkClass} href="#trips">
                Trips
              </a>
            </li>
            <li>
              <a className={navLinkClass} href="#plan-your-trip">
                Plan your trip
              </a>
            </li>
            <li>
              <a className={navLinkClass} href="#testimonials">
                Testimonials
              </a>
            </li>
            {session ? (
              <li>
                <button
                  type="button"
                  className={`${navLinkClass} cursor-pointer`}
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
                    type="button"
                    className={`${navLinkClass} cursor-pointer`}
                    onClick={() => openAuth("SIGN_IN")}
                  >
                    Log in
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => openAuth("SIGN_UP")}
                    className="cursor-pointer rounded-full bg-clay px-4 py-2 text-sm font-semibold text-paper shadow-[0_8px_20px_rgba(194,78,29,0.28)] transition hover:bg-clay-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/60 focus-visible:ring-offset-2"
                  >
                    Sign up
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>

        <button
          type="button"
          className="relative h-11 w-11 rounded-full md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`absolute left-3 right-3 h-0.5 rounded-full transition-all duration-200 ${
              solid ? "bg-ink" : "bg-paper"
            } ${menuOpen ? "top-1/2 rotate-45" : "top-[16px]"}`}
          />
          <span
            className={`absolute left-3 right-3 h-0.5 rounded-full transition-all duration-200 ${
              solid ? "bg-ink" : "bg-paper"
            } ${menuOpen ? "top-1/2 -rotate-45" : "top-[26px]"}`}
          />
        </button>
      </div>

      {menuOpen && (
        <nav
          className="border-t border-line bg-linen px-5 py-6 shadow-[0_18px_40px_rgba(23,36,31,0.12)] md:hidden"
          aria-label="Mobile"
        >
          <ul className="mx-auto flex max-w-6xl list-none flex-col items-stretch gap-1">
            <li>
              <a
                href="#trips"
                className="block rounded-xl px-3 py-3 text-center text-base font-semibold text-ink no-underline hover:bg-sand"
                onClick={() => setMenuOpen(false)}
              >
                Trips
              </a>
            </li>
            <li>
              <a
                href="#plan-your-trip"
                className="block rounded-xl px-3 py-3 text-center text-base font-semibold text-ink no-underline hover:bg-sand"
                onClick={() => setMenuOpen(false)}
              >
                Plan your trip
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="block rounded-xl px-3 py-3 text-center text-base font-semibold text-ink no-underline hover:bg-sand"
                onClick={() => setMenuOpen(false)}
              >
                Testimonials
              </a>
            </li>
            {session ? (
              <li className="pt-3">
                <button
                  type="button"
                  className="w-full cursor-pointer rounded-full border border-line bg-paper px-4 py-3 font-semibold text-ink hover:bg-sand"
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
                <li className="pt-3">
                  <button
                    type="button"
                    className="w-full cursor-pointer rounded-full border border-line bg-paper px-4 py-3 font-semibold text-ink hover:bg-sand"
                    onClick={() => openAuth("SIGN_IN")}
                  >
                    Log in
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="mt-2 w-full cursor-pointer rounded-full bg-clay px-4 py-3 font-semibold text-paper hover:bg-clay-dark"
                    onClick={() => openAuth("SIGN_UP")}
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
