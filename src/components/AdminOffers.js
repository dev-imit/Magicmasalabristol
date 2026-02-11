import React, { useState, useEffect } from 'react';
import api from '../api';

const AdminOffers = ({ onUpdate }) => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', code: '', validity: '', status: 'active' });
  const [file, setFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const data = await api.getOffers(true);
    setItems(data);
  };
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (file) fd.append('image', file);

      if (editId) {
        await api.updateOfferWithFormData(editId, fd);
      } else {
        await api.addOffer(fd);
      }
      resetForm();
      load();
      onUpdate?.();
    } catch (err) { alert(err.message); }
    setSaving(false);
  };

  const resetForm = () => {
    setForm({ title: '', description: '', code: '', validity: '', status: 'active' });
    setFile(null);
    setEditId(null);
  };

  const startEdit = (o) => {
    setEditId(o.id);
    setForm({ title: o.title, description: o.description || '', code: o.code || '', validity: o.validity || '', status: o.status });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this offer?')) return;
    await api.deleteOffer(id);
    load();
    onUpdate?.();
  };

  const API = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Offers Management</h2>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form-grid">
          <input className="admin-input" placeholder="Offer Title *" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <input className="admin-input" placeholder="Promo Code" value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} />
          <input className="admin-input" placeholder="Validity Period" value={form.validity} onChange={e => setForm({ ...form, validity: e.target.value })} />
          <select className="admin-input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
          </select>
          <textarea className="admin-input admin-textarea" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} />
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
        </div>
        <div className="admin-form-actions">
          <button type="submit" className="admin-btn-primary" disabled={saving}>
            {saving ? 'Saving…' : editId ? '✓ Update Offer' : '+ Create Offer'}
          </button>
          {editId && <button type="button" className="admin-btn-secondary" onClick={resetForm}>Cancel</button>}
        </div>
      </form>

      <div className="admin-list">
        {items.map(o => (
          <div key={o.id} className="admin-list-item">
            <div className="admin-list-left">
              {o.image_url && <img src={`${API}${o.image_url}`} alt="" className="admin-list-thumb" />}
              <div className="admin-list-info">
                <div className="admin-list-title">
                  {o.title}
                  {o.code && <span className="dash-code-badge">{o.code}</span>}
                  <span className={`dash-status ${o.status}`}><span className="dash-status-dot"></span>{o.status}</span>
                </div>
                {o.description && <p className="admin-list-text">{o.description}</p>}
                {o.validity && <span className="admin-list-meta">Valid: {o.validity}</span>}
              </div>
            </div>
            <div className="admin-list-actions">
              <button className="admin-btn-edit-sm" onClick={() => startEdit(o)}>✏️ Edit</button>
              <button className="admin-btn-delete-sm" onClick={() => handleDelete(o.id)}>🗑 Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="dash-empty">No offers yet. Create your first offer above.</p>}
      </div>
    </div>
  );
};

export default AdminOffers;
