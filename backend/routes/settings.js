const express = require('express');
const db = require('../db');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/settings — public
router.get('/', (_req, res) => {
  const rows = db.prepare('SELECT key, value FROM settings').all();
  const settings = {};
  rows.forEach(r => { settings[r.key] = r.value; });
  res.json(settings);
});

// PUT /api/settings — admin (bulk update)
router.put('/', auth, (req, res) => {
  const upsert = db.prepare(
    'INSERT INTO settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP'
  );

  const updateMany = db.transaction((entries) => {
    for (const [key, value] of entries) {
      upsert.run(key, value);
    }
  });

  updateMany(Object.entries(req.body));
  res.json({ success: true });
});

module.exports = router;
