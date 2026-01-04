# Data Model: Phase 2.4 Frontend Integration & UX Polish

**Feature**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Research**: [research.md](./research.md)
**Phase**: Phase 2.4 - Frontend Integration & UX Polish
**Created**: 2026-01-03

This document defines frontend data structures, state management approach, and TypeScript types for Phase 2.4.

---

## Data Entities

### User

**Purpose**: Represents authenticated user managed by Better Auth

**TypeScript Interface**:
```typescript
interface User {
  id: string;           // Better Auth user ID (from JWT 'sub' claim)
  email: string;        // User's email address (from JWT 'email' claim)
  name?: string;        // User's display name (optional, from Better Auth profile)
}
```

**Data Source**: Better Auth session / JWT token payload
**Lifecycle**: Persists across page reloads (managed by Better Auth)
**Validation Rules**:
- Email format validated by Better Auth
- ID and email guaranteed to be present in JWT

---

### Task

**Purpose**: Represents a user's todo item with completion status

**TypeScript Interface**:
```typescript
interface Task {
  id: number;                    // Unique task identifier (from backend)
  user_id: string;               // Owner user ID (matches authenticated user)
  title: string;                  // Task title (required)
  description?: string;             // Optional detailed description
  completed: boolean;              // Completion status
  created_at: string;              // ISO 8601 timestamp
  updated_at: string;              // ISO 8601 timestamp
}
```

**Data Source**: Backend API responses
**Lifecycle**: Stored in frontend state (React hooks), persisted on backend
**Validation Rules**:
- `title`: Required, 1-200 characters
- `description`: Optional, max 1000 characters
- `completed`: Boolean, defaults to false on creation
- `id`, `user_id`, `created_at`, `updated_at`: Read-only (from backend)

---

### Auth State

**Purpose**: Represents current authentication state for the application

**TypeScript Interface**:
```typescript
interface AuthState {
  isAuthenticated: boolean;  // User is signed in
  user: User | null;          // Current user (null if not authenticated)
  token: string | null;        // JWT token (null if not authenticated)
  isLoading: boolean;          // Auth operation in progress (sign in, sign up)
  error: string | null;         // Auth error message (null if no error)
}
```

**Data Source**: Better Auth session + custom hook state
**Lifecycle**: Persists in React Context, updated by Better Auth events
**Validation Rules**:
- `isAuthenticated`: Must be true to access protected routes
- `token`: Must be valid JWT (signed with matching secret)
- `user`: Required when `isAuthenticated` is true

---

## State Management Architecture

### Authentication State

**Storage**: React Context (`AuthProvider`)
**Location**: `frontend/components/auth/AuthProvider.tsx`
**Update Triggers**:
- User signs in: Set `isAuthenticated = true`, populate `user` and `token`
- User signs out: Set `isAuthenticated = false`, clear `user` and `token`
- Token expires: Set `isAuthenticated = false`, redirect to sign-in
- Page reload: Restore from Better Auth session

**Access Pattern**: `useAuth` custom hook provides `authState` and helper functions

```typescript
const { user, token, isAuthenticated, signOut } = useAuth();
```

### Task State

**Storage**: Custom React hook (`useTasks`)
**Location**: `frontend/hooks/useTasks.ts`
**Update Triggers**:
- User fetches tasks: Load all tasks from backend, update state
- User creates task: Send to API, update state AFTER successful response
- User updates task: Send to API, update state AFTER successful response
- User deletes task: Send to API, update state AFTER successful response
- User toggles completion: Send to API, update state AFTER successful response

**Access Pattern**:

```typescript
const { tasks, isLoading, error, createTask, updateTask, deleteTask, toggleComplete, refresh } = useTasks();
```

**State Updates**: Update UI ONLY after successful API response - no optimistic updates (per clarification)

---

## API Request/Response Models

### Task Create Request

```typescript
interface TaskCreateRequest {
  title: string;
  description?: string;
}
```

### Task Update Request

```typescript
interface TaskUpdateRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}
```

### Task Response (from Backend API)

Matches `Task` interface above (backend returns same structure)

### API Error Response

```typescript
interface ApiError {
  error: {
    code: string;      // Error code (e.g., "MISSING_TOKEN", "INVALID_TOKEN")
    message: string;    // Human-readable error message
  };
}
```

---

## Data Flow

### Authentication Flow

```
User signs in (Better Auth)
  ↓
Better Auth issues JWT token
  ↓
Token stored in Better Auth session
  ↓
AuthProvider updates state (user, token, isAuthenticated)
  ↓
Protected routes accessible
  ↓
API client adds token to Authorization header
  ↓
Backend verifies token and returns data
```

### Task Management Flow

```
User creates task (form submission)
  ↓
useTasks hook creates optimistic update (add to state)
  ↓
API client sends POST /api/tasks with JWT
  ↓
Backend creates task and returns response
  ↓
useTasks hook updates state (replace optimistic update with real data)
  ↓
UI reflects new task
```

### Error Handling Flow

```
API call returns 401 Unauthorized
  ↓
API client detects error
  ↓
AuthProvider updates state (error message)
  ↓
UI shows error message
  ↓
User redirected to sign-in page (if needed)
```

---

## State Transitions

### Auth State Transitions

| Current State | Event | Next State | Action |
|---------------|-------|------------|--------|
| Unauthenticated | Sign in success | Authenticated | Store user/token, enable protected routes |
| Authenticated | Sign out | Unauthenticated | Clear user/token, redirect to home |
| Authenticated | Token expired | Unauthenticated | Clear user/token, redirect to sign-in |
| Unauthenticated | Page load | Unauthenticated (or Authenticated if session exists) | Check Better Auth session |

### Task State Transitions

| Current State | Event | Next State | Action |
|---------------|-------|------------|--------|
| List loaded | Create task | List + new task (after API) | POST to backend, update state on success |
| List loaded | Create task error | List (unchanged) | Show error message, UI reflects backend state |
| List loaded | Delete task | List - task (after API) | DELETE to backend, update state on success |
| List loaded | Delete task error | List (unchanged) | Show error message, UI reflects backend state |
| List loaded | Toggle complete | List + updated task (after API) | PATCH to backend, update state on success |
| List loaded | Refresh | Loading → List | Show spinner, fetch from backend, update state on success |

---

## Type Safety Guarantees

### Strict TypeScript Configuration

- `strict: true` in tsconfig.json
- `noImplicitAny: true`
- `strictNullChecks: true`
- No `any` types in production code
- All API responses have defined interfaces
- All component props have defined interfaces

### Runtime Type Guards

```typescript
function isTask(value: unknown): value is Task {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'user_id' in value &&
    'title' in value &&
    'completed' in value
  );
}
```

---

## Data Validation Rules

### Client-Side Validation (Before API Calls)

| Field | Rules | Error Message |
|-------|--------|---------------|
| Task title | Required, 1-200 chars | "Title is required (1-200 characters)" |
| Task description | Optional, max 1000 chars | "Description must be less than 1000 characters" |
| Email format | Validated by Better Auth | (handled by Better Auth) |

### Server-Side Validation (Backend Responses)

Backend validates:
- JWT signature and expiration
- Task ownership (user_id matches authenticated user)
- Required fields presence
- Data type constraints

Frontend displays server validation errors as user-friendly messages.

---

## Performance Considerations

### State Updates

- Batch state updates where possible (React automatic batching helps)
- Use React.memo for expensive component re-renders
- Implement virtual scrolling if task list exceeds 100 items

### Network Efficiency

- Minimize API calls with optimistic updates
- Implement request debouncing for rapid user actions
- Cache fetched data in memory (re-fetch only on explicit refresh or error)

---

## Security Considerations

### Data Exposure

- Never expose JWT token in browser console or error messages
- Never store sensitive data beyond what Better Auth manages
- Sanitize user input before rendering (React auto-escapes by default)

### XSS Prevention

- React auto-escapes JSX by default
- Validate and sanitize user input on backend (frontend only displays)
- Use dangerouslySetInnerHTML only with sanitized/trusted content

---

## References

- TypeScript interfaces from [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/interfaces-from-types/)
- React state patterns from [React Documentation](https://react.dev/reference/react/useState)
- Backend API contracts from [backend/app/routers/tasks.py](../../../../backend/app/routers/tasks.py) (Phase 2.3)
- Better Auth JWT payload structure (from Better Auth documentation)

---

## Notes

- Frontend data structures are mirrors of backend contracts
- All API calls must include JWT token in Authorization header
- State management is local to frontend; backend is single source of truth
- Optimistic UI updates improve perceived performance
- Error handling must be user-friendly and actionable
