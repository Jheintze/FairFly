"use client";

import { useEffect, } from "react";
import { createPortal } from "react-dom";
import { AuthView } from "@neondatabase/auth-ui";

export default function AuthModal({ isOpen, onClose, mode, onModeChange }) {
  
  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-70 flex items-center justify-center bg-ink/55 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="auth-modal relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-paper p-6 shadow-[0_24px_60px_rgba(23,36,31,0.28)] ring-1 ring-line"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={mode === "SIGN_UP" ? "Sign up" : "Log in"}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close authentication modal"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-2xl leading-none text-muted transition hover:bg-sand hover:text-ink"
        >
          ×
        </button>

        <div className="mb-6 flex gap-3 border-b border-line">
          <button
            type="button"
            onClick={() => onModeChange("SIGN_IN")}
            className={`flex-1 pb-3 font-semibold transition ${
              mode === "SIGN_IN"
                ? "border-b-2 border-clay text-clay"
                : "text-muted hover:text-ink"
            }`}
          >
            Log in
          </button>

          <button
            type="button"
            onClick={() => onModeChange("SIGN_UP")}
            className={`flex-1 pb-3 font-semibold transition ${
              mode === "SIGN_UP"
                ? "border-b-2 border-clay text-clay"
                : "text-muted hover:text-ink"
            }`}
          >
            Sign up
          </button>
        </div>

        <AuthView view={mode} />
      </div>
    </div>,
    document.body,
  );
}
