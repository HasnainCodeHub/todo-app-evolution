'use client'

import type { Task } from '../../types/task'
import { useState } from 'react'
import ConfirmDialog from '../ui/ConfirmDialog'
import EditTaskForm from './EditTaskForm'

interface TaskItemProps {
  task: Task
  onToggleComplete: (taskId: number) => void
  onUpdate: (taskId: number, updates: { title?: string; description?: string }) => void
  onDelete: (taskId: number) => void
  isLoading?: boolean
}

export default function TaskItem({ task, onToggleComplete, onUpdate, onDelete, isLoading }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleToggle = () => {
    if (!isLoading) {
      onToggleComplete(task.id)
    }
  }

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true)
  }

  const handleDeleteConfirm = () => {
    setIsDeleting(true)
    setShowDeleteConfirm(false)
    onDelete(task.id)
  }

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false)
  }

  const handleEdit = (updates: { title?: string; description?: string }) => {
    if (!isLoading) {
      onUpdate(task.id, updates)
      setIsEditing(false)
    }
  }

  return (
    <>
      <div
        className={`group p-4 rounded-xl border-2 transition-all duration-300 ${
          task.completed
            ? 'bg-gradient-to-r from-success-50 to-success-100/50 border-success-200 shadow-sm'
            : 'bg-white border-surface-100 shadow-card hover:shadow-card-hover hover:border-primary-200'
        } ${isDeleting ? 'opacity-50 scale-95' : ''}`}
      >
        <div className="flex items-start gap-4">
          {/* Custom Checkbox */}
          <button
            onClick={handleToggle}
            disabled={isLoading || isEditing || isDeleting}
            className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center ${
              task.completed
                ? 'bg-gradient-to-br from-success-500 to-success-400 border-success-500 focus:ring-success-500 shadow-sm'
                : 'border-surface-300 hover:border-primary-500 hover:bg-primary-50 focus:ring-primary-500'
            }`}
            aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            <svg
              className={`w-3.5 h-3.5 text-white transition-all duration-300 ${task.completed ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </button>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold break-words transition-all duration-300 ${
                task.completed
                  ? 'text-success-700 line-through decoration-success-400 decoration-2'
                  : 'text-surface-900'
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className={`text-sm mt-1 break-words transition-colors duration-300 ${
                task.completed ? 'text-success-600' : 'text-surface-500'
              }`}>
                {task.description}
              </p>
            )}

            {/* Actions - Show on hover or focus */}
            <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => setIsEditing(true)}
                disabled={isLoading || isDeleting || isEditing}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-surface-600 bg-surface-100 hover:bg-surface-200 rounded-lg transition-colors disabled:opacity-50"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
              <button
                onClick={handleDeleteClick}
                disabled={isLoading || isDeleting || isEditing}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          </div>

          {/* Completion indicator */}
          {task.completed && (
            <div className="flex-shrink-0">
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-success-700 bg-success-100 rounded-full">
                Done
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <EditTaskForm
          task={task}
          onUpdate={handleEdit}
          onCancel={() => setIsEditing(false)}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        message={`Are you sure you want to delete "${task.title}"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  )
}
