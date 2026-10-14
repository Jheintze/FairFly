import trips from "../data/trips.js"

export default function Trips() {
  return (
    <section id="trips">
      <h2>Trips</h2>
      <p className="trips-intro">
        All packages include flights, accommodation and selected activities.
      </p>
      
      <div className="trips-grid">
      {trips.map((trip) => (
        <article key={trip.id}>
        <img src={trip.image}/>
          <div className="card-content">
            <h3>{trip.title}</h3>
            <p>
             {trip.description}
            </p>
            <p>{trip.duration} days · €{trip.price.toLocaleString("en-GB")}</p>
          </div>
        </article>
      ))}
      </div>
    </section>
  );
}
