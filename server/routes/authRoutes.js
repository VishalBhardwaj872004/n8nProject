const axios = require('axios');
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Name is required' })
    }
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: 'Valid email is required' })
    }
    if (!password || password.length < 8) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters long'
      })
    }

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(409).json({ message: 'Email is already registered' })
    }

    const hashed = await bcrypt.hash(password, 10)

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashed
    })

if (process.env.N8N_WEBHOOK_URL) {
  try {
    await axios.post(process.env.N8N_WEBHOOK_URL, {
      event: "user.registered",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
    console.log("Sent to n8n webhook");
  } catch (webhookErr) {
    console.error("n8n webhook error:", webhookErr.message);
  }
}

    const token = signToken(user._id)

    res.status(201).json({
      message: 'Registration successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    })
  } catch (err) {
    console.error('Register error:', err)
    res.status(500).json({ message: 'Server error while registering' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Invalid email or password' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: 'Invalid email or password' })
    }

    const token = signToken(user._id)

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ message: 'Server error while logging in' })
  }
})

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json({ user })
  } catch (err) {
    console.error('Get me error:', err)
    res.status(500).json({ message: 'Server error fetching profile' })
  }
})

module.exports = router
