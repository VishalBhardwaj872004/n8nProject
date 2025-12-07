require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')

const app = express()

const allowedOrigins = [
  process.env.FRONTEND_URL,     
  'http://localhost:5173',      
  'http://127.0.0.1:5173'
].filter(Boolean)             

app.use(
  cors({
    origin: (origin, callback) => {
      
      if (!origin) return callback(null, true)

      if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      console.log('Blocked by CORS:', origin)
      return callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
  })
)


app.use(express.json())

app.use('/api/auth', authRoutes)


app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    env: process.env.NODE_ENV || 'development',
    time: new Date().toISOString()
  })
})


app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  if (res.headersSent) return next(err)
  res.status(500).json({ message: 'Unexpected server error' })
})


const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})