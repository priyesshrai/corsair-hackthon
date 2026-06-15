import type { Metadata } from "next";
import { sans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Relay — Email and calendar, the way you work",
  description:
    "Relay rebuilds Gmail and Google Calendar around your workflow — search, draft, send, and schedule, powered by Corsair integrations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${sans.className} bg-canvas text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}