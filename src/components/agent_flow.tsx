"use client";

import { useEffect, useState } from "react";
import { display, mono } from "@/lib/fonts";
import { GmailIcon, CalendarIcon } from "./icons";

const scenarios = [
  {
    prompt: "Reply to Priya and move our sync to Thursday at 2pm",
    steps: [
      "Checked your calendar — Thursday 2pm is free",
      "Moved the event and sent the update",
      "Replied to Priya in Gmail",
    ],
  },
  {
    prompt: "Find a free hour tomorrow and invite the design team",
    steps: [
      "Scanned tomorrow's calendar",
      "Created a 1-hour slot at 11:00",
      "Sent invites to the design team",
    ],
  },
  {
    prompt: "Draft a follow-up to yesterday's client thread",
    steps: [
      "Found yesterday's thread with the client",
      "Drafted a follow-up email",
      "Saved it to your drafts",
    ],
  },
];

const TYPE_SPEED = 35; // ms per character
const STEP_GAP = 650; // ms between each revealed step
const HOLD = 2200; // ms to hold the finished state before resetting

export default function AgentFlow() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [visibleSteps, setVisibleSteps] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const scenario = scenarios[scenarioIndex];

    timers.push(
      setTimeout(() => {
        if (!cancelled) {
          setTyped("");
          setVisibleSteps(0);
        }
      }, 0),
    );

    for (let i = 0; i <= scenario.prompt.length; i++) {
      timers.push(
        setTimeout(() => {
          if (!cancelled) setTyped(scenario.prompt.slice(0, i));
        }, TYPE_SPEED * i),
      );
    }

    const typingDone = TYPE_SPEED * scenario.prompt.length;

    scenario.steps.forEach((_, i) => {
      timers.push(
        setTimeout(
          () => {
            if (!cancelled) setVisibleSteps(i + 1);
          },
          typingDone + 400 + i * STEP_GAP,
        ),
      );
    });

    const cycleEnd = typingDone + 400 + scenario.steps.length * STEP_GAP + HOLD;
    timers.push(
      setTimeout(() => {
        if (!cancelled) setScenarioIndex((s) => (s + 1) % scenarios.length);
      }, cycleEnd),
    );

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [scenarioIndex]);

  const scenario = scenarios[scenarioIndex];

  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="mb-8 max-w-xl">
          <span
            className={`${mono.className} inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs text-muted`}
          >
            <LiveDot color="var(--accent)" />
            Agent mode
          </span>
          <h2
            className={`${display.className} mt-4 text-2xl font-semibold tracking-tight sm:text-3xl`}
          >
            Connect once. Then just ask.
          </h2>
          <p className="mt-2 text-sm text-muted">
            Relay links to Gmail and Google Calendar through Corsair. From
            there, describe what you need in plain language — the agent checks
            your inbox and schedule, then makes the changes.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
          {/* Step 1 — Connect */}
          <div className="rounded-lg border border-line bg-surface p-4">
            <p
              className={`${mono.className} mb-3 text-[11px] uppercase tracking-wide text-muted`}
            >
              Connect
            </p>
            <div className="flex flex-col gap-2">
              <ConnectionRow
                icon={<GmailIcon />}
                label="Gmail"
                dotColor="var(--accent)"
              />
              <ConnectionRow
                icon={<CalendarIcon />}
                label="Google Calendar"
                dotColor="var(--accent-2)"
              />
            </div>
          </div>

          <FlowArrow />

          {/* Step 2 — Ask */}
          <div className="rounded-lg border border-line bg-surface p-4">
            <p
              className={`${mono.className} mb-3 text-[11px] uppercase tracking-wide text-muted`}
            >
              You ask
            </p>
            <div className="rounded-md border border-line bg-canvas px-3 py-2.5">
              <p
                className={`${mono.className} min-h-[3.5em] text-sm leading-relaxed`}
              >
                {typed}
                <span className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 animate-pulse bg-accent" />
              </p>
            </div>
          </div>

          <FlowArrow />

          {/* Step 3 — Done */}
          <div className="rounded-lg border border-line bg-surface p-4">
            <p
              className={`${mono.className} mb-3 text-[11px] uppercase tracking-wide text-muted`}
            >
              Relay handles it
            </p>
            <ul className="flex flex-col gap-2">
              {scenario.steps.map((step, i) => (
                <li
                  key={step}
                  className={`flex items-start gap-2 text-sm transition-all duration-500 ${
                    i < visibleSteps
                      ? "translate-y-0 opacity-100"
                      : "translate-y-1 opacity-0"
                  }`}
                >
                  <span className="mt-0.5 shrink-0 text-accent-2">
                    ✓
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConnectionRow({
  icon,
  label,
  dotColor,
}: {
  icon: React.ReactNode;
  label: string;
  dotColor: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-md border border-line bg-canvas px-3 py-2.5">
      <div className="flex items-center gap-2.5">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <span className="flex items-center gap-1.5">
        <LiveDot color={dotColor} />
        <span className={`${mono.className} text-[11px] text-muted`}>
          Connected
        </span>
      </span>
    </div>
  );
}

function LiveDot({ color }: { color: string }) {
  return (
    <span className="relative flex h-2 w-2" aria-hidden="true">
      <span
        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
        style={{ backgroundColor: color }}
      />
      <span
        className="relative inline-flex h-2 w-2 rounded-full"
        style={{ backgroundColor: color }}
      />
    </span>
  );
}

function FlowArrow() {
  return (
    <svg
      width="40"
      height="16"
      viewBox="0 0 40 16"
      aria-hidden="true"
      className="hidden self-center lg:block"
    >
      <line
        x1="0"
        y1="8"
        x2="32"
        y2="8"
        stroke="var(--line)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        className="flow-dash"
      />
      <path
        d="M29 3 L36 8 L29 13"
        fill="none"
        stroke="var(--line)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <style jsx>{`
        @keyframes flow-dash {
          to {
            stroke-dashoffset: -8;
          }
        }
        .flow-dash {
          animation: flow-dash 0.8s linear infinite;
        }
      `}</style>
    </svg>
  );
}
