import React, { useState } from 'react';
import api from '../api';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api.login(email, password);
      onLogin(data.user);
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin">
      {/* Left panel — hero image with quote */}
      <div className="signin-left" style={{ backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${process.env.PUBLIC_URL}/masalamagic/Hero01.png)` }}>
        <p className="signin-quote">
          "Spices are the soul of food. They bring life, warmth, and character to every dish we create."
        </p>
      </div>

      {/* Right panel — login form */}
      <div className="signin-right">
        <div className="signin-logo">
          <div className="signin-logo-icon">M</div>
          <div className="signin-logo-text">
            <span className="signin-brand">Magic Masala</span>
            <span className="signin-tagline">Catering Service</span>
          </div>
        </div>

        <h1 className="signin-title">Welcome, Admin</h1>
        <p className="signin-subtitle">Enter your credentials to access the dashboard</p>

        {error && <div className="signin-error">{error}</div>}

        <form onSubmit={handleSubmit} className="signin-form">
          <div className="signin-field">
            <label>Email Address</label>
            <div className="signin-input-wrap">
              <input
                type="email"
                placeholder="admin@masalamagic.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="signin-field">
            <label>Password</label>
            <div className="signin-input-wrap signin-password-wrap">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="***********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="signin-eye"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="#64748B" strokeWidth="1.5"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="signin-options">
            <label className="signin-remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="signin-checkbox"></span>
              Remember me
            </label>
            <span className="signin-forgot">Forgot Password?</span>
          </div>

          <button type="submit" className="signin-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
