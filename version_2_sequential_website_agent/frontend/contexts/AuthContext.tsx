'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { API_BASE_URL } from '@/lib/api'

interface User {
  id: string
  email: string | null
  name: string
  avatar_url?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  signUp: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  signInAnonymously: () => Promise<{ success: boolean; message: string }>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if user is already logged in on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('access_token')
      if (token) {
        const response = await fetch(`${API_BASE_URL}/auth/user`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          if (data.status === 'success' && data.user) {
            setUser(data.user)
          } else {
            localStorage.removeItem('access_token')
          }
        } else {
          localStorage.removeItem('access_token')
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('access_token')
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/email/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.status === 'success' && data.access_token) {
        localStorage.setItem('access_token', data.access_token)
        setUser(data.user)
        return { success: true, message: 'Sign in successful!' }
      } else {
        return { success: false, message: data.message || 'Sign in failed' }
      }
    } catch (error) {
      console.error('Sign in error:', error)
      return { success: false, message: 'Network error. Please try again.' }
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/email/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.status === 'success' && data.access_token) {
        localStorage.setItem('access_token', data.access_token)
        setUser(data.user)
        return { success: true, message: 'Sign up successful!' }
      } else {
        return { success: false, message: data.message || 'Sign up failed' }
      }
    } catch (error) {
      console.error('Sign up error:', error)
      return { success: false, message: 'Network error. Please try again.' }
    }
  }

  const signInAnonymously = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/anonymous`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })

      const data = await response.json()

      if (data.status === 'success' && data.access_token) {
        localStorage.setItem('access_token', data.access_token)
        setUser(data.user)
        return { success: true, message: 'Anonymous sign in successful!' }
      } else {
        return { success: false, message: data.message || 'Anonymous sign in failed' }
      }
    } catch (error) {
      console.error('Anonymous sign in error:', error)
      return { success: false, message: 'Network error. Please try again.' }
    }
  }

  const signOut = () => {
    localStorage.removeItem('access_token')
    setUser(null)
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signInAnonymously,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}