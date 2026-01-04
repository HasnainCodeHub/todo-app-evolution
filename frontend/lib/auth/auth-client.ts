// Better Auth Client Configuration for Phase 2.4
// This client handles user authentication via Better Auth
// JWT tokens are generated separately for backend API calls

import { createAuthClient } from 'better-auth/react'

// Create Better Auth client
// Note: Better Auth handles session cookies automatically
// For API calls to our backend, we generate HS256 JWT tokens separately
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3000',
})

// Export typed methods
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession
} = authClient
