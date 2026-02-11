const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcrypt');

const dbPath = path.join(__dirname, 'magic_masala.db');
const db = new Database(dbPath);

// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL');

// ── Create tables ──────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    original_name TEXT,
    url TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT DEFAULT '',
    text TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    approved INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS offers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    code TEXT,
    validity TEXT,
    status TEXT DEFAULT 'active',
    image_filename TEXT,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS certificates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    filename TEXT NOT NULL,
    url TEXT NOT NULL,
    upload_date TEXT,
    file_size TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// ── Seed default admin ─────────────────────────────────────
const adminEmail = process.env.ADMIN_EMAIL || 'admin@magicmasala.com';
const adminPass = process.env.ADMIN_PASSWORD || 'Admin@123';

const existingAdmin = db.prepare('SELECT id FROM users WHERE email = ?').get(adminEmail);
if (!existingAdmin) {
  const hash = bcrypt.hashSync(adminPass, 10);
  db.prepare('INSERT INTO users (email, password, role) VALUES (?, ?, ?)').run(adminEmail, hash, 'admin');
  console.log(`Default admin created: ${adminEmail}`);
}

// ── Seed default settings ──────────────────────────────────
const defaultSettings = {
  site_name: 'Magic Masala',
  tagline: 'Catering Service',
  phone: '+44 7000 000000',
  email: 'info@magicmasala.com',
  address: 'Bristol, United Kingdom',
  opening_hours: 'Mon-Sun: 10am - 10pm',
  facebook: '',
  instagram: '',
  twitter: ''
};

const upsertSetting = db.prepare(
  'INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)'
);
for (const [key, value] of Object.entries(defaultSettings)) {
  upsertSetting.run(key, value);
}

module.exports = db;
