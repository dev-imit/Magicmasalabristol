import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Offers from './components/Offers';
import Testimonials from './components/Testimonials';
import Hygiene from './components/Hygiene';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

function PublicSite() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <Offers />
      <Testimonials />
      <Hygiene />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/*" element={<PublicSite />} />
      </Routes>
    </Router>
  );
}

export default App;
