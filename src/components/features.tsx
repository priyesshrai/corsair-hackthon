import { display } from "@/lib/fonts";

type IconVariant = "mail" | "calendar" | "corsair";

const features: { title: string; description: string; icon: IconVariant }[] = [
  {
    title: "Inbox, rebuilt",
    description:
      "Search, draft, and send with shortcuts and views tuned to how you triage mail — not how Gmail thinks you should.",
    icon: "mail",
  },
  {
    title: "Calendar, built in",
    description:
      "Create events, send invites, and check your day without switching apps. Updates sync straight back to Google Calendar.",
    icon: "calendar",
  },
  {
    title: "Powered by Corsair",
    description:
      "Every action runs through Corsair's Gmail and Calendar integrations — reliable, real-time, and yours to extend.",
    icon: "corsair",
  },
];

function FeatureIcon({ variant }: { variant: IconVariant }) {
  if (variant === "corsair") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
        <rect x="1" y="1" width="8" height="8" rx="1.5" style={{ fill: "#5b7cff" }} />
        <rect x="11" y="11" width="8" height="8" rx="1.5" style={{ fill: "#5fd9c7" }} />
      </svg>
    );
  }
  const color = variant === "mail" ? "#5b7cff" : "#5fd9c7";
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <rect x="1" y="1" width="18" height="18" rx="3" style={{ fill: color }} />
    </svg>
  );
}

export default function Features() {
  return (
    <section id="features" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border border-line bg-surface p-5"
            >
              <FeatureIcon variant={feature.icon} />
              <h3 className={`${display.className} mt-3 text-base font-semibold`}>
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}