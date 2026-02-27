import React, { useState, useEffect } from 'react';
import api from '../api';
import './Offers.css';

const API = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const Offers = () => {
  const [offersData, setOffersData] = useState([]);

  useEffect(() => {
    api.getOffers()
      .then(data => {
        setOffersData(data.map(o => ({
          ...o,
          image: o.image_url ? `${API}${o.image_url}` : null
        })));
      })
      .catch(() => {});
  }, []);

  return (
    <section id="offers" className="offers">
      <h2>Special Offers</h2>
      <div className="offers-container">
        {offersData.length === 0 && <p style={{ textAlign: 'center', color: '#999', width: '100%' }}>No special offers at the moment. Check back soon!</p>}
        {offersData.map((offer) => (
          <div key={offer.id} className="offer-item">
            {offer.image && <img src={offer.image} alt={offer.title} />}
            <h3>{offer.title}</h3>
            <p>{offer.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Offers;