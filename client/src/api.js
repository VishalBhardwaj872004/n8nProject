
import axios from 'axios'

const api = axios.create({
  baseURL: '/api'
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const signupRequest = (payload) =>
  api.post('/auth/register', payload).then((res) => res.data)

export const loginRequest = (payload) =>
  api.post('/auth/login', payload).then((res) => res.data)

export const getMe = () =>
  api.get('/auth/me').then((res) => res.data)
