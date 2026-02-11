import React, { useState, useEffect } from 'react';
import api from '../api';

const AdminTestimonials = ({ onUpdate }) => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', text: '', rating: 5 });
  const [editId, setEditId] = useState(null);

  const load = async () => {
    const data = await api.getTestimonials(true);
    setItems(data);
  };
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.updateTestimonial(editId, form);
      } else {
        await api.addTestimonial(form);
      }
      setForm({ name: '', text: '', rating: 5 });
      setEditId(null);
      load();
      onUpdate?.();
    } catch (err) { alert(err.message); }
  };

  const startEdit = (t) => {
    setEditId(t.id);
    setForm({ name: t.name, text: t.text, rating: t.rating });
  };

  const handleApprove = async (id) => {
    await api.updateTestimonial(id, { approved: true });
    load();
    onUpdate?.();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    await api.deleteTestimonial(id);
    load();
    onUpdate?.();
  };

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Testimonials Management</h2>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form-grid">
          <input
            className="admin-input"
            placeholder="Customer Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <select
            className="admin-input"
            value={form.rating}
            onChange={e => setForm({ ...form, rating: Number(e.target.value) })}
          >
            {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>)}
          </select>
          <textarea
            className="admin-input admin-textarea"
            placeholder="Testimonial text"
            value={form.text}
            onChange={e => setForm({ ...form, text: e.target.value })}
            required
            rows={3}
          />
        </div>
        <div className="admin-form-actions">
          <button type="submit" className="admin-btn-primary">
            {editId ? '✓ Update' : '+ Add Testimonial'}
          </button>
          {editId && (
            <button type="button" className="admin-btn-secondary" onClick={() => { setEditId(null); setForm({ name: '', text: '', rating: 5 }); }}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="admin-list">
        {items.map(t => (
          <div key={t.id} className={`admin-list-item ${!t.approved ? 'pending' : ''}`}>
            <div className="admin-list-info">
              <div className="admin-list-title">
                {t.name}
                <span className="admin-stars">{'⭐'.repeat(t.rating)}</span>
                {!t.approved && <span className="admin-badge-pending">Pending</span>}
              </div>
              <p className="admin-list-text">"{t.text}"</p>
            </div>
            <div className="admin-list-actions">
              {!t.approved && (
                <button className="admin-btn-approve-sm" onClick={() => handleApprove(t.id)}>✓ Approve</button>
              )}
              <button className="admin-btn-edit-sm" onClick={() => startEdit(t)}>✏️ Edit</button>
              <button className="admin-btn-delete-sm" onClick={() => handleDelete(t.id)}>🗑 Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="dash-empty">No testimonials yet.</p>}
      </div>
    </div>
  );
};

export default AdminTestimonials;
