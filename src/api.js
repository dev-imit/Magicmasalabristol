const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

class Api {
  constructor() {
    this.token = localStorage.getItem('authToken');
  }

  // ── Auth ────────────────────────────────────────────────
  async login(email, password) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Invalid credentials');
    const data = await res.json();
    this.token = data.token;
    localStorage.setItem('authToken', data.token);
    return data;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  async verifyToken() {
    const res = await this._authFetch(`${API_URL}/api/auth/me`);
    if (!res.ok) throw new Error('Invalid token');
    return res.json();
  }

  // ── Gallery ─────────────────────────────────────────────
  async getGallery() {
    const res = await fetch(`${API_URL}/api/gallery`);
    if (!res.ok) throw new Error('Failed to fetch gallery');
    return res.json();
  }

  async uploadGalleryImage(file) {
    const fd = new FormData();
    fd.append('image', file);
    const res = await this._authFetch(`${API_URL}/api/gallery`, { method: 'POST', body: fd });
    if (!res.ok) throw new Error('Upload failed');
    return res.json();
  }

  async addGalleryImage(formData) {
    const res = await this._authFetch(`${API_URL}/api/gallery`, { method: 'POST', body: formData });
    if (!res.ok) throw new Error('Upload failed');
    return res.json();
  }

  async deleteGalleryImage(id) {
    const res = await this._authFetch(`${API_URL}/api/gallery/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete failed');
    return res.json();
  }

  // ── Testimonials ────────────────────────────────────────
  async getTestimonials(all = false) {
    const res = await fetch(`${API_URL}/api/testimonials${all ? '?all=true' : ''}`);
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  }

  async createTestimonial(data) {
    const res = await this._authFetch(`${API_URL}/api/testimonials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Create failed');
    return res.json();
  }

  async addTestimonial(data) {
    return this.createTestimonial(data);
  }

  async updateTestimonial(id, data) {
    const res = await this._authFetch(`${API_URL}/api/testimonials/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Update failed');
    return res.json();
  }

  async deleteTestimonial(id) {
    const res = await this._authFetch(`${API_URL}/api/testimonials/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete failed');
    return res.json();
  }

  // ── Offers ──────────────────────────────────────────────
  async getOffers(all = false) {
    const res = await fetch(`${API_URL}/api/offers${all ? '?all=true' : ''}`);
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  }

  async createOffer(data, imageFile) {
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => { if (v != null) fd.append(k, v); });
    if (imageFile) fd.append('image', imageFile);
    const res = await this._authFetch(`${API_URL}/api/offers`, { method: 'POST', body: fd });
    if (!res.ok) throw new Error('Create failed');
    return res.json();
  }

  async addOffer(formData) {
    const res = await this._authFetch(`${API_URL}/api/offers`, { method: 'POST', body: formData });
    if (!res.ok) throw new Error('Create failed');
    return res.json();
  }

  async updateOffer(id, data, imageFile) {
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => { if (v != null) fd.append(k, v); });
    if (imageFile) fd.append('image', imageFile);
    const res = await this._authFetch(`${API_URL}/api/offers/${id}`, { method: 'PUT', body: fd });
    if (!res.ok) throw new Error('Update failed');
    return res.json();
  }

  async updateOfferWithFormData(id, formData) {
    const res = await this._authFetch(`${API_URL}/api/offers/${id}`, { method: 'PUT', body: formData });
    if (!res.ok) throw new Error('Update failed');
    return res.json();
  }

  async deleteOffer(id) {
    const res = await this._authFetch(`${API_URL}/api/offers/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete failed');
    return res.json();
  }

  // ── Settings ────────────────────────────────────────────
  async getSettings() {
    const res = await fetch(`${API_URL}/api/settings`);
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  }

  async updateSettings(data) {
    const res = await this._authFetch(`${API_URL}/api/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Update failed');
    return res.json();
  }

  // ── Helper ──────────────────────────────────────────────
  async _authFetch(url, options = {}) {
    const token = this.token || localStorage.getItem('authToken');
    const headers = { ...options.headers };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    // Don't set Content-Type for FormData
    if (options.body instanceof FormData) delete headers['Content-Type'];
    return fetch(url, { ...options, headers });
  }
}

const api = new Api();
export default api;
