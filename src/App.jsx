import Header from "./components/Header";
import Hero from "./components/Hero";
import Trips from "./components/Trips";
import BookYourTrip from "./components/BookYourTrip";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Trips />
        <BookYourTrip />
        <Testimonials />
      </main>

      <Footer />
    </>
  );
}
