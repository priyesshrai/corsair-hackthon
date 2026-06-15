"use client";

import { display, mono } from "@/lib/fonts";
import AgentFlow from "./agent_flow";

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        {/* Background Glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-20 h-125 w-125 -translate-x-1/2 rounded-full bg-accent/15 blur-[140px]" />
          <div className="absolute right-0 top-40 h-75 w-75 rounded-full bg-accent-2/10 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
          {/* Announcement */}
          <div className="flex justify-center">
            <div
              className={`${mono.className} inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-xs text-muted`}
            >
              <span className="h-2 w-2 rounded-full bg-accent-2" />
              Gmail • Google Calendar • AI Workflows
            </div>
          </div>

          {/* Heading */}
          <div className="mx-auto mt-8 max-w-5xl text-center">
            <h1
              className={`${display.className} text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl`}
            >
              Tell Relay what
              <br />
              needs to happen.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
              Connect Gmail and Google Calendar once. Then simply ask. Relay
              schedules meetings, sends emails, updates calendars, and executes
              workflows automatically.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <button
                onClick={onGetStarted}
                className="rounded-xl bg-accent px-6 py-3 font-medium text-white transition hover:opacity-90"
              >
                Start Free
              </button>

              <button className="rounded-xl border border-line px-6 py-3 font-medium transition hover:border-muted">
                Watch Demo
              </button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ConnectedApp label="Gmail" />
              <ConnectedApp label="Google Calendar" />
            </div>
          </div>

          <AgentFlow />

          {/* Agent UI */}
          <div className="relative mx-auto mt-20 max-w-5xl">
            <FloatingCard
              className="-left-10 top-10 hidden lg:block"
              text="✓ Gmail Connected"
            />

            <FloatingCard
              className="-right-12 top-24 hidden lg:block"
              text="✓ Email Sent"
            />

            <FloatingCard
              className="bottom-10 left-0 hidden lg:block"
              text="✓ Meeting Created"
            />

            <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_0_80px_rgba(0,0,0,.4)]">
              {/* Header */}
              <div className="flex items-center gap-2 border-b border-line px-5 py-4">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />

                <span className="ml-3 text-sm text-muted">Relay Agent</span>
              </div>

              <div className="grid gap-6 p-6 lg:grid-cols-[1.3fr_1fr]">
                {/* Prompt */}
                <div>
                  <p
                    className={`${mono.className} mb-3 text-xs uppercase tracking-wider text-muted`}
                  >
                    Prompt
                  </p>

                  <div className="rounded-2xl border border-line bg-canvas p-5">
                    <p className="text-sm leading-relaxed">
                      Schedule a meeting with Sarah tomorrow at 3:00 PM and send
                      her an email confirming the meeting details.
                    </p>
                  </div>

                  <div className="mt-6 space-y-3">
                    <TaskStep done text="Gmail connected" />
                    <TaskStep done text="Google Calendar connected" />
                    <TaskStep done text="Finding availability" />
                    <TaskStep done text="Creating calendar event" />
                    <TaskStep done text="Sending email invite" />
                    <TaskStep active text="Workflow completed" />
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-4">
                  <ResultCard
                    title="Meeting Created"
                    description="Tomorrow • 3:00 PM"
                  />

                  <ResultCard
                    title="Email Delivered"
                    description="sarah@company.com"
                  />

                  <ResultCard
                    title="Workflow Status"
                    description="Completed Successfully"
                    success
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-14 flex flex-wrap justify-center gap-8 text-center">
            <Stat value="10k+" label="Tasks Executed" />
            <Stat value="99.9%" label="Success Rate" />
            <Stat value="< 30s" label="Average Completion" />
          </div>
        </div>
      </section>
    </>
  );
}

function ConnectedApp({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm">
      <span className="h-2 w-2 rounded-full bg-accent-2" />
      {label}
    </div>
  );
}

function FloatingCard({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      className={`absolute rounded-xl border border-line bg-surface px-4 py-2 text-sm shadow-xl ${className}`}
    >
      {text}
    </div>
  );
}

function TaskStep({
  text,
  done,
  active,
}: {
  text: string;
  done?: boolean;
  active?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-canvas px-4 py-3">
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
          active
            ? "bg-accent-2 text-black"
            : done
              ? "bg-accent text-white"
              : "border border-line"
        }`}
      >
        ✓
      </div>

      <span className={active ? "text-accent-2" : ""}>{text}</span>
    </div>
  );
}

function ResultCard({
  title,
  description,
  success,
}: {
  title: string;
  description: string;
  success?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-line bg-canvas p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{title}</h3>

        {success && (
          <span className="rounded-full bg-accent-2/20 px-2 py-1 text-xs text-accent-2">
            Success
          </span>
        )}
      </div>

      <p className="mt-2 text-sm text-muted">{description}</p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-semibold">{value}</div>

      <div className="mt-1 text-sm text-muted">{label}</div>
    </div>
  );
}
