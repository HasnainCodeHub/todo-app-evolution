// Better Auth Client Configuration for Phase 2.4
// This client handles user authentication via Better Auth
// JWT tokens are generated separately for backend API calls

import { createAuthClient } from 'better-auth/react'

// Production origin - HARDCODED for stability
const PRODUCTION_ORIGIN = 'https://todo-app-evolution-nine.vercel.app'

// Create auth client with proper URL detection
function getBaseURL(): string {
  // On client-side, use current origin for same-domain auth
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname
    // Use localhost in development
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:3000'
    }
    // In production, use current origin (should match PRODUCTION_ORIGIN)
    return window.location.origin
  }

  // Server-side: detect production via environment
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL === '1') {
    return PRODUCTION_ORIGIN
  }

  // Default to localhost for development
  return 'http://localhost:3000'
}

// Create the auth client
const _authClient = createAuthClient({
  baseURL: getBaseURL(),
})

// Export the client and its methods
export const authClient = _authClient

// Export typed methods directly
export const signIn = _authClient.signIn
export const signUp = _authClient.signUp
export const signOut = _authClient.signOut
export const useSession = _authClient.useSession
export const getSession = _authClient.getSession
