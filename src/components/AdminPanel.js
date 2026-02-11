import React, { useState, useEffect } from 'react';
import api from '../api';
import Login from './Login';
import Dashboard from './Dashboard';

const AdminPanel = () => {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('mm_token');
    if (!token) { setChecking(false); return; }
    api.verifyToken()
      .then(() => setAuthed(true))
      .catch(() => { localStorage.removeItem('mm_token'); })
      .finally(() => setChecking(false));
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('mm_token', token);
    setAuthed(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('mm_token');
    setAuthed(false);
  };

  if (checking) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Inter, sans-serif', color: '#A0AEC0' }}>
        Loading…
      </div>
    );
  }

  return authed
    ? <Dashboard onLogout={handleLogout} />
    : <Login onLogin={handleLogin} />;
};

export default AdminPanel;
