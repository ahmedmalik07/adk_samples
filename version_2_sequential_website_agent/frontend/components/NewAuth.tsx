'use client'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export default function AuthComponent() {
  const { user, loading, signUp, signIn, signInAnonymously, signOut } = useAuth()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Welcome, {user.name}!
          </h3>
          <p className="text-gray-600 mb-4">
            {user.email || 'Anonymous User'}
          </p>
          <button
            onClick={signOut}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      let result
      if (isSignUp) {
        result = await signUp(email, password)
      } else {
        result = await signIn(email, password)
      }

      if (result.success) {
        setMessage(result.message)
        setEmail('')
        setPassword('')
      } else {
        setMessage(result.message)
      }
    } catch (error) {
      setMessage('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAnonymousSignIn = async () => {
    setIsSubmitting(true)
    setMessage('')

    try {
      const result = await signInAnonymously()
      setMessage(result.message)
    } catch (error) {
      setMessage('Anonymous sign in failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {isSignUp ? 'Create Account' : 'Sign In'}
      </h2>

      {message && (
        <div className={`p-3 rounded mb-4 text-center ${
          message.includes('success') || message.includes('Success') 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
        </button>
      </form>

      <div className="mt-4 space-y-3">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full text-blue-600 hover:text-blue-800 font-medium"
        >
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>

        <button
          onClick={handleAnonymousSignIn}
          disabled={isSubmitting}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Please wait...' : 'Continue as Guest'}
        </button>
      </div>
    </div>
  )
}