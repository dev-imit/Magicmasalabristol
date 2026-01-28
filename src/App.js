import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Hygiene from './components/Hygiene';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <Testimonials />
      <Hygiene />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
