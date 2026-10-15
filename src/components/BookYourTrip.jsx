export default function BookYourTrips() {
  return (
    <section
      id="book-your-trip"
      className="flex min-h-screen flex-col items-center justify-start bg-[url(../images/CTA.webp)] bg-cover bg-center bg-no-repeat pt-24 text-center"
    >
      <div className="text-center text-(--white)">
        <h2 className="mb-6 text-[3.5rem] font-bold [text-shadow:0_3px_10px_rgba(0,0,0,0.6)]">
          Plan your next adventure
        </h2>
        <a
          href="#trips"
          className="inline-block rounded bg-(--text) px-10 py-4 text-[1.1rem] font-bold text-(--white) no-underline transition-[transform,box-shadow] duration-200 ease-[ease] hover:-translate-y-0.5 hover:text-(--white) hover:shadow-[0_6px_16px_rgba(0,0,0,0.25)]"
        >
          Book your trip
        </a>
      </div>
    </section>
  );
}
