const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max: 4,                    // 10 attempts per IP per window
  message: { error: { message: "Too many attempts, try later" } },
});

module.exports = loginLimiter;
