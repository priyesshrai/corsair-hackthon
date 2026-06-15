"use client";

import { useEffect, useState } from "react";
import { display, mono } from "@/lib/fonts";
import { GoogleIcon, GithubIcon } from "./icons";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

export type AuthMode = "login" | "signup";

interface AuthModalProps {
  open: boolean;
  mode: AuthMode;
  onClose: () => void;
  onModeChange: (mode: AuthMode) => void;
}

export default function AuthModal({
  open,
  mode,
  onClose,
  onModeChange,
}: AuthModalProps) {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const isLogin = mode === "login";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-sm rounded-lg border border-line bg-surface p-6 shadow-2xl shadow-black/50"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        <div className="flex items-center justify-between">
          <h2
            id="auth-modal-title"
            className={`${display.className} text-lg font-semibold`}
          >
            {isLogin ? "Sign in to Relay" : "Create your account"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-muted transition hover:text-ink"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 2l12 12M14 2L2 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* OAuth options */}
        <div className="mt-5 flex flex-col gap-2">
          <button
            type="button"
            onClick={async () => {
              try {
                setIsGoogleLoading(true);

                await authClient.signIn.social({
                  provider: "google",
                });
              } finally {
                setIsGoogleLoading(false);
              }
            }}
            className="flex items-center justify-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm font-medium transition hover:border-muted"
          >
            {isGoogleLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <GoogleIcon />
            )}

            {isGoogleLoading ? "Redirecting..." : "Continue with Google"}
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm font-medium transition hover:border-muted"
          >
            <GithubIcon />
            Continue with GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-line" />
          <span
            className={`${mono.className} text-[11px] uppercase tracking-wide text-muted`}
          >
            or
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>

        {/* Email / password */}
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label
              htmlFor="auth-email"
              className="mb-1 block text-xs text-muted"
            >
              Email
            </label>
            <input
              id="auth-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              className="w-full rounded-md border border-line bg-canvas px-3 py-2 text-sm text-ink outline-none transition focus:border-accent-2 focus:ring-2 focus:ring-accent-2-soft"
            />
          </div>
          <div>
            <label
              htmlFor="auth-password"
              className="mb-1 block text-xs text-muted"
            >
              Password
            </label>
            <input
              id="auth-password"
              name="password"
              type="password"
              required
              autoComplete={isLogin ? "current-password" : "new-password"}
              placeholder="••••••••"
              className="w-full rounded-md border border-line bg-canvas px-3 py-2 text-sm text-ink outline-none transition focus:border-accent-2 focus:ring-2 focus:ring-accent-2-soft"
            />
          </div>
          <button
            type="submit"
            className="mt-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            {isLogin ? "Sign in" : "Create account"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-muted">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => onModeChange(isLogin ? "signup" : "login")}
            className="text-ink underline-offset-2 hover:underline"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
