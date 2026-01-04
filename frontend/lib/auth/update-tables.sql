-- Update Better Auth tables with missing columns
-- Based on Better Auth v1.4.10 schema requirements

-- Add missing token column to session table
ALTER TABLE "session" ADD COLUMN IF NOT EXISTS "token" TEXT UNIQUE;

-- Add missing columns to account table
ALTER TABLE "account" ADD COLUMN IF NOT EXISTS "accessTokenExpiresAt" TIMESTAMP;
ALTER TABLE "account" ADD COLUMN IF NOT EXISTS "refreshTokenExpiresAt" TIMESTAMP;
ALTER TABLE "account" ADD COLUMN IF NOT EXISTS "scope" TEXT;
ALTER TABLE "account" ADD COLUMN IF NOT EXISTS "idToken" TEXT;

-- Drop the old expiresAt column if it exists (replaced by accessTokenExpiresAt)
ALTER TABLE "account" DROP COLUMN IF EXISTS "expiresAt";
