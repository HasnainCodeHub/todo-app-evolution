// Custom JWT Token Generation Endpoint
// Generates JWT tokens for API authentication from Better Auth sessions
// Phase 2.4: Frontend Integration

import { auth } from '@/lib/auth/auth-server'
import { NextRequest, NextResponse } from 'next/server'
import * as jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
    // Get the current session from Better Auth
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'No active session' },
        { status: 401 }
      )
    }

    // Create JWT token with backend-compatible claims
    const token = jwt.sign(
      {
        sub: session.user.id, // user_id
        email: session.user.email,
        iat: Math.floor(Date.now() / 1000),
      },
      process.env.BETTER_AUTH_SECRET!,
      {
        algorithm: 'HS256',
        expiresIn: '24h',
      }
    )

    return NextResponse.json({
      token,
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
      },
    })
  } catch (error) {
    console.error('JWT generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate JWT token' },
      { status: 500 }
    )
  }
}
