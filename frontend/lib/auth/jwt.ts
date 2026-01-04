// JWT Token Utility for Phase 2.4
// Generates HS256 JWT tokens for backend API calls
// The backend expects tokens with sub (user_id) and email claims

import { SignJWT, jwtVerify } from 'jose'
import config from '../config'

interface TokenPayload {
  sub: string      // user_id
  email: string    // user email
}

// Get the JWT secret as Uint8Array for jose
function getSecretKey(): Uint8Array {
  const secret = config.auth.secret
  if (!secret) {
    throw new Error('JWT secret is not configured. Set BETTER_AUTH_SECRET environment variable.')
  }
  return new TextEncoder().encode(secret)
}

/**
 * Generate a JWT token for backend API calls
 * Creates an HS256 signed token with user identity claims
 */
export async function generateToken(payload: TokenPayload): Promise<string> {
  const secret = getSecretKey()

  const token = await new SignJWT({
    sub: payload.sub,
    email: payload.email,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h') // Token valid for 24 hours
    .sign(secret)

  return token
}

/**
 * Verify a JWT token (for debugging/testing)
 */
export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const secret = getSecretKey()
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ['HS256'],
    })

    return {
      sub: payload.sub as string,
      email: payload.email as string,
    }
  } catch {
    return null
  }
}
