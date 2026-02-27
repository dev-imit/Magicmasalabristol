require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const authRoutes = require('./routes/auth');
const galleryRoutes = require('./routes/gallery');
const testimonialsRoutes = require('./routes/testimonials');
const offersRoutes = require('./routes/offers');
const settingsRoutes = require('./routes/settings');

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ──────────────────────────────────────────────
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Routes ─────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/offers', offersRoutes);
app.use('/api/settings', settingsRoutes);

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// ── Start ──────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Magic Masala backend running on port ${PORT}`);
});
