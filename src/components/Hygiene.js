import React from 'react';
import './Hygiene.css';

const Hygiene = () => {
  return (
    <section className="hygiene">
      <img src="/masalamagic/icon-pumpkin.png" alt="" className="hygiene-shape shape-pumpkin" />
      <img src="/masalamagic/icon-carrot.png" alt="" className="hygiene-shape shape-carrot" />
      
      <div className="hygiene-container">
        <h2>Hygiene rating</h2>
        <div className="hygiene-certificates">
          <div className="certificate">
            <img src="/masalamagic/certificate1.png" alt="Hygiene Certificate" />
          </div>
          <div className="certificate">
            <img src="/masalamagic/certificate2.png" alt="Food Rating" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hygiene;
