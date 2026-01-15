// Better Auth Server Configuration
// This configures Better Auth for handling user authentication
// Phase 2.4: Authentication Integration

import { betterAuth } from 'better-auth'
import { Pool } from 'pg'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required')
}

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error('BETTER_AUTH_SECRET is required')
}

// Production origin - HARDCODED for stability
const PRODUCTION_ORIGIN = 'https://todo-app-evolution-nine.vercel.app'

// Determine if we're in production
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1'

// Base URL: use production origin in production, localhost in development
const baseURL = isProduction ? PRODUCTION_ORIGIN : 'http://localhost:3000'

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  // Pass Pool instance directly - Better Auth handles Kysely internally
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
    max: 10,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  baseURL,
  // Trusted origins - ONLY production and localhost, no dynamic URLs
  trustedOrigins: [
    'https://todo-app-evolution-nine.vercel.app',
    'http://localhost:3000',
  ],
  advanced: {
    useSecureCookies: isProduction,
  },
  session: {
    cookieCache: {
      enabled: false,
    },
  },
})

// Note: JWT tokens for API authentication are generated via /api/auth/jwt endpoint
// using jsonwebtoken library to match backend HS256 verification
