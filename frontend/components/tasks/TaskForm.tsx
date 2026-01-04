import { useState, FormEvent } from 'react'

interface TaskFormProps {
  onSubmit: (data: { title: string; description?: string }) => Promise<void>
  isLoading?: boolean
  error?: string | null
}

export default function TaskForm({ onSubmit, isLoading = false }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [titleError, setTitleError] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

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

    if (description && description.length > 1000) {
      setTitleError('Description must be less than 1000 characters')
      return
    }

    setTitleError('')

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
      })

      // Clear form on success
      setTitle('')
      setDescription('')
      setIsExpanded(false)
    } catch {
      // Error is handled by parent component
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-surface-700 mb-2">
          Task title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          disabled={isLoading}
          placeholder="What needs to be done?"
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
      </div>

      {/* Expandable description */}
      <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
        <label className="block text-sm font-medium text-surface-700 mb-2">
          Description <span className="text-surface-400">(optional)</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
          placeholder="Add more details..."
          rows={3}
          className="input-modern resize-none"
          maxLength={1000}
        />
        <p className="mt-1 text-xs text-surface-400 text-right">
          {description.length}/1000
        </p>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading || !title.trim()}
        className="btn-gradient w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Creating...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Task
            </>
          )}
        </span>
      </button>
    </form>
  )
}
