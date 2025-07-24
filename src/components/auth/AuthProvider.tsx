import React, { useState, useEffect, ReactNode } from 'react'
import { AuthContext, AuthContextType } from '../../contexts/AuthContext'
import { blink } from '../../blink/client'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  const login = () => {
    blink.auth.login()
  }

  const logout = () => {
    blink.auth.logout()
  }

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}