'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useAuth } from '../../hooks/useAuth'
import type { User, AuthState } from '../../hooks/useAuth'

interface AuthContextType {
  authState: AuthState
  signIn: (email: string, password: string, isSignUp?: boolean) => Promise<void>
  signOut: () => void
  refresh: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth()

  // Show loading state while checking stored session
  if (auth.authState.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }
  return context
}

// Re-export types for convenience
export type { User, AuthState }
