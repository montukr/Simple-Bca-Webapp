import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 🧩 Register Controller
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate inputs
    if (!name || !email || !password)
      return res.status(400).json({ msg: "All fields are required" });

    // Check if username already exists
    const existingName = await User.findOne({ name });
    if (existingName)
      return res.status(400).json({ msg: "Username already taken" });

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res.status(400).json({ msg: "Email already registered" });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ name, email, password: hashed });
    await user.save();

    res.json({ msg: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🧩 Login Controller (by username)
export const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    // Validate inputs
    if (!name || !password)
      return res.status(400).json({ msg: "Please enter username and password" });

    // Find user by username
    const user = await User.findOne({ name });
    if (!user) return res.status(400).json({ msg: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
