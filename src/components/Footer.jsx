export default function Footer() {
  return (
    <footer className="w-full bg-(--text) px-6 py-10 text-(--white) sm:px-10 sm:py-12 lg:px-16">
      <div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-2xl font-extrabold tracking-[-0.03em] sm:text-[1.75rem]">
            FairFly
          </p>
          <p className="text-right text-xs opacity-70 sm:text-sm">
            Travel your way.
          </p>
        </div>

        <div className="my-7 border-t border-white/20 sm:my-8" />

        <div className="grid grid-cols-3 items-center gap-2 text-xs sm:gap-4 sm:text-sm">
          <p className="justify-self-start whitespace-nowrap opacity-70">
            &copy; 2026 FairFly
          </p>

          <a
            className="justify-self-center whitespace-nowrap no-underline transition-opacity hover:opacity-70"
            href="#hero"
          >
            &uarr; Back to top
          </a>

          <a
            className="justify-self-end whitespace-nowrap no-underline transition-opacity hover:opacity-70"
            href="mailto:hello@fairfly.example"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
