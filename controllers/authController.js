const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const crypto = require("crypto");
const MAX_ATTEMPTS = 10;
const LOCK_TIME = 15 * 60 * 1000;
const nodemailer = require("nodemailer");



const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const resetLink = `http://localhost:3000/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
       await transporter.sendMail({
      from: `"Soltra Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a><p>This link will expire in 15 minutes.</p>`,
    });

    res.status(200).json({ message: "Reset link sent to your email" });
  } catch (err) {
    console.error("Forgot password error:", err.message);
    res.status(500).json({ message: "Error sending reset email", error: err.message });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) return res.status(400).json({ message: "Password is required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err.message);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};
const registerUser = async (req, res) => {
  const { username, email, password, country } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      country,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      message: "Registered successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        country: newUser.country,
      },
    });
  } catch (err) {
    console.error("Registration error:", err.message);
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email or Username already exists" });
    }
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.lockUntil && user.lockUntil > Date.now()) {
      const remaining = Math.ceil((user.lockUntil - Date.now()) / 60000);
      return res.status(403).json({
        message: `Account is locked. Try again in ${remaining} minutes.`,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;

      if (user.failedLoginAttempts >= MAX_ATTEMPTS) {
        user.lockUntil = new Date(Date.now() + LOCK_TIME);
        await user.save();

        return res.status(403).json({
          message: `Too many failed attempts. Account locked for 15 minutes.`,
        });
      } else {
        await user.save();
        return res.status(400).json({
          message: "Incorrect password",
          attemptsLeft: MAX_ATTEMPTS - user.failedLoginAttempts,
        });
      }
    }

    user.failedLoginAttempts = 0;
    user.lockUntil = null;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        country: user.country,
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

const googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, sub: googleId, name } = payload;

    const existingUser = await User.findOne({ email });

    if (existingUser && !existingUser.googleId) {
     
      return res.status(400).json({
        message: "User with this email already exists. Please log in normally.",
      });
    } 


    let user = await User.findOne({ googleId });

    if (!user) {
    const randomPassword = crypto.randomBytes(16).toString("hex");
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = await User.create({
        googleId,
        email,
        username: name || email.split('@')[0],
        password: hashedPassword,
        country: "Unknown",
         needsPassword: true,
      });
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Google login successful",
      token: jwtToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        country: user.country,
      },
    });
  } catch (err) {
    console.error("Google login error:", err.message);
    res.status(401).json({ message: "Google login failed", error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  googleLogin,
  forgotPassword,
  resetPassword,
};