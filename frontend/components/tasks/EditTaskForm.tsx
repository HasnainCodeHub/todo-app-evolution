'use client'

import { FormEvent, useState, useEffect } from 'react'
import type { Task } from '../../types/task'

interface EditTaskFormProps {
  task: Task
  onUpdate: (updates: { title?: string; description?: string }) => void
  onCancel: () => void
}

export default function EditTaskForm({ task, onUpdate, onCancel }: EditTaskFormProps) {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || '')
  const [titleError, setTitleError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')

  // Focus management and escape key
  useEffect(() => {
    const firstInput = document.getElementById('edit-title')
    if (firstInput) {
      firstInput.focus()
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onCancel])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Validation
    if (!title.trim()) {
      setTitleError('Title is required')
      return
    }

    if (title.length > 200) {
      setTitleError('Title must be less than 200 characters')
      return
    }

    if (description.length > 1000) {
      setDescriptionError('Description must be less than 1000 characters')
      return
    }

    setTitleError('')
    setDescriptionError('')

    try {
      onUpdate({
        title: title.trim(),
        description: description.trim() || undefined,
      })
      onCancel()
    } catch {
      // Error is handled by parent component
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-surface-900/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all animate-scale-in">
          {/* Header */}
          <div className="px-6 py-4 border-b border-surface-100 flex items-center justify-between">
            <h2 className="text-xl font-display font-semibold text-surface-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Task
            </h2>
            <button
              type="button"
              onClick={onCancel}
              className="p-2 text-surface-400 hover:text-surface-600 hover:bg-surface-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label
                  htmlFor="edit-title"
                  className="block text-sm font-medium text-surface-700 mb-2"
                >
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="edit-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-modern"
                  maxLength={200}
                  required
                />
                {titleError && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {titleError}
                  </p>
                )}
                <p className="mt-1 text-xs text-surface-400 text-right">
                  {title.length}/200
                </p>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="edit-description"
                  className="block text-sm font-medium text-surface-700 mb-2"
                >
                  Description <span className="text-surface-400">(optional)</span>
                </label>
                <textarea
                  id="edit-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add more details..."
                  rows={4}
                  className="input-modern resize-none"
                  maxLength={1000}
                />
                {descriptionError && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {descriptionError}
                  </p>
                )}
                <p className="mt-1 text-xs text-surface-400 text-right">
                  {description.length}/1000
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 bg-surface-50 border-t border-surface-100 flex gap-3 justify-end">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2.5 border-2 border-surface-200 rounded-xl font-medium text-surface-700 hover:bg-white hover:border-surface-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-gradient"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Changes
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
