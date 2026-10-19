import Header from "../components/Header";
import Hero from "../components/Hero";
import Trips from "../components/Trips";
import PlanYourTripCTA from "../components/PlanYourTripCTA";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Trips />
        <PlanYourTripCTA />
        <Testimonials />
      </main>

      <Footer />
    </>
  );
}
