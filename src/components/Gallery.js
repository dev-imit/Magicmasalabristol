import React, { useState, useEffect, useRef, useCallback } from 'react';
import api from '../api';
import './Gallery.css';

const API = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const galleryRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    api.getGallery()
      .then(data => {
        setGalleryImages(data.map(img => ({ src: `${API}${img.url}`, alt: img.caption || '' })));
      })
      .catch(() => {});
  }, []);

  const updateDimensions = useCallback(() => {
    if (!wrapperRef.current) return;
    const wrapperWidth = wrapperRef.current.offsetWidth;
    const gap = 20;
    let count = 4;
    if (wrapperWidth < 600) count = 1;
    else if (wrapperWidth < 900) count = 2;
    else if (wrapperWidth < 1200) count = 3;
    const width = (wrapperWidth - gap * (count - 1)) / count;
    setItemWidth(width);
    setVisibleCount(count);
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  const maxIndex = Math.max(0, galleryImages.length - visibleCount);

  useEffect(() => {
    if (maxIndex <= 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const offset = currentIndex * (itemWidth + 20);

  return (
    <section id="gallery" className="gallery">
      <img src="/masalamagic/tomato-shape.png" alt="" className="gallery-shape shape-tomato" />
      <img src="/masalamagic/leaves.png" alt="" className="gallery-shape shape-leaves" />
      <img src="/masalamagic/chili-shape.png" alt="" className="gallery-shape shape-chili" />

      <h2>A Visual Treat</h2>

      <div className="gallery-container">
        <button className="gallery-arrow prev" onClick={goToPrev} aria-label="Previous">‹</button>
        <div className="gallery-wrapper" ref={wrapperRef}>
          <div
            className="gallery-grid"
            ref={galleryRef}
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="gallery-item"
                style={{ width: `${itemWidth}px`, minWidth: `${itemWidth}px` }}
              >
                <img src={img.src} alt={img.alt} />
              </div>
            ))}
          </div>
        </div>
        <button className="gallery-arrow next" onClick={goToNext} aria-label="Next">›</button>
      </div>
      {galleryImages.length === 0 && <p style={{ textAlign: 'center', color: '#999' }}>No gallery images yet.</p>}
    </section>
  );
};

export default Gallery;
