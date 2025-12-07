
import React, { useState } from 'react'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const AuthForm = ({ mode, onSubmit, loading }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})

  const isSignup = mode === 'signup'

  const validate = () => {
    const newErrors = {}
    if (isSignup && !form.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(form.email.trim())) {
      newErrors.email = 'Enter a valid email address'
    }
    if (!form.password) {
      newErrors.password = 'Password is required'
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit(form)
  }

  return (
    <form className="card" onSubmit={handleSubmit} noValidate>
      <h2>{isSignup ? 'Create an account' : 'Welcome back'}</h2>
      <p className="muted">
        {isSignup
          ? 'Sign up to access your personal dashboard.'
          : 'Login to continue to your dashboard.'}
      </p>

      {isSignup && (
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
      )}

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="At least 8 characters"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>

      <button type="submit" disabled={loading} className="primary-btn">
        {loading ? 'Please wait...' : isSignup ? 'Sign Up' : 'Login'}
      </button>
    </form>
  )
}

export default AuthForm
