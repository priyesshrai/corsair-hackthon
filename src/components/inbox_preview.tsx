import { display, mono } from "@/lib/fonts";

const emails = [
  {
    from: "Priya Sharma",
    subject: "Re: Q3 roadmap — move to Thursday?",
    time: "2m",
    priority: true,
  },
  {
    from: "Linear",
    subject: "Issue #482 closed by your last commit",
    time: "1h",
    priority: false,
  },
  {
    from: "Corsair",
    subject: "Calendar synced — 3 events updated",
    time: "3h",
    priority: true,
  },
];

const events = [
  { time: "10:00", title: "Design review", status: "Invite sent" },
  { time: "14:30", title: "1:1 with Priya", status: "+ Add guest" },
];

export default function InboxPreview() {
  return (
    <div className="rounded-lg border border-line bg-surface shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className={`${display.className} text-sm font-medium`}>Inbox</span>
        <span
          className={`${mono.className} rounded border border-line px-2 py-0.5 text-[11px] text-muted`}
        >
          ⌘K
        </span>
      </div>

      <ul>
        {emails.map((email, i) => (
          <li
            key={email.from}
            className={`group flex items-center gap-3 px-4 py-3 transition hover:bg-surface-2 ${
              i !== emails.length - 1 ? "border-b border-line" : ""
            }`}
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{
                backgroundColor: email.priority ? "#5b7cff" : "transparent",
              }}
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm">{email.from}</p>
              <p className="truncate text-xs text-muted">{email.subject}</p>
            </div>
            <span
              className={`${mono.className} text-xs text-muted group-hover:hidden`}
            >
              {email.time}
            </span>
            <span
              className={`${mono.className} hidden items-center gap-1 text-[11px] text-muted group-hover:flex`}
            >
              <kbd className="rounded border border-line px-1.5 py-0.5">R</kbd>
              <kbd className="rounded border border-line px-1.5 py-0.5">E</kbd>
            </span>
          </li>
        ))}
      </ul>

      <div className="border-t border-line px-4 py-3">
        <p className={`${mono.className} mb-2 text-[11px] uppercase tracking-wide text-muted`}>
          Today
        </p>
        <ul className="space-y-2">
          {events.map((event) => (
            <li key={event.title} className="flex items-center justify-between gap-3 text-sm">
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: "var(--accent-2)" }}
                  aria-hidden="true"
                />
                <span className={`${mono.className} shrink-0 text-xs text-muted`}>
                  {event.time}
                </span>
                <span className="truncate">{event.title}</span>
              </div>
              <span className={`${mono.className} shrink-0 text-[11px] text-accent-2`}>
                {event.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}