// Centralized API Client for Phase 2.4
// All API requests include JWT token in Authorization header
// Handles 401/403 responses appropriately

import config from '../config'
import type { Task, TaskCreateRequest, TaskUpdateRequest, ApiError } from '../../types/task'

// Token storage key (same as useAuth)
const TOKEN_STORAGE_KEY = 'todo_auth_token'

// Get token from localStorage
function getAuthToken(): string | null {
  if (typeof window === 'undefined') {
    return null
  }
  return localStorage.getItem(TOKEN_STORAGE_KEY)
}

// Clear auth data and redirect to login
function handleAuthFailure() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    localStorage.removeItem('todo_auth_user')
    window.location.href = '/signin'
  }
}

// API client with JWT interceptor
// All requests include Authorization: Bearer <JWT> header
// 401 responses trigger redirect to login
// 403 responses show user-friendly error messages
class ApiClient {
  // Use getter to ensure baseUrl is read fresh each time
  private get baseUrl(): string {
    return config.api.url
  }

  private async request<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = getAuthToken()

    if (!token) {
      handleAuthFailure()
      throw new Error('No authentication token available')
    }

    const fullUrl = `${this.baseUrl}${url}`

    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API] ${options.method || 'GET'} ${fullUrl}`)
    }

    let response: Response
    try {
      response = await fetch(fullUrl, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          ...options.headers,
        },
      })
    } catch (fetchError) {
      // Network error - backend likely not running
      console.error(`[API] Network error for ${fullUrl}:`, fetchError)
      throw new Error(
        `Cannot connect to backend at ${this.baseUrl}. ` +
        `Please ensure the backend server is running on port 8000.`
      )
    }

    // Handle 401 Unauthorized
    if (response.status === 401) {
      handleAuthFailure()
      throw new Error('Session expired. Please sign in again.')
    }

    // Handle 403 Forbidden
    if (response.status === 403) {
      throw new Error('Permission denied. You do not have access to this resource.')
    }

    // Handle 404 Not Found
    if (response.status === 404) {
      throw new Error('Resource not found.')
    }

    // Handle other errors
    if (!response.ok) {
      try {
        const errorData: ApiError = await response.json()
        throw new Error(errorData.error?.message || `Request failed with status ${response.status}`)
      } catch (e) {
        if (e instanceof Error && e.message !== `Request failed with status ${response.status}`) {
          throw e
        }
        throw new Error(`Request failed with status ${response.status}`)
      }
    }

    // Handle 204 No Content (e.g., DELETE)
    if (response.status === 204) {
      return undefined as T
    }

    return response.json()
  }

  // Task CRUD operations - all update state AFTER successful API response

  async getTasks(): Promise<Task[]> {
    return this.request<Task[]>('/api/tasks', {
      method: 'GET',
    })
  }

  async getTask(taskId: number): Promise<Task> {
    return this.request<Task>(`/api/tasks/${taskId}`, {
      method: 'GET',
    })
  }

  async createTask(data: TaskCreateRequest): Promise<Task> {
    return this.request<Task>('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateTask(taskId: number, data: TaskUpdateRequest): Promise<Task> {
    return this.request<Task>(`/api/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteTask(taskId: number): Promise<void> {
    return this.request<void>(`/api/tasks/${taskId}`, {
      method: 'DELETE',
    })
  }

  async toggleComplete(taskId: number): Promise<Task> {
    return this.request<Task>(`/api/tasks/${taskId}/complete`, {
      method: 'PATCH',
    })
  }
}

export const apiClient = new ApiClient()
