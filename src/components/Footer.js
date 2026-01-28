import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <img src="/masalamagic/footer-left.png" alt="" className="footer-decoration left" />
      <img src="/masalamagic/footer-right.png" alt="" className="footer-decoration right" />
      
      <div className="footer-container">
        <div className="footer-brand">
          <div className="brand-container">
            <div className="brand-header">
              <img src="/masalamagic/navlogo.png" alt="Magic Masala" />
              <div className="brand-text">
                <h3>MAGIC MASALA</h3>
                <span>Catering Service</span>
              </div>
            </div>
            <p className="brand-description">
              Magic Masala Catering is a UK-based catering service offering authentic, flavorful dishes for all occasions. With fresh ingredients and expert preparation, we deliver memorable food experiences tailored to your event.
            </p>
            <p className="brand-rating">5 star rating by Food Standard Agency UK</p>
          </div>
        </div>
        
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#menu">Package</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>
        
        <div className="footer-newsletter">
          <h4>Newsletter</h4>
          <p>Get recent news and updates.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Email Address" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-divider"></div>
        <p>© 2026 <span>MagicMasala</span> . All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
