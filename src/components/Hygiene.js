import React from 'react';
import './Hygiene.css';

const certificates = [
  { id: 1, src: '/masalamagic/certificate1.png', title: 'Food Hygiene Certificate' },
  { id: 2, src: '/masalamagic/certificate2.png', title: 'Food Safety Rating' }
];

const Hygiene = () => {
  return (
    <section className="hygiene">
      <img src="/masalamagic/icon-pumpkin.png" alt="" className="hygiene-shape shape-pumpkin" />
      <img src="/masalamagic/icon-carrot.png" alt="" className="hygiene-shape shape-carrot" />

      <div className="hygiene-container">
        <h2>Hygiene rating</h2>
        <div className="hygiene-certificates">
          {certificates.map((cert) => (
            <div key={cert.id} className="certificate">
              <img src={cert.src} alt={cert.title} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hygiene;
