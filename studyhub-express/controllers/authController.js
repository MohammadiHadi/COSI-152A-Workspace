const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role },
    process.env.JWT_SECRET, { expiresIn: "7d" });
}

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: { message: "Email is already registered" },
      });
    }
    
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });
    const token = signToken(user);
    res.status(201).json({ data: { token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role } } });
  } catch (err) { next(err); }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user)
      return res.status(401).json({ error: { message: "Invalid credentials" } });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok)
      return res.status(401).json({ error: { message: "Invalid credentials" } });

    const token = signToken(user);
    res.json({ data: { token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role } } });
  } catch (err) { next(err); }
};

module.exports = { register, login };

