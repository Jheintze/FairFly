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
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const solid = scrolled || menuOpen;

  const userName =
    session?.user?.name?.trim() ||
    session?.user?.email?.split("@")[0] ||
    "Traveler";

  const firstName = userName.split(/\s+/)[0];
  const initial = firstName.charAt(0).toUpperCase();

  useEffect(() => {
    if (session) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setModalOpen(false);
    } else {
      setUserMenuOpen(false);
    }
  }, [session]);

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

  const handleSignOut = async () => {
    setUserMenuOpen(false);
    setMenuOpen(false);
    await authClient.signOut();
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
              <li className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  aria-expanded={userMenuOpen}
                  className="flex cursor-pointer items-center gap-2.5 rounded-full px-1.5 py-1 transition-opacity hover:opacity-80"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-clay text-sm font-bold text-paper">
                    {initial}
                  </span>

                  <span className={navLinkClass}>
                    Hi, {firstName}
                  </span>

                  <svg
                    className={`h-3.5 w-3.5 transition-transform ${
                      solid ? "text-ink/70" : "text-paper/80"
                    } ${userMenuOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="m5 7.5 5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-3 w-48 overflow-hidden rounded-2xl border border-line bg-paper p-2 shadow-[0_12px_35px_rgba(23,36,31,0.14)]">
                    <div className="border-b border-line px-3 py-2">
                      <p className="text-sm font-semibold text-ink">
                        {userName}
                      </p>
                      <p className="truncate text-xs text-muted">
                        {session.user.email}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="mt-1 w-full cursor-pointer rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-ink transition-colors hover:bg-sand hover:text-clay"
                    >
                      Log out
                    </button>
                  </div>
                )}
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
            } ${menuOpen ? "top-1/2 rotate-45" : "top-4"}`}
          />
          <span
            className={`absolute left-3 right-3 h-0.5 rounded-full transition-all duration-200 ${
              solid ? "bg-ink" : "bg-paper"
            } ${menuOpen ? "top-1/2 -rotate-45" : "top-6.5"}`}
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
              <>
                <li className="mt-4 flex items-center justify-center gap-3 rounded-2xl bg-paper p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-clay text-base font-bold text-paper">
                    {initial}
                  </span>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-ink">
                      Hi, {firstName}!
                    </p>
                    <p className="max-w-56 truncate text-xs text-muted">
                      {session.user.email}
                    </p>
                  </div>
                </li>
                <li>
                  <button
                    type="button"
                    className="mt-2 w-full cursor-pointer rounded-full border border-line bg-paper px-4 py-3 font-semibold text-ink transition hover:bg-sand"
                    onClick={handleSignOut}
                  >
                    Log out
                  </button>
                </li>
              </>
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