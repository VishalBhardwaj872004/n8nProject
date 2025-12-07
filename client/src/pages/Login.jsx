
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import { loginRequest } from '../api'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const { login } = useAuth()
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values) => {
    setServerError('')
    setLoading(true)
    try {
      const data = await loginRequest(values)
      login(data.user, data.token)
    } catch (err) {
      const msg =
        err?.response?.data?.message || 'Unable to login. Please try again.'
      setServerError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="layout">
      <div className="brand-panel">
        <h1>Credo Auth</h1>
        <p>A clean, production-style login/signup flow with JWT auth.</p>
      </div>

      <div className="form-panel">
        <AuthForm mode="login" onSubmit={handleSubmit} loading={loading} />
        {serverError && <p className="error center">{serverError}</p>}
        <p className="muted center switch-text">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
