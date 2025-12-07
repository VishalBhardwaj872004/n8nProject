
import React from 'react'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const { user, logout } = useAuth()

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {user?.name || 'User'} 👋</h1>
        <button onClick={logout} className="ghost-btn">
          Logout
        </button>
      </header>

      <main>
        <section className="card">
          <h2>Your account</h2>
          <p>
            <strong>Name: </strong>
            {user?.name}
          </p>
          <p>
            <strong>Email: </strong>
            {user?.email}
          </p>
        </section>
      </main>
    </div>
  )
}

export default Dashboard
