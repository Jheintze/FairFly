"use client";

import { useState , useEffect } from "react";
import { AuthView } from "@neondatabase/auth-ui";

export default function AuthModal({ isOpen, onClose, mode, onModeChange }) {

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="auth-modal relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close authentication modal"
          className="absolute right-4 top-4 text-2xl text-gray-500 hover:text-gray-900"
        >
          ×
        </button>

        <div className="mb-6 flex gap-3 border-b">
          <button
            type="button"
            onClick={() => onModeChange("SIGN_IN")}
            className={`flex-1 pb-3 font-semibold ${
              mode === "SIGN_IN"
                ? "border-b-2 border-(--primary) text-(--primary)"
                : "text-gray-500"
            }`}
          >
            Log in
          </button>

          <button
            type="button"
            onClick={() => onModeChange("SIGN_UP")}
            className={`flex-1 pb-3 font-semibold ${
              mode === "SIGN_UP"
                ? "border-b-2 border-(--primary) text-(--primary)"
                : "text-gray-500"
            }`}
          >
            Sign up
          </button>
        </div>

        <AuthView view={mode} />
      </div>
    </div>
  );
}
