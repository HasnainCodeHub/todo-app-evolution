'use client'

import { useEffect } from 'react'

interface ConfirmDialogProps {
  isOpen: boolean
  message: string
  onConfirm: () => void
  onCancel: () => void
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'primary'
}

export default function ConfirmDialog({
  isOpen,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger'
}: ConfirmDialogProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onCancel])

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const variantStyles = {
    danger: {
      icon: (
        <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      iconBg: 'bg-red-100',
      button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white'
    },
    warning: {
      icon: (
        <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconBg: 'bg-amber-100',
      button: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500 text-white'
    },
    primary: {
      icon: (
        <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconBg: 'bg-primary-100',
      button: 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 text-white'
    }
  }

  const styles = variantStyles[variant]

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-surface-900/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all animate-scale-in">
          <div className="p-6">
            {/* Icon */}
            <div className={`mx-auto w-12 h-12 rounded-full ${styles.iconBg} flex items-center justify-center mb-4`}>
              {styles.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-display font-semibold text-surface-900 text-center mb-2">
              Confirm Action
            </h3>

            {/* Message */}
            <p className="text-surface-600 text-center text-sm">
              {message}
            </p>
          </div>

          {/* Actions */}
          <div className="px-6 pb-6 flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 border-2 border-surface-200 rounded-xl font-medium text-surface-700 hover:bg-surface-50 hover:border-surface-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-surface-300"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className={`flex-1 px-4 py-2.5 rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${styles.button}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
