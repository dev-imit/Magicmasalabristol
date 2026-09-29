const jwt = require('jsonwebtoken');
// No fallback secret. The previous hardcoded default is
// public in this repo's history, so anyone could mint valid admin tokens
// whenever JWT_SECRET happened to be unset.
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET || JWT_SECRET.trim() === '') {
  throw new Error('JWT_SECRET is not set. Copy backend/.env.example to backend/.env and set it.');
}

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const token = header.split(' ')[1];
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = authMiddleware;
// Exported so token issuing (routes/auth.js) and token verification here share
// one validated secret instead of each re-deriving it with its own fallback.
module.exports.JWT_SECRET = JWT_SECRET;
