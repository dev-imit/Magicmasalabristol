import React, { useState, useEffect } from 'react';
import api from '../api';

const AdminGallery = ({ onUpdate }) => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState('');

  const load = async () => {
    const data = await api.getGallery();
    setImages(data);
  };
  useEffect(() => { load(); }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.querySelector('input[type="file"]').files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      fd.append('caption', caption);
      await api.addGalleryImage(fd);
      setCaption('');
      e.target.reset();
      load();
      onUpdate?.();
    } catch (err) { alert(err.message); }
    setUploading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this image?')) return;
    await api.deleteGalleryImage(id);
    load();
    onUpdate?.();
  };

  const API = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Gallery Management</h2>
      </div>

      <form className="admin-form" onSubmit={handleUpload}>
        <div className="admin-form-row">
          <input type="file" accept="image/*" required />
          <input
            type="text"
            placeholder="Caption (optional)"
            value={caption}
            onChange={e => setCaption(e.target.value)}
            className="admin-input"
          />
          <button type="submit" className="admin-btn-primary" disabled={uploading}>
            {uploading ? 'Uploading…' : '+ Upload Image'}
          </button>
        </div>
      </form>

      <div className="admin-gallery-grid">
        {images.map(img => (
          <div key={img.id} className="admin-gallery-card">
            <img src={`${API}${img.url}`} alt={img.caption || ''} />
            {img.caption && <p className="admin-gallery-caption">{img.caption}</p>}
            <button className="admin-btn-delete-overlay" onClick={() => handleDelete(img.id)}>🗑</button>
          </div>
        ))}
        {images.length === 0 && <p className="dash-empty">No gallery images yet. Upload your first image above.</p>}
      </div>
    </div>
  );
};

export default AdminGallery;
