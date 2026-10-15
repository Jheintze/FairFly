export default function Testimonials() {
  return (
    <section id="testimonials" className="px-8 py-24">
      <h2 className="mb-16 text-center text-[3rem] font-bold">
        What our travelers say
      </h2>
      <div className="mx-auto flex max-w-[1500px] justify-between gap-28 max-[1050px]:gap-12 max-[750px]:flex-col max-[750px]:items-center">
        <article className="max-w-[350px] text-center">
          <img
            src="images/kate simmins.webp"
            alt="image of a young woman with dark hair"
            className="mb-8 h-50 w-50 rounded-full object-cover"
          />
          <h3 className="mb-3 text-[1.17em] font-bold">Kate Simmins</h3>
          <blockquote>
            Our trip to Japan was incredible from start to finish. FairFly made
            everything easy, and every part of the journey was perfectly
            organized.
          </blockquote>
        </article>

        <article className="max-w-[350px] text-center">
          <img
            src="images/ales dusa.webp"
            alt="black and white image of an old man"
            className="mb-8 h-50 w-50 rounded-full object-cover"
          />
          <h3 className="mb-3 text-[1.17em] font-bold">Ales Dusa</h3>
          <blockquote>
            FairFly took care of everything and made the whole experience
            completely stress-free. I was impressed by the organization and
            would book again.
          </blockquote>
        </article>

        <article className="max-w-[350px] text-center">
          <img
            src="images/brooke balentine.webp"
            alt="image of a smiling young woman with blonde hair and glasses"
            className="mb-8 h-50 w-50 rounded-full object-cover"
          />
          <h3 className="mb-3 text-[1.17em] font-bold">Brooke Balentine</h3>
          <blockquote>
            Everything about our trip was fantastic. FairFly made the experience
            simple and enjoyable, and we came home with some amazing memories.
          </blockquote>
        </article>
      </div>
    </section>
  );
}
