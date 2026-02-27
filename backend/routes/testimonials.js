const express = require('express');
const db = require('../db');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/testimonials — public (only approved)
router.get('/', (req, res) => {
  const all = req.query.all === 'true';
  const sql = all
    ? 'SELECT * FROM testimonials ORDER BY id DESC'
    : 'SELECT * FROM testimonials WHERE approved = 1 ORDER BY id DESC';
  res.json(db.prepare(sql).all());
});

// POST /api/testimonials — admin
router.post('/', auth, (req, res) => {
  const { name, location, text, rating, approved } = req.body;
  if (!name || !text) return res.status(400).json({ error: 'Name and text required' });

  const result = db.prepare(
    'INSERT INTO testimonials (name, location, text, rating, approved) VALUES (?, ?, ?, ?, ?)'
  ).run(name, location || '', text, rating || 5, approved ? 1 : 0);

  res.json({ id: result.lastInsertRowid });
});

// PUT /api/testimonials/:id — admin
router.put('/:id', auth, (req, res) => {
  const existing = db.prepare('SELECT * FROM testimonials WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Not found' });

  const { name, location, text, rating, approved } = req.body;
  db.prepare(
    `UPDATE testimonials SET
      name = COALESCE(?, name),
      location = COALESCE(?, location),
      text = COALESCE(?, text),
      rating = COALESCE(?, rating),
      approved = COALESCE(?, approved)
    WHERE id = ?`
  ).run(
    name ?? null,
    location ?? null,
    text ?? null,
    rating ?? null,
    approved !== undefined ? (approved ? 1 : 0) : null,
    req.params.id
  );

  res.json({ success: true });
});

// DELETE /api/testimonials/:id — admin
router.delete('/:id', auth, (req, res) => {
  db.prepare('DELETE FROM testimonials WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
