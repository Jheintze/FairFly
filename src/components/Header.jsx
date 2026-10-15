export default function Header() {
  return (
    <header className="sticky top-0 flex items-center justify-between bg-(--background) px-8 py-4">
      <a
        className="text-[1.75rem] font-extrabold tracking-[-0.03em] text-(--text) no-underline hover:text-(--primary)"
        href="#hero"
      >
        FairFly
      </a>
      <nav>
        <ul className="flex list-none justify-between gap-8">
          <li>
            <a
              className="font-semibold text-(--text) no-underline hover:text-(--primary)"
              href="#trips"
            >
              Trips
            </a>
          </li>
          <li>
            <a
              className="font-semibold text-(--text) no-underline hover:text-(--primary)"
              href="#plan-your-trip"
            >
              Plan your trip
            </a>
          </li>
          <li>
            <a
              className="font-semibold text-(--text) no-underline hover:text-(--primary)"
              href="#testimonials"
            >
              Testimonials
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
