const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../db');
const auth = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads/gallery'),
  filename: (_req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// GET /api/gallery — public
router.get('/', (_req, res) => {
  const images = db.prepare('SELECT * FROM gallery ORDER BY sort_order ASC, id DESC').all();
  res.json(images);
});

// POST /api/gallery — admin
router.post('/', auth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image uploaded' });

  const url = `/uploads/gallery/${req.file.filename}`;
  const result = db.prepare(
    'INSERT INTO gallery (filename, original_name, url) VALUES (?, ?, ?)'
  ).run(req.file.filename, req.file.originalname, url);

  res.json({ id: result.lastInsertRowid, filename: req.file.filename, url });
});

// DELETE /api/gallery/:id — admin
router.delete('/:id', auth, (req, res) => {
  const image = db.prepare('SELECT * FROM gallery WHERE id = ?').get(req.params.id);
  if (!image) return res.status(404).json({ error: 'Not found' });

  // Delete file from disk
  const filePath = path.join(__dirname, '..', image.url);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  db.prepare('DELETE FROM gallery WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
