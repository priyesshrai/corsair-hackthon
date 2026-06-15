export default function Footer() {
  return (
    <footer className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-muted sm:flex-row">
      <p>© 2026 Relay. Built on Corsair.</p>
      <div className="flex items-center gap-4">
        <a href="#" className="transition hover:text-ink">
          GitHub
        </a>
        <a href="#" className="transition hover:text-ink">
          Twitter
        </a>
      </div>
    </footer>
  );
}