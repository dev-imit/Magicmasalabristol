const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../db');
const auth = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads/offers'),
  filename: (_req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// GET /api/offers — public (active only) or admin (all)
router.get('/', (req, res) => {
  const all = req.query.all === 'true';
  const sql = all
    ? 'SELECT * FROM offers ORDER BY id DESC'
    : "SELECT * FROM offers WHERE status = 'active' ORDER BY id DESC";
  res.json(db.prepare(sql).all());
});

// POST /api/offers — admin
router.post('/', auth, upload.single('image'), (req, res) => {
  const { title, description, code, validity, status } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });

  let image_filename = null;
  let image_url = null;
  if (req.file) {
    image_filename = req.file.filename;
    image_url = `/uploads/offers/${req.file.filename}`;
  }

  const result = db.prepare(
    'INSERT INTO offers (title, description, code, validity, status, image_filename, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).run(title, description || '', code || '', validity || '', status || 'active', image_filename, image_url);

  res.json({ id: result.lastInsertRowid });
});

// PUT /api/offers/:id — admin
router.put('/:id', auth, upload.single('image'), (req, res) => {
  const existing = db.prepare('SELECT * FROM offers WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Not found' });

  const { title, description, code, validity, status } = req.body;

  let image_filename = existing.image_filename;
  let image_url = existing.image_url;
  if (req.file) {
    // Delete old image
    if (existing.image_filename) {
      const oldPath = path.join(__dirname, '../uploads/offers', existing.image_filename);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    image_filename = req.file.filename;
    image_url = `/uploads/offers/${req.file.filename}`;
  }

  db.prepare(
    `UPDATE offers SET title=?, description=?, code=?, validity=?, status=?, image_filename=?, image_url=? WHERE id=?`
  ).run(
    title || existing.title,
    description ?? existing.description,
    code ?? existing.code,
    validity ?? existing.validity,
    status || existing.status,
    image_filename,
    image_url,
    req.params.id
  );

  res.json({ success: true });
});

// DELETE /api/offers/:id — admin
router.delete('/:id', auth, (req, res) => {
  const offer = db.prepare('SELECT * FROM offers WHERE id = ?').get(req.params.id);
  if (offer && offer.image_filename) {
    const filePath = path.join(__dirname, '../uploads/offers', offer.image_filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
  db.prepare('DELETE FROM offers WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
