'use client'

import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    disabled = false,
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    className = '',
    ...props
  }, ref) => {

    const baseStyles = `
      relative inline-flex items-center justify-center font-semibold
      rounded-xl transition-all duration-300 ease-out
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
      active:scale-[0.98]
    `

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-4 py-2.5 text-sm gap-2',
      lg: 'px-6 py-3 text-base gap-2.5',
    }

    const variantStyles = {
      primary: `
        bg-gradient-to-r from-primary-600 to-primary-500 text-white
        shadow-lg shadow-primary-500/25
        hover:shadow-xl hover:shadow-primary-500/30 hover:scale-[1.02]
        focus:ring-primary-500
        before:absolute before:inset-0 before:rounded-xl
        before:bg-gradient-to-r before:from-primary-500 before:to-accent-500
        before:opacity-0 before:transition-opacity before:duration-300
        hover:before:opacity-100
      `,
      secondary: `
        bg-primary-50 text-primary-700 border-2 border-primary-200
        hover:bg-primary-100 hover:border-primary-300 hover:shadow-md
        focus:ring-primary-500
      `,
      ghost: `
        bg-transparent text-surface-600
        hover:bg-surface-100 hover:text-surface-900
        focus:ring-surface-500
      `,
      danger: `
        bg-gradient-to-r from-red-600 to-red-500 text-white
        shadow-lg shadow-red-500/25
        hover:shadow-xl hover:shadow-red-500/30 hover:scale-[1.02]
        focus:ring-red-500
      `,
      success: `
        bg-gradient-to-r from-success-600 to-success-500 text-white
        shadow-lg shadow-success-500/25
        hover:shadow-xl hover:shadow-success-500/30 hover:scale-[1.02]
        focus:ring-success-500
      `,
    }

    const LoadingSpinner = () => (
      <svg
        className="animate-spin h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    )

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {isLoading ? (
            <LoadingSpinner />
          ) : leftIcon ? (
            <span className="flex-shrink-0">{leftIcon}</span>
          ) : null}
          {children}
          {!isLoading && rightIcon && (
            <span className="flex-shrink-0">{rightIcon}</span>
          )}
        </span>
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
