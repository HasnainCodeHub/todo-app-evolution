// Tasks Hook for Phase 2.4
// Manages task state and API operations
// Updates state ONLY after successful API responses (no optimistic updates)

import { useState, useCallback } from 'react'
import { apiClient } from '../lib/api/client'
import type { Task, TaskCreateRequest, TaskUpdateRequest } from '../types/task'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch all tasks from API
  const refresh = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const fetchedTasks = await apiClient.getTasks()
      setTasks(fetchedTasks)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load tasks'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Create a new task
  const createTask = useCallback(async (taskData: TaskCreateRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      const created = await apiClient.createTask(taskData)
      // Update state ONLY after successful API response
      setTasks(prev => [created, ...prev])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create task'
      setError(message)
      throw err // Re-throw for form error handling
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Update an existing task
  const updateTask = useCallback(async (taskId: number, updates: TaskUpdateRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      const updated = await apiClient.updateTask(taskId, updates)
      // Update state ONLY after successful API response
      setTasks(prev => prev.map(task =>
        task.id === taskId ? updated : task
      ))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update task'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Delete a task
  const deleteTask = useCallback(async (taskId: number) => {
    setIsLoading(true)
    setError(null)

    try {
      await apiClient.deleteTask(taskId)
      // Update state ONLY after successful API response
      setTasks(prev => prev.filter(task => task.id !== taskId))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete task'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Toggle task completion status
  const toggleComplete = useCallback(async (taskId: number) => {
    setIsLoading(true)
    setError(null)

    try {
      const updated = await apiClient.toggleComplete(taskId)
      // Update state ONLY after successful API response
      setTasks(prev => prev.map(task =>
        task.id === taskId ? updated : task
      ))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update task'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Clear error state
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    tasks,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
    refresh,
    clearError,
  }
}
