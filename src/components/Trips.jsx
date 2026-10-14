export default function Trips() {
  return (
    <section id="trips">
      <h2>Trips</h2>
      <p className="trips-intro">
        All packages include flights, accommodation and selected activities.
      </p>

      <div className="trips-grid">
        <article>
          <img
            src="images/turkey.webp"
            alt="mosque and public place with trees in Turkey"
          />
          <div className="card-content">
            <h3>Turkey</h3>
            <p>
              Discover Istanbul&apos;s historic landmarks, local cuisine and
              vibrant culture.
            </p>
            <p>7 days · €1,799</p>
          </div>
        </article>

        <article>
          <img
            src="images/japan.webp"
            alt="snow capped mountain with city in front and Japanese building in foreground"
          />
          <div className="card-content">
            <h3>Japan</h3>
            <p>
              Explore Tokyo and Kyoto, visit Mount Fuji and experience
              traditional Japan.
            </p>
            <p>14 days · €3,499</p>
          </div>
        </article>

        <article>
          <img
            src="images/peru.webp"
            alt="green mountains in Peru with a big llama in the foreground"
          />
          <div className="card-content">
            <h3>Peru</h3>
            <p>
              Travel through the Andes, explore Cusco and discover the ancient
              city of Machu Picchu.
            </p>
            <p>10 days · €2,299</p>
          </div>
        </article>

        <article>
          <img
            src="images/namibia.webp"
            alt="dusty road in Namibia with zebras crossing"
          />
          <div className="card-content">
            <h3>Namibia</h3>
            <p>
              Experience the Namib Desert, spot wildlife on safari and explore
              Namibia&apos;s vast landscapes.
            </p>
            <p>12 days · €2,799</p>
          </div>
        </article>

        <article>
          <img
            src="images/sweden.webp"
            alt="Aurora borealis over a Swedish landscape with a tent in the snow"
          />
          <div className="card-content">
            <h3>Sweden</h3>
            <p>
              Explore Stockholm, discover the northern wilderness and experience
              the Northern Lights.
            </p>
            <p>6 days · €1,699</p>
          </div>
        </article>

        <article>
          <img
            src="images/vietnam.webp"
            alt="green mountains and a bay with boats in Vietnam"
          />
          <div className="card-content">
            <h3>Vietnam</h3>
            <p>
              Discover Hanoi, cruise Ha Long Bay and experience Vietnam&apos;s
              unique food and culture.
            </p>
            <p>11 days · €2,099</p>
          </div>
        </article>
      </div>
    </section>
  );
}
