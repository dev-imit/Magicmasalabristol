import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <h2>Contact Us</h2>
      
      <div className="contact-container">
        <div className="contact-main">
          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2627.163639391481!2d-2.5182571!3d51.4800932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48718fe67e13d5dd%3A0x81d91a8c87cde405!2s5%20Ledbury%20Rd%2C%20Bristol%20BS16%204AE%2C%20UK!5e1!3m2!1sen!2sin!4v1769575111736!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '8px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Magic Masala Bristol Location"
            ></iframe>
          </div>
          
          <div className="contact-form-wrapper">
            <form className="contact-form">
              <div className="form-field">
                <input type="text" placeholder="Name" />
              </div>
              <div className="form-field">
                <input type="email" placeholder="Email address" />
              </div>
              <div className="form-field">
                <textarea placeholder="Message"></textarea>
              </div>
              <button type="submit" className="submit-btn">Send now</button>
            </form>
          </div>
        </div>
        
        <div className="contact-info">
          <div className="info-item">
            <div className="info-icon">📞</div>
            <div className="info-content">
              <h4>Call</h4>
              <p>+447883073410</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">✉️</div>
            <div className="info-content">
              <h4>Email</h4>
              <p>magicmasalabristol@gmail.com</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">📍</div>
            <div className="info-content">
              <h4>Location</h4>
              <p>Bristol, UK</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
