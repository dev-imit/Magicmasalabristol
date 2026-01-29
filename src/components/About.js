import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-content">
          <span className="about-subtitle">Meet The Master</span>
          <h2>Passion for Flavor, Dedication to Quality</h2>
          <p className="about-description">
            <span className="chef-name">Chef Sunil</span> is a Bangalore University–trained culinary professional with global experience at the Taj Group, Marriott Goa, and international cruise liners across Miami and the West Indies. Now based in the UK, he refined his French culinary skills at Brasserie Blanc, London, under Michelin-starred chef Raymond Blanc, and continues his culinary journey with passion and excellence.
          </p>
          <div className="about-quote">
            <div className="quote-icon">"</div>
            <p>
              "I believe that great food starts with the finest ingredients. My philosophy is simple: farm-to-table freshness combined with innovative techniques to create unforgettable dining experiences."
            </p>
            <div className="quote-line"></div>
          </div>
        </div>
        <div className="about-images">
          <div className="image-frame frame-back">
            <img src="/masalamagic/chef1.jpeg" alt="Chef" />
          </div>
          <div className="image-frame frame-front">
            <img src="/masalamagic/chef.jpeg" alt="Chef cooking" />
          </div>
        </div>
      </div>
      <img src="/masalamagic/burger-shape.png" alt="" className="floating-shape shape-burger" />
      <img src="/masalamagic/fry-shape.png" alt="" className="floating-shape shape-fry" />
    </section>
  );
};

export default About;
