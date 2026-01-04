'use client'

import { ReactNode } from 'react'

interface CardProps {
  variant?: 'default' | 'gradient' | 'glass' | 'outlined'
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  children: ReactNode
  className?: string
}

export function Card({
  variant = 'default',
  hover = false,
  padding = 'md',
  children,
  className = '',
}: CardProps) {
  const baseStyles = `
    rounded-2xl overflow-hidden
    transition-all duration-300 ease-out
  `

  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  const variantStyles = {
    default: 'bg-white border border-surface-100 shadow-card',
    gradient: 'bg-gradient-to-br from-white to-surface-50 border border-surface-100 shadow-card',
    glass: 'bg-white/70 backdrop-blur-lg border border-white/20 shadow-card',
    outlined: 'bg-transparent border-2 border-surface-200',
  }

  const hoverStyles = hover
    ? 'hover:shadow-card-hover hover:-translate-y-1 hover:border-primary-200 cursor-pointer'
    : ''

  return (
    <div className={`${baseStyles} ${paddingStyles[padding]} ${variantStyles[variant]} ${hoverStyles} ${className}`}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  title: string
  subtitle?: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

export function CardHeader({ title, subtitle, icon, action, className = '' }: CardHeaderProps) {
  return (
    <div className={`flex items-start justify-between gap-4 ${className}`}>
      <div className="flex items-start gap-3">
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white shadow-glow flex-shrink-0">
            {icon}
          </div>
        )}
        <div>
          <h3 className="font-display text-lg font-semibold text-surface-900">{title}</h3>
          {subtitle && <p className="text-sm text-surface-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  )
}
