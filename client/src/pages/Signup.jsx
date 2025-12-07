
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import { signupRequest } from '../api'
import { useAuth } from '../context/AuthContext'

const Signup = () => {
  const { login } = useAuth()
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values) => {
    setServerError('')
    setLoading(true)
    try {
      const data = await signupRequest(values)
      login(data.user, data.token)
    } catch (err) {
      const msg =
        err?.response?.data?.message || 'Unable to sign up. Please try again.'
      setServerError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="layout">
      <div className="brand-panel">
        <h1>Credo Auth</h1>
        <p>Sign up and we will redirect you to a simple dashboard.</p>
      </div>

      <div className="form-panel">
        <AuthForm mode="signup" onSubmit={handleSubmit} loading={loading} />
        {serverError && <p className="error center">{serverError}</p>}
        <p className="muted center switch-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
