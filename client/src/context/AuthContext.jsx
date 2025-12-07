
import React, { createContext, useContext, useEffect, useState } from 'react'
import { getMe } from '../api'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }

    getMe()
      .then((data) => {
        setUser(data.user)
      })
      .catch(() => {
        localStorage.removeItem('token')
      })
      .finally(() => setLoading(false))
  }, [])

  const login = (user, token) => {
    setUser(user)
    localStorage.setItem('token', token)
    navigate('/dashboard')
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
    navigate('/login')
  }

  if (loading) return <div className="center">Loading...</div>

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
