# Quickstart: Phase 2.4 Frontend Integration & UX Polish

**Feature**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Data Model**: [data-model.md](./data-model.md)
**Research**: [research.md](./research.md)
**Phase**: Phase 2.4 - Frontend Integration & UX Polish
**Created**: 2026-01-03

This quickstart guide provides a concise reference for implementing Phase 2.4 frontend features.

---

## Prerequisites

### Required

- Node.js 18+ and npm/yarn/pnpm
- [Better Auth](https://better-auth.com/docs) library installed
- Backend API running (Phase 2.3 JWT authentication complete)
- Access to backend `JWT_SECRET` for Better Auth configuration

### Environment Variables

Create `.env.local` in project root:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# Better Auth Configuration
BETTER_AUTH_SECRET=your-secret-here
BETTER_AUTH_URL=http://localhost:3000
```

**CRITICAL**: `BETTER_AUTH_SECRET` MUST match backend `JWT_SECRET` for JWT verification to work.

---

## Project Setup

### 1. Initialize Next.js Project

```bash
cd frontend
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir
```

### 2. Install Dependencies

```bash
npm install better-auth
npm install -D @types/react @types/node
npm install -D jest @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test  # For E2E tests
```

### 3. Configure Better Auth

Create `auth.config.ts` in project root:

```typescript
import { betterAuth } from "better-auth/react";

export const { authClient, signIn, signOut } = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
});
```

### 4. Create Project Structure

```bash
mkdir -p app/{signin,dashboard,tasks} components/{ui,auth,tasks} lib/{api,auth} hooks types tests
```

---

## Implementation Checklist

### Phase 1: Authentication Integration

- [ ] Configure Better Auth in `auth.config.ts`
- [ ] Create `components/auth/AuthProvider.tsx` with React Context
- [ ] Create `hooks/useAuth.ts` for authentication state
- [ ] Implement `app/signin/page.tsx` (sign-up/sign-in UI)
- [ ] Implement `app/page.tsx` (landing page)
- [ ] Add middleware for route protection (redirect unauthenticated users)
- [ ] Test sign-up and sign-in flows
- [ ] Test session persistence across page reloads

### Phase 2: API Client & Data Layer

- [ ] Create `lib/api/client.ts` (centralized API client)
- [ ] Implement JWT attachment to Authorization header
- [ ] Add 401/403 error handling with redirect to login
- [ ] Create `hooks/useApi.ts` for API communication hook
- [ ] Create `types/task.ts` (Task interfaces)
- [ ] Test API client with mocked backend responses

### Phase 3: Task Management UI

- [ ] Create `components/tasks/TaskList.tsx` (displays all tasks)
- [ ] Create `components/tasks/TaskItem.tsx` (single task card)
- [ ] Create `components/tasks/TaskForm.tsx` (create new task form)
- [ ] Implement task editing (modal or inline)
- [ ] Implement task deletion with confirmation
- [ ] Implement task completion toggle
- [ ] Create `app/dashboard/page.tsx` (protected route with task list)
- [ ] Create `app/tasks/[id]/page.tsx` (task detail/edit page)

### Phase 4: UX Polish & Responsive Design

- [ ] Design responsive dashboard layout (mobile/tablet/desktop)
- [ ] Create `components/ui/LoadingSpinner.tsx`
- [ ] Create `components/ui/EmptyState.tsx`
- [ ] Create `components/ui/Button.tsx`, `Input.tsx`, `Card.tsx`
- [ ] Add loading indicators to all async operations
- [ ] Implement empty states for task lists
- [ ] Style all components with Tailwind CSS
- [ ] Add visual distinction between completed/pending tasks
- [ ] Test responsive design on different screen sizes

### Phase 5: Error Handling & User Feedback

- [ ] Create error message components
- [ ] Implement toast/notification system
- [ ] Add form validation
- [ ] Disable actions during form submissions
- [ ] Show user-friendly error messages for all API failures
- [ ] Implement retry logic for transient network errors

---

## Key Implementation Details

### API Client Pattern

```typescript
// lib/api/client.ts
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = await getToken(); // From Better Auth
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Redirect to login
      window.location.href = '/signin';
    }
    throw new Error('API request failed');
  }

  return response.json();
}
```

### Authentication Hook Pattern

```typescript
// hooks/useAuth.ts
export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: false,
    error: null,
  });

  // Subscribe to Better Auth session
  useEffect(() => {
    // Check session on mount and on changes
  }, []);

  return {
    ...authState,
    signIn,
    signOut,
    refresh: () => {/* refresh JWT */},
  };
}
```

### Task Hook Pattern

```typescript
// hooks/useTasks.ts
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { token } = useAuth();

  const createTask = async (taskData: TaskCreateRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const created = await api.post('/api/tasks', taskData);
      // Update state ONLY after successful API response
      setTasks(prev => [created, ...prev]);
    } catch (err) {
      setError(err.message);
      // No rollback needed - UI still reflects backend state
    } finally {
      setIsLoading(false);
    }
  };

  // Similar patterns for update, delete, toggle...
  // Always update state AFTER successful API response, never before

  return { tasks, isLoading, error, createTask, updateTask, deleteTask, toggleComplete, refresh };
}
```

---

## API Endpoints Used

All endpoints use `Authorization: Bearer <JWT>` header.

| Method | Endpoint | Purpose | JWT Required |
|--------|----------|---------|--------------|
| POST | `/api/tasks` | Create new task | Yes |
| GET | `/api/tasks` | List all user's tasks | Yes |
| GET | `/api/tasks/{id}` | Get specific task | Yes |
| PUT | `/api/tasks/{id}` | Update task | Yes |
| DELETE | `/api/tasks/{id}` | Delete task | Yes |
| PATCH | `/api/tasks/{id}/complete` | Toggle completion | Yes |

---

## Testing Commands

### Unit Tests

```bash
npm test
```

### Component Tests

```bash
npm test -- tests/components
```

### E2E Tests

```bash
npx playwright test
```

---

## Common Issues & Solutions

### Issue: JWT token not attaching to requests

**Solution**: Verify `fetchWithAuth` function is being used for all API calls. Check that Better Auth is providing valid token.

### Issue: 401 Unauthorized on API calls

**Solution**: Verify `BETTER_AUTH_SECRET` matches backend `JWT_SECRET`. Check that token is not expired.

### Issue: Redirect loop to sign-in page

**Solution**: Check middleware logic. Ensure `/signin` route is not protected. Verify Better Auth session is being restored correctly.

### Issue: Tasks not persisting after page reload

**Solution**: This is expected behavior - data persists on backend, not in browser. Refresh task list on page mount.

---

## Development Workflow

1. **Setup**: Initialize project, install dependencies, configure environment
2. **Auth**: Implement Better Auth integration and authentication flow
3. **API**: Create centralized API client with JWT attachment
4. **UI**: Build task management components with Tailwind CSS
5. **Test**: Write tests for authentication, components, and E2E flows
6. **Polish**: Add loading states, empty states, error handling
7. **Validate**: Run all tests, verify JWT attachment, test responsive design

---

## Validation Checklist

Before completing Phase 2.4:

- [ ] All API requests include JWT token in Authorization header
- [ ] Unauthenticated users redirected to sign-in
- [ ] Users can sign up, sign in, and sign out successfully
- [ ] All CRUD operations work (create, read, update, delete, toggle)
- [ ] UI is responsive on mobile, tablet, and desktop
- [ ] Loading states display during async operations
- [ ] Empty states display when no tasks exist
- [ ] Error messages are user-friendly
- [ ] No backend code changes (validate with `git diff backend/`)
- [ ] Zero security regressions in backend (all Phase 2.3 checks intact)

---

## Next Steps

After completing this quickstart:

1. Run `/sp.tasks` to generate detailed implementation task breakdown
2. Execute tasks in sequence
3. Run security validation gate before declaring Phase 2.4 complete
4. Confirm Phase II is COMPLETE and ready for Phase III

---

## References

- [Better Auth Docs](https://better-auth.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Backend API Documentation](../../specs/004-backend-rest-api/spec.md) (Phase 2.2)
- [Authentication Integration Plan](./plan.md#ad-3-authentication-state-management)
