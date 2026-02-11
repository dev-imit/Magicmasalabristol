const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../db');
const auth = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads/certificates'),
  filename: (_req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// GET /api/certificates — public
router.get('/', (_req, res) => {
  res.json(db.prepare('SELECT * FROM certificates ORDER BY id DESC').all());
});

// POST /api/certificates — admin
router.post('/', auth, upload.single('certificate'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const title = req.body.title || req.file.originalname;
  const url = `/uploads/certificates/${req.file.filename}`;
  const fileSize = (req.file.size / (1024 * 1024)).toFixed(1) + ' MB';
  const uploadDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: '2-digit'
  });

  const result = db.prepare(
    'INSERT INTO certificates (title, filename, url, upload_date, file_size) VALUES (?, ?, ?, ?, ?)'
  ).run(title, req.file.filename, url, uploadDate, fileSize);

  res.json({ id: result.lastInsertRowid, title, url, upload_date: uploadDate, file_size: fileSize });
});

// DELETE /api/certificates/:id — admin
router.delete('/:id', auth, (req, res) => {
  const cert = db.prepare('SELECT * FROM certificates WHERE id = ?').get(req.params.id);
  if (cert) {
    const filePath = path.join(__dirname, '../uploads/certificates', cert.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
  db.prepare('DELETE FROM certificates WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
