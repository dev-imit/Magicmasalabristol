import React, { useState, useEffect } from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      text: "The birthday event organized by Magic Masala Catering was absolutely wonderful. The food was delicious, well-presented, and loved by everyone. Special thanks to Chef Sunil for his exceptional taste and dedication—it truly made the celebration memorable.",
      name: "Jennifer",
      location: "From Bristol, UK"
    },
    {
      text: "The office party catering provided by Magic Masala Catering was excellent. The food was flavorful, professionally presented and enjoyed by everyone. A special mention to Chef Sunil for his outstanding culinary—it truly elevated the entire event.",
      name: "Sarah",
      location: "From Bristol, UK"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section 
      className="testimonials"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/masalamagic/Background.png)` }}
    >
      <div className="testimonials-container">
        <h3>TESTIMONIALS</h3>
        <p className="testimonials-subtitle">WHAT CUSTOMER SAY ABOUT US</p>
        <div className="wave-divider">〰️〰️</div>
        
        <div className="testimonial-content">
          <p className="testimonial-text">
            "{testimonials[currentIndex].text}"
          </p>
          
          <div className="testimonial-author">
            <span className="author-name">{testimonials[currentIndex].name}</span>
            <span className="author-location">- {testimonials[currentIndex].location}</span>
          </div>
        </div>
        
        <button className="testimonial-arrow prev" onClick={goToPrev}>‹</button>
        <button className="testimonial-arrow next" onClick={goToNext}>›</button>
      </div>
    </section>
  );
};

export default Testimonials;
