import React, { useState, useEffect } from 'react';
import api from '../api';
import './Testimonials.css';

const Testimonials = () => {
  const [testimonialData, setTestimonialData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    api.getTestimonials()
      .then(data => { setTestimonialData(data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (testimonialData.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonialData.length]);

  const goToPrev = () => {
    if (testimonialData.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + testimonialData.length) % testimonialData.length);
  };

  const goToNext = () => {
    if (testimonialData.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % testimonialData.length);
  };

  if (testimonialData.length === 0) {
    return (
      <section
        className="testimonials"
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/masalamagic/Background.png)` }}
      >
        <div className="testimonials-container">
          <h3>TESTIMONIALS</h3>
          <p className="testimonials-subtitle">WHAT CUSTOMERS SAY ABOUT US</p>
          <div className="wave-divider">〰️〰️</div>
          <p style={{ textAlign: 'center', color: '#ccc', padding: '40px 0' }}>No testimonials yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="testimonials"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/masalamagic/Background.png)` }}
    >
      <div className="testimonials-container">
        <h3>TESTIMONIALS</h3>
        <p className="testimonials-subtitle">WHAT CUSTOMERS SAY ABOUT US</p>
        <div className="wave-divider">〰️〰️</div>

        <div className="testimonial-content">
          <p className="testimonial-text">
            "{testimonialData[currentIndex].text}"
          </p>
          <div className="testimonial-author">
            <span className="author-name">{testimonialData[currentIndex].name}</span>
            <span className="author-location">- {testimonialData[currentIndex].location}</span>
          </div>
        </div>

        <div className="testimonial-dots">
          {testimonialData.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button className="testimonial-arrow prev" onClick={goToPrev} aria-label="Previous testimonial">‹</button>
        <button className="testimonial-arrow next" onClick={goToNext} aria-label="Next testimonial">›</button>
      </div>
    </section>
  );
};

export default Testimonials;
