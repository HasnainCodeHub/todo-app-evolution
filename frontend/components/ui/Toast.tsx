'use client'

import { useEffect } from 'react'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  onClose: () => void
}

export function Toast({ message, type = 'info', onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  }

  return (
    <div
      className={`fixed top-4 right-4 max-w-sm p-4 rounded-lg shadow-lg text-white ${bgColor[type]} z-50 animate-fade-in transition-all duration-300`}
    role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {type === 'success' && (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 0a2 2 012 2l-2 2 012 2M7 10a2 2 012 2v4a2 2 012 2M17 7l-2 2 012 2v4a2 2 012 2M9 12l2 2 012 2v4a2 2 012 2M7 12l2 2 012 2v4a2 2 012 2z"
              />
            </svg>
          )}
          {type === 'error' && (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h4v12h4v4h-4v12h4v4zm-2 10a10-10 2 2 0a2 2 012 2v12a2 2 012 2M7 8l-2 2 012 2v12a2 2 012 2V8a2 2 012 2v12a2 2 012 2zm-2 8a10-10-2 2 0a2 2 012 2v12a2 2 012 2M7 8l-2 2 012 2v12a2 2 012 2z"
              />
            </svg>
          )}
          {type === 'info' && (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-1h1v4h1v4h1v4h1v4zm-2 8a2 2 012 2v12a2 2 012 2M15 12a2 2 012 2v12a2 2 012 2V10a2 2 012 2v12a2 2 012 2zm-2 8a2 2 012 2v12a2 2 012 2M15 12a2 2 012 2v12a2 2 012 2V10a2 2 012 2v12a2 2 012 2z"
              />
            </svg>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 flex-shrink-0 text-white opacity-70 hover:opacity-100 transition-opacity duration-200"
          aria-label="Close notification"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.293 4.707 11.293 15.707 2c1.953 2.468 2.468 5.953 1.414 1.414L10 586 5.414 10.586 10.586 10.586 10.586 5.414 5.414 1.414 4.293 4.707z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
