import React, { useState, useEffect } from 'react';
import api from '../api';

const AdminSettings = () => {
  const [settings, setSettings] = useState({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const fields = [
    { key: 'site_name', label: 'Restaurant Name', type: 'text' },
    { key: 'tagline', label: 'Tagline', type: 'text' },
    { key: 'phone', label: 'Phone Number', type: 'tel' },
    { key: 'email', label: 'Email Address', type: 'email' },
    { key: 'address', label: 'Address', type: 'textarea' },
    { key: 'opening_hours', label: 'Opening Hours', type: 'textarea' },
    { key: 'facebook_url', label: 'Facebook URL', type: 'url' },
    { key: 'instagram_url', label: 'Instagram URL', type: 'url' },
    { key: 'twitter_url', label: 'Twitter URL', type: 'url' },
  ];

  useEffect(() => {
    api.getSettings().then(setSettings).catch(console.error);
  }, []);

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    try {
      await api.updateSettings(settings);
      setMsg('Settings saved successfully!');
      setTimeout(() => setMsg(''), 3000);
    } catch (err) { alert(err.message); }
    setSaving(false);
  };

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Site Settings</h2>
      </div>

      <form className="admin-form admin-settings-form" onSubmit={handleSave}>
        {fields.map(f => (
          <div key={f.key} className="admin-setting-field">
            <label className="admin-label">{f.label}</label>
            {f.type === 'textarea' ? (
              <textarea
                className="admin-input admin-textarea"
                value={settings[f.key] || ''}
                onChange={e => handleChange(f.key, e.target.value)}
                rows={3}
              />
            ) : (
              <input
                className="admin-input"
                type={f.type}
                value={settings[f.key] || ''}
                onChange={e => handleChange(f.key, e.target.value)}
              />
            )}
          </div>
        ))}
        <div className="admin-form-actions">
          <button type="submit" className="admin-btn-primary" disabled={saving}>
            {saving ? 'Saving…' : '✓ Save Settings'}
          </button>
          {msg && <span className="admin-success-msg">{msg}</span>}
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
