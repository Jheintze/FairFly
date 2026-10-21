import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="w-full bg-forest px-5 py-12 text-paper sm:px-8 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <Logo inverted />
          <p className="text-sm text-paper/70">Travel your way.</p>
        </div>

        <div className="my-8 border-t border-paper/15" />

        <div className="grid grid-cols-1 items-center gap-3 text-sm sm:grid-cols-3">
          <p className="text-paper/65 sm:justify-self-start">
            &copy; 2026 FairFly
          </p>

          <a
            className="text-paper/85 no-underline transition-opacity hover:opacity-70 sm:justify-self-center"
            href="#hero"
          >
            ↑ Back to top
          </a>

          <a
            className="text-paper/85 no-underline transition-opacity hover:opacity-70 sm:justify-self-end"
            href="mailto:hello@fairfly.example"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
