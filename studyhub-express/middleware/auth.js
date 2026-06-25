const jwt = require("jsonwebtoken");

function readToken(req) {
  const h = req.headers.authorization || "";
  return h.startsWith("Bearer ") ? h.slice(7) : null;
}

// Required — reject when no/invalid token (used for writes)
function protect(req, res, next) {
  const token = readToken(req);
  if (!token)
    return res.status(401).json({ error: { message: "Not authenticated" } });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); }
  catch { return res.status(401).json({ error: { message: "Invalid token" } }); }
}

// Optional — attach req.user if a token is present, else continue
function optionalAuth(req, res, next) {
  const token = readToken(req);
  if (token) { try { req.user = jwt.verify(token, process.env.JWT_SECRET); } catch {} }
  next();
}

module.exports = { protect, optionalAuth };
