# Research: Phase 2.4 Frontend Integration & UX Polish

**Feature**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Phase**: 2.4 - Frontend Integration & UX Polish
**Created**: 2026-01-03

This document consolidates technology research, best practices, and architectural decisions for Phase 2.4 frontend implementation.

---

## Research Topics

### 1. Frontend Architecture Patterns

**Decision**: Component-driven architecture with custom React hooks
**Reference**: [plan.md](./plan.md#ad-1-frontend-architecture-pattern)

---

### 2. API Client Approaches

**Decision**: Centralized fetch-based API client with JWT interceptor pattern
**Reference**: [plan.md](./plan.md#ad-2-api-client-approach)

---

### 3. Better Auth Integration

**Decision**: React Context + custom hook for authentication state
**Reference**: [plan.md](./plan.md#ad-3-authentication-state-management)

---

### 4. Styling Frameworks

**Decision**: Tailwind CSS with component-scoped classes
**Reference**: [plan.md](./plan.md#ad-4-styling-architecture)

---

## Technology Decisions

| Decision | Choice | Rationale | Trade-offs |
|-----------|--------|------------|-------------|
| Frontend Framework | Next.js 14+ (App Router) | Industry standard, excellent DX, built-in routing | New learning curve vs. Create React App |
| Language | TypeScript 5.6+ | Type safety, better IDE support, catches errors early | Compilation overhead, stricter syntax |
| Styling | Tailwind CSS | Rapid development, consistent design system, responsive utilities | Larger JSX class strings, no CSS isolation by default |
| Authentication | Better Auth | Built-in JWT support, React Context, Next.js integration | Library-specific, vendor lock-in |
| API Client | Native Fetch API | No dependencies, browser-native, full control | Manual error handling, no auto-retry |
| Testing | Jest + React Testing Library | Industry standard, good component testing, React ecosystem support | Setup complexity for E2E tests |

---

## Best Practices Applied

### Next.js App Router Best Practices

- Use Server Components where possible for performance
- Implement proper route protection with middleware
- Leverage React Suspense for data loading states
- Use dynamic imports for code splitting

### Better Auth Integration Best Practices

- Use built-in React Context for auth state
- Implement proper session token management
- Configure JWT secret for frontend signing
- Handle token expiration gracefully

### Tailwind CSS Best Practices

- Use utility classes for rapid styling
- Implement responsive design with Tailwind breakpoints
- Create reusable component styles via @apply directive
- Maintain consistent spacing and sizing scale

### TypeScript Best Practices

- Use strict mode for type safety
- Define proper interfaces for API contracts
- Leverage type inference where possible
- Avoid `any` types

### React State Management Best Practices

- Use custom hooks for separation of concerns
- Implement optimistic UI updates for better UX
- Minimize prop drilling with Context where appropriate
- Keep state local to component when possible

### API Communication Best Practices

- Centralize fetch logic in single client module
- Implement proper error handling with user-friendly messages
- Handle 401/403 responses appropriately
- Implement retry logic for transient failures

---

## Integration Considerations

### Better Auth ↔ Backend JWT Verification

**Critical Integration Point**: JWT secret must match between frontend and backend.

- Frontend Better Auth signs tokens with `BETTER_AUTH_SECRET` environment variable
- Backend `backend/app/config.py` reads `JWT_SECRET` environment variable
- **Action Required**: Ensure same secret value in both environments

**Token Flow**:
1. User signs in via Better Auth
2. Better Auth issues JWT token
3. Frontend stores token in Better Auth session
4. Frontend makes API requests with Authorization: Bearer <token>
5. Backend verifies signature using shared secret
6. Backend responds with data or 401/403 error

### Environment Configuration

Frontend requires these environment variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000  # Backend API base URL
BETTER_AUTH_SECRET=your-secret-here   # Must match backend JWT_SECRET
BETTER_AUTH_URL=http://localhost:3000   # Frontend URL for callbacks
```

### API Response Handling

Backend error responses (from Phase 2.3):

| Status Code | Meaning | Frontend Action |
|-------------|---------|-----------------|
| 200 OK | Success | Display data, update UI |
| 201 Created | Resource created | Add to list, show success message |
| 204 No Content | Success (delete) | Remove from list, show success message |
| 401 Unauthorized | Invalid/expired token | Redirect to sign-in, show session expired message |
| 403 Forbidden | Cross-user access | Show access denied error, refresh task list |
| 404 Not Found | Task not found | Show error message, refresh task list |
| 503 Service Unavailable | Backend error | Show error message, offer retry option |

---

## Performance Considerations

### Initial Load Time (<3 seconds)

- Use Next.js automatic code splitting
- Lazy load routes and components
- Optimize images and assets
- Use proper caching headers

### Perceived Response Time (<1 second)

- Implement optimistic UI updates
- Show loading indicators immediately
- Use CSS animations for smooth transitions
- Debounce rapid user inputs

### Bundle Size Optimization

- Tree-shake unused dependencies
- Use dynamic imports for heavy libraries
- Minimize third-party dependencies
- Leverage Next.js built-in optimizations

---

## Testing Strategy

### Unit Tests (Jest)

- Test individual components in isolation
- Test custom hooks behavior
- Test utility functions (API client, formatters)

### Integration Tests (React Testing Library)

- Test component interactions
- Test authentication flows
- Test API client with mocked responses

### E2E Tests (Playwright/Cypress)

- Test complete user journeys (sign up → dashboard → create task)
- Test responsive design on different viewports
- Test error handling scenarios
- Test authentication redirects

---

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [Better Auth Documentation](https://better-auth.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [MDN Web Docs - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

---

## Unresolved Questions

None. All technical decisions are documented and justified.
