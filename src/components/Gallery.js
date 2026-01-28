import React, { useState, useEffect, useRef } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryRef = useRef(null);
  
  const images = [
    '/masalamagic/gallery1.png',
    '/masalamagic/gallery2.png',
    '/masalamagic/gallery3.png',
    '/masalamagic/gallery4.png',
    '/masalamagic/gallery5.png',
    '/masalamagic/gallery6.png',
    '/masalamagic/gallery7.png',
    '/masalamagic/gallery8.png',
  ];

  const visibleImages = 4;
  const maxIndex = images.length - visibleImages;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000); // Auto scroll every 4 seconds

    return () => clearInterval(interval);
  }, [maxIndex]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="gallery">
      <img src="/masalamagic/tomato-shape.png" alt="" className="gallery-shape shape-tomato" />
      <img src="/masalamagic/leaves.png" alt="" className="gallery-shape shape-leaves" />
      <img src="/masalamagic/chili-shape.png" alt="" className="gallery-shape shape-chili" />
      
      <h2>A Visual Treat</h2>
      
      <div className="gallery-container">
        <button className="gallery-arrow prev" onClick={goToPrev}>‹</button>
        <div className="gallery-wrapper">
          <div 
            className="gallery-grid" 
            ref={galleryRef}
            style={{ transform: `translateX(-${currentIndex * (280 + 8)}px)` }}
          >
            {images.map((img, index) => (
              <div key={index} className="gallery-item">
                <img src={img} alt={`Gallery ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        <button className="gallery-arrow next" onClick={goToNext}>›</button>
      </div>
    </section>
  );
};

export default Gallery;
