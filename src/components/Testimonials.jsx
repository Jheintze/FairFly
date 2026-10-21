import Image from "next/image";

const testimonials = [
  {
    name: "Kate Simmins",
    image: "/images/kate simmins.webp",
    alt: "Portrait of Kate Simmins",
    quote:
      "Our trip to Japan was incredible from start to finish. FairFly made everything easy, and every part of the journey was perfectly organized.",
  },
  {
    name: "Ales Dusa",
    image: "/images/ales dusa.webp",
    alt: "Portrait of Ales Dusa",
    quote:
      "FairFly took care of everything and made the whole experience completely stress-free. I was impressed by the organization and would book again.",
  },
  {
    name: "Brooke Balentine",
    image: "/images/brooke balentine.webp",
    alt: "Portrait of Brooke Balentine",
    quote:
      "Everything about our trip was fantastic. FairFly made the experience simple and enjoyable, and we came home with some amazing memories.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-24 bg-sand/50 px-5 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto mb-14 max-w-6xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-clay">
          Traveler stories
        </p>
        <h2 className="font-display text-4xl font-medium tracking-[-0.03em] text-ink sm:text-5xl">
          What our travelers say
        </h2>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {testimonials.map((item) => (
          <article
            key={item.name}
            className="rounded-3xl bg-paper px-6 py-8 text-center shadow-[0_12px_32px_rgba(23,36,31,0.06)] ring-1 ring-line/80"
          >
            <div className="relative mx-auto mb-6 h-24 w-24 overflow-hidden rounded-full ring-4 ring-sand">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <h3 className="font-display text-xl font-medium text-ink">
              {item.name}
            </h3>
            <blockquote className="mt-3 text-[0.95rem] leading-relaxed text-muted">
              <span className="font-display mr-1 text-2xl leading-none text-clay">
                “
              </span>
              {item.quote}
              ”
            </blockquote>
          </article>
        ))}
      </div>
    </section>
  );
}
