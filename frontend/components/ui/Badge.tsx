'use client'

import { ReactNode } from 'react'

interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md'
  dot?: boolean
  pulse?: boolean
  children: ReactNode
  className?: string
}

export function Badge({
  variant = 'default',
  size = 'md',
  dot = false,
  pulse = false,
  children,
  className = '',
}: BadgeProps) {
  const baseStyles = `
    inline-flex items-center font-medium rounded-full
    transition-all duration-200
  `

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-3 py-1 text-sm gap-1.5',
  }

  const variantStyles = {
    default: 'bg-surface-100 text-surface-700',
    primary: 'bg-primary-100 text-primary-700',
    success: 'bg-success-100 text-success-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-accent-100 text-accent-700',
  }

  const dotColors = {
    default: 'bg-surface-500',
    primary: 'bg-primary-500',
    success: 'bg-success-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500',
    info: 'bg-accent-500',
  }

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]} ${pulse ? 'animate-pulse' : ''}`} />
      )}
      {children}
    </span>
  )
}
