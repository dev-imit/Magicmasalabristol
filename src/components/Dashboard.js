import React, { useState, useEffect } from 'react';
import api from '../api';
import AdminGallery from './AdminGallery';
import AdminTestimonials from './AdminTestimonials';
import AdminOffers from './AdminOffers';
import './AdminPanel.css';
import AdminSettings from './AdminSettings';
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
  const [section, setSection] = useState('dashboard');
  const [stats, setStats] = useState({ offers: 0, pending: 0, gallery: 0 });
  const [offers, setOffers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [gallery, setGallery] = useState([]);

  const fetchAll = async () => {
    try {
      const [o, t, g] = await Promise.all([
        api.getOffers(true),
        api.getTestimonials(true),
        api.getGallery()
      ]);
      setOffers(o);
      setTestimonials(t);
      setGallery(g);
      setStats({
        offers: o.filter(x => x.status === 'active').length,
        pending: t.filter(x => !x.approved).length,
        gallery: g.length
      });
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleApprove = async (id) => {
    await api.updateTestimonial(id, { approved: true });
    fetchAll();
  };
  const handleDeleteTestimonial = async (id) => {
    await api.deleteTestimonial(id);
    fetchAll();
  };
  const handleDeleteOffer = async (id) => {
    await api.deleteOffer(id);
    fetchAll();
  };

  const navItems = [
    { key: 'dashboard', label: 'Dashboard', icon: '⊞' },
    { key: 'gallery', label: 'Gallery', icon: '🖼' },
    { key: 'offers', label: 'Offers', icon: '🏷' },
    { key: 'testimonials', label: 'Testimonials', icon: '💬' },
    { key: 'settings', label: 'Settings', icon: '⚙' },
  ];

  return (
    <div className="dash">
      {/* ── Sidebar ──────────────────────────────────────── */}
      <aside className="dash-sidebar">
        <div className="dash-sidebar-logo">
          <img src="/masalamagic/logo.png" alt="Magic Masala" className="dash-logo-icon" />
          <div className="dash-logo-text">
            <span className="dash-brand">Magic Masala</span>
            <span className="dash-tagline">Catering Service</span>
          </div>
        </div>

        <nav className="dash-nav">
          {navItems.map(item => (
            <button
              key={item.key}
              className={`dash-nav-item ${section === item.key ? 'active' : ''}`}
              onClick={() => setSection(item.key)}
            >
              <span className="dash-nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="dash-sidebar-footer">
          <button className="dash-logout" onClick={onLogout}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 17.5H4.167A1.667 1.667 0 012.5 15.833V4.167A1.667 1.667 0 014.167 2.5H7.5" stroke="#EF4444" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.333 14.167L17.5 10l-4.167-4.167" stroke="#EF4444" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/><path d="M17.5 10H7.5" stroke="#EF4444" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Log out
          </button>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────── */}
      <main className="dash-main">
        <header className="dash-header">
          <h1 className="dash-page-title">
            {navItems.find(n => n.key === section)?.label || 'Dashboard'}
          </h1>
          <div className="dash-header-right">
            <div className="dash-avatar">A</div>
            <div className="dash-user-info">
              <span className="dash-user-name">Admin User</span>
              <span className="dash-user-role">Manager</span>
            </div>
          </div>
        </header>

        <div className="dash-content">
          {section === 'dashboard' && (
            <>
              {/* Stat cards */}
              <div className="dash-stats">
                <div className="dash-stat-card">
                  <div className="dash-stat-info">
                    <span className="dash-stat-label">Active Offers</span>
                    <span className="dash-stat-value">{stats.offers}</span>
                  </div>
                  <div className="dash-stat-icon" style={{ background: '#FFF5E8' }}>
                    <span style={{ color: '#F5A038' }}>🏷</span>
                  </div>
                </div>
                <div className="dash-stat-card">
                  <div className="dash-stat-info">
                    <span className="dash-stat-label">Pending Reviews</span>
                    <span className="dash-stat-value">{stats.pending}</span>
                  </div>
                  <div className="dash-stat-icon" style={{ background: '#E8ECFF' }}>
                    <span style={{ color: '#25009D' }}>💬</span>
                  </div>
                </div>
                <div className="dash-stat-card">
                  <div className="dash-stat-info">
                    <span className="dash-stat-label">Gallery Images</span>
                    <span className="dash-stat-value">{stats.gallery}</span>
                  </div>
                  <div className="dash-stat-icon" style={{ background: '#E9FFE8' }}>
                    <span style={{ color: '#109D00' }}>🖼</span>
                  </div>
                </div>
              </div>

              {/* Offers table + Testimonials side-by-side */}
              <div className="dash-row">
                {/* Offers table */}
                <div className="dash-card dash-card-wide">
                  <div className="dash-card-header">
                    <h3>Active Offers</h3>
                    <button className="dash-btn-primary" onClick={() => setSection('offers')}>+ Create New Offer</button>
                  </div>
                  <div className="dash-table">
                    <div className="dash-table-header">
                      <span>Offer Title</span><span>Code</span><span>Validity Period</span><span>Status</span><span>Actions</span>
                    </div>
                    {offers.slice(0, 4).map(o => (
                      <div key={o.id} className="dash-table-row">
                        <span>{o.title}</span>
                        <span><span className="dash-code-badge">{o.code || 'N/A'}</span></span>
                        <span>{o.validity || 'N/A'}</span>
                        <span>
                          <span className={`dash-status ${o.status}`}>
                            <span className="dash-status-dot"></span>{o.status}
                          </span>
                        </span>
                        <span className="dash-actions">
                          <button className="dash-action-edit" onClick={() => setSection('offers')}>✏️</button>
                          <button className="dash-action-delete" onClick={() => handleDeleteOffer(o.id)}>🗑️</button>
                        </span>
                      </div>
                    ))}
                    {offers.length === 0 && <div className="dash-empty">No offers yet</div>}
                  </div>
                </div>

                {/* Testimonials panel */}
                <div className="dash-card dash-card-narrow">
                  <div className="dash-card-header">
                    <h3>Recent Testimonials</h3>
                    <button className="dash-btn-link" onClick={() => setSection('testimonials')}>View All</button>
                  </div>
                  <div className="dash-testimonials-list">
                    {testimonials.slice(0, 3).map(t => (
                      <div key={t.id} className="dash-testimonial-card">
                        <div className="dash-test-header">
                          <div className="dash-test-user">
                            <div className="dash-test-avatar">{t.name.charAt(0)}</div>
                            <div className="dash-test-info">
                              <span className="dash-test-name">{t.name}</span>
                              <span className="dash-test-stars">{'⭐'.repeat(t.rating || 5)}</span>
                            </div>
                          </div>
                          <span className="dash-test-time">2 hours</span>
                        </div>
                        <p className="dash-test-text">"{t.text.substring(0, 80)}..."</p>
                        <div className="dash-test-actions">
                          <button className="dash-btn-approve" onClick={() => handleApprove(t.id)}>✓ Approve</button>
                          <button className="dash-btn-delete" onClick={() => handleDeleteTestimonial(t.id)}>✕ Delete</button>
                        </div>
                      </div>
                    ))}
                    {testimonials.length === 0 && <div className="dash-empty">No testimonials</div>}
                  </div>
                </div>
              </div>

              {/* Gallery */}
              <div className="dash-row">
                <div className="dash-card dash-card-wide">
                  <div className="dash-card-header">
                    <h3>Gallery</h3>
                    <span className="dash-photo-count">{gallery.length} Photos</span>
                  </div>
                  <div className="dash-gallery-preview">
                    {gallery.slice(0, 4).map(img => (
                      <div key={img.id} className="dash-gallery-thumb">
                        <img src={`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}${img.url}`} alt="" />
                      </div>
                    ))}
                    {gallery.length === 0 && <div className="dash-empty">No images uploaded</div>}
                  </div>
                </div>
              </div>
            </>
          )}

          {section === 'gallery' && <AdminGallery onUpdate={fetchAll} />}
          {section === 'offers' && <AdminOffers onUpdate={fetchAll} />}
          {section === 'testimonials' && <AdminTestimonials onUpdate={fetchAll} />}
          {section === 'settings' && <AdminSettings />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
