'use client'

import { ReactNode } from 'react'

// Minimal AuthProvider - Better Auth handles session via cookies
// No blocking loading state - pages handle their own auth checks
export function AuthProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}

// Re-export Better Auth hooks for convenience
export { useSession, signIn, signUp, signOut, getSession } from '../../lib/auth/auth-client'
