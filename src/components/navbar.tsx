"use client";

import { display } from "@/lib/fonts";

interface NavbarProps {
  onSignIn: () => void;
  onGetStarted: () => void;
}

export default function Navbar({ onSignIn, onGetStarted }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas-translucent backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <RelayMark />
          <span className={`${display.className} text-lg font-semibold tracking-tight`}>
            Relay
          </span>
        </div>

        <nav className="flex items-center gap-3">
          <button
            onClick={onSignIn}
            className="rounded-md px-3 py-2 text-sm text-muted transition hover:text-ink"
          >
            Sign in
          </button>
          <button
            onClick={onGetStarted}
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Get started
          </button>
        </nav>
      </div>
    </header>
  );
}

function RelayMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <rect x="1" y="1" width="9" height="9" rx="2" style={{ fill: "var(--accent)" }} />
      <rect x="12" y="12" width="9" height="9" rx="2" style={{ fill: "var(--accent-2)" }} />
      <rect
        x="12"
        y="1"
        width="9"
        height="9"
        rx="2"
        fill="none"
        style={{ stroke: "var(--line)" }}
        strokeWidth="1.5"
      />
      <rect
        x="1"
        y="12"
        width="9"
        height="9"
        rx="2"
        fill="none"
        style={{ stroke: "var(--line)" }}
        strokeWidth="1.5"
      />
    </svg>
  );
}